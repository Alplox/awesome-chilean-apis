import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ALLOWED_STATUSES,
  ALLOWED_METHODS,
  ALLOWED_AUTH,
  ALLOWED_FORMATS,
  ALLOWED_PRICING,
} from '../../lib/api-utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

/**
 * Lee y parsea un archivo JSON relativo a la raíz del proyecto.
 *
 * @param {string} path Ruta relativa (ej. `'apis-database.json'`).
 * @returns {any} Contenido parseado.
 */
function readJson(path) {
  return JSON.parse(readFileSync(join(ROOT, path), 'utf-8'));
}

/**
 * Escribe un archivo de texto relativo a la raíz del proyecto.
 *
 * @param {string} path Ruta relativa.
 * @param {string} content Contenido completo del archivo.
 */
function writeFile(path, content) {
  writeFileSync(join(ROOT, path), content, 'utf-8');
}

/**
 * Formatea una lista de valores permitidos como código inline.
 *
 * @param {string[]} values Valores permitidos de un campo.
 * @returns {string} Lista tipo `` `GET`, `POST`, ... ``.
 */
function formatAllowed(values) {
  return values.map((v) => `\`${v}\``).join(', ');
}

/**
 * Calcula estadísticas agregadas del directorio para el snapshot.
 *
 * @param {{ apis: any[] }} database Base de datos completa.
 * @returns {{ totalApis: number, totalEndpoints: number, activeEndpoints: number, brokenEndpoints: number, offlineEndpoints: number, byCategory: Map<string, { apis: number, endpoints: number, active: number }> }}
 *   Totales globales y desglose por categoría.
 */
function computeStats(database) {
  /** @type {Map<string, { apis: number, endpoints: number, active: number }>} */
  const byCategory = new Map();
  let activeEndpoints = 0;
  let brokenEndpoints = 0;
  let offlineEndpoints = 0;

  for (const api of database.apis) {
    const entry = byCategory.get(api.category) || { apis: 0, endpoints: 0, active: 0 };
    entry.apis++;
    for (const ep of api.endpoints) {
      entry.endpoints++;
      if (ep.status === 'active') {
        entry.active++;
        activeEndpoints++;
      } else if (ep.status === 'broken') {
        brokenEndpoints++;
      } else if (ep.status === 'offline') {
        offlineEndpoints++;
      }
    }
    byCategory.set(api.category, entry);
  }

  return {
    totalApis: database.apis.length,
    totalEndpoints: database.apis.reduce((s, a) => s + a.endpoints.length, 0),
    activeEndpoints,
    brokenEndpoints,
    offlineEndpoints,
    byCategory,
  };
}

/** Descripción semántica de cada estado posible de un endpoint. */
const STATUS_DESCRIPTIONS = {
  active: 'Responde correctamente (2xx; también 401/403/redirect: el servicio existe y exige credenciales o redirige)',
  stale: 'Sin verificación hace más de 90 días (STALE_THRESHOLD_DAYS)',
  broken: 'Responde con error (404/410/5xx)',
  offline: 'Host inaccesible: DNS no resuelve o conexión rechazada',
  endpoint_empty: 'Responde 2xx pero sin contenido',
};

/**
 * Regenera AGENTS.md con la estructura actual del repositorio,
 * el flujo de datos, los scripts disponibles, el formato de entrada
 * (base de datos y watchlist), valores permitidos, significado de estados,
 * categorías inline y snapshot de estadísticas.
 *
 * @param {string} tree Árbol de directorios pre-renderizado (ver {@link buildTree}).
 * @param {{ apis: any[] }} database Base de datos completa.
 * @param {Record<string, { label: string, description: string, order: number }>} categories Categorías definidas.
 */
