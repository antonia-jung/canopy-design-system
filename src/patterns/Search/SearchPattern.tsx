import { useMemo, useState } from 'react';
import { SearchBox } from '../../components/SearchBox/SearchBox';
import { Tag } from '../../components/Tag/Tag';
import { List, ListItem } from '../../components/ListItem/ListItem';
import { Pagination } from '../../components/Pagination/Pagination';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { Icon, type IconName } from '../../components/Icon/Icon';
import { Button } from '../../components/Button/Button';
import '../Login/Login.css';
import './Search.css';

export interface SearchItem { id: string; title: string; description: string; category: string; href?: string; icon?: IconName }

export interface SearchPatternProps {
  items: SearchItem[];
  /** Filter-Kategorien, „Alle“ kommt automatisch davor */
  categories: string[];
  pageSize?: number;
  defaultQuery?: string;
}

const norm = (s: string) => s.toLocaleLowerCase('de');

/** Suche mit Filter-Tags, Ergebnisliste und Seitenwechsel. Der Zähler wird bei Änderungen vorgelesen. */
export function SearchPattern({ items, categories, pageSize = 4, defaultQuery = '' }: SearchPatternProps) {
  const [query, setQuery] = useState(defaultQuery);
  const [category, setCategory] = useState('Alle');
  const [page, setPage] = useState(1);
  const results = useMemo(() => items.filter((i) => (category === 'Alle' || i.category === category) && (!query.trim() || norm(i.title + ' ' + i.description).includes(norm(query.trim())))), [items, category, query]);
  const pages = Math.max(1, Math.ceil(results.length / pageSize));
  const current = Math.min(page, pages);
  const shown = results.slice((current - 1) * pageSize, current * pageSize);
  const reset = () => { setQuery(''); setCategory('Alle'); setPage(1); };

  return (
    <div className="cp-container cp-pattern cp-search">
      <div className="cp-search__inner">
        <div className="cp-search__heading">
          <h2 className="cp-login__title" style={{ fontSize: 32 }}>Suche</h2>
          <p className="cp-login__description">Finde Projekte, Artikel und Komponenten.</p>
        </div>
        <SearchBox aria-label="Suche" value={query} onChange={(v) => { setQuery(v); setPage(1); }} placeholder="Suchen" />
        <div className="cp-search__filters" role="group" aria-label="Kategorie">
          {['Alle', ...categories].map((c) => <Tag key={c} isSelected={category === c} onSelectedChange={() => { setCategory(c); setPage(1); }}>{c}</Tag>)}
        </div>
        <p className="cp-search__count" role="status" aria-live="polite">{results.length === 1 ? '1 Ergebnis' : `${results.length} Ergebnisse`}{query.trim() ? ` für „${query.trim()}“` : ''}</p>
        {shown.length > 0 ? (
          <>
            <List aria-label="Suchergebnisse">
              {shown.map((r) => <ListItem key={r.id} title={r.title} description={r.description} href={r.href ?? '#'} divider={false} leading={<Icon name={r.icon ?? 'folder'} size={24} />} trailing={<Icon name="chevronRight" />} />)}
            </List>
            {pages > 1 && <Pagination total={pages} page={current} onPageChange={setPage} type="compact" aria-label="Seiten der Suchergebnisse" />}
          </>
        ) : (
          <EmptyState type="search" title="Keine Treffer" description="Probiere einen anderen Suchbegriff oder setze die Filter zurück." action={<Button variant="outline" onPress={reset}>Suche zurücksetzen</Button>} />
        )}
      </div>
    </div>
  );
}
