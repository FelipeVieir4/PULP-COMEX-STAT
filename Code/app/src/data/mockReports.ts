import type { ReportFilter, TableRow } from '../types/domain';

export const reportFilters: ReportFilter[] = [
  { name: 'Período', value: 'Últimos 12 meses' },
  { name: 'Mercado', value: 'Brasil' },
  { name: 'Produto', value: 'Celulose' },
  { name: 'Agrupamento', value: 'NCM / SH' },
];

export const reportRows: TableRow[] = [
  {
    label: '4701',
    value: 'Celulose química de madeira',
    trend: 'Alto impacto',
    note: 'Classe âncora do primeiro recorte analítico.',
  },
  {
    label: '4703',
    value: 'Pastas químicas de madeira, soda ou sulfato',
    trend: 'Seguimento',
    note: 'Base para desdobrar exportações por origem.',
  },
  {
    label: '4706',
    value: 'Pastas de fibras de celulose recicladas',
    trend: 'Complementar',
    note: 'Importante para visão circular e suprimentos.',
  },
  {
    label: '4804',
    value: 'Papel e cartão não revestidos',
    trend: 'Atenção',
    note: 'Pode ampliar o escopo futuro do produto.',
  },
];