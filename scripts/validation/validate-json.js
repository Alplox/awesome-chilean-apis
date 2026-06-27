import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

const ALLOWED_STATUSES = ['active', 'stale', 'broken', 'offline', 'no_endpoint', 'endpoint_empty'];
const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const ALLOWED_AUTH = ['none', 'api-key', 'oauth', 'basic', 'bearer'];
const ALLOWED_FORMATS = ['JSON', 'XML', 'HTML', 'CSV', 'Other'];
const CATEGORY_KEYS = [
  'government', 'finance', 'transport', 'weather', 'environment',
  'education', 'health', 'maps', 'business', 'utilities',
  'notifications', 'community',
];

let errors = 0;
let warnings = 0;

function error(path, msg) {
  console.error(`  ❌ ${path}: ${msg}`);
  errors++;
}

function warn(path, msg) {
  console.warn(`  ⚠️  ${path}: ${msg}`);
  warnings++;
}

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

function validateDatabase() {
  console.log('\n📦 Validating apis-database.json...\n');

  let data;
  try {
    data = JSON.parse(readFileSync(join(ROOT, 'apis-database.json'), 'utf-8'));
  } catch (e) {
    error('apis-database.json', `Cannot parse: ${e.message}`);
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

    if (!api || typeof api !== 'object') {
      error(apiPath, 'Must be an object');
      continue;
    }

    if (!validateId(api.id, `${apiPath}.id`)) continue;
    if (ids.has(api.id)) error(`${apiPath}.id`, `Duplicate ID: ${api.id}`);
    ids.add(api.id);

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

    if (!Array.isArray(api.endpoints)) {
      error(`${apiPath}.endpoints`, 'Must be an array');
      continue;
    }

    const epIds = new Set();

    for (let j = 0; j < api.endpoints.length; j++) {
      const ep = api.endpoints[j];
      const epPath = `${apiPath}.endpoints[${j}]`;

      if (!ep || typeof ep !== 'object') {
        error(epPath, 'Must be an object');
        continue;
      }

      if (!validateId(ep.id, `${epPath}.id`)) continue;
      if (epIds.has(ep.id)) error(`${epPath}.id`, `Duplicate endpoint ID within same API: ${ep.id}`);
      epIds.add(ep.id);

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
        const RESPONSE_FORMATS = ['JSON', 'XML', 'HTML', 'CSV', 'Other', 'redirect', 'auth_required', 'empty', 'error'];
        if (!RESPONSE_FORMATS.includes(ep.last_response_format)) {
          error(`${epPath}.last_response_format`, `Invalid response format "${ep.last_response_format}"`);
        }
      }

      if (ep.verified !== undefined) {
        warn(`${epPath}.verified`, 'Field "verified" is deprecated. Use last_status_code + last_response_format instead');
      }
    }
  }

  console.log(`\n${errors > 0 ? `❌ ${errors} errors` : '✅ No errors'}${warnings > 0 ? `, ${warnings} warnings` : ''}\n`);
  process.exit(errors > 0 ? 1 : 0);
}

function validateCategories() {
  console.log('📦 Validating categories.json...\n');
  let data;
  try {
    data = JSON.parse(readFileSync(join(ROOT, 'categories.json'), 'utf-8'));
  } catch (e) {
    error('categories.json', `Cannot parse: ${e.message}`);
    return;
  }

  for (const [key, cat] of Object.entries(data)) {
    if (!cat.label) error(`categories.${key}.label`, 'Missing label');
    if (!Array.isArray(cat.slugs)) error(`categories.${key}.slugs`, 'Must be an array');
    if (typeof cat.order !== 'number') error(`categories.${key}.order`, 'Must be a number');
  }
}

function validateRegions() {
  console.log('📦 Validating regions.json...\n');
  try {
    JSON.parse(readFileSync(join(ROOT, 'regions.json'), 'utf-8'));
  } catch (e) {
    error('regions.json', `Cannot parse: ${e.message}`);
  }
}

validateDatabase();
validateCategories();
validateRegions();
