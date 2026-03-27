type RateLimitStore = Map<string, number[]>;

export interface RateLimitResult {
  ok: boolean;
  current: number;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
}

export class InMemoryRateLimiter {
  private readonly store: RateLimitStore = new Map();
  private lastCleanupAt = 0;

  private cleanup(now: number): void {
    if (now - this.lastCleanupAt < 30_000) {
      return;
    }

    this.lastCleanupAt = now;
    for (const [key, timestamps] of this.store.entries()) {
      const next = timestamps.filter((ts) => now - ts <= 60 * 60 * 1000);
      if (next.length === 0) {
        this.store.delete(key);
      } else {
        this.store.set(key, next);
      }
    }
  }

  private getWindowHits(key: string, windowMs: number, now: number): number[] {
    const allHits = this.store.get(key) ?? [];
    const cutoff = now - windowMs;
    return allHits.filter((ts) => ts >= cutoff);
  }

  consume(key: string, limit: number, windowMs: number): RateLimitResult {
    const now = Date.now();
    this.cleanup(now);

    const hits = this.getWindowHits(key, windowMs, now);
    const current = hits.length + 1;
    const ok = current <= limit;

    if (ok) {
      const allHits = this.store.get(key) ?? [];
      this.store.set(key, [...allHits, now]);
    }

    const oldestHit = hits[0] ?? now;
    const retryAfterSeconds = Math.max(1, Math.ceil((windowMs - (now - oldestHit)) / 1000));

    return {
      ok,
      current,
      limit,
      remaining: Math.max(0, limit - Math.min(current, limit)),
      retryAfterSeconds,
    };
  }

  getRecentCount(key: string, windowMs: number): number {
    const now = Date.now();
    this.cleanup(now);
    return this.getWindowHits(key, windowMs, now).length;
  }
}

const globalScope = globalThis as unknown as {
  __autisyncRateLimiter?: InMemoryRateLimiter;
};

export function getRateLimiter(): InMemoryRateLimiter {
  if (!globalScope.__autisyncRateLimiter) {
    globalScope.__autisyncRateLimiter = new InMemoryRateLimiter();
  }

  return globalScope.__autisyncRateLimiter;
}
