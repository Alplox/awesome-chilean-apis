export class RateLimiter {
  constructor(maxConcurrent = 5, domainDelay = 2000) {
    this.maxConcurrent = maxConcurrent;
    this.domainDelay = domainDelay;
    this.active = 0;
    this.domainTimestamps = new Map();
    this.queue = [];
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
  }

  getDomain(urlStr) {
    try {
      return new URL(urlStr).hostname;
    } catch {
      return 'unknown';
    }
  }

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

  release() {
    this.active--;
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      next();
    }
  }

  getWaitTime(urlStr) {
    const domain = this.getDomain(urlStr);
    const lastTs = this.domainTimestamps.get(domain) || 0;
    const elapsed = Date.now() - lastTs;
    const remaining = this.domainDelay - elapsed;
    return Math.max(0, remaining);
  }

  cleanup() {
    const now = Date.now();
    for (const [domain, ts] of this.domainTimestamps) {
      if (now - ts > 60000) this.domainTimestamps.delete(domain);
    }
  }

  dispose() {
    clearInterval(this.cleanupInterval);
  }

  get domainCount() {
    return this.domainTimestamps.size;
  }
}

export const globalRateLimiter = new RateLimiter();
