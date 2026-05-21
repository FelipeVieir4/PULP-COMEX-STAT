import { useEffect, useState } from 'react';
import { comexStatClient } from '../services/comexStatClient';
import type { CountryExportRow } from '../types/domain';

type Period = { from: string; to: string };

type State =
  | { status: 'loading' }
  | { status: 'success'; rows: CountryExportRow[] }
  | { status: 'error'; message: string };

export function useCountryExports(period: Period, ncmCodes: readonly string[]) {
  const [state, setState] = useState<State>({ status: 'loading' });

  const ncmKey = ncmCodes.join(',');

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });

    comexStatClient
      .getExportsByCountry(period, ncmCodes)
      .then(rows => {
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
  }, [period.from, period.to, ncmKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
}
