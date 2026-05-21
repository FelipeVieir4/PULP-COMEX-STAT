import { useRef, useState } from 'react';
import { useDashboardFilters } from '../../contexts/DashboardFiltersContext';
import { NCM_PULP_CODES, NCM_FULL_LABELS } from '../../data/ncmCodes';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 27 }, (_, i) => String(2000 + i));

export function DashboardFilterBar() {
  const { period, setPeriod, selectedNcms, setSelectedNcms } = useDashboardFilters();

  const [draftFrom, setDraftFrom] = useState(period.from.slice(0, 4));
  const [draftTo, setDraftTo]     = useState(period.to.slice(0, 4));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const effectiveSelected = selectedNcms ?? new Set(NCM_PULP_CODES);

  function applyPeriod() {
    const from = Math.min(Number(draftFrom), Number(draftTo));
    const to   = Math.max(Number(draftFrom), Number(draftTo));
    setPeriod({ from: `${from}-01`, to: `${to}-12` });
  }

  function toggleNcm(code: string) {
    const next = new Set(effectiveSelected);
    if (next.has(code)) { if (next.size > 1) next.delete(code); }
    else next.add(code);
    setSelectedNcms(next);
  }

  // fecha dropdown ao clicar fora
  function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget)) setDropdownOpen(false);
  }

  const allSelected = selectedNcms === null;
  const noneSelected = !allSelected && effectiveSelected.size === 0;

  return (
    <div className="dashboard-filter-bar">
      {/* Período */}
      <div className="ncm-period">
        <label className="ncm-period__label">De</label>
        <select className="ncm-period__select" value={draftFrom} onChange={e => setDraftFrom(e.target.value)}>
          {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <label className="ncm-period__label">Até</label>
        <select className="ncm-period__select" value={draftTo} onChange={e => setDraftTo(e.target.value)}>
          {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <button type="button" className="button button--primary ncm-period__apply" onClick={applyPeriod}>
          <span className="material-symbols-outlined">refresh</span>
          Aplicar
        </button>
      </div>

      {/* Filtro NCM */}
      <div className="ncm-filter" ref={dropdownRef} onBlur={handleBlur} tabIndex={-1}>
        <button
          type="button"
          className="ncm-filter__trigger"
          onClick={() => setDropdownOpen(o => !o)}
        >
          <span className="material-symbols-outlined">filter_list</span>
          {allSelected
            ? 'Todos os NCMs'
            : noneSelected
              ? 'Nenhum NCM'
              : `${effectiveSelected.size} de ${NCM_PULP_CODES.length} NCMs`}
          <span
            className="material-symbols-outlined ncm-filter__chevron"
            data-open={dropdownOpen ? 'true' : 'false'}
          >
            expand_more
          </span>
        </button>

        {dropdownOpen && (
          <div className="ncm-filter__dropdown">
            <div className="ncm-filter__actions">
              <button type="button" className="ncm-filter__action-btn" onClick={() => setSelectedNcms(null)}>
                Marcar todos
              </button>
              <button type="button" className="ncm-filter__action-btn" onClick={() => setSelectedNcms(new Set())}>
                Desmarcar todos
              </button>
            </div>
            {NCM_PULP_CODES.map(code => (
              <label key={code} className="ncm-filter__item">
                <input
                  type="checkbox"
                  checked={effectiveSelected.has(code)}
                  onChange={() => toggleNcm(code)}
                />
                <span className="ncm-filter__code">{code}</span>
                <span className="ncm-filter__label">{NCM_FULL_LABELS[code]}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
