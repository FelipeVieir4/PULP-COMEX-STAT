import { useEffect, useState } from 'react';
import { comexStatClient } from '../services/comexStatClient';
import type { LastUpdatedData } from '../types/domain';

type State =
  | { status: 'loading' }
  | { status: 'success'; data: LastUpdatedData }
  | { status: 'error' };

export function useLastUpdated() {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    comexStatClient
      .getLastUpdatedDate()
      .then((data) => {
        if (!cancelled) setState({ status: 'success', data });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
