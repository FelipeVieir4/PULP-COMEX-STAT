import { NavLink } from 'react-router-dom';
import { shellNav } from '../../config/navigation';

export function Sidebar() {
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
            className={({ isActive }) => `dashboard-sidebar__link ${isActive ? 'dashboard-sidebar__link--active' : ''}`}
          >
            <span className="material-symbols-outlined">{index === 0 ? 'dashboard' : index === 1 ? 'swap_horiz' : index === 2 ? 'inventory_2' : index === 3 ? 'handshake' : 'assessment'}</span>
            <span>
              <strong>{item.label}</strong>
              <small>{item.description}</small>
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="dashboard-sidebar__footer">
        <div className="dashboard-sidebar__profile">
          <div className="dashboard-sidebar__avatar">JD</div>
          <div>
            <strong>Analyst Account</strong>
            <p>Institutional Access</p>
          </div>
        </div>
      </div>
    </aside>
  );
}