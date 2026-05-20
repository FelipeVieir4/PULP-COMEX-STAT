import type { ReactNode } from 'react';

type PanelProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
};

export function Panel({ title, description, children, actions }: PanelProps) {
  return (
    <section className="panel">
      {(title || description || actions) && (
        <div className="panel__header">
          <div>
            {title ? <h2>{title}</h2> : null}
            {description ? <p>{description}</p> : null}
          </div>
          {actions ? <div className="panel__actions">{actions}</div> : null}
        </div>
      )}
      {children}
    </section>
  );
}