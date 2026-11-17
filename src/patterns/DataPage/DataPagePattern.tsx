import { useMemo, useState, type ReactNode } from 'react';
import { SearchBox } from '../../components/SearchBox/SearchBox';
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl';
import { Table, type TableRow } from '../../components/Table/Table';
import { List, ListItem } from '../../components/ListItem/ListItem';
import { Pagination } from '../../components/Pagination/Pagination';
import { Button } from '../../components/Button/Button';
import { Avatar } from '../../components/Avatar/Avatar';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import '../Login/Login.css';
import './DataPage.css';

export interface DataRow { id: string; name: string; topic: string; status: string; date: string }

export interface DataPagePatternProps {
  title?: string;
  rows: DataRow[];
  statuses: string[];
  pageSize?: number;
  onNew?: () => void;
  newLabel?: ReactNode;
}

const norm = (s: string) => s.toLocaleLowerCase('de');

/** Datenseite mit Kopfzeile, Suche, Filter und Tabelle. In schmalen Bereichen wird aus der Tabelle eine Liste. */
export function DataPagePattern({ title = 'Anfragen', rows, statuses, pageSize = 5, onNew, newLabel = 'Neu' }: DataPagePatternProps) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('Alle');
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => rows.filter((r) => (status === 'Alle' || r.status === status) && (!query.trim() || norm(`${r.name} ${r.topic}`).includes(norm(query.trim())))), [rows, status, query]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages);
  const shown = filtered.slice((current - 1) * pageSize, current * pageSize);
  const tableRows: TableRow[] = shown.map((r) => ({ ...r }));

  return (
    <div className="cp-container cp-pattern cp-datapage">
      <div className="cp-datapage__inner">
        <div className="cp-datapage__header">
          <h2 className="cp-login__title" style={{ fontSize: 32 }}>{title}</h2>
          <Button variant="outline" onPress={onNew}>{newLabel}</Button>
        </div>
        <div className="cp-datapage__toolbar">
          <div className="cp-datapage__search"><SearchBox aria-label={`${title} durchsuchen`} value={query} onChange={(v) => { setQuery(v); setPage(1); }} placeholder="Suchen" /></div>
          <div className="cp-datapage__filter"><SegmentedControl aria-label="Status" segments={['Alle', ...statuses].map((s) => ({ id: s, label: s }))} selectedKey={status} onSelectionChange={(k) => { setStatus(String(k)); setPage(1); }} /></div>
        </div>
        {shown.length === 0 ? (
          <EmptyState type="search" title="Keine Einträge" description="Passe Suche oder Filter an." />
        ) : (
          <>
            <div className="cp-datapage__table">
              <Table aria-label={title} columns={[{ id: 'name', name: 'Name', isRowHeader: true, sortable: true }, { id: 'topic', name: 'Thema', sortable: true }, { id: 'status', name: 'Status' }, { id: 'date', name: 'Datum', align: 'right', sortable: true }]} rows={tableRows} />
            </div>
            <div className="cp-datapage__list">
              <List aria-label={title}>
                {shown.map((r) => <ListItem key={r.id} title={r.name} description={`${r.topic} · ${r.status}`} leading={<Avatar name={r.name} size="S" />} />)}
              </List>
            </div>
          </>
        )}
        {pages > 1 && <div className="cp-datapage__pagination"><Pagination total={pages} page={current} onPageChange={setPage} type="numbered" aria-label="Seiten" /></div>}
      </div>
    </div>
  );
}
