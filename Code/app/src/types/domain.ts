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