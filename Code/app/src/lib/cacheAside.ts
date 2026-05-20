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
      setItem: (key, value) => {
        memoryCache.set(key, value);
      },
      removeItem: (key) => {
        memoryCache.delete(key);
      },
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
      setItem: (key, value) => {
        memoryCache.set(key, value);
      },
      removeItem: (key) => {
        memoryCache.delete(key);
      },
    };
  }
}

const defaultStorage = createStorageAdapter();

export async function cacheAside<T>(params: {
  key: string;
  ttlMs: number;
  loader: () => Promise<T>;
  storage?: CacheStorageAdapter;
}) {
  const storage = params.storage ?? defaultStorage;
  const cachedValue = storage.getItem(params.key);

  if (cachedValue) {
    try {
      const parsed = JSON.parse(cachedValue) as CacheRecord<T>;
      if (parsed.expiresAt > Date.now()) {
        return parsed.value;
      }
    } catch {
      storage.removeItem(params.key);
    }
  }

  const value = await params.loader();

  const record: CacheRecord<T> = {
    expiresAt: Date.now() + params.ttlMs,
    value,
  };

  storage.setItem(params.key, JSON.stringify(record));

  return value;
}