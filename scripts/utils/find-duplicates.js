import { readJson } from '../../lib/api-utils.js';

const database = readJson('apis-database.json');
const { apis } = database;

let found = false;

const urlMap = new Map();
const idSet = new Set();

for (const api of apis) {
  if (idSet.has(api.id)) {
    console.log(`❌ Duplicate API ID: ${api.id}`);
    found = true;
  }
  idSet.add(api.id);

  const normalized = api.url.replace(/\/$/, '').toLowerCase();
  if (urlMap.has(normalized)) {
    console.log(`⚠️  Similar URLs: "${urlMap.get(normalized)}" and "${api.id}" both use ${api.url}`);
    found = true;
  }
  urlMap.set(normalized, api.id);

  const epIds = new Set();
  for (const ep of api.endpoints) {
    if (epIds.has(ep.id)) {
      console.log(`❌ Duplicate endpoint ID "${ep.id}" in API "${api.id}"`);
      found = true;
    }
    epIds.add(ep.id);

}  
}

if (!found) {
  console.log('✅ No duplicates found.');
}

const verbose = process.argv.includes('--verbose');
if (verbose) {
  console.log(`\n📊 Summary: ${apis.length} APIs, ${database.total_endpoints} endpoints`);
}
