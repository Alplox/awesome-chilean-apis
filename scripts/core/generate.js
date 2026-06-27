import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

function readJson(path) {
  return JSON.parse(readFileSync(join(ROOT, path), 'utf-8'));
}

function writeFile(path, content) {
  writeFileSync(join(ROOT, path), content, 'utf-8');
}

function updateAgentsMd(tree) {
  const lines = [
    '# AGENTS.md — awesome-chilean-apis',
    '',
    '> **Auto-evolutivo**: Este archivo se actualiza automáticamente al ejecutar `npm run generate`. Si agregas/quitas archivos o cambias la estructura, vuelve a generar.',
    '',
    '## 📋 Descripción del proyecto',
    '',
    'Directorio curado de APIs chilenas públicas y privadas, con endpoints verificados, health checks automáticos y documentación centralizada.',
    '',
    '## 📁 Estructura del repositorio',
    '',
    '```',
    tree,
    '```',
    '',
    '## 🚀 Scripts disponibles',
    '',
    '| Comando | Descripción |',
    '|---------|-------------|',
    '| `npm run generate` | Regenera README.md desde `apis-database.json` + `categories.json` |',
    '| `npm run validate` | Health checks de todos los endpoints |',
    '| `npm run validate:json` | Valida estructura de JSONs |',
    '| `npm run lint` | ESLint |',
    '',
    '## 📝 Cómo agregar una API',
    '',
    '1. Agrega la entrada en `apis-database.json` dentro del array `"apis"`',
    '2. Ejecuta `npm run generate` para regenerar README',
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
    '## 🔄 Auto-evolución',
    '',
    '- Al ejecutar `npm run generate`, se actualiza AGENTS.md reflejando la estructura real del proyecto',
    '- Los scripts de validación mantienen `apis-database.json` actualizado con estados de endpoints',
    '- AGENTS.md se regenera con la lista actual de directorios y archivos del proyecto',
    '',
    '## 🏷️ Categorías disponibles',
    '',
    'Ver `categories.json` para la lista completa de categorías con sus slugs.',
    '',
    '## 🌐 Regiones disponibles',
    '',
    'Ver `regions.json` para el mapa de regiones de Chile.',
    '',
  ];
  writeFile('AGENTS.md', lines.join('\n'));
}

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

    if (entry.name.startsWith('node_modules') || entry.name === 'package-lock.json' || entry.name === '.git') {
      continue;
    }

    const description = getDescription(entry.name, fullPath);

    result += prefix + connector + entry.name + description + '\n';

    if (entry.isDirectory()) {
      const extPrefix = prefix + (isLast ? '    ' : '│   ');
      result += buildTree(fullPath, extPrefix);
    }
  }
  return result;
}

function getDescription(name, fullPath) {
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
    'package.json': '  ← Dependencias y scripts',
    'eslint.config.js': '  ← Configuración ESLint',
    'validate.yml': '  ← CI: valida JSON + health checks',
    'find-duplicates.js': '',
    'add-site-endpoints.js': '',
    'api-validator.js': '  ← Validación de endpoints REST',
    'network-utils.js': '  ← Utilidades de red',
    'cli-args.js': '  ← Parseo de args CLI',
    'rate-limiter.js': '  ← Control de concurrencia',
    'api-utils.js': '  ← Utilidades compartidas',
    'prompter.js': '  ← Prompts interactivos',
  };

  if (descs[name]) return descs[name];

  if (name.endsWith('.js') && !fullPath.includes('node_modules')) return '';
  if (name.endsWith('.json') && !fullPath.includes('node_modules')) return '';

  return '';
}

function generateReadme(database, categories, _regions) {
  database.total_endpoints = database.apis.reduce((s, a) => s + a.endpoints.length, 0);
  const { apis, total_endpoints, last_updated } = database;

  const categoriesOrdered = Object.entries(categories).sort((a, b) => a[1].order - b[1].order);

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
          const authTag = ep.auth === 'api-key' ? ' 🔑' : '';
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

function main() {
  const database = readJson('apis-database.json');
  const categories = readJson('categories.json');
  const regions = readJson('regions.json');

  generateReadme(database, categories, regions);

const tree = buildTree(ROOT);
  updateAgentsMd(`/\n${tree.replace(`${ROOT}\\`, '').replace(`${ROOT}/`, '')}`);

  const relativeTree = buildTree(ROOT).split('\n').map((line) => {
    return line;
  }).join('\n');

  const cleanTree = '\\\n' + relativeTree
    .split('\n')
    .filter((l) => !l.includes('node_modules') && !l.includes('package-lock.json') && !l.includes('.git'))
    .join('\n');

  updateAgentsMd('/' + cleanTree);

  console.log('✅ AGENTS.md actualizado con estructura del proyecto');
}

main();
