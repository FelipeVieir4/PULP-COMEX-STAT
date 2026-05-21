import { useState } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { Panel } from '../../components/ui/Panel';

const summaryCards = [
  { icon: 'anchor', label: 'Active Ports', value: '142', suffix: 'Terminals', trend: '+12%', direction: 'up' },
  { icon: 'domain', label: 'Registered Companies', value: '28,491', suffix: 'Exporters', trend: '-2.4%', direction: 'down' },
  { icon: 'inventory_2', label: 'Unique Products (NCM)', value: '4,802', suffix: 'SKUs', trend: 'Stable', direction: 'flat' },
  { icon: 'payments', label: 'Service Deficit', value: '-$4.2B', suffix: 'USD', trend: 'Deficit', direction: 'down' },
];

const productRows = [
  { code: '1201', desc: 'Soya beans, whether or not broken', value: '$14,203,110,402', weight: '28.5B', growth: '+18.4%' },
  { code: '2601', desc: 'Iron ores and concentrates, including roasted iron pyrites', value: '$9,540,291,008', weight: '112.1B', growth: '+5.2%' },
  { code: '2709', desc: 'Petroleum oils and oils obtained from bituminous minerals, crude', value: '$8,112,445,910', weight: '15.4B', growth: '-12.8%' },
  { code: '1001', desc: 'Wheat and meslin', value: '$2,451,009,211', weight: '6.2B', growth: '+22.1%' },
  { code: '0201', desc: 'Meat of bovine animals, fresh or chilled', value: '$1,988,334,012', weight: '410.2M', growth: '-4.5%' },
];

export function ReportsPage() {
  const [filtersOpen, setFiltersOpen] = useState(true);

  return (
    <AppShell>
      <div className="reports-page">
        <div className="reports-page__actions">
          <div>
            <nav className="reports-page__breadcrumbs">
              <span>Reports</span>
              <span>/</span>
              <span>Detailed Customs Analysis</span>
            </nav>
            <h2>Trade Balance Performance</h2>
          </div>
          <div className="reports-page__actions-buttons">
            <button type="button" className="button button--ghost">Export CSV</button>
            <button type="button" className="button button--primary">Share Report</button>
          </div>
        </div>

        <section className="filter-panel">
          <button type="button" className="filter-panel__header" onClick={() => setFiltersOpen((current) => !current)}>
            <div>
              <span className="material-symbols-outlined">filter_alt</span>
              <strong>Advanced Filtering</strong>
            </div>
            <span className="material-symbols-outlined filter-panel__chevron" data-open={filtersOpen ? 'true' : 'false'}>expand_more</span>
          </button>

          {filtersOpen ? (
            <div className="filter-panel__content">
              <label>
                <span>Analysis Period</span>
                <select>
                  <option>Current Year (2024)</option>
                  <option>Last 12 Months</option>
                  <option>Previous Year (2023)</option>
                  <option>Custom Range</option>
                </select>
              </label>
              <label>
                <span>Federative State (UF)</span>
                <select>
                  <option>All Territories</option>
                  <option>São Paulo (SP)</option>
                  <option>Minas Gerais (MG)</option>
                  <option>Paraná (PR)</option>
                </select>
              </label>
              <label>
                <span>Economic Category</span>
                <select>
                  <option>All Categories</option>
                  <option>Agribusiness</option>
                  <option>Manufacturing</option>
                  <option>Extractive Industry</option>
                </select>
              </label>
            </div>
          ) : null}
        </section>

        <div className="reports-page__hero-grid">
          <Panel title="Regional Concentration" actions={<div className="segmented-control"><button className="segmented-control__button segmented-control__button--active" type="button">Exports</button><button className="segmented-control__button" type="button">Imports</button></div>}>
            <div className="reports-map-card">
              <div className="reports-map-card__image" />
              <button type="button" className="button button--primary reports-map-card__button">Expand Analysis</button>
            </div>
          </Panel>

          <div className="reports-summary-grid">
            {summaryCards.map((card) => (
              <Panel key={card.label}>
                <div className="reports-summary-card">
                  <div className="reports-summary-card__top">
                    <span className="material-symbols-outlined">{card.icon}</span>
                    <span className={`status-pill ${card.direction === 'down' ? 'status-pill--danger' : card.direction === 'flat' ? 'status-pill--neutral' : 'status-pill--success'}`}>{card.trend}</span>
                  </div>
                  <div>
                    <p>{card.label}</p>
                    <h3>{card.value} <span>{card.suffix}</span></h3>
                  </div>
                </div>
              </Panel>
            ))}
          </div>
        </div>

        <div className="dashboard-grid dashboard-grid--lower reports-grid--lower">
          <section className="reports-table-card">
            <div className="reports-card-header">
              <h3>Product Level Details (NCM-4)</h3>
              <div className="segmented-control">
                <button type="button" className="segmented-control__button segmented-control__button--active">Value</button>
                <button type="button" className="segmented-control__button">Volume</button>
              </div>
            </div>

            <div className="reports-table-card__table-wrap">
              <table className="wireframe-table wireframe-table--compact">
                <thead>
                  <tr>
                    <th>NCM Code</th>
                    <th>Product Description</th>
                    <th className="text-right">Value (US$ FOB)</th>
                    <th className="text-right">Weight (KG)</th>
                    <th className="text-right">Growth (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {productRows.map((row) => (
                    <tr key={row.code}>
                      <td>{row.code}</td>
                      <td>{row.desc}</td>
                      <td className="text-right">{row.value}</td>
                      <td className="text-right">{row.weight}</td>
                      <td className="text-right"><span className={row.growth.startsWith('-') ? 'status-pill status-pill--danger' : 'status-pill status-pill--success'}>{row.growth}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="reports-table-card__footer">
              <p>Showing 1-5 of 4,802 products</p>
              <div>
                <button type="button" className="icon-button"><span className="material-symbols-outlined">chevron_left</span></button>
                <button type="button" className="icon-button"><span className="material-symbols-outlined">chevron_right</span></button>
              </div>
            </div>
          </section>

          <section className="reports-regional-card">
            <div className="reports-card-header">
              <h3>Regional Share (%)</h3>
              <span className="material-symbols-outlined">info</span>
            </div>

            <div className="reports-region-list">
              {reportRows.slice(0, 5).map((row, index) => (
                <div key={row.label} className="reports-region-list__item">
                  <div className="reports-region-list__top">
                    <span>{index === 0 ? 'Asia (Excl. Middle East)' : index === 1 ? 'European Union' : index === 2 ? 'North America' : index === 3 ? 'South America (MERCOSUR)' : 'Middle East & Africa'}</span>
                    <span>{index === 0 ? '45.2%' : index === 1 ? '15.8%' : index === 2 ? '14.1%' : index === 3 ? '12.4%' : '12.5%'}</span>
                  </div>
                  <div className="reports-region-list__track"><div style={{ width: index === 0 ? '45.2%' : index === 1 ? '15.8%' : index === 2 ? '14.1%' : index === 3 ? '12.4%' : '12.5%' }} /></div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="dashboard-footer dashboard-footer--reports">
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