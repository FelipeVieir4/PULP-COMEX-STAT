import { createContext, useContext, type ReactNode } from 'react';
import { useThemeMode } from '../../hooks/useTheme';
import type { ThemeMode } from '../../types/domain';

type ThemeContextValue = {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  setTheme: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { mode, resolvedTheme, setMode } = useThemeMode();

  return <ThemeContext.Provider value={{ theme: mode, resolvedTheme, setTheme: setMode }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider.');
  }

  return context;
}