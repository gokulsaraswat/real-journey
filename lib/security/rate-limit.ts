type Bucket = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  prefix?: string;
  limit: number;
  windowMs: number;
};

export type RateLimitResult = {
  ok: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __realJourneyRateLimitStore: Map<string, Bucket> | undefined;
}

const store = globalThis.__realJourneyRateLimitStore ?? new Map<string, Bucket>();
globalThis.__realJourneyRateLimitStore = store;

export function applyRateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const identity = `${options.prefix ?? "default"}:${key}`;
  const current = store.get(identity);
  const shouldReset = !current || current.resetAt <= now;
  const resetAt = shouldReset ? now + options.windowMs : current.resetAt;
  const count = shouldReset ? 1 : current.count + 1;

  store.set(identity, {
    count,
    resetAt,
  });

  return {
    ok: count <= options.limit,
    limit: options.limit,
    remaining: Math.max(0, options.limit - count),
    resetAt,
    retryAfterSeconds: Math.max(1, Math.ceil((resetAt - now) / 1000)),
  };
}

export function pruneRateLimitStore(maxEntries = 5000): void {
  if (store.size <= maxEntries) {
    return;
  }

  const now = Date.now();

  for (const [key, value] of store.entries()) {
    if (value.resetAt <= now) {
      store.delete(key);
    }

    if (store.size <= maxEntries) {
      return;
    }
  }
}

export function getRateLimitStoreSize(): number {
  return store.size;
}
