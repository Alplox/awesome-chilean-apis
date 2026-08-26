import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ALLOWED_STATUSES,
  ALLOWED_METHODS,
  ALLOWED_AUTH,
  ALLOWED_FORMATS,
  ALLOWED_RESPONSE_FORMATS,
  ALLOWED_PRICING,
} from '../../lib/api-utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

/** Categorías válidas para el campo `category` (deben existir en categories.json). */
const CATEGORY_KEYS = [
  'government', 'finance', 'transport', 'weather', 'environment',
  'education', 'health', 'maps', 'business', 'utilities',
  'notifications', 'community',
];

/** Contadores globales de problemas detectados en toda la ejecución. */
let errors = 0;
let warnings = 0;

/**
 * Registra un error (invalida el exit code).
 *
 * @param {string} path Ruta del campo dentro del JSON (ej. `apis[3].url`).
 * @param {string} msg Descripción del problema.
 */
function error(path, msg) {
  console.error(`  ❌ ${path}: ${msg}`);
  errors++;
}

/**
 * Registra una advertencia (no invalida el exit code).
 *
 * @param {string} path Ruta del campo dentro del JSON.
 * @param {string} msg Descripción del problema.
 */
function warn(path, msg) {
  console.warn(`  ⚠️  ${path}: ${msg}`);
  warnings++;
}

/**
 * Valida que un ID sea un string no vacío en kebab-case.
 *
 * @param {unknown} id Valor a validar.
 * @param {string} path Ruta del campo dentro del JSON.
 * @returns {boolean} `true` si el ID es válido.
 */
function validateId(id, path) {
  if (!id || typeof id !== 'string') {
    error(path, 'ID must be a non-empty string');
    return false;
  }
  if (!/^[a-z0-9-]+$/.test(id)) {
    error(path, 'ID must only contain lowercase letters, numbers, and hyphens');
    return false;
  }
  return true;
}

/**
 * Valida que un valor sea una URL http/https bien formada.
 *
 * @param {unknown} url Valor a validar.
 * @param {string} path Ruta del campo dentro del JSON.
 * @returns {boolean} `true` si la URL es válida.
 */
function validateUrl(url, path) {
  if (!url || typeof url !== 'string') {
    error(path, 'URL must be a non-empty string');
    return false;
  }
  try {
    const u = new URL(url);
    if (!['http:', 'https:'].includes(u.protocol)) {
      error(path, 'URL must use http or https protocol');
      return false;
    }
    return true;
  } catch {
    error(path, `Invalid URL: ${url}`);
    return false;
  }
}

/**
 * Valida un endpoint de la base de datos (estructura completa con status).
 *
 * @param {any} ep Objeto endpoint a validar.
 * @param {string} epPath Ruta del endpoint dentro del JSON.
 */
function validateEndpoint(ep, epPath) {
  if (!ep || typeof ep !== 'object') {
    error(epPath, 'Must be an object');
    return;
  }

  if (!validateId(ep.id, `${epPath}.id`)) return;

  if (!ep.name || typeof ep.name !== 'string') {
    error(`${epPath}.name`, 'Must be a non-empty string');
  }

  validateUrl(ep.url, `${epPath}.url`);

  if (!ALLOWED_METHODS.includes(ep.method)) {
    warn(`${epPath}.method`, `Unknown method "${ep.method}"`);
  }

  if (!ALLOWED_AUTH.includes(ep.auth)) {
    warn(`${epPath}.auth`, `Unknown auth type "${ep.auth}"`);
  }

  if (!ALLOWED_FORMATS.includes(ep.format)) {
    warn(`${epPath}.format`, `Unknown format "${ep.format}"`);
  }

  if (!ALLOWED_STATUSES.includes(ep.status)) {
    error(`${epPath}.status`, `Invalid status "${ep.status}"`);
  }

  if (ep.last_status_code !== undefined && ep.last_status_code !== null && typeof ep.last_status_code !== 'number') {
    error(`${epPath}.last_status_code`, 'Must be a number or null');
  }

  if (ep.last_response_format !== undefined && ep.last_response_format !== null) {
    if (!ALLOWED_RESPONSE_FORMATS.includes(ep.last_response_format)) {
      error(`${epPath}.last_response_format`, `Invalid response format "${ep.last_response_format}"`);
    }
  }

  if (ep.verified !== undefined) {
    warn(`${epPath}.verified`, 'Field "verified" is deprecated. Use last_status_code + last_response_format instead');
  }
}

/**
 * Valida los campos comunes de una API (usado por base de datos y watchlist).
 *
 * @param {any} api Objeto API a validar.
 * @param {string} apiPath Ruta de la API dentro del JSON.
 * @returns {boolean} `false` solo si el objeto es inválido como para seguir validando endpoints.
 */
function validateApiCommon(api, apiPath) {
  if (!api || typeof api !== 'object') {
    error(apiPath, 'Must be an object');
    return false;
  }

  if (!validateId(api.id, `${apiPath}.id`)) return false;

  if (!api.name || typeof api.name !== 'string') {
    error(`${apiPath}.name`, 'Must be a non-empty string');
  }

  validateUrl(api.url, `${apiPath}.url`);

  if (!CATEGORY_KEYS.includes(api.category)) {
    warn(`${apiPath}.category`, `Unknown category "${api.category}"`);
  }

  if (!api.description || typeof api.description !== 'string') {
    error(`${apiPath}.description`, 'Must be a non-empty string');
  }

  return true;
}

