import { useMemo, useState } from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LabelList,
} from 'recharts';
import { useNcmFobExports } from '../../hooks/useNcmFobExports';
import { useDashboardFilters } from '../../contexts/DashboardFiltersContext';
import { exportNcmFobToXlsx } from '../../lib/exportXlsx';
import type { TradeBalanceRow } from '../../types/domain';

const PALETTE = [
  '#4ade80', '#60a5fa', '#f87171', '#fbbf24',
  '#c084fc', '#fb923c', '#22d3ee', '#f472b6',
];

type Metric = 'kg' | 'usd';
type NcmMeta = { coNcm: string; ncm: string; color: string };

function buildNcmList(rows: TradeBalanceRow[]): NcmMeta[] {
  const seen = new Map<string, string>();
  for (const row of rows) {
    if (!seen.has(row.coNcm)) seen.set(row.coNcm, row.ncm);
  }
  return [...seen.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([coNcm, ncm], i) => ({ coNcm, ncm, color: PALETTE[i % PALETTE.length] }));
}

function buildChartData(rows: TradeBalanceRow[], selected: Set<string>, metric: Metric) {
  const years = [...new Set(rows.map(r => r.year))].sort();
  return years.map(year => {
    const entry: Record<string, number | string> = { year };
    let total = 0;
    let totalFob = 0;
    let totalTons = 0;
    for (const row of rows) {
      if (row.year === year && selected.has(row.coNcm)) {
        const v = metric === 'kg'
          ? Number(row.metricKG) / 1000
          : Number(row.metricFOB);
        entry[row.coNcm] = v;
        total += v;
        totalFob  += Number(row.metricFOB);
        totalTons += Number(row.metricKG) / 1000;
      }
    }
    entry._total = total;
    entry._price = totalTons > 0 ? totalFob / totalTons : 0;
    return entry;
  });
}

function formatTons(v: number): string {
  const mt = v / 1e6;
  if (mt >= 1) return `${mt % 1 === 0 ? mt.toFixed(0) : mt.toFixed(1)}Mt`;
  const kt = v / 1e3;
  if (kt >= 1) return `${kt % 1 === 0 ? kt.toFixed(0) : kt.toFixed(1)}kt`;
  return `${v.toFixed(0)}t`;
}

function formatPrice(v: number): string {
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}k/t`;
  return `$${v.toFixed(0)}/t`;
}

function formatUSD(v: number): string {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(v % 1e9 === 0 ? 0 : 1)}Bi`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(v % 1e6 === 0 ? 0 : 1)}Mi`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}k`;
  return `$${v.toFixed(0)}`;
}

