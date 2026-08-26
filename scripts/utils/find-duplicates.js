import { readJson } from '../../lib/api-utils.js';

const DATABASE_PATH = 'apis-database.json';
const WATCHLIST_PATH = 'watchlist.json';

/**
 * @typedef {Object} EndpointEntry
 * @property {string} id    Identificador único del endpoint dentro de su API.
 * @property {string} name  Nombre descriptivo del endpoint.
 * @property {string} url   URL del endpoint.
 */

/**
 * @typedef {Object} ApiEntry
 * @property {string}   id          Identificador único de la API.
 * @property {string}   name        Nombre oficial de la API.
 * @property {string}   url         URL principal (sitio o documentación).
 * @property {EndpointEntry[]} [endpoints] Endpoints asociados (opcional en watchlist).
 */

/**
 * @typedef {Object} SourceFile
 * @property {string}   file      Ruta relativa del archivo JSON.
 * @property {ApiEntry[]} apis    Lista de APIs contenidas en el archivo.
 */

/**
 * @typedef {Object} Duplicate
 * @property {'id' | 'url' | 'endpoint-id'} type Tipo de duplicado detectado.
 * @property {string} message Descripción legible del problema.
 */

/**
 * @typedef {'all' | 'database' | 'watchlist'} ScanMode
 * Formas de seleccionar los archivos a revisar:
 * - `all`: revisa `apis-database.json` y `watchlist.json` (default).
 * - `database`: solo `apis-database.json`.
 * - `watchlist`: solo `watchlist.json`.
 */

/**
 * Parsea los argumentos CLI del script.
 *
 * Modos (mutuamente excluyentes, por defecto `all`):
 * - `--db`: revisa solo `apis-database.json`.
 * - `--watchlist`: revisa solo `watchlist.json`.
 *
 * Extras:
 * - `--verbose`: muestra un resumen con el total de APIs y endpoints revisados.
 *
 * @param {string[]} args Argumentos crudos de `process.argv` (sin los 2 primeros).
 * @returns {{ mode: ScanMode, verbose: boolean }} Opciones parseadas.
 */
function parseArgs(args) {
	/** @type {{ mode: ScanMode, verbose: boolean }} */
	const options = { mode: 'all', verbose: false };

	for (const arg of args) {
		if (arg === '--db' || arg === '--database') options.mode = 'database';
		else if (arg === '--watchlist') options.mode = 'watchlist';
		else if (arg === '--verbose' || arg === '-v') options.verbose = true;
	}

	return options;
}

/**
 * Normaliza una URL para comparación: minúsculas y sin barra final.
 *
 * @param {string} url URL a normalizar.
 * @returns {string} URL normalizada, o string vacío si es inválida.
 */
function normalizeUrl(url) {
	if (!url) return '';
	return url.replace(/\/$/, '').toLowerCase();
}

/**
 * Extrae la lista de APIs desde un archivo JSON.
 *
 * En `apis-database.json` las APIs viven en la propiedad `apis`;
 * en `watchlist.json` el archivo es directamente el array.
 *
 * @param {string} filePath Ruta relativa al archivo.
 * @returns {SourceFile} Archivo leído con su lista de APIs normalizada.
 */
function loadSource(filePath) {
	const data = readJson(filePath);
	const apis = Array.isArray(data) ? data : (data.apis ?? []);
	return { file: filePath, apis };
}

/**
 * Detecta IDs de API duplicados dentro de una lista.
 *
 * @param {SourceFile} source Archivo a revisar.
 * @returns {Duplicate[]} Duplicados encontrados (vacío si no hay).
 */
function findDuplicateIds(source) {
	/** @type {Duplicate[]} */
	const duplicates = [];
	/** @type {Map<string, string>} */
	const seen = new Map();

	for (const api of source.apis) {
		if (seen.has(api.id)) {
			duplicates.push({
				type: 'id',
				message: `❌ [${source.file}] Duplicate API ID "${api.id}" (first seen as "${seen.get(api.id)}")`,
			});
		} else {
			seen.set(api.id, api.id);
		}
	}

	return duplicates;
}

/**
 * Detecta URLs principales duplicadas (normalizadas) dentro de una lista.
 *
 * @param {SourceFile} source Archivo a revisar.
 * @returns {Duplicate[]} Duplicados encontrados (vacío si no hay).
 */
