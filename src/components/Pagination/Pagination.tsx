import { useRef, useState } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { Icon } from '../Icon/Icon';
import { useBlob } from '../../motion/useBlob';
import './Pagination.css';

export interface PaginationProps {
  /** Anzahl Seiten */
  total: number;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  /** Compact zeigt nur "Seite 5 von 12" zwischen den Pfeilen, gedacht für schmale Plätze */
  type?: 'numbered' | 'compact';
  'aria-label'?: string;
}

/** Seitenzahlen mit Auslassungen: erste, letzte, aktuelle und die Nachbarn. */
export function pageItems(page: number, total: number): (number | 'gap-l' | 'gap-r')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | 'gap-l' | 'gap-r')[] = [1];
  const from = Math.max(2, page - 1);
  const to = Math.min(total - 1, page + 1);
  if (from > 2) out.push('gap-l');
  for (let i = from; i <= to; i++) out.push(i);
  if (to < total - 1) out.push('gap-r');
  out.push(total);
  return out;
}

/** Seitenwechsel. Pfeile blättern, die Markierung gleitet als Blob zur neuen Seite. */
export function Pagination({ total, page, defaultPage = 1, onPageChange, type = 'numbered', 'aria-label': label = 'Seiten' }: PaginationProps) {
  const [inner, setInner] = useState(defaultPage);
  const current = Math.min(total, Math.max(1, page ?? inner));
  const go = (p: number) => {
    const n = Math.min(total, Math.max(1, p));
    setInner(n);
    onPageChange?.(n);
  };
  const row = useRef<HTMLDivElement>(null);
  const blob = useRef<HTMLSpanElement>(null);
  const seen = useRef(false);
  const first = !seen.current;
  seen.current = true;
  useBlob(blob, row, () => row.current?.querySelector<HTMLElement>('[aria-current="page"]') ?? null, current, { axis: 'x', teleport: first });

  const arrow = (dir: 'prev' | 'next') => (
    <AriaButton
      className="cp-pagination__arrow"
      isDisabled={dir === 'prev' ? current <= 1 : current >= total}
      onPress={() => go(current + (dir === 'prev' ? -1 : 1))}
      aria-label={dir === 'prev' ? 'Vorherige Seite' : 'Nächste Seite'}
    >
      <Icon name={dir === 'prev' ? 'chevronLeft' : 'chevronRight'} size={20} />
    </AriaButton>
  );

  if (type === 'compact') {
    return (
      <nav aria-label={label} className="cp-pagination" data-type="compact">
        {arrow('prev')}
        <span className="cp-pagination__status" aria-live="polite">Seite {current} von {total}</span>
        {arrow('next')}
      </nav>
    );
  }
  return (
    <nav aria-label={label} className="cp-pagination">
      <div className="cp-pagination__row" ref={row}>
        <span ref={blob} className="cp-blob cp-pagination__blob" aria-hidden="true" style={{ top: 0, left: 0 }} />
        {arrow('prev')}
        {pageItems(current, total).map((it) =>
          typeof it === 'number' ? (
            <AriaButton
              key={it}
              className="cp-pagination__page"
              aria-label={`Seite ${it}`}
              aria-current={it === current ? 'page' : undefined}
              onPress={() => go(it)}
            >
              {it}
            </AriaButton>
          ) : (
            <span key={it} className="cp-pagination__gap" aria-hidden="true"><Icon name="more" size={24} /></span>
          ),
        )}
        {arrow('next')}
      </div>
    </nav>
  );
}
