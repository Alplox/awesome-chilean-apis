import { checkEndpoint } from '../../lib/api-validator.js';
import { readJson, writeJson, recalculateTotalEndpoints, formatError } from '../../lib/api-utils.js';
import { globalRateLimiter } from '../../lib/rate-limiter.js';
import { parseArgs } from '../../lib/cli-args.js';
import { clearSiteCache } from '../../lib/network-utils.js';

const DATABASE_PATH = 'apis-database.json';

/** Imprime el banner inicial del validador. */
function printBanner() {
  console.log('\n========================================');
  console.log('  🔍 awesome-chilean-apis — Validator');
  console.log('========================================\n');
}

/**
 * Valida una URL suelta (modo `--url`) sin tocar la base de datos.
 *
 * @param {string} url URL a verificar.
 */
async function validateSingleUrl(url) {
  printBanner();
  console.log(`Validating single URL: ${url}\n`);
  const startTime = Date.now();
  const result = await checkEndpoint(url);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const icon = result.status === 'active' ? '✅' : result.status === 'stale' ? '⚠️' : '❌';
  const codeStr = result.last_status_code ? ` ${result.last_status_code}` : '';
  const fmtStr = result.last_response_format ? ` ${result.last_response_format}` : '';
  const errStr = result.error ? ` — ${result.error}` : '';
  console.log(`  ${icon}  ${url} →${codeStr}${fmtStr} (${elapsed}s)${errStr}`);
}

/**
 * Ejecuta health checks sobre los endpoints de la base de datos,
 * respetando filtros CLI (`--id`, `--status`, `--missing-date`, `--limit`)
 * y el rate limiter global por dominio.
 *
 * Si se pasan `--update` o `--automatic`, persiste los resultados
 * (estado, código HTTP, formato y fecha de verificación) en la base de datos.
 *
 * @param {{ id?: string, status?: string, missingDate?: boolean, limit?: number, update?: boolean, automatic?: boolean }} args Opciones parseadas por {@link parseArgs}.
 */
