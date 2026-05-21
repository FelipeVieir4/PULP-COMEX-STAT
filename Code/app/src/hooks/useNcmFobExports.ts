import { useEffect, useState } from 'react';
import { comexStatClient } from '../services/comexStatClient';
import { NCM_PULP_CODES } from '../data/ncmCodes';
import type { TradeBalanceRow } from '../types/domain';

type Period = { from: string; to: string };

type State =
  | { status: 'loading' }
  | { status: 'success'; rows: TradeBalanceRow[] }
  | { status: 'error'; message: string };

export function useNcmFobExports(period: Period) {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });

    comexStatClient
      .getTradeBalance({
        flow: 'export',
        monthDetail: false,
        period,
        filters: [{ filter: 'ncm', values: NCM_PULP_CODES }],
        details: ['ncm'],
        metrics: ['metricFOB', 'metricKG'],
      })
      .then((rows) => {
        console.log('[NcmTradeBalance] retorno da API:', rows);
        if (!cancelled) setState({ status: 'success', rows });
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setState({
            status: 'error',
            message: err instanceof Error ? err.message : 'Erro desconhecido',
          });
      });

    return () => { cancelled = true; };
  }, [period.from, period.to]);

  return state;
}
