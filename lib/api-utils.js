import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

/** Estados posibles de un endpoint tras un health check. */
export const ALLOWED_STATUSES = ['active', 'stale', 'broken', 'offline', 'no_endpoint', 'endpoint_empty'];
/** Métodos HTTP permitidos en la base de datos. */
export const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
/** Mecanismos de autenticación permitidos. */
export const ALLOWED_AUTH = ['none', 'api-key', 'oauth', 'basic', 'bearer'];
/** Formatos de datos declarados por una API. */
export const ALLOWED_FORMATS = ['JSON', 'XML', 'HTML', 'CSV', 'Other'];
/** Formatos observados en la respuesta real del endpoint. */
export const ALLOWED_RESPONSE_FORMATS = ['JSON', 'XML', 'HTML', 'CSV', 'Other', 'redirect', 'auth_required', 'empty', 'error'];
/** Modelos de precios admitidos. */
export const ALLOWED_PRICING = ['free', 'freemium', 'paid'];
/** Días sin verificación antes de marcar un endpoint como stale. */
export const STALE_THRESHOLD_DAYS = 90;
/** Mensajes de error de red que indican host caído/inexistente (status offline). */
export const BROKEN_ERRORS = ['ECONNREFUSED', 'ENOTFOUND', 'ECONNRESET', 'ETIMEDOUT', 'EHOSTUNREACH'];

/**
 * Extrae el hostname de una URL.
 *
 * @param {string} url URL a procesar.
 * @returns {string|null} Hostname, o `null` si la URL es inválida.
 */
export function getDomain(url) {
  try {
    const u = new URL(url);
    return u.hostname;
  } catch {
    return null;
  }
}

/**
 * Calcula los días transcurridos desde una fecha hasta ahora.
 *
 * @param {string|number|Date} date Fecha de referencia (parseable por `Date`).
 * @returns {number} Días transcurridos; negativo si la fecha es futura.
 */
export function daysSince(date) {
  const now = Date.now();
  const then = new Date(date).getTime();
  return (now - then) / 86400000;
}

/**
 * Determina si un registro está desactualizado según {@link STALE_THRESHOLD_DAYS}.
 *
 * @param {string|number|Date} [lastKnownItemDate] Última fecha de verificación.
 * @returns {boolean} `true` si supera el umbral de días.
 */
export function isStale(lastKnownItemDate) {
  if (!lastKnownItemDate) return false;
  return daysSince(lastKnownItemDate) > STALE_THRESHOLD_DAYS;
}

/**
 * Convierte un error desconocido en un mensaje legible de una línea.
 *
 * @param {unknown} error Error de cualquier tipo.
 * @returns {string} Mensaje formateado, incluyendo la causa si existe.
 */
export function formatError(error) {
  if (!error) return 'unknown';
  if (error instanceof Error) {
    if (error.cause) return `${error.message}: ${error.cause}`;
    return error.message;
  }
  return String(error);
}

/**
 * Lee y parsea un archivo JSON relativo a la raíz del proyecto.
 *
 * @param {string} filePath Ruta relativa desde la raíz del repo (ej. `'apis-database.json'`).
 * @returns {any} Contenido parseado del JSON.
 * @throws {Error} Si el archivo no existe o el JSON es inválido.
 */
export function readJson(filePath) {
  const fullPath = join(ROOT, filePath);
  const raw = readFileSync(fullPath, 'utf-8');
  return JSON.parse(raw);
}

/**
 * Escribe un objeto como JSON con indentación de 2 espacios.
 *
 * @param {string} filePath Ruta relativa desde la raíz del repo.
 * @param {unknown} data Datos serializables a JSON.
 */
export function writeJson(filePath, data) {
  const fullPath = join(ROOT, filePath);
  writeFileSync(fullPath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

/**
 * Recalcula y actualiza el contador `total_endpoints` de la base de datos.
 *
 * @param {{ apis: { endpoints: unknown[] }[], total_endpoints?: number }} database Base de datos completa.
 * @returns {number} Nuevo total de endpoints.
 */
export function recalculateTotalEndpoints(database) {
  let total = 0;
  for (const api of database.apis) {
    total += api.endpoints.length;
  }
  database.total_endpoints = total;
  return total;
}

/**
 * Verifica que un string sea una URL http/https válida.
 *
 * @param {string} str Valor a validar.
 * @returns {boolean} `true` si es una URL válida con protocolo http o https.
 */
export function isValidUrl(str) {
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}
