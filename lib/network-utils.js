import https from 'node:https';
import http from 'node:http';
import { setTimeout as sleep } from 'node:timers/promises';

/** @type {Map<string, boolean>} Cache de alcanzabilidad por dominio (se limpia con clearSiteCache). */
const SITE_STATUS_CACHE = new Map();
/** Tamaño máximo de respuesta aceptado (5 MB). */
const MAX_RESPONSE_SIZE = 5 * 1024 * 1024;
/** Timeout de petición en milisegundos. */
const TIMEOUT = 15000;

/** User-Agents rotativos para evitar bloqueos por bot básicos. */
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
];

let uaIndex = 0;

/**
 * Devuelve el siguiente User-Agent en rotación cíclica.
 *
 * @returns {string} User-Agent a usar en la siguiente petición.
 */
export function getNextUserAgent() {
  const ua = USER_AGENTS[uaIndex % USER_AGENTS.length];
  uaIndex++;
  return ua;
}

/**
 * Realiza una petición GET usando los módulos nativos `https`/`http`,
 * con timeout, límite de tamaño de respuesta y User-Agent rotativo.
 *
 * @param {string} urlStr URL absoluta a solicitar.
 * @param {boolean} [useInsecure=false] Si es `true`, acepta certificados TLS inválidos
 *   (útil como segundo intento ante sitios con certificados mal configurados).
 * @returns {Promise<{status: number|null, headers: import('node:http').IncomingHttpHeaders, body: string, url: string}>}
 *   Respuesta cruda: código de estado, headers, cuerpo como texto y la URL solicitada.
 * @rejects {Error} Si hay error de red, DNS, timeout o respuesta demasiado grande.
 */
function fetchWithEngine(urlStr, useInsecure = false) {
  return new Promise((resolve, reject) => {
    /** @type {URL} */
    let url;
    try {
      url = new URL(urlStr);
    } catch {
      return reject(new Error('Invalid URL'));
    }

    const lib = url.protocol === 'https:' ? https : http;
    const agent = useInsecure && url.protocol === 'https:'
      ? new https.Agent({ rejectUnauthorized: false })
      : undefined;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT);

    const opts = {
      method: 'GET',
      headers: {
        'User-Agent': getNextUserAgent(),
        Accept: 'application/json, application/xml, text/xml, text/html, */*',
      },
      agent,
      signal: controller.signal,
      timeout: TIMEOUT,
    };

    const req = lib.request(url, opts, (res) => {
      const chunks = [];
      let total = 0;

      res.on('data', (chunk) => {
        total += chunk.length;
        if (total > MAX_RESPONSE_SIZE) {
          req.destroy(new Error('Response too large'));
          return;
        }
        chunks.push(chunk);
      });

      res.on('end', () => {
        clearTimeout(timer);
        const body = Buffer.concat(chunks).toString('utf-8');
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body,
          url: urlStr,
        });
      });
    });

    req.on('error', (err) => {
      clearTimeout(timer);
      reject(err);
    });

    req.on('timeout', () => {
      req.destroy(new Error('Request timeout'));
    });

    req.end();
  });
}

/**
 * Verifica si un dominio es alcanzable probando HTTPS normal,
 * HTTPS tolerante a certificados inválidos y HTTP, en ese orden.
 * El resultado se cachea hasta llamar a {@link clearSiteCache}.
 *
 * @param {string} domain Dominio sin protocolo (ej. `'api.gob.cl'`).
 * @returns {Promise<boolean>} `true` si alguna variante respondió con status < 500.
 */
export async function checkSiteReachable(domain) {
  if (SITE_STATUS_CACHE.has(domain)) {
    return SITE_STATUS_CACHE.get(domain);
  }

  // Índice 1 reintenta HTTPS con validación TLS desactivada;
  // índice 2 prueba HTTP plano como último recurso.
  const urls = [
    `https://${domain}`,
    `https://${domain}`,
    `http://${domain}`,
  ];

  for (let i = 0; i < urls.length; i++) {
    try {
      const useInsecure = i === 1;
      const res = await fetchWithEngine(urls[i], useInsecure);
      const reachable = res.status >= 200 && res.status < 500;
      SITE_STATUS_CACHE.set(domain, reachable);
      return reachable;
    } catch {
      continue;
    }
  }

  SITE_STATUS_CACHE.set(domain, false);
  return false;
}

/**
 * Detecta si el certificado TLS de un dominio está causando errores.
 * Se considera error de certificado solo si el mensaje del fallo lo menciona.
 *
 * @param {string} domain Dominio a verificar.
 * @returns {Promise<boolean>} `true` si el fallo fue por certificado.
 */
export async function checkCertError(domain) {
  return new Promise((resolve) => {
    const req = https.request(
      `https://${domain}`,
      {
        method: 'HEAD',
        rejectUnauthorized: true,
        timeout: 10000,
      },
      (_res) => resolve(false)
    );
    req.on('error', (err) => {
      resolve(err.message.includes('certificate'));
    });
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

/**
 * Intenta obtener una URL con estrategias progresivas:
 * 1. HTTPS normal → 2. HTTPS sin validar certificado → 3. HTTP plano.
 * Entre intentos espera un backoff exponencial corto (500ms, 1000ms...).
 *
 * @param {string} url URL absoluta a solicitar.
 * @param {string} [_method='GET'] Método HTTP (reservado; actualmente siempre se usa GET).
 * @returns {Promise<{status: number|null, headers: import('node:http').IncomingHttpHeaders, body: string, url: string}>}
 *   La primera respuesta exitosa.
 * @rejects {Error} El error del último intento si todos fallan.
 */
export async function tryFetchEndpoint(url, _method = 'GET') {
  const attempts = [
    () => fetchWithEngine(url, false),
    () => fetchWithEngine(url, true),
    () => fetchWithEngine(url.replace(/^https:/, 'http:'), true),
  ];
  for (let i = 0; i < attempts.length; i++) {
    try {
      if (i > 0) await sleep(500 * Math.pow(2, i - 1));
      const res = await attempts[i]();
      return res;
    } catch (err) {
      if (i === attempts.length - 1) throw err;
    }
  }
}

/** Vacía la cache de alcanzabilidad de dominios ({@link checkSiteReachable}). */
export function clearSiteCache() {
  SITE_STATUS_CACHE.clear();
}
