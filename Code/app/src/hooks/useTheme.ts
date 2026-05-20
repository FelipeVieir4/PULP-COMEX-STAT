import { useEffect, useMemo, useState } from 'react';
import type { ThemeMode } from '../types/domain';

const storageKey = 'pulp-comex-theme';

function getSystemTheme(): Exclude<ThemeMode, 'system'> {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(theme: ThemeMode): 'light' | 'dark' {
  return theme === 'system' ? getSystemTheme() : theme;
}

function readInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'system';
  }

  const storedTheme = window.localStorage.getItem(storageKey) as ThemeMode | null;
  return storedTheme ?? 'system';
}

export function useThemeMode() {
  const [mode, setMode] = useState<ThemeMode>(readInitialTheme);

  const resolvedTheme = useMemo(() => resolveTheme(mode), [mode]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = resolvedTheme;
    root.style.colorScheme = resolvedTheme;

    window.localStorage.setItem(storageKey, mode);
  }, [mode, resolvedTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (mode === 'system') {
        document.documentElement.dataset.theme = resolveTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [mode]);

  return {
    mode,
    resolvedTheme,
    setMode,
  };
}