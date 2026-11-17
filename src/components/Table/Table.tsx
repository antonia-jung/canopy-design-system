import { useState, type ReactNode } from 'react';
import {
  Table as AriaTable,
  TableHeader,
  TableBody,
  Column,
  Row,
  Cell,
  type Selection,
  type SortDescriptor,
} from 'react-aria-components';
import { Checkbox } from '../Checkbox/Checkbox';
import { Icon } from '../Icon/Icon';
import './Table.css';

export interface TableColumn {
  id: string;
  name: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  isRowHeader?: boolean;
}
export type TableRow = { id: string } & Record<string, ReactNode>;

export interface TableProps {
  columns: TableColumn[];
  rows: TableRow[];
  size?: 'S' | 'M' | 'L';
  /** Jede zweite Zeile leicht eingedrückt */
  striped?: boolean;
  selectionMode?: 'none' | 'multiple';
  selectedKeys?: Selection;
  onSelectionChange?: (keys: Selection) => void;
  /** Standardmäßig sortiert die Tabelle Text und Zahlen selbst */
  sortDescriptor?: SortDescriptor;
  onSortChange?: (d: SortDescriptor) => void;
  emptyText?: ReactNode;
  'aria-label': string;
}

const cmp = (a: ReactNode, b: ReactNode) => {
  const x = String(a ?? '');
  const y = String(b ?? '');
  const nx = Number(x.replace(',', '.'));
  const ny = Number(y.replace(',', '.'));
  return !Number.isNaN(nx) && !Number.isNaN(ny) ? nx - ny : x.localeCompare(y, 'de');
};

/** Daten in Zeilen und Spalten. Sortierbare Spalten zeigen einen Pfeil, Auswahl per Checkbox, Pfeiltasten bewegen den Fokus. */
export function Table({
  columns,
  rows,
  size = 'M',
  striped,
  selectionMode = 'none',
  selectedKeys,
  onSelectionChange,
  sortDescriptor,
  onSortChange,
  emptyText = 'Keine Einträge',
  'aria-label': ariaLabel,
}: TableProps) {
  const [sortInner, setSortInner] = useState<SortDescriptor | undefined>();
  const sort = sortDescriptor ?? sortInner;
  const sorted = sort?.column
    ? [...rows].sort((a, b) => cmp(a[String(sort.column)], b[String(sort.column)]) * (sort.direction === 'descending' ? -1 : 1))
    : rows;
  return (
    <div className="cp-table-wrap">
      <AriaTable
        aria-label={ariaLabel}
        className="cp-table"
        data-size={size}
        data-striped={striped || undefined}
        selectionMode={selectionMode}
        selectedKeys={selectedKeys}
        onSelectionChange={onSelectionChange}
        sortDescriptor={sort}
        onSortChange={(d) => {
          setSortInner(d);
          onSortChange?.(d);
        }}
      >
        <TableHeader className="cp-table__head">
          {selectionMode === 'multiple' && (
            <Column className="cp-table__th cp-table__select">
              <Checkbox slot="selection" aria-label="Alle auswählen" />
            </Column>
          )}
          {columns.map((c) => (
            <Column key={c.id} id={c.id} isRowHeader={c.isRowHeader} allowsSorting={c.sortable} className="cp-table__th" data-align={c.align}>
              {({ sortDirection }) => (
                <span className="cp-table__th-inner">
                  {c.name}
                  {c.sortable && (
                    <Icon name="chevronRight" size={16} className="cp-table__sort" data-dir={sortDirection ?? 'none'} />
                  )}
                </span>
              )}
            </Column>
          ))}
        </TableHeader>
        <TableBody
          items={sorted}
          renderEmptyState={() => <div className="cp-table__empty">{emptyText}</div>}
        >
          {(row) => (
            <Row id={row.id} className="cp-table__row">
              {selectionMode === 'multiple' && (
                <Cell className="cp-table__td cp-table__select">
                  <Checkbox slot="selection" aria-label="Zeile auswählen" />
                </Cell>
              )}
              {columns.map((c) => (
                <Cell key={c.id} className="cp-table__td" data-align={c.align}>
                  {row[c.id]}
                </Cell>
              ))}
            </Row>
          )}
        </TableBody>
      </AriaTable>
    </div>
  );
}
