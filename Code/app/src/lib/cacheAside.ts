type CacheRecord<T> = {
  expiresAt: number;
  value: T;
};

type CacheStorageAdapter = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

const memoryCache = new Map<string, string>();

function createStorageAdapter(): CacheStorageAdapter {
  if (typeof window === 'undefined') {
    return {
      getItem: (key) => memoryCache.get(key) ?? null,
      setItem: (key, value) => { memoryCache.set(key, value); },
      removeItem: (key) => { memoryCache.delete(key); },
    };
  }

  try {
    const storage = window.localStorage;
    const testKey = '__pulp_comex_cache_test__';
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);
    return storage;
  } catch {
    return {
      getItem: (key) => memoryCache.get(key) ?? null,
      setItem: (key, value) => { memoryCache.set(key, value); },
      removeItem: (key) => { memoryCache.delete(key); },
    };
  }
}

const defaultStorage = createStorageAdapter();

// Deduplica requests simultâneos pela mesma chave antes de o cache ser populado
const inFlight = new Map<string, Promise<unknown>>();

// TTL mínimo aplicado ao dado stale quando a requisição falha (ex: 429).
// Evita retentar imediatamente após uma falha.
const ERROR_BACKOFF_MS = 2 * 60 * 60 * 1000; // 2 h

export async function cacheAside<T>(params: {
  key: string;
  ttlMs: number;
  loader: () => Promise<T>;
  storage?: CacheStorageAdapter;
}): Promise<T> {
  const storage = params.storage ?? defaultStorage;
  const raw = storage.getItem(params.key);
  let stale: T | undefined;

  if (raw) {
    try {
      const parsed = JSON.parse(raw) as CacheRecord<T>;
      if (parsed.expiresAt > Date.now()) {
        return parsed.value; // cache fresco — retorna sem requisição
      }
      stale = parsed.value; // cache expirado — guarda como fallback
    } catch {
      storage.removeItem(params.key);
    }
  }

  const existing = inFlight.get(params.key);
  if (existing) return existing as Promise<T>;

  const promise = params.loader()
    .then((value) => {
      storage.setItem(params.key, JSON.stringify({
        expiresAt: Date.now() + params.ttlMs,
        value,
      } satisfies CacheRecord<T>));
      inFlight.delete(params.key);
      return value;
    })
    .catch((err: unknown) => {
      inFlight.delete(params.key);

      if (stale !== undefined) {
        // Serve o dado antigo e estende o TTL para evitar rajada de retentativas
        storage.setItem(params.key, JSON.stringify({
          expiresAt: Date.now() + Math.max(params.ttlMs, ERROR_BACKOFF_MS),
          value: stale,
        } satisfies CacheRecord<T>));
        console.warn('[cache] requisição falhou, servindo dado stale:', params.key, err);
        return stale;
      }

      throw err;
    });

  inFlight.set(params.key, promise);
  return promise;
}
