import { AppShell } from '../../components/layout/AppShell';

const partners = [
  { name: 'China', exportValue: 'US$ 104.3B', importValue: 'US$ 53.2B', trend: '+8.4%', trendClass: 'up' },
  { name: 'United States', exportValue: 'US$ 36.9B', importValue: 'US$ 38.0B', trend: '-2.1%', trendClass: 'down' },
  { name: 'Argentina', exportValue: 'US$ 16.7B', importValue: 'US$ 11.9B', trend: '+1.2%', trendClass: 'up' },
  { name: 'Netherlands', exportValue: 'US$ 12.1B', importValue: 'US$ 2.4B', trend: '+12.8%', trendClass: 'up' },
];

const regions = [
  { label: 'Asia (Excl. Middle East)', value: 45.2 },
  { label: 'European Union', value: 15.8 },
  { label: 'North America', value: 14.1 },
  { label: 'South America (MERCOSUR)', value: 12.4 },
  { label: 'Middle East & Africa', value: 12.5 },
];

const dashboardCards = [
  { icon: 'anchor', label: 'Active Ports', value: '142', suffix: 'Terminals', trend: '+12%', direction: 'up' as const },
  { icon: 'domain', label: 'Registered Companies', value: '28,491', suffix: 'Exporters', trend: '-2.4%', direction: 'down' as const },
  { icon: 'inventory_2', label: 'Unique Products (NCM)', value: '4,802', suffix: 'SKUs', trend: 'Stable', direction: 'flat' as const },
  { icon: 'payments', label: 'Service Deficit', value: '-$4.2B', suffix: 'USD', trend: 'Deficit', direction: 'down' as const },
];

export function DashboardPage() {
  return (
    <AppShell>
      <div className="dashboard-page">
        <div className="dashboard-page__header-actions">
          <div>
            <h2>External Trade Overview</h2>
            <p>Brazil focus with cellulose data, municipality mapping and future global expansion.</p>
          </div>
          <div className="dashboard-page__actions">
            <button type="button" className="button button--ghost">Year 2024</button>
            <button type="button" className="button button--primary">Export Data</button>
          </div>
        </div>

        <div className="dashboard-summary-grid">
          {dashboardCards.map((card) => (
            <article key={card.label} className="summary-card">
              <div className="summary-card__top">
                <span className="material-symbols-outlined">{card.icon}</span>
                <span className={`status-pill ${card.direction === 'down' ? 'status-pill--danger' : card.direction === 'flat' ? 'status-pill--neutral' : 'status-pill--success'}`}>{card.trend}</span>
              </div>
              <div>
                <p>{card.label}</p>
                <h3>{card.value} <span>{card.suffix}</span></h3>
              </div>
            </article>
          ))}
        </div>

        <section className="dashboard-chart-card">
          <div className="dashboard-card-header">
            <h3>Evolução do Comércio (Monthly)</h3>
            <div className="toggle-group">
              <button type="button" className="toggle-group__button toggle-group__button--active">Line</button>
              <button type="button" className="toggle-group__button">Bar</button>
            </div>
          </div>

          <div className="dashboard-chart-card__body">
            <svg className="dashboard-line-chart" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
              <line x1="0" x2="1000" y1="75" y2="75" />
              <line x1="0" x2="1000" y1="150" y2="150" />
              <line x1="0" x2="1000" y1="225" y2="225" />
              <path d="M0,250 L83,230 L166,210 L249,190 L332,150 L415,180 L498,140 L581,110 L664,130 L747,90 L830,70 L913,50 L1000,40" />
              <path className="dashboard-line-chart__secondary" d="M0,280 L83,270 L166,240 L249,250 L332,220 L415,230 L498,210 L581,220 L664,190 L747,200 L830,180 L913,190 L1000,170" />
            </svg>

            <div className="dashboard-chart-card__legend">
              <div><span className="legend-swatch legend-swatch--primary" />Exports</div>
              <div><span className="legend-swatch legend-swatch--secondary" />Imports</div>
            </div>
          </div>
        </section>

        <div className="dashboard-grid dashboard-grid--lower">
          <section className="dashboard-table-card">
            <div className="dashboard-card-header">
              <h3>Major Trading Partners</h3>
              <button type="button" className="link-button">View All</button>
            </div>

            <div className="table-scroll">
              <table className="wireframe-table">
                <thead>
                  <tr>
                    <th>Partner</th>
                    <th>Export Value</th>
                    <th>Import Value</th>
                    <th className="text-right">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {partners.map((partner) => (
                    <tr key={partner.name}>
                      <td>{partner.name}</td>
                      <td>{partner.exportValue}</td>
                      <td>{partner.importValue}</td>
                      <td className={`text-right ${partner.trendClass === 'down' ? 'trend-down' : 'trend-up'}`}>{partner.trend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="dashboard-region-card">
            <div className="dashboard-card-header">
              <h3>Regional Share (%)</h3>
              <span className="material-symbols-outlined">info</span>
            </div>

            <div className="region-bars">
              {regions.map((region) => (
                <div key={region.label} className="region-bars__item">
                  <div className="region-bars__label">
                    <span>{region.label}</span>
                    <span>{region.value}%</span>
                  </div>
                  <div className="region-bars__track">
                    <div style={{ width: `${region.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="dashboard-footer">
          <p>© 2024 PULP COMEX STAT Intelligence Platform. Data sourced from Official Customs Records.</p>
          <div>
            <a href="#">Legal Notice</a>
            <a href="#">Terms of Trade</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Methodology</a>
          </div>
        </footer>
      </div>
    </AppShell>
  );
}