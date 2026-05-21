export type ThemeMode = 'light' | 'dark' | 'system';

export type TrendDirection = 'up' | 'down' | 'flat';

export type MetricCardData = {
  title: string;
  value: string;
  detail: string;
  trendLabel: string;
  trendDirection: TrendDirection;
};

export type TableRow = {
  label: string;
  value: string;
  trend: string;
  note: string;
};

export type ReportFilter = {
  name: string;
  value: string;
};

export type TradeBalanceFilter = {
  filter: string;
  values: string[];
};

export type TradeBalanceQuery = {
  flow: 'export' | 'import';
  monthDetail: boolean;
  period: { from: string; to: string };
  filters: TradeBalanceFilter[];
  details: string[];
  metrics: string[];
};

export type TradeBalanceRow = {
  coNcm: string;
  ncm: string;
  year: string;
  metricFOB: string;
  metricKG: string;
};

export type TradeBalanceResponse = {
  data: {
    list: TradeBalanceRow[];
  };
  success: boolean;
  message: string | null;
};

export type CountryExportRow = {
  country: string;
  year: string;
  metricFOB: string;
  metricKG: string;
};

export type CountryExportResponse = {
  data: { list: CountryExportRow[] };
  success: boolean;
  message: string | null;
};

export type LastUpdatedData = {
  updated: string;
  year: string;
  monthNumber: string;
};

export type LastUpdatedDateResponse = {
  data: LastUpdatedData;
  success: boolean;
  message: string | null;
  processo_info: unknown;
  language: string;
};