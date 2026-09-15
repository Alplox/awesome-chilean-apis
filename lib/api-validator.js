import { tryFetchEndpoint } from './network-utils.js';
import { formatError, BROKEN_ERRORS } from './api-utils.js';

/**
 * @typedef {'active'|'stale'|'broken'|'offline'|'no_endpoint'|'endpoint_empty'} EndpointStatus
 */

/**
 * @typedef {Object} CheckResult
 * @property {EndpointStatus} status Estado determinado para el endpoint.
 * @property {number|null} last_status_code Código HTTP observado (0 si no hubo respuesta).
 * @property {string} last_response_format Formato de la respuesta real (JSON, XML, redirect, auth_required...).
 * @property {string} [format] Formato detectado para actualizar el campo declarativo `format`.
 * @property {string} [error] Detalle del problema, si lo hubo.
 */

/**
 * Evalúa un endpoint realizando una petición real (con reintentos progresivos)
 * y clasifica su estado según el código HTTP, contenido y autenticación esperada.
 *
 * Clasificación:
 * - `2xx` con cuerpo → `active` (detecta formato; cuerpo vacío → `endpoint_empty`).
 * - `2xx` sin cuerpo → `endpoint_empty`.
 * - `401`/`403` → `active` con `auth_required` (el servicio existe, exige credenciales).
 * - `3xx` → `active` con `redirect`.
 * - `404`/`410` → `active` + `auth_required` si la API declara auth; si no, `broken`.
 * - `5xx` → `broken`.
 * - Errores de red tipo DNS/conexión (ver {@link BROKEN_ERRORS}) → `offline`; otros → `broken`.
 *
 * @param {string} url URL absoluta del endpoint a verificar.
 * @param {string} [method='GET'] Método HTTP declarado (actualmente la sonda siempre usa GET).
 * @param {string} [auth='none'] Tipo de autenticación declarado (`'none'`, `'api-key'`, ...).
 * @returns {Promise<CheckResult>} Resultado normalizado para guardar en la base de datos.
 */
export async function checkEndpoint(url, method = 'GET', auth = 'none') {
  try {
    const res = await tryFetchEndpoint(url, method);

    if (!res) {
      return { status: 'broken', last_status_code: 0, last_response_format: 'error', error: 'No response' };
    }

    if (res.status >= 200 && res.status < 300) {
      const contentType = (res.headers['content-type'] || '').toLowerCase();
      const hasContent = res.body && res.body.length > 0;

      if (!hasContent) {
        return {
          status: 'endpoint_empty',
          last_status_code: res.status,
          last_response_format: 'empty',
        };
      }

      const last_response_format = detectFormat(contentType, res.body);

      return {
        status: 'active',
        last_status_code: res.status,
        last_response_format,
        format: last_response_format,
      };
    }

    if (res.status === 401 || res.status === 403) {
      return {
        status: 'active',
        last_status_code: res.status,
        last_response_format: 'auth_required',
      };
    }

    if (res.status >= 300 && res.status < 400) {
      return {
        status: 'active',
        last_status_code: res.status,
        last_response_format: 'redirect',
        error: `HTTP ${res.status}`,
      };
    }

    if (res.status === 404 || res.status === 410) {
      if (auth && auth !== 'none') {
        return {
          status: 'active',
          last_status_code: res.status,
          last_response_format: 'auth_required',
          error: `HTTP ${res.status} (auth required)`,
        };
      }
      return {
        status: 'broken',
        last_status_code: res.status,
        last_response_format: 'empty',
        error: `HTTP ${res.status}`,
      };
    }

    if (res.status >= 500) {
      return {
        status: 'broken',
        last_status_code: res.status,
        last_response_format: 'error',
        error: `HTTP ${res.status}`,
      };
    }

    return {
      status: 'active',
      last_status_code: res.status,
      last_response_format: 'Other',
    };
  } catch (err) {
    const errStr = formatError(err);

    if (BROKEN_ERRORS.some((e) => errStr.includes(e))) {
      return {
        status: 'offline',
        last_status_code: 0,
        last_response_format: 'error',
        error: errStr,
      };
    }

    return {
      status: 'broken',
      last_status_code: 0,
      last_response_format: 'error',
      error: errStr,
    };
  }
}

/**
 * Detecta el formato de una respuesta combinando el header `Content-Type`
 * y una inspección superficial del cuerpo.
 *
 * @param {string} contentType Valor del header `Content-Type` en minúsculas.
 * @param {string} body Cuerpo de la respuesta como texto.
 * @returns {'JSON'|'XML'|'CSV'|'HTML'|'Other'} Formato detectado.
 */
function detectFormat(contentType, body) {
  if (contentType.includes('json') || body.trim().startsWith('{') || body.trim().startsWith('[')) {
    return 'JSON';
  }
  if (contentType.includes('html') || /^\s*(<!doctype html|<html)/i.test(body)) {
    return 'HTML';
  }
  if (contentType.includes('xml') || body.trim().startsWith('<')) {
    return 'XML';
  }
  if (contentType.includes('csv')) {
    return 'CSV';
  }
  if (contentType.includes('html')) {
    return 'HTML';
  }
  return 'Other';
}