function findDuplicateUrls(source) {
	/** @type {Duplicate[]} */
	const duplicates = [];
	/** @type {Map<string, string>} */
	const urlToId = new Map();

	for (const api of source.apis) {
		const normalized = normalizeUrl(api.url);
		if (!normalized) continue;

		if (urlToId.has(normalized)) {
			duplicates.push({
				type: 'url',
				message: `⚠️  [${source.file}] Similar URLs: "${urlToId.get(normalized)}" and "${api.id}" both use ${api.url}`,
			});
		} else {
			urlToId.set(normalized, api.id);
		}
	}

	return duplicates;
}

/**
 * Detecta IDs de endpoint duplicados dentro de cada API.
 *
 * @param {SourceFile} source Archivo a revisar.
 * @returns {Duplicate[]} Duplicados encontrados (vacío si no hay).
 */
function findDuplicateEndpointIds(source) {
	/** @type {Duplicate[]} */
	const duplicates = [];

	for (const api of source.apis) {
		if (!Array.isArray(api.endpoints)) continue;

		/** @type {Set<string>} */
		const epIds = new Set();
		for (const ep of api.endpoints) {
			if (epIds.has(ep.id)) {
				duplicates.push({
					type: 'endpoint-id',
					message: `❌ [${source.file}] Duplicate endpoint ID "${ep.id}" in API "${api.id}"`,
				});
			} else {
				epIds.add(ep.id);
			}
		}
	}

	return duplicates;
}

/**
 * Compara dos archivos entre sí y reporta colisiones cruzadas:
 * IDs de API compartidos y URLs principales similares.
 *
 * Solo tiene sentido cuando se escanean ambos archivos a la vez.
 *
 * @param {SourceFile} database Fuente `apis-database.json`.
 * @param {SourceFile} watchlist Fuente `watchlist.json`.
 * @returns {Duplicate[]} Colisiones cruzadas encontradas (vacío si no hay).
 */
function findCrossSourceDuplicates(database, watchlist) {
	/** @type {Duplicate[]} */
	const duplicates = [];

	/** @type {Map<string, string>} */
	const dbUrls = new Map();
	for (const api of database.apis) {
		const normalized = normalizeUrl(api.url);
		if (normalized) dbUrls.set(normalized, api.id);
	}

	for (const api of watchlist.apis) {
		if (dbUrls.has(api.id)) {
			duplicates.push({
				type: 'id',
				message: `❌ [cross] API ID "${api.id}" exists in both ${database.file} and ${watchlist.file}`,
			});
		}

		const normalized = normalizeUrl(api.url);
		if (normalized && dbUrls.has(normalized)) {
			duplicates.push({
				type: 'url',
				message: `⚠️  [cross] Similar URLs: "${api.id}" (${watchlist.file}) and "${dbUrls.get(normalized)}" (${database.file}) both use ${api.url}`,
			});
		}
	}

	return duplicates;
}

/**
 * Ejecuta todas las verificaciones sobre las fuentes seleccionadas
 * e imprime los resultados por consola.
 *
 * @param {ScanMode} mode Qué archivos revisar.
 * @param {boolean} verbose Si se imprime resumen con totales.
 * @returns {boolean} `true` si se encontró al menos un duplicado.
 */
function run(mode, verbose) {
	const sources = [];

	if (mode === 'all' || mode === 'database') sources.push(loadSource(DATABASE_PATH));
	if (mode === 'all' || mode === 'watchlist') sources.push(loadSource(WATCHLIST_PATH));

	/** @type {Duplicate[]} */
	const allDuplicates = [];

	for (const source of sources) {
		allDuplicates.push(...findDuplicateIds(source));
		allDuplicates.push(...findDuplicateUrls(source));
		allDuplicates.push(...findDuplicateEndpointIds(source));
	}

	if (sources.length === 2) {
		allDuplicates.push(...findCrossSourceDuplicates(sources[0], sources[1]));
	}

	for (const dup of allDuplicates) {
		console.log(dup.message);
	}

	if (allDuplicates.length === 0) {
		console.log(`✅ No duplicates found (${sources.map((s) => s.file).join(' + ')}).`);
	}

	if (verbose) {
		console.log('\n📊 Summary:');
		let totalEndpoints = 0;
		for (const source of sources) {
			const eps = source.apis.reduce((sum, api) => sum + (Array.isArray(api.endpoints) ? api.endpoints.length : 0), 0);
			totalEndpoints += eps;
			console.log(`   ${source.file}: ${source.apis.length} APIs, ${eps} endpoints`);
		}
		console.log(`   Total: ${totalEndpoints} endpoints`);
	}

	return allDuplicates.length > 0;
}

// --- Entry point ---

const { mode, verbose } = parseArgs(process.argv.slice(2));
const found = run(mode, verbose);

process.exit(found ? 1 : 0);
