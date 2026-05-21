import * as XLSX from 'xlsx';
import type { CountryExportRow, TradeBalanceRow } from '../types/domain';

export type ExportParams = {
  rows: TradeBalanceRow[];
  selectedNcms: Set<string>;
  period: { from: string; to: string };
};

function fmt2(n: number) {
  return Number(n.toFixed(2));
}

export function exportNcmFobToXlsx({ rows, selectedNcms, period }: ExportParams) {
  const filtered = rows.filter(r => selectedNcms.has(r.coNcm));

  // ── Aba 1: dados brutos ────────────────────────────────────
  const rawRows = filtered
    .sort((a, b) => a.year.localeCompare(b.year) || a.coNcm.localeCompare(b.coNcm))
    .map(r => {
      const tons = Number(r.metricKG) / 1000;
      const fob  = Number(r.metricFOB);
      return {
        'Ano':            r.year,
        'Código NCM':     r.coNcm,
        'Descrição':      r.ncm,
        'FOB (USD)':      fmt2(fob),
        'Peso (t)':       fmt2(tons),
        'Preço (USD/t)':  tons > 0 ? fmt2(fob / tons) : 0,
      };
    });

  // ── Aba 2: resumo por ano ──────────────────────────────────
  const byYear = new Map<string, { fob: number; tons: number }>();
  for (const r of filtered) {
    const entry = byYear.get(r.year) ?? { fob: 0, tons: 0 };
    entry.fob  += Number(r.metricFOB);
    entry.tons += Number(r.metricKG) / 1000;
    byYear.set(r.year, entry);
  }

  const summaryRows = [...byYear.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, { fob, tons }]) => ({
      'Ano':             year,
      'FOB Total (USD)': fmt2(fob),
      'Peso Total (t)':  fmt2(tons),
      'Preço Médio (USD/t)': tons > 0 ? fmt2(fob / tons) : 0,
    }));

  // ── Monta workbook ─────────────────────────────────────────
  const wb = XLSX.utils.book_new();

  const wsRaw     = XLSX.utils.json_to_sheet(rawRows);
  const wsSummary = XLSX.utils.json_to_sheet(summaryRows);

  styleColumns(wsRaw,     [14, 14, 52, 16, 12, 14]);
  styleColumns(wsSummary, [8,  18, 16, 20]);

  XLSX.utils.book_append_sheet(wb, wsRaw,     'Exportações');
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Resumo por Ano');

  const from = period.from.slice(0, 4);
  const to   = period.to.slice(0, 4);
  XLSX.writeFile(wb, `exportacoes-celulose-${from}-${to}.xlsx`);
}

function styleColumns(ws: XLSX.WorkSheet, widths: number[]) {
  ws['!cols'] = widths.map(wch => ({ wch }));
}

// ── Exportação por país ───────────────────────────────────────

export type CountryExportParams = {
  rows: CountryExportRow[];
  period: { from: string; to: string };
};

export function exportCountryToXlsx({ rows, period }: CountryExportParams) {
  // Aba 1: dados por ano × país
  const rawRows = rows
    .sort((a, b) => a.year.localeCompare(b.year) || a.country.localeCompare(b.country))
    .map(r => {
      const tons = Number(r.metricKG) / 1000;
      const fob  = Number(r.metricFOB);
      return {
        'Ano':           r.year,
        'País':          r.country,
        'FOB (USD)':     fmt2(fob),
        'Peso (t)':      fmt2(tons),
        'Preço (USD/t)': tons > 0 ? fmt2(fob / tons) : 0,
      };
    });

  // Aba 2: ranking agregado do período
  const totals = new Map<string, { fob: number; tons: number }>();
  for (const r of rows) {
    const e = totals.get(r.country) ?? { fob: 0, tons: 0 };
    e.fob  += Number(r.metricFOB);
    e.tons += Number(r.metricKG) / 1000;
    totals.set(r.country, e);
  }

  const rankingRows = [...totals.entries()]
    .sort(([, a], [, b]) => b.fob - a.fob)
    .map(([country, { fob, tons }], i) => ({
      'Rank':          i + 1,
      'País':          country,
      'FOB Total (USD)':     fmt2(fob),
      'Peso Total (t)':      fmt2(tons),
      'Preço Médio (USD/t)': tons > 0 ? fmt2(fob / tons) : 0,
    }));

  const wb = XLSX.utils.book_new();

  const wsRaw     = XLSX.utils.json_to_sheet(rawRows);
  const wsRanking = XLSX.utils.json_to_sheet(rankingRows);

  styleColumns(wsRaw,     [8, 28, 16, 12, 14]);
  styleColumns(wsRanking, [6, 28, 18, 14, 18]);

  XLSX.utils.book_append_sheet(wb, wsRaw,     'Por Ano e País');
  XLSX.utils.book_append_sheet(wb, wsRanking, 'Ranking');

  const from = period.from.slice(0, 4);
  const to   = period.to.slice(0, 4);
  XLSX.writeFile(wb, `exportacoes-pais-${from}-${to}.xlsx`);
}
