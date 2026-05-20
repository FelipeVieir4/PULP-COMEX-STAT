import { ThemeSwitcher } from '../theme/ThemeSwitcher';
export function TopBar() {
  return (
    <header className="dashboard-topbar">
      <div className="dashboard-topbar__search">
        <span className="material-symbols-outlined">search</span>
        <input type="search" placeholder="Search markets, HS codes, or countries..." aria-label="Pesquisar dados" />
      </div>

      <div className="dashboard-topbar__actions">
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