function updateAgentsMd(tree, database, categories) {
  const stats = computeStats(database);

  const categoriesOrdered = Object.entries(categories).sort((a, b) => a[1].order - b[1].order);

  const lines = [
    '# AGENTS.md — awesome-chilean-apis',
    '',
    '> **Auto-evolutivo**: Este archivo se actualiza automáticamente al ejecutar `npm run generate`. Si agregas/quitas archivos o cambias la estructura, vuelve a generar.',
    '',
    '## 📋 Descripción del proyecto',
    '',
    'Directorio curado de APIs chilenas públicas y privadas, con endpoints verificados, health checks automáticos y documentación centralizada.',
    '',
    `**Snapshot actual:** ${stats.totalApis} APIs · ${stats.totalEndpoints} endpoints · ${stats.activeEndpoints} activos ✅ · ${stats.brokenEndpoints} rotos ❌ · ${stats.offlineEndpoints} offline 📡`,
    '',
    '## 📁 Estructura del repositorio',
    '',
    '```',
    tree,
    '```',
    '',
    '## 🔄 Flujo de datos',
    '',
    '```',
    'humano/PR edita apis-database.json o watchlist.json',
    '        │',
    '        ▼',
    'npm run validate:json ──► valida estructura de todos los JSON',
    '        │',
    '        ▼',
    'npm run validate ───────► health checks HTTP; actualiza status/last_checked en la DB',
    '        │',
    '        ▼',
    'npm run generate ───────► regenera README.md y este archivo (AGENTS.md)',
    '```',
    '',
    '- El CI (`.github/workflows/validate.yml`) ejecuta `validate:json` + `generate` y falla si hay cambios sin regenerar.',
    '- Los estados de endpoints solo los escribe `scripts/core/validate_apis.js`; no editarlos a mano.',
    '',
    '## 🚀 Scripts disponibles',
    '',
    '| Comando | Descripción |',
    '|---------|-------------|',
    '| `npm run generate` | Regenera README.md desde `apis-database.json` + `categories.json` |',
    '| `npm run validate` | Health checks de los endpoints; con `--update` persiste resultados en la DB |',
    '| `npm run validate:json` | Valida estructura de database + watchlist + categorías + regiones. Exit 1 si hay errores |',
    '| `npm run find:duplicates` | Detecta IDs/URLs duplicados en database y watchlist (y cruces entre ambos). Exit 1 si encuentra |',
    '| `npm run lint` | ESLint |',
    '| `npm run ci` | `validate:json` + `generate` + `git diff --exit-code README.md` |',
    '',
    '### Flags de `npm run validate`',
    '',
    '```',
    '--id=<id>         valida una sola API por su ID',
    '--url=<u>         valida una URL suelta (no toca la base de datos)',
    '--status=<s>      filtra por estado del endpoint (active, broken, ...)',
    '--limit=<n>       valida solo las primeras N APIs',
    '--missing-date    solo endpoints sin last_known_item_date',
    '--update          escribe los resultados en apis-database.json',
    '```',
    '',
    '## 📝 Cómo agregar una API (base de datos)',
    '',
    '1. Agrega la entrada en `apis-database.json` dentro del array `"apis"`',
    '2. Ejecuta `npm run validate:json` para verificar la estructura',
    '3. Ejecuta `npm run generate` para regenerar README',
    '',
    'Usa esta vía cuando la API tenga **al menos un endpoint verificado** (que responda o exija credenciales).',
    'Si no hay endpoints comprobables, usa el watchlist (ver sección siguiente).',
    '',
    '### Formato de entrada en apis-database.json',
    '',
    '```json',
    JSON.stringify({
      id: 'nombre-api',
      name: 'Nombre Oficial',
      url: 'https://sitio.oficial.cl',
      openapi: 'https://ejemplo.cl/api/openapi.yaml',
      category: 'government',
      pricing: 'free',
      pricing_url: 'https://ejemplo.cl/pricing',
      description: 'Descripción objetiva de la API',
      endpoints: [
        {
          id: 'nombre-api-endpoint',
          name: 'Nombre del Endpoint',
          url: 'https://api.ejemplo.cl/v1/recurso',
          method: 'GET',
          auth: 'none',
          format: 'JSON',
          description: 'Descripción del endpoint',
          status: 'active',
        },
      ],
    }, null, 2),
    '```',
    '',
    '**Valores permitidos por campo:**',
    '',
    '| Campo | Valores válidos |',
    '|-------|-----------------|',
    `| \`method\` | ${formatAllowed(ALLOWED_METHODS)} |`,
    `| \`auth\` | ${formatAllowed(ALLOWED_AUTH)} |`,
    `| \`format\` | ${formatAllowed(ALLOWED_FORMATS)} |`,
    `| \`pricing\` | ${formatAllowed(ALLOWED_PRICING)} |`,
    `| \`status\` | ${formatAllowed(ALLOWED_STATUSES)} |`,
    '',
    '**Significado de cada estado (`status`):**',
    '',
    '| Estado | Significado |',
    '|--------|-------------|',
    ...Object.entries(STATUS_DESCRIPTIONS).map(([k, v]) => `| \`${k}\` | ${v} |`),
    '',
    '> Los IDs (`id` de API y de endpoint) deben ser únicos y en kebab-case.',
    '',
    '## 🗂️ Cómo proponer una API (watchlist)',
    '',
    'Usa `watchlist.json` cuando la API/sitio **no tiene un endpoint público verificado**:',
    'documentación que exige registro, acceso por correo, endpoints caídos, etc.',
    '',
    '### Formato de entrada en watchlist.json',
    '',
    '```json',
    JSON.stringify({
      id: 'nombre-candidato',
      name: 'Nombre Oficial',
      url: 'https://sitio.oficial.cl/documentacion',
      category: 'government',
      description: 'Qué datos ofrecería la API',
      reason: 'Por qué aún no está en la base de datos (sin endpoint verificado, caído, etc.)',
      endpoints: [],
    }, null, 2),
    '```',
    '',
    '- El campo `reason` es **obligatorio** y debe explicar qué falta para promocionarla.',
    '- Cuando exista un endpoint verificado, mueve la entrada a `apis-database.json` y elimínala del watchlist.',
    '- `npm run find:duplicates` detecta entradas presentes en ambos archivos a la vez.',
    '',
    '## 🏷️ Categorías disponibles',
    '',
    '| Categoría | Clave (`category`) | APIs |',
    '|-----------|--------------------|------|',
    ...categoriesOrdered.map(([key, cat]) => {
      const count = stats.byCategory.get(key)?.apis || 0;
      return `| ${cat.label} | \`${key}\` | ${count} |`;
    }),
    '',
    '## 🌐 Regiones disponibles',
    '',
    '`regions.json` contiene el mapa de regiones de Chile (datos de referencia para futuras funciones de filtrado geográfico; actualmente ningún script lo consume).',
    '',
  ];
  writeFile('AGENTS.md', lines.join('\n'));
}

