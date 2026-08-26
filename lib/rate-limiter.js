/**
 * Limitador de concurrencia y frecuencia de peticiones por dominio.
 *
 * Garantiza que:
 * - Nunca hay más de {@link RateLimiter#maxConcurrent} peticiones simultáneas.
 * - Entre dos peticiones al mismo dominio transcurre al menos
 *   {@link RateLimiter#domainDelay} milisegundos.
 */
export class RateLimiter {
  /**
   * @param {number} [maxConcurrent=5] Máximo de peticiones simultáneas globales.
   * @param {number} [domainDelay=2000] Demora mínima en ms entre peticiones al mismo dominio.
   */
  constructor(maxConcurrent = 5, domainDelay = 2000) {
    /** @type {number} */
    this.maxConcurrent = maxConcurrent;
    /** @type {number} */
    this.domainDelay = domainDelay;
    /** @type {number} Contador global de peticiones en curso. */
    this.active = 0;
    /** @type {Map<string, number>} Último timestamp de petición por dominio. */
    this.domainTimestamps = new Map();
    /** @type {Array<() => void>} Cola de resolvers esperando un slot libre. */
    this.queue = [];
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
  }

  /**
   * Extrae el hostname de una URL para agrupar peticiones por dominio.
   *
   * @param {string} urlStr URL de la petición.
   * @returns {string} Hostname, o `'unknown'` si la URL es inválida.
   */
  getDomain(urlStr) {
    try {
      return new URL(urlStr).hostname;
    } catch {
      return 'unknown';
    }
  }

  /**
   * Espera hasta que sea posible realizar una petición a la URL dada,
   * respetando tanto el límite de concurrencia como el delay por dominio.
   *
   * Debe emparejarse siempre con una llamada a {@link RateLimiter#release}.
   *
   * @param {string} urlStr URL destino de la petición.
   * @returns {Promise<void>} Resuelve cuando se puede emitir la petición.
   */
  async acquire(urlStr) {
    const domain = this.getDomain(urlStr);

    while (true) {
      if (this.active < this.maxConcurrent) {
        const lastTs = this.domainTimestamps.get(domain) || 0;
        const elapsed = Date.now() - lastTs;
        if (elapsed >= this.domainDelay) {
          this.active++;
          this.domainTimestamps.set(domain, Date.now());
          return;
        }
        const remaining = this.domainDelay - elapsed;
        await new Promise((r) => setTimeout(r, remaining));
        continue;
      }
      await new Promise((r) => this.queue.push(r));
    }
  }

  /**
   * Libera un slot de concurrencia ocupado tras {@link RateLimiter#acquire},
   * despertando a la siguiente petición en cola si existe.
   */
  release() {
    this.active--;
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      next();
    }
  }

  /**
   * Calcula cuántos milisegundos faltan para poder volver a pedir
   * al dominio de la URL sin esperar dentro de {@link RateLimiter#acquire}.
   *
   * @param {string} urlStr URL destino.
   * @returns {number} Milisegundos de espera restante (0 si puede ir ya).
   */
  getWaitTime(urlStr) {
    const domain = this.getDomain(urlStr);
    const lastTs = this.domainTimestamps.get(domain) || 0;
    const elapsed = Date.now() - lastTs;
    const remaining = this.domainDelay - elapsed;
    return Math.max(0, remaining);
  }

  /** Limpia timestamps de dominios inactivos para liberar memoria. */
  cleanup() {
    const now = Date.now();
    for (const [domain, ts] of this.domainTimestamps) {
      if (now - ts > 60000) this.domainTimestamps.delete(domain);
    }
  }

  /** Detiene el intervalo de limpieza. Llamar al terminar el proceso/script. */
  dispose() {
    clearInterval(this.cleanupInterval);
  }

  /** @returns {number} Cantidad de dominios con registro activo. */
  get domainCount() {
    return this.domainTimestamps.size;
  }
}

/** Instancia compartida para todos los scripts del proyecto. */
export const globalRateLimiter = new RateLimiter();
