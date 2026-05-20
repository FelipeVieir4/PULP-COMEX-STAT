import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <div className="dashboard-shell__main">
        <TopBar />
        <main className="dashboard-shell__content">
          {children}
        </main>
      </div>
    </div>
  );
}