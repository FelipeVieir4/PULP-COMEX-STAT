import { AppShell } from '../../components/layout/AppShell';
import { DashboardFiltersProvider } from '../../contexts/DashboardFiltersContext';
import { DashboardFilterBar } from './DashboardFilterBar';
import { NcmFobExportsCard } from './NcmFobExportsCard';
import { CountryExportsCard } from './CountryExportsCard';

export function DashboardPage() {
  return (
    <AppShell>
      <DashboardFiltersProvider>
        <div className="dashboard-page">
          <DashboardFilterBar />
          <NcmFobExportsCard />
          <CountryExportsCard />
        </div>
      </DashboardFiltersProvider>
    </AppShell>
  );
}