/**
 * Construye recursivamente el árbol de directorios del repo
 * en formato ASCII (estilo `tree`), excluyendo artefactos locales.
 *
 * @param {string} dir Directorio a recorrer.
 * @param {string} [prefix=''] Prefijo de indentación para llamadas recursivas.
 * @returns {string} Árbol renderizado como texto multilínea.
 */
function buildTree(dir, prefix = '') {
  const entries = readdirSync(dir, { withFileTypes: true }).sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;
    return a.name.localeCompare(b.name);
  });

  let result = '';
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const isLast = i === entries.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const fullPath = join(dir, entry.name);

    const HIDDEN_ENTRIES = ['node_modules', 'package-lock.json', '.git', '.gitattributes', '.gitignore', '.markdownlint.jsonc'];
    if (HIDDEN_ENTRIES.some((h) => entry.name === h || entry.name.startsWith(h))) {
      continue;
    }

    const description = getDescription(entry.name);

    result += prefix + connector + entry.name + description + '\n';

    if (entry.isDirectory()) {
      const extPrefix = prefix + (isLast ? '    ' : '│   ');
      result += buildTree(fullPath, extPrefix);
    }
  }
  return result;
}

/**
 * Devuelve la anotación descriptiva de un archivo conocido,
 * o string vacío para archivos sin descripción.
 *
 * @param {string} name Nombre del archivo o directorio.
 * @returns {string} Descripción con prefijo `'  ← ...'`, o vacío.
 */
