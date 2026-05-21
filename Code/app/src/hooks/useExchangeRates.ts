import { useEffect, useState } from 'react';
import { cacheAside } from '../lib/cacheAside';

export type CurrencyRate = {
  code: string;
  bid: string;
  pctChange: string;
};

type AwesomeApiResponse = Record<string, {
  code: string;
  bid: string;
  pctChange: string;
}>;

type State =
  | { status: 'loading' }
  | { status: 'success'; usd: CurrencyRate; eur: CurrencyRate }
  | { status: 'error' };

const TTL_MS = 5 * 60 * 1000; // 5 min — cotações mudam com frequência

async function fetchRates(): Promise<{ usd: CurrencyRate; eur: CurrencyRate }> {
  const data = await cacheAside<AwesomeApiResponse>({
    key: 'exchange-rates:USD-EUR-BRL',
    ttlMs: TTL_MS,
    loader: async () => {
      const res = await fetch(
        'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL',
        { headers: { Accept: 'application/json' } },
      );
      if (!res.ok) throw new Error(`Erro ao buscar cotações: ${res.status}`);
      return res.json() as Promise<AwesomeApiResponse>;
    },
  });

  return {
    usd: { code: 'USD', bid: data.USDBRL.bid, pctChange: data.USDBRL.pctChange },
    eur: { code: 'EUR', bid: data.EURBRL.bid, pctChange: data.EURBRL.pctChange },
  };
}

export function useExchangeRates() {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    fetchRates()
      .then(rates => { if (!cancelled) setState({ status: 'success', ...rates }); })
      .catch(() => { if (!cancelled) setState({ status: 'error' }); });

    return () => { cancelled = true; };
  }, []);

  return state;
}
