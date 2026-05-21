import { NavLink } from 'react-router-dom';
import { shellNav } from '../../config/navigation';
import { useAuth } from '../../context/AuthContext';

export function Sidebar() {
  const { user, signOut } = useAuth();

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : 'US';

  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar__brand">
        <h1>PULP COMEX STAT</h1>
        <p>Trade Intelligence</p>
      </div>

      <nav className="dashboard-sidebar__nav" aria-label="Menu lateral">
        {shellNav.map((item, index) => (
          <NavLink
            key={`${item.label}-${index}`}
            to={item.href}
            end={item.href === '/dashboard'}
            className={({ isActive }) =>
              `dashboard-sidebar__link${isActive ? ' dashboard-sidebar__link--active' : ''}`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>
              <strong>{item.label}</strong>
              <small>{item.description}</small>
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="dashboard-sidebar__footer">
        <div className="dashboard-sidebar__profile">
          <div className="dashboard-sidebar__avatar">{initials}</div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <strong style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.85rem' }}>
              {user?.email ?? 'Conta'}
            </strong>
            <p style={{ margin: '2px 0 0', fontSize: '0.75rem' }}>Acesso Institucional</p>
          </div>
          <button
            type="button"
            className="icon-button"
            style={{ width: 32, minHeight: 32, flexShrink: 0 }}
            aria-label="Sair"
            onClick={signOut}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}