function getDescription(name) {
  const descs = {
    'apis-database.json': '  ← Base de datos central de APIs (NO EDITABLE MANUALMENTE)',
    'watchlist.json': '  ← APIs candidatas sin endpoints verificados',
    'categories.json': '  ← Definición de categorías con slugs',
    'regions.json': '  ← Regiones de Chile',
    'cities.json': '  ← Ciudades por región',
    'AGENTS.md': '  ← Este archivo (auto-generado)',
    'README.md': '  ← Generado por scripts/core/generate.js',
    'CONTRIBUTING.md': '  ← Guía de contribución',
    'CODE_OF_CONDUCT.md': '  ← Código de conducta',
    'generate.js': '  ← Genera README.md y actualiza AGENTS.md',
    'validate_apis.js': '  ← Health checks de endpoints',
    'validate-json.js': '  ← Valida estructura JSON (CI)',
    'find-duplicates.js': '  ← Detecta IDs/URLs duplicados',
    'package.json': '  ← Dependencias y scripts',
    'eslint.config.js': '  ← Configuración ESLint',
    'validate.yml': '  ← CI: valida JSON + health checks',
    'scripts-readme.md': '  ← Documentación de los scripts',
    'api-validator.js': '  ← Validación de endpoints REST',
    'network-utils.js': '  ← Utilidades de red',
    'cli-args.js': '  ← Parseo de args CLI',
    'rate-limiter.js': '  ← Control de concurrencia',
    'api-utils.js': '  ← Utilidades compartidas',
    'prompter.js': '  ← Prompts interactivos',
  };

  return descs[name] || '';
}

/**
 * Renderiza el README.md completo a partir de la base de datos:
 * índice por categoría, tarjetas por API con badges y listado de endpoints.
 *
 * @param {{ apis: any[], total_endpoints?: number, last_updated?: string }} database Base de datos completa.
 * @param {Record<string, { label: string, description: string, order: number }>} categories Mapa de categorías definidas.
 * @returns {void} Escribe `README.md` en disco e imprime un resumen por consola.
 */
