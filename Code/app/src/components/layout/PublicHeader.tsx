import { Link } from 'react-router-dom';
import { publicNav } from '../../config/navigation';
import { ThemeSwitcher } from '../theme/ThemeSwitcher';

export function PublicHeader() {
  return (
    <header className="landing-header">
      <div className="landing-header__brand">
        <span className="landing-header__title">PULP COMEX STAT</span>
      </div>

      <nav className="landing-header__nav" aria-label="Navegação principal">
        {publicNav.map((item, index) => (
          <Link key={`${item.label}-${index}`} to={item.href} className={index === 0 ? 'landing-header__link landing-header__link--active' : 'landing-header__link'}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="landing-header__actions">
        <button type="button" className="icon-button" aria-label="Notificações">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <ThemeSwitcher />
        <button type="button" className="icon-button" aria-label="Conta">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </header>
  );
}