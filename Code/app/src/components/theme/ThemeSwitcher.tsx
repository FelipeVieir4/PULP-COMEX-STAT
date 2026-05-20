import { useTheme } from './ThemeProvider';
import { classNames } from '../../lib/classNames';
import type { ThemeMode } from '../../types/domain';

const themeOptions: Array<{ value: ThemeMode; label: string }> = [
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Escuro' },
  { value: 'system', label: 'Sistema' },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-switcher" role="group" aria-label="Selecionar tema">
      {themeOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          className={classNames('theme-switcher__button', theme === option.value && 'theme-switcher__button--active')}
          onClick={() => setTheme(option.value)}
          aria-pressed={theme === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}