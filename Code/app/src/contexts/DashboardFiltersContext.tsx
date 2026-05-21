import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Period = { from: string; to: string };

const CURRENT_YEAR = new Date().getFullYear();

function defaultPeriod(): Period {
  return { from: `${CURRENT_YEAR - 5}-01`, to: `${CURRENT_YEAR}-12` };
}

type FiltersContextValue = {
  period: Period;
  setPeriod: (p: Period) => void;
  selectedNcms: Set<string> | null; // null = todos
  setSelectedNcms: (s: Set<string> | null) => void;
};

const DashboardFiltersContext = createContext<FiltersContextValue | null>(null);

export function DashboardFiltersProvider({ children }: { children: ReactNode }) {
  const [period, setPeriod]           = useState<Period>(defaultPeriod);
  const [selectedNcms, setSelectedNcms] = useState<Set<string> | null>(null);

  return (
    <DashboardFiltersContext.Provider value={{ period, setPeriod, selectedNcms, setSelectedNcms }}>
      {children}
    </DashboardFiltersContext.Provider>
  );
}

export function useDashboardFilters(): FiltersContextValue {
  const ctx = useContext(DashboardFiltersContext);
  if (!ctx) throw new Error('useDashboardFilters deve ser usado dentro de DashboardFiltersProvider');
  return ctx;
}
