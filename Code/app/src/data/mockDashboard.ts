import type { MetricCardData, TableRow } from '../types/domain';

export const dashboardMetrics: MetricCardData[] = [
  {
    title: 'Exportações de celulose',
    value: 'US$ 4.8 bi',
    detail: 'Recorte inicial para o Brasil com foco em NCM/SH prioritários.',
    trendLabel: '+12.4% no período',
    trendDirection: 'up',
  },
  {
    title: 'Municípios monitorados',
    value: '187',
    detail: 'Base para relacionar produção, logística e fábricas por endereço.',
    trendLabel: '+18 municípios',
    trendDirection: 'up',
  },
  {
    title: 'NCM/SH em escopo',
    value: '7 classes',
    detail: 'Foco inicial em celulose, pastas e produtos correlatos.',
    trendLabel: 'Estrutura pronta para expansão global',
    trendDirection: 'flat',
  },
];

export const dashboardRows: TableRow[] = [
  {
    label: 'Pará',
    value: '1.24 mi t',
    trend: '+8.1%',
    note: 'Maior concentração logística do corredor norte.',
  },
  {
    label: 'Mato Grosso do Sul',
    value: '980 mil t',
    trend: '+6.9%',
    note: 'Base industrial relevante para novas plantas.',
  },
  {
    label: 'São Paulo',
    value: '640 mil t',
    trend: '+3.2%',
    note: 'Consumo industrial e hubs de distribuição.',
  },
  {
    label: 'Bahia',
    value: '410 mil t',
    trend: '-1.4%',
    note: 'Região de atenção para rotas e competitividade.',
  },
];