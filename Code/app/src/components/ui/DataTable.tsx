import type { TableRow } from '../../types/domain';

type DataTableProps = {
  rows: TableRow[];
  columns: Array<{ key: 'label' | 'value' | 'trend' | 'note'; header: string }>;
};

export function DataTable({ rows, columns }: DataTableProps) {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td>{row.label}</td>
              <td>{row.value}</td>
              <td>{row.trend}</td>
              <td>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}