async function validateAll(args) {
  printBanner();
  clearSiteCache();

  const database = readJson(DATABASE_PATH);
  const { apis } = database;

  /** @type {typeof apis} */
  let apisToValidate = apis;

  if (args.id) {
    apisToValidate = apis.filter((a) => a.id === args.id);
    if (apisToValidate.length === 0) {
      console.error(`❌ No API found with id "${args.id}"`);
      process.exit(1);
    }
  }

  if (args.limit) {
    apisToValidate = apisToValidate.slice(0, args.limit);
  }

  console.log(`Validating ${apisToValidate.length} APIs / ${apisToValidate.reduce((s, a) => s + a.endpoints.length, 0)} endpoints...`);

  let totalChecked = 0;
  let totalChanged = 0;
  let active = 0;
  let broken = 0;
  let offline = 0;
  let stale = 0;
  let empty = 0;
  let noEndpoint = 0;

  let endpointTotal = 0;
  for (const api of apisToValidate) {
    endpointTotal += api.endpoints.length;
  }
  let endpointCount = 0;

  for (const api of apisToValidate) {
    for (const endpoint of api.endpoints) {
      if (args.missingDate && endpoint.last_known_item_date) continue;
      if (args.status && endpoint.status !== args.status) continue;

      endpointCount++;
      const pad = String(endpointTotal).length;
      const label = `[${String(endpointCount).padStart(pad)}/${endpointTotal}]`;
      const authTag = endpoint.auth === 'api-key' ? ' 🔑' : '';

      const waitTime = globalRateLimiter.getWaitTime(endpoint.url);
      if (waitTime > 0) {
        process.stdout.write(`  ${label} ⏳ ${api.id}/${endpoint.id}... rate limit ${(waitTime / 1000).toFixed(1)}s`);
      } else {
        process.stdout.write(`  ${label} 🔍 ${api.id}/${endpoint.id}...`);
      }

      await globalRateLimiter.acquire(endpoint.url);

      const startTime = Date.now();

      try {
        const result = await checkEndpoint(endpoint.url, endpoint.method, endpoint.auth);
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        const previousStatus = endpoint.status;

        endpoint.status = result.status;
        endpoint.last_status_code = result.last_status_code;
        endpoint.last_response_format = result.last_response_format;
        endpoint.last_checked = new Date().toISOString();

        if (result.format && result.format !== endpoint.format) {
          endpoint.format = result.format;
        }

        if (result.error) {
          endpoint.last_error = result.error;
        } else {
          delete endpoint.last_error;
        }

        totalChecked++;

        const changed = endpoint.status !== previousStatus;
        if (changed) totalChanged++;

        const icon = endpoint.status === 'active' ? '✅' : endpoint.status === 'stale' ? '⚠️' : '❌';
        const codeStr = endpoint.last_status_code !== null && endpoint.last_status_code !== undefined ? ` ${endpoint.last_status_code}` : '';
        const fmtStr = endpoint.last_response_format ? ` ${endpoint.last_response_format}` : '';
        const changeStr = changed ? ` (was ${previousStatus})` : '';
        process.stdout.write(`\r  ${label} ${icon}${authTag} ${api.id}/${endpoint.id} →${codeStr}${fmtStr} (${elapsed}s)${changeStr}\n`);

        switch (endpoint.status) {
          case 'active': active++; break;
          case 'broken': broken++; break;
          case 'offline': offline++; break;
          case 'stale': stale++; break;
          case 'endpoint_empty': empty++; break;
          case 'no_endpoint': noEndpoint++; break;
        }
      } catch (err) {
        process.stdout.write(`\r  ${label} ❌ ${api.id}/${endpoint.id} → error (${formatError(err)})\n`);
        console.error(`  Error checking ${endpoint.url}: ${formatError(err)}`);
      } finally {
        globalRateLimiter.release();
      }
    }
  }

  const total = database.total_endpoints;
  recalculateTotalEndpoints(database);

  console.log('\n========================================');
  console.log('  📊 Results');
  console.log('========================================');
  console.log(`  Total APIs:          ${apis.length}`);
  console.log(`  Total endpoints:     ${total}`);
  console.log(`  Checked:             ${totalChecked}`);
  console.log(`  Changed:             ${totalChanged}`);
  console.log(`  ✅ Active:           ${active}`);
  console.log(`  ❌ Broken:           ${broken}`);
  console.log(`  📡 Offline:          ${offline}`);
  console.log(`  ⚠️  Stale:           ${stale}`);
  console.log(`  📭 Empty:            ${empty}`);
  console.log(`  🚫 No endpoint:      ${noEndpoint}`);

  if (!args.automatic && totalChanged > 0) {
    console.log('\nChanges detected. Updating database...');
  }

  if (args.update || args.automatic) {
    database.last_updated = new Date().toISOString();
    recalculateTotalEndpoints(database);
    writeJson(DATABASE_PATH, database);
    console.log('\n✅ Database updated.');
  }

  globalRateLimiter.dispose();
}

/**
 * Punto de entrada del validador.
 * Prioriza el modo `--url` (verificación puntual); si no,
 * ejecuta la validación completa/filtrada de la base de datos.
 */
async function main() {
  const args = parseArgs();

  if (args.help) {
    console.log(`
Usage: node scripts/core/validate_apis.js [options] [api-id]

Options:
  --id=<id>         Validate a single API by ID
  --url=<u>         Validate a single URL (does not touch the database)
  --status=<s>      Only validate endpoints with the given status
  --limit=<n>       Only validate the first N APIs
  --missing-date    Only validate endpoints without last_known_item_date
  --update          Write results to the database
  --automatic       Same as --update but silent about changes
  --dry-run         Run without writing changes
  --help            Show this help
`);
    return;
  }

  if (args.url) {
    await validateSingleUrl(args.url);
    globalRateLimiter.dispose();
    return;
  }

  await validateAll(args);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  globalRateLimiter.dispose();
  process.exit(1);
});
