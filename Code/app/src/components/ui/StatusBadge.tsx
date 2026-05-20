import type { TrendDirection } from '../../types/domain';

type StatusBadgeProps = {
  direction: TrendDirection;
  label: string;
};

export function StatusBadge({ direction, label }: StatusBadgeProps) {
  return <span className={`trend trend--${direction}`}>{label}</span>;
}