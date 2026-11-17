import { useRef, useState } from 'react';
import { NavItem } from '../NavItem/NavItem';
import { useBlob } from '../../motion/useBlob';
import './NavList.css';

export interface NavListItem {
  id: string;
  label: string;
  href: string;
}

export interface NavListProps {
  items: NavListItem[];
  /** id des aktuellen Eintrags */
  currentId?: string;
  'aria-label'?: string;
  /** Hover-Fläche wandert als Blob zwischen den Einträgen. Nur für den Header gedacht. */
  blob?: boolean;
}

/**
 * Horizontale Navigation aus Nav Items. Mit blob wandert die Hover-Fläche beim Hover
 * und beim Tastaturfokus von Eintrag zu Eintrag, so im Header. Ohne blob hat jeder Eintrag seine eigene Fläche.
 */
export function NavList({ items, currentId, 'aria-label': label = 'Navigation', blob: withBlob = false }: NavListProps) {
  const [hover, setHover] = useState<number | null>(null);
  const nav = useRef<HTMLDivElement>(null);
  const blob = useRef<HTMLSpanElement>(null);
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const last = useRef(0);
  const wasIdle = useRef(true);
  if (hover !== null) last.current = hover;
  // Wird der Blob erst sichtbar, springt er ohne Bewegung zum Eintrag
  const teleport = hover !== null && wasIdle.current;
  wasIdle.current = hover === null;

  useBlob(blob, nav, () => refs.current[last.current] ?? null, hover ?? `idle-${last.current}`, { teleport });

  return (
    <nav aria-label={label}>
      <div ref={nav} className="cp-nav-list" data-active={(withBlob && hover !== null) || undefined} onMouseLeave={() => setHover(null)}
        onPointerOver={(e) => {
          // Zusätzlich zum Hover von React Aria, damit der Blob in jedem Browser mitläuft
          const a = (e.target as HTMLElement).closest('a');
          const i = a ? refs.current.indexOf(a as HTMLAnchorElement) : -1;
          if (i >= 0 && e.pointerType !== 'touch') setHover(i);
        }}>
        {withBlob && <span ref={blob} className="cp-blob" aria-hidden="true" style={{ top: 0, left: 0 }} />}
        {items.map((it, i) => (
          <NavItem
            key={it.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            href={it.href}
            isSelected={it.id === currentId}
            inBlob={withBlob}
            onHoverStart={() => setHover(i)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
          >
            {it.label}
          </NavItem>
        ))}
      </div>
    </nav>
  );
}
