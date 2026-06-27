import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

export const ALLOWED_STATUSES = ['active', 'stale', 'broken', 'offline', 'no_endpoint', 'endpoint_empty'];
export const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
export const ALLOWED_AUTH = ['none', 'api-key', 'oauth', 'basic', 'bearer'];
export const ALLOWED_FORMATS = ['JSON', 'XML', 'HTML', 'CSV', 'Other'];
export const ALLOWED_RESPONSE_FORMATS = ['JSON', 'XML', 'HTML', 'CSV', 'Other', 'redirect', 'auth_required', 'empty', 'error'];
export const STALE_THRESHOLD_DAYS = 90;
export const BROKEN_ERRORS = ['ECONNREFUSED', 'ENOTFOUND', 'ECONNRESET', 'ETIMEDOUT', 'EHOSTUNREACH'];

export function getDomain(url) {
  try {
    const u = new URL(url);
    return u.hostname;
  } catch {
    return null;
  }
}

export function daysSince(date) {
  const now = Date.now();
  const then = new Date(date).getTime();
  return (now - then) / 86400000;
}

export function isStale(lastKnownItemDate) {
  if (!lastKnownItemDate) return false;
  return daysSince(lastKnownItemDate) > STALE_THRESHOLD_DAYS;
}

export function formatError(error) {
  if (!error) return 'unknown';
  if (error instanceof Error) {
    if (error.cause) return `${error.message}: ${error.cause}`;
    return error.message;
  }
  return String(error);
}

export function readJson(filePath) {
  const fullPath = join(ROOT, filePath);
  const raw = readFileSync(fullPath, 'utf-8');
  return JSON.parse(raw);
}

export function writeJson(filePath, data) {
  const fullPath = join(ROOT, filePath);
  writeFileSync(fullPath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

export function recalculateTotalEndpoints(database) {
  let total = 0;
  for (const api of database.apis) {
    total += api.endpoints.length;
  }
  database.total_endpoints = total;
  return total;
}

export function isValidUrl(str) {
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}
