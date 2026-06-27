import https from 'node:https';
import http from 'node:http';
import { setTimeout as sleep } from 'node:timers/promises';

const SITE_STATUS_CACHE = new Map();
const MAX_RESPONSE_SIZE = 5 * 1024 * 1024;
const TIMEOUT = 15000;

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
];

let uaIndex = 0;
export function getNextUserAgent() {
  const ua = USER_AGENTS[uaIndex % USER_AGENTS.length];
  uaIndex++;
  return ua;
}

function fetchWithEngine(urlStr, useInsecure = false) {
  return new Promise((resolve, reject) => {
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

export async function checkSiteReachable(domain) {
  if (SITE_STATUS_CACHE.has(domain)) {
    return SITE_STATUS_CACHE.get(domain);
  }

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

export function clearSiteCache() {
  SITE_STATUS_CACHE.clear();
}
