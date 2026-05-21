import { useLastUpdated } from '../../hooks/useLastUpdated';

const MONTH_NAMES: Record<string, string> = {
  '01': 'janeiro', '02': 'fevereiro', '03': 'março', '04': 'abril',
  '05': 'maio', '06': 'junho', '07': 'julho', '08': 'agosto',
  '09': 'setembro', '10': 'outubro', '11': 'novembro', '12': 'dezembro',
};

export function LastUpdatedBadge() {
  const state = useLastUpdated();

  if (state.status === 'loading') {
    return (
      <span className="last-updated-badge last-updated-badge--loading" aria-busy="true">
        <span className="material-symbols-outlined">schedule</span>
        Carregando…
      </span>
    );
  }

  if (state.status === 'error') {
    return null;
  }

  const { year, monthNumber, updated } = state.data;
  const monthName = MONTH_NAMES[monthNumber] ?? monthNumber;
  const label = `${monthName} de ${year}`;

  return (
    <span className="last-updated-badge" title={`Dados atualizados até ${updated}`}>
      <span className="material-symbols-outlined">event_available</span>
      Atualizado até <strong>{label}</strong>
    </span>
  );
}
