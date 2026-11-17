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
}

/**
 * Horizontale Navigation. Beim Hover und beim Tastaturfokus wandert die Fläche
 * als Blob von Eintrag zu Eintrag. Überall, wo Nav Items nebeneinander stehen, gehört das dazu.
 */
export function NavList({ items, currentId, 'aria-label': label = 'Navigation' }: NavListProps) {
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
      <div ref={nav} className="cp-nav-list" data-active={hover !== null || undefined} onMouseLeave={() => setHover(null)}>
        <span ref={blob} className="cp-blob" aria-hidden="true" style={{ top: 0, left: 0 }} />
        {items.map((it, i) => (
          <NavItem
            key={it.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            href={it.href}
            isSelected={it.id === currentId}
            inBlob
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
