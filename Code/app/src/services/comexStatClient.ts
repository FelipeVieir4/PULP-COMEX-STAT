import { cacheAside } from '../lib/cacheAside';

export type ComexStatClientOptions = {
  baseUrl?: string;
  defaultTtlMs?: number;
};

export function createComexStatClient(options: ComexStatClientOptions = {}) {
  const baseUrl = options.baseUrl ?? import.meta.env.VITE_COMEX_STAT_BASE_URL ?? '';
  const defaultTtlMs = options.defaultTtlMs ?? 15 * 60 * 1000;

  async function requestJson<T>(path: string, init?: RequestInit & { cacheKey?: string; ttlMs?: number }) {
    if (!baseUrl) {
      throw new Error('VITE_COMEX_STAT_BASE_URL nao configurada.');
    }

    const url = new URL(path, baseUrl);
    const cacheKey = init?.cacheKey ?? url.toString();
    const ttlMs = init?.ttlMs ?? defaultTtlMs;

    return cacheAside<T>({
      key: cacheKey,
      ttlMs,
      loader: async () => {
        const response = await fetch(url, {
          ...init,
          headers: {
            Accept: 'application/json',
            ...(init?.headers ?? {}),
          },
        });

        if (!response.ok) {
          throw new Error(`Falha ao consultar a API do COMEX STAT: ${response.status}`);
        }

        return (await response.json()) as T;
      },
    });
  }

  return {
    requestJson,
  };
}

export const comexStatClient = createComexStatClient();