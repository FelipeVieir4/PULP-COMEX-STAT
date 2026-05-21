import { cacheAside } from '../lib/cacheAside';
import { NCM_PULP_CODES } from '../data/ncmCodes';
import type {
  CountryExportResponse,
  CountryExportRow,
  LastUpdatedData,
  LastUpdatedDateResponse,
  TradeBalanceQuery,
  TradeBalanceResponse,
  TradeBalanceRow,
} from '../types/domain';

export type ComexStatClientOptions = {
  baseUrl?: string;
  defaultTtlMs?: number;
};

// ── Helpers internos ──────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function extractRetryMs(body: Record<string, unknown>, headers: Headers): number {
  // Campo explícito no body
  if (typeof body.retry_after === 'number') return body.retry_after * 1000;
  if (typeof body.retryAfter === 'number')  return body.retryAfter  * 1000;

  // Segundos mencionados na mensagem ("tente novamente em 10 segundos")
  const msg = extractMessage(body);
  const match = msg.match(/(\d+)\s*segundo/i);
  if (match) return Number(match[1]) * 1000;

  // Header Retry-After
  const header = headers.get('Retry-After');
  if (header && !isNaN(Number(header))) return Number(header) * 1000;

  return 0;
}

function extractMessage(body: Record<string, unknown>): string {
  const raw = body.message ?? body.error ?? body.detail ?? '';
  if (typeof raw === 'string') return raw;
  if (typeof raw === 'object' && raw !== null) return JSON.stringify(raw);
  return String(raw);
}

// ── Fetch com retry automático em 429 ────────────────────────

async function fetchJson<T>(url: URL, init: RequestInit): Promise<T> {
  const headers = { Accept: 'application/json', ...(init.headers ?? {}) };
  const response = await fetch(url, { ...init, headers });

  if (response.status === 429) {
    let body: Record<string, unknown> = {};
    try   {
      body = await response.clone().json() as Record<string, unknown>;
      console.warn('[comexStat] 429 body:', body);
    }
    catch { /* body não é JSON */ }

    const retryMs  = extractRetryMs(body, response.headers);
    const message  = extractMessage(body);
    const errorMsg = message
      ? `Rate limit atingido — ${message}`
      : 'Rate limit atingido (429).';

    if (retryMs > 0) {
      await sleep(retryMs);
      const retry = await fetch(url, { ...init, headers });
      if (retry.ok) return retry.json() as Promise<T>;
      // Retry também falhou — propaga o erro original para o cacheAside tratar o stale
    }

    throw new Error(errorMsg);
  }

  if (!response.ok) {
    throw new Error(`Falha ao consultar a API do COMEX STAT: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// ── Client ────────────────────────────────────────────────────

export function createComexStatClient(options: ComexStatClientOptions = {}) {
  const baseUrl     = options.baseUrl     ?? import.meta.env.VITE_COMEX_STAT_BASE_URL ?? '';
  const defaultTtlMs = options.defaultTtlMs ?? 15 * 60 * 1000;

  async function requestJson<T>(
    path: string,
    init?: RequestInit & { cacheKey?: string; ttlMs?: number },
  ) {
    if (!baseUrl) throw new Error('VITE_COMEX_STAT_BASE_URL nao configurada.');

    const { cacheKey: ck, ttlMs: ttl, ...fetchInit } = init ?? {};
    const url      = new URL(path, baseUrl);
    const cacheKey = ck  ?? url.toString();
    const ttlMs    = ttl ?? defaultTtlMs;

    return cacheAside<T>({
      key: cacheKey,
      ttlMs,
      loader: () => fetchJson<T>(url, fetchInit),
    });
  }

  async function getTradeBalance(query: TradeBalanceQuery): Promise<TradeBalanceRow[]> {
    const body   = JSON.stringify(query);
    const result = await requestJson<TradeBalanceResponse>('/general', {
      method: 'POST',
      body,
      cacheKey: `comex:trade-balance:${body}`,
      ttlMs:    24 * 60 * 60 * 1000,
      headers:  { 'Content-Type': 'application/json' },
    });
    return result.data.list;
  }

  async function getExportsByCountry(
    period: { from: string; to: string },
    ncmCodes: readonly string[] = NCM_PULP_CODES,
  ): Promise<CountryExportRow[]> {
    const query = {
      flow: 'export',
      monthDetail: false,
      period,
      filters: [{ filter: 'ncm', values: [...ncmCodes] }],
      details: ['country'],
      metrics: ['metricFOB', 'metricKG'],
    };
    const body = JSON.stringify(query);
    const result = await requestJson<CountryExportResponse>('/general', {
      method: 'POST',
      body,
      cacheKey: `comex:country-exports:${body}`,
      ttlMs: 24 * 60 * 60 * 1000,
      headers: { 'Content-Type': 'application/json' },
    });
    return result.data.list;
  }

  async function getLastUpdatedDate(): Promise<LastUpdatedData> {
    const result = await requestJson<LastUpdatedDateResponse>('/general/dates/updated', {
      cacheKey: 'comex:last-updated',
      ttlMs:    60 * 60 * 1000,
    });
    return result.data;
  }

  return { requestJson, getLastUpdatedDate, getTradeBalance, getExportsByCountry };
}

export const comexStatClient = createComexStatClient();
