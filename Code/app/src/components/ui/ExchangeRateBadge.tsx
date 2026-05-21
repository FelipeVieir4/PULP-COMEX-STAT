import { useExchangeRates } from '../../hooks/useExchangeRates';
import type { CurrencyRate } from '../../hooks/useExchangeRates';

function formatBid(bid: string): string {
  return Number(bid).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatPct(pct: string): string {
  const n = Number(pct);
  return `${n > 0 ? '+' : ''}${n.toFixed(2).replace('.', ',')}%`;
}

function RateChip({ rate }: { rate: CurrencyRate }) {
  const pct = Number(rate.pctChange);
  const up = pct > 0;
  const flat = pct === 0;

  return (
    <span className={`exchange-rate-chip${up ? ' exchange-rate-chip--up' : flat ? '' : ' exchange-rate-chip--down'}`}>
      <span className="exchange-rate-chip__code">{rate.code}</span>
      <span className="exchange-rate-chip__bid">R$ {formatBid(rate.bid)}</span>
      <span className="exchange-rate-chip__pct">
        <span className="material-symbols-outlined">
          {up ? 'arrow_drop_up' : flat ? 'remove' : 'arrow_drop_down'}
        </span>
        {formatPct(rate.pctChange)}
      </span>
    </span>
  );
}

export function ExchangeRateBadge() {
  const state = useExchangeRates();

  if (state.status !== 'success') return null;

  return (
    <div className="exchange-rate-badge">
      <RateChip rate={state.usd} />
      <RateChip rate={state.eur} />
    </div>
  );
}
