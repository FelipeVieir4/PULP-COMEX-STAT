import { useMemo, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LabelList, Cell,
} from 'recharts';
import { useCountryExports } from '../../hooks/useCountryExports';
import { useDashboardFilters } from '../../contexts/DashboardFiltersContext';
import { NCM_PULP_CODES } from '../../data/ncmCodes';
import { exportCountryToXlsx } from '../../lib/exportXlsx';
import type { CountryExportRow } from '../../types/domain';

const TOP_N_OPTIONS = [10, 15, 20] as const;

type Metric = 'usd' | 'kg';
type TopN = typeof TOP_N_OPTIONS[number];

function formatUSD(v: number): string {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}Bi`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}Mi`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}k`;
  return `$${v.toFixed(0)}`;
}

function formatTons(v: number): string {
  const mt = v / 1e6;
  if (mt >= 1) return `${mt % 1 === 0 ? mt.toFixed(0) : mt.toFixed(1)}Mt`;
  const kt = v / 1e3;
  if (kt >= 1) return `${kt % 1 === 0 ? kt.toFixed(0) : kt.toFixed(1)}kt`;
  return `${v.toFixed(0)}t`;
}

type ChartRow = { country: string; value: number };

function buildChartData(rows: CountryExportRow[], metric: Metric, topN: TopN): ChartRow[] {
  const totals = new Map<string, { fob: number; tons: number }>();

  for (const row of rows) {
    const entry = totals.get(row.country) ?? { fob: 0, tons: 0 };
    entry.fob  += Number(row.metricFOB);
    entry.tons += Number(row.metricKG) / 1000;
    totals.set(row.country, entry);
  }

  return [...totals.entries()]
    .map(([country, { fob, tons }]) => ({
      country,
      value: metric === 'usd' ? fob : tons,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, topN);
}

// Gradiente do primary para o secondary
const BAR_COLORS = [
  '#6ffbbe', '#5df5b0', '#4aefa2', '#38e994', '#26e386',
  '#60a5fa', '#4d96f0', '#3a87e6', '#2778dc', '#1469d2',
  '#c084fc', '#ad71f0', '#9a5ee4', '#874bd8', '#7438cc',
  '#fbbf24', '#f5b012', '#efa100', '#e99200', '#e38300',
];

export function CountryExportsCard() {
  const { period, selectedNcms } = useDashboardFilters();
  const [metric, setMetric] = useState<Metric>('usd');
  const [topN, setTopN]     = useState<TopN>(10);

  const effectiveNcms = selectedNcms ? [...selectedNcms] : [...NCM_PULP_CODES];

  const state = useCountryExports(period, effectiveNcms);
  const fmt   = metric === 'usd' ? formatUSD : formatTons;

  const chartData = useMemo(
    () => state.status === 'success' ? buildChartData(state.rows, metric, topN) : [],
    [state, metric, topN],
  );

  const barHeight = 36;
  const chartHeight = chartData.length * barHeight + 40;

  return (
    <section className="dashboard-table-card ncm-fob-exports-card">
      <div className="dashboard-card-header">
        <h3>Exportações por País de Destino</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="status-pill status-pill--live">Celulose</span>
          {state.status === 'success' && (
            <button
              type="button"
              className="button"
              onClick={() => exportCountryToXlsx({ rows: state.rows, period })}
              title="Baixar dados em Excel"
            >
              <span className="material-symbols-outlined">download</span>
              Excel
            </button>
          )}
        </div>
      </div>

      <div className="ncm-balance-card__body">

        {/* Controles */}
        <div className="ncm-controls">
          {/* Top N */}
          <div className="ncm-metric-toggle">
            {TOP_N_OPTIONS.map(n => (
              <button
                key={n}
                type="button"
                className={`ncm-metric-toggle__btn${topN === n ? ' ncm-metric-toggle__btn--active' : ''}`}
                onClick={() => setTopN(n)}
              >
                Top {n}
              </button>
            ))}
          </div>

          {/* Métrica */}
          <div className="ncm-metric-toggle">
            <button
              type="button"
              className={`ncm-metric-toggle__btn${metric === 'usd' ? ' ncm-metric-toggle__btn--active' : ''}`}
              onClick={() => setMetric('usd')}
            >
              USD FOB
            </button>
            <button
              type="button"
              className={`ncm-metric-toggle__btn${metric === 'kg' ? ' ncm-metric-toggle__btn--active' : ''}`}
              onClick={() => setMetric('kg')}
            >
              Toneladas
            </button>
          </div>
        </div>

        {state.status === 'loading' && (
          <div className="ncm-balance-card__feedback">
            <span className="material-symbols-outlined">hourglass_empty</span>
            Carregando dados…
          </div>
        )}

        {state.status === 'error' && (
          <div className="ncm-balance-card__feedback ncm-balance-card__feedback--error">
            <span className="material-symbols-outlined">error_outline</span>
            {state.message}
          </div>
        )}

        {state.status === 'success' && chartData.length > 0 && (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 0, right: 80, bottom: 0, left: 0 }}
            >
              <CartesianGrid horizontal={false} stroke="var(--border)" strokeDasharray="4 3" />
              <XAxis
                type="number"
                tickFormatter={fmt}
                tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="country"
                width={130}
                tick={{ fontSize: 11, fill: 'var(--text)', fontFamily: 'Inter, sans-serif' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: unknown) => [fmt(value as number), metric === 'usd' ? 'FOB' : 'Peso']}
                contentStyle={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  color: 'var(--text)',
                  boxShadow: 'var(--shadow-md)',
                }}
                cursor={{ fill: 'var(--surface)', opacity: 0.6 }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={28}>
                {chartData.map(({ country }, i) => (
                  <Cell key={country} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                ))}
                <LabelList
                  dataKey="value"
                  position="right"
                  formatter={(v: unknown) => fmt(v as number)}
                  style={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

      </div>
    </section>
  );
}
