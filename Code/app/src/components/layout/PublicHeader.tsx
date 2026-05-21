import { NavLink, Link } from 'react-router-dom';
import { publicNav } from '../../config/navigation';
import { ThemeSwitcher } from '../theme/ThemeSwitcher';

export function PublicHeader() {
  return (
    <header className="landing-header">
      <div className="landing-header__brand">
        <Link to="/" className="landing-header__title">PULP COMEX STAT</Link>
      </div>

      <nav className="landing-header__nav" aria-label="Navegação principal">
        {publicNav.map((item, index) => (
          <NavLink
            key={`${item.label}-${index}`}
            to={item.href}
            className={({ isActive }) =>
              `landing-header__link${isActive ? ' landing-header__link--active' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="landing-header__actions">
        <ThemeSwitcher />
        <Link to="/login" className="button button--primary" style={{ fontSize: '0.85rem', minHeight: 36, padding: '0 16px' }}>
          Entrar
        </Link>
      </div>
    </header>
  );
}