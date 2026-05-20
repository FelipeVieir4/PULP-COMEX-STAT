import type { MetricCardData } from '../../types/domain';

type MetricCardProps = MetricCardData;

export function MetricCard({ title, value, detail, trendLabel, trendDirection }: MetricCardProps) {
  return (
    <article className="metric-card">
      <p className="eyebrow">{title}</p>
      <div className="metric-card__value-row">
        <strong className="metric-card__value">{value}</strong>
        <span className={`trend trend--${trendDirection}`}>{trendLabel}</span>
      </div>
      <p className="metric-card__detail">{detail}</p>
    </article>
  );
}