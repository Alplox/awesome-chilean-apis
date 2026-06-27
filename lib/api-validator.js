import { tryFetchEndpoint } from './network-utils.js';
import { formatError, BROKEN_ERRORS } from './api-utils.js';

export async function checkEndpoint(url, method = 'GET') {
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

function detectFormat(contentType, body) {
  if (contentType.includes('json') || body.trim().startsWith('{') || body.trim().startsWith('[')) {
    return 'JSON';
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