export function NcmFobExportsCard() {
  const { period, selectedNcms } = useDashboardFilters();
  const [metric, setMetric] = useState<Metric>('kg');

  const state = useNcmFobExports(period);

  const ncmList = useMemo(
    () => (state.status === 'success' ? buildNcmList(state.rows) : []),
    [state],
  );

  const effectiveSelected = useMemo(
    () => selectedNcms ?? new Set(ncmList.map(n => n.coNcm)),
    [selectedNcms, ncmList],
  );

  const chartData = useMemo(
    () => (state.status === 'success'
      ? buildChartData(state.rows, effectiveSelected, metric)
      : []),
    [state, effectiveSelected, metric],
  );

  const visibleNcms = useMemo(
    () => ncmList.filter(n => effectiveSelected.has(n.coNcm)),
    [ncmList, effectiveSelected],
  );

  const fmt = metric === 'kg' ? formatTons : formatUSD;

  return (
    <section className="dashboard-table-card ncm-fob-exports-card">
      <div className="dashboard-card-header">
        <h3>Exportações FOB — Celulose por NCM</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="status-pill status-pill--live">Celulose</span>
          {state.status === 'success' && (
            <button
              type="button"
              className="button"
              onClick={() => exportNcmFobToXlsx({
                rows: state.rows,
                selectedNcms: effectiveSelected,
                period,
              })}
              title="Baixar dados em Excel"
            >
              <span className="material-symbols-outlined">download</span>
              Excel
            </button>
          )}
        </div>
      </div>

      <div className="ncm-balance-card__body">

        <div className="ncm-controls">
          <div className="ncm-metric-toggle">
            <button
              type="button"
              className={`ncm-metric-toggle__btn${metric === 'kg' ? ' ncm-metric-toggle__btn--active' : ''}`}
              onClick={() => setMetric('kg')}
            >
              Toneladas
            </button>
            <button
              type="button"
              className={`ncm-metric-toggle__btn${metric === 'usd' ? ' ncm-metric-toggle__btn--active' : ''}`}
              onClick={() => setMetric('usd')}
            >
              USD FOB
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

        {state.status === 'success' && effectiveSelected.size === 0 && (
          <div className="ncm-balance-card__feedback">
            <span className="material-symbols-outlined">filter_list_off</span>
            Nenhum NCM selecionado.
          </div>
        )}

        {state.status === 'success' && effectiveSelected.size > 0 && chartData.length > 0 && (
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={chartData} barCategoryGap="28%" margin={{ top: 28, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="4 3" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tickFormatter={fmt}
                tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}
                axisLine={false}
                tickLine={false}
                width={56}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={formatPrice}
                tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}
                axisLine={false}
                tickLine={false}
                width={60}
              />
              <Tooltip
                formatter={(value: unknown, name: unknown) => {
                  const key = name as string;
                  if (key === '_price') return [formatPrice(value as number), 'Preço médio'];
                  const meta = ncmList.find(n => n.coNcm === key);
                  return [fmt(value as number), meta?.ncm ?? key];
                }}
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
              {visibleNcms.map(({ coNcm, color }, i) => (
                <Bar
                  key={coNcm}
                  dataKey={coNcm}
                  stackId="a"
                  yAxisId="left"
                  fill={color}
                  radius={i === visibleNcms.length - 1 ? [4, 4, 0, 0] : undefined}
                >
                  {i === visibleNcms.length - 1 && (
                    <LabelList
                      dataKey="_total"
                      position="top"
                      content={({ x, y, width, value }) => {
                        if (value == null) return null;
                        const text = fmt(value as number);
                        const cx = Number(x) + Number(width) / 2;
                        const cy = Number(y);
                        const pw = text.length * 6.5 + 10;
                        return (
                          <g>
                            <rect
                              x={cx - pw / 2} y={cy - 20}
                              width={pw} height={15}
                              rx={3}
                              fill="var(--bg-elevated)"
                              stroke="var(--border)"
                              strokeWidth={1}
                            />
                            <text
                              x={cx} y={cy - 9}
                              textAnchor="middle"
                              fontSize={10}
                              fill="var(--text-muted)"
                              fontFamily="Inter, sans-serif"
                              fontWeight={500}
                            >
                              {text}
                            </text>
                          </g>
                        );
                      }}
                    />
                  )}
                </Bar>
              ))}
              <Line
                yAxisId="right"
                dataKey="_price"
                type="monotone"
                stroke="var(--text)"
                strokeWidth={2}
                strokeDasharray="5 3"
                dot={{ fill: 'var(--bg-elevated)', stroke: 'var(--text)', strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5 }}
                name="_price"
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}

        {state.status === 'success' && effectiveSelected.size > 0 && (
          <div className="ncm-legend">
            <div className="ncm-legend__item">
              <span className="ncm-legend__line-swatch" />
              <span className="ncm-legend__desc">Preço médio (USD/t)</span>
            </div>
            {visibleNcms.map(({ coNcm, ncm, color }) => (
              <div key={coNcm} className="ncm-legend__item">
                <span className="ncm-legend__swatch" style={{ background: color }} />
                <span className="ncm-legend__code">{coNcm}</span>
                <span className="ncm-legend__desc" title={ncm}>{ncm}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