/**
 * Valida la estructura completa de `apis-database.json`:
 * metadatos globales, APIs y sus endpoints.
 */
function validateDatabase() {
  console.log('\n📦 Validating apis-database.json...\n');

  /** @type {any} */
  let data;
  try {
    data = JSON.parse(readFileSync(join(ROOT, 'apis-database.json'), 'utf-8'));
  } catch (e) {
    error('apis-database.json', `Cannot parse: ${/** @type {Error} */(e).message}`);
    return;
  }

  if (!data.last_updated || typeof data.last_updated !== 'string') {
    error('last_updated', 'Must be a non-empty ISO date string');
  }

  if (typeof data.total_endpoints !== 'number' || data.total_endpoints < 0) {
    error('total_endpoints', 'Must be a non-negative number');
  }

  if (!Array.isArray(data.apis)) {
    error('apis', 'Must be an array');
    return;
  }

  const ids = new Set();

  for (let i = 0; i < data.apis.length; i++) {
    const api = data.apis[i];
    const apiPath = `apis[${i}]`;

    if (!validateApiCommon(api, apiPath)) continue;

    if (ids.has(api.id)) error(`${apiPath}.id`, `Duplicate ID: ${api.id}`);
    ids.add(api.id);

    if (api.pricing !== undefined && !ALLOWED_PRICING.includes(api.pricing)) {
      warn(`${apiPath}.pricing`, `Unknown pricing type "${api.pricing}". Allowed: ${ALLOWED_PRICING.join(', ')}`);
    }

    if (api.pricing_url !== undefined) {
      validateUrl(api.pricing_url, `${apiPath}.pricing_url`);
    }

    if (!Array.isArray(api.endpoints)) {
      error(`${apiPath}.endpoints`, 'Must be an array');
      continue;
    }

    const epIds = new Set();

    for (let j = 0; j < api.endpoints.length; j++) {
      const ep = api.endpoints[j];
      const epPath = `${apiPath}.endpoints[${j}]`;

      if (ep && typeof ep === 'object' && typeof ep.id === 'string' && epIds.has(ep.id)) {
        error(`${epPath}.id`, `Duplicate endpoint ID within same API: ${ep.id}`);
      } else if (typeof ep?.id === 'string') {
        epIds.add(ep.id);
      }

      validateEndpoint(ep, epPath);
    }
  }
}

/**
 * Valida `watchlist.json`: mismo esquema base que la base de datos pero
 * más permisivo (sin endpoints verificados, sin pricing ni status obligatorios,
 * y con campo `reason` requerido).
 */
function validateWatchlist() {
  console.log('\n📦 Validating watchlist.json...\n');

  /** @type {any} */
  let data;
  try {
    data = JSON.parse(readFileSync(join(ROOT, 'watchlist.json'), 'utf-8'));
  } catch (e) {
    error('watchlist.json', `Cannot parse: ${/** @type {Error} */(e).message}`);
    return;
  }

  const apis = Array.isArray(data) ? data : data.apis;
  if (!Array.isArray(apis)) {
    error('watchlist', 'Must be an array (or an object with an "apis" array)');
    return;
  }

  const ids = new Set();

  for (let i = 0; i < apis.length; i++) {
    const api = apis[i];
    const apiPath = `watchlist[${i}]`;

    if (!validateApiCommon(api, apiPath)) continue;

    if (ids.has(api.id)) error(`${apiPath}.id`, `Duplicate ID: ${api.id}`);
    ids.add(api.id);

    if (!api.reason || typeof api.reason !== 'string') {
      error(`${apiPath}.reason`, 'Watchlist entries must explain why they are not verified yet');
    }

    if (api.endpoints === undefined) continue;
    if (!Array.isArray(api.endpoints)) {
      error(`${apiPath}.endpoints`, 'Must be an array');
      continue;
    }

    for (let j = 0; j < api.endpoints.length; j++) {
      validateEndpoint(api.endpoints[j], `${apiPath}.endpoints[${j}]`);
    }
  }
}

/**
 * Valida la estructura mínima de `categories.json`
 * (label, slugs y order por categoría).
 */
function validateCategories() {
  console.log('📦 Validating categories.json...\n');
  let data;
  try {
    data = JSON.parse(readFileSync(join(ROOT, 'categories.json'), 'utf-8'));
  } catch (e) {
    error('categories.json', `Cannot parse: ${/** @type {Error} */(e).message}`);
    return;
  }

  for (const [key, cat] of Object.entries(data)) {
    if (!cat.label) error(`categories.${key}.label`, 'Missing label');
    if (!Array.isArray(cat.slugs)) error(`categories.${key}.slugs`, 'Must be an array');
    if (typeof cat.order !== 'number') error(`categories.${key}.order`, 'Must be a number');
  }
}

/** Verifica que `regions.json` sea JSON parseable. */
function validateRegions() {
  console.log('📦 Validating regions.json...\n');
  try {
    JSON.parse(readFileSync(join(ROOT, 'regions.json'), 'utf-8'));
  } catch (e) {
    error('regions.json', `Cannot parse: ${/** @type {Error} */(e).message}`);
  }
}

// --- Entry point ---

validateDatabase();
validateWatchlist();
validateCategories();
validateRegions();

console.log(`\n${errors > 0 ? `❌ ${errors} errors` : '✅ No errors'}${warnings > 0 ? `, ${warnings} warnings` : ''}\n`);
process.exit(errors > 0 ? 1 : 0);
