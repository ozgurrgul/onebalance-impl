const cache = new Map<string, { value: any; expiresAt: number }>();

const DEFAULT_TTL_SECONDS = 60;

export const withCache = async (
  cacheKey: string,
  fn: () => Promise<any>,
  ttlSeconds: number = DEFAULT_TTL_SECONDS
) => {
  const now = Date.now();
  const cached = cache.get(cacheKey);

  // Cache hit
  if (cached && cached.expiresAt > now) {
    return cached.value;
  }

  const result = await fn();
  cache.set(cacheKey, {
    value: result,
    expiresAt: now + ttlSeconds * 1000, // Convert seconds to milliseconds
  });

  return result;
};

// purgeCache function to clear the cache, for prod
