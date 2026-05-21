import { useTheme } from './ThemeProvider';

export function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  function toggleTheme() {
    // If currently using system default, toggle based on resolved theme
    if (theme === 'system') {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
      return;
    }

    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className="theme-switcher">
      <button
        type="button"
        className="icon-button"
        aria-label="Alternar tema"
        title={theme === 'system' ? `Padrão do sistema (${resolvedTheme})` : `Tema: ${theme}`}
        onClick={toggleTheme}
      >
        <span className="material-symbols-outlined">{resolvedTheme === 'dark' ? 'dark_mode' : 'light_mode'}</span>
      </button>
    </div>
  );
}