function generateReadme(database, categories) {
  database.total_endpoints = database.apis.reduce((s, a) => s + a.endpoints.length, 0);
  const { apis, total_endpoints, last_updated } = database;

  /** @type {[string, { label: string, description: string, order: number }][]} */
  const categoriesOrdered = Object.entries(categories).sort((a, b) => a[1].order - b[1].order);

  /** @type {Record<string, any[]>} */
  const apisByCategory = {};
  for (const api of apis) {
    if (!apisByCategory[api.category]) apisByCategory[api.category] = [];
    apisByCategory[api.category].push(api);
  }

  const lines = [];

  lines.push('<a id="top"></a>');
  lines.push('# 🇨🇱 Awesome Chilean APIs');
  lines.push('');
  lines.push(`[![Awesome](https://awesome.re/badge.svg)](https://github.com/alplox/awesome-chilean-apis)`);
  lines.push(`![APIs](https://img.shields.io/badge/apis-${apis.length}-brightgreen)`);
  lines.push(`![Endpoints](https://img.shields.io/badge/endpoints-${total_endpoints}-blue)`);
  lines.push('');
  lines.push(`> Directorio curado de APIs chilenas públicas y privadas con endpoints verificados. **${apis.length} APIs** y **${total_endpoints} endpoints**, organizados por categoría y mantenidos activamente.`);
  lines.push('');
  lines.push('## 📑 Índice');
  lines.push('');

  for (const [key, cat] of categoriesOrdered) {
    const apiList = apisByCategory[key] || [];
    if (apiList.length === 0) continue;
    lines.push(`- [${cat.label}](#cat-${key}) — ${apiList.length} ${apiList.length === 1 ? 'API' : 'APIs'}`);
  }
  lines.push('');

  lines.push(`> Última actualización: ${new Date(last_updated).toLocaleDateString('es-CL', { timeZone: 'America/Santiago', year: 'numeric', month: 'long', day: 'numeric' })}`);
  lines.push('');

  for (const [key, cat] of categoriesOrdered) {
    const apiList = apisByCategory[key] || [];
    if (apiList.length === 0) continue;

    lines.push(`<a id="cat-${key}"></a>`);
    lines.push('');
    lines.push(`### ${cat.label} (${apiList.length} ${apiList.length === 1 ? 'API' : 'APIs'})`);
    lines.push('');
    lines.push(`**${cat.description}**`);
    lines.push('');

    for (const api of apiList) {
      const apiActiveEndpoints = api.endpoints.filter((e) => e.status === 'active').length;
      const badges = [];

      if (apiActiveEndpoints > 0) {
        badges.push(`![Active](${`https://img.shields.io/badge/${apiActiveEndpoints}_endpoints-active-brightgreen`})`);
      }

      if (api.pricing && api.pricing !== 'free') {
        const pricingColors = { paid: 'red', freemium: 'orange' };
        const color = pricingColors[api.pricing] || 'lightgrey';
        const pricingBadge = `![${api.pricing}](${`https://img.shields.io/badge/${api.pricing}-${color}`})`;
        if (api.pricing_url) {
          badges.push(`[${pricingBadge}](${api.pricing_url})`);
        } else {
          badges.push(pricingBadge);
        }
      }

      lines.push(`- **${api.name}** ${badges.join(' ')}`);
      lines.push(`  - 🌐 [${api.url}](${api.url})`);
      if (api.openapi) {
        lines.push(`  - 📜 [OpenAPI Spec](${api.openapi})`);
      }
      lines.push(`  - 📝 ${api.description}`);

      if (api.endpoints.length > 0) {
        lines.push('  - **Endpoints:**');
        for (const ep of api.endpoints) {
          const statusIcon = ep.status === 'active' ? '✅' : ep.status === 'stale' ? '⚠️' : '❌';
          const authTag = ep.auth && ep.auth !== 'none' ? ' 🔑' : '';
          const codeTag = ep.last_status_code !== null && ep.last_status_code !== undefined ? ` \`${ep.last_status_code}\`` : '';
          const formatTag = ep.last_response_format && ep.last_response_format !== 'null' ? ` \`${ep.last_response_format}\`` : '';
          const epDesc = ep.description ? ` — ${ep.description}` : '';
          lines.push(`    - ${statusIcon}${authTag}${codeTag}${formatTag} \`${ep.method}\` [\`${ep.url}\`](${ep.url})${epDesc}`);
        }
      }
      lines.push('');
    }
    lines.push('  [⬆ Volver al índice](#top)');
    lines.push('');
  }
  lines.push('---');
  lines.push('');
  lines.push('## 🤝 Contribuir');
  lines.push('');
  lines.push('Ver [CONTRIBUTING.md](CONTRIBUTING.md) para instrucciones detalladas.');
  lines.push('');
  lines.push('## 📜 Licencia');
  lines.push('');
  lines.push('CC0-1.0 — Ver [LICENSE](LICENSE).');

  writeFile('README.md', lines.join('\n') + '\n');
  console.log(`✅ README.md generado: ${apis.length} APIs, ${total_endpoints} endpoints`);
}

/** Punto de entrada: regenera README.md y AGENTS.md. */
function main() {
  const database = readJson('apis-database.json');
  const categories = readJson('categories.json');
  readJson('regions.json'); // Validado por validate-json.js; se lee aquí para fallar temprano si falta.

  generateReadme(database, categories);
  updateAgentsMd('/\n' + buildTree(ROOT), database, categories);

  console.log('✅ AGENTS.md actualizado con estructura del proyecto');
}

main();
