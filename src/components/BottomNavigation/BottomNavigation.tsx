import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-aria-components';
import { Icon, type IconName } from '../Icon/Icon';
import { useBlob } from '../../motion/useBlob';
import './BottomNavigation.css';

export interface BottomNavItem {
  id: string;
  label: string;
  href: string;
  icon: IconName;
}

export interface BottomNavigationProps {
  /** Drei bis fünf Ziele */
  items: BottomNavItem[];
  selectedId: string;
  /** Wird aufgerufen, wenn ein Eintrag gewählt wird. Die Leiste führt die Markierung selbst nach. */
  onSelectedChange?: (id: string) => void;
  /**
   * always: Labels immer sichtbar (empfohlen).
   * selected: nur am gewählten Eintrag.
   * never: nur Icons. Der Name bleibt für Screenreader erhalten.
   */
  labels?: 'always' | 'selected' | 'never';
  'aria-label'?: string;
}

/** Hauptnavigation für Mobile. Die Markierung wandert als Blob zum gewählten Eintrag. */
export function BottomNavigation({ items, selectedId, onSelectedChange, labels = 'always', 'aria-label': label = 'Hauptnavigation' }: BottomNavigationProps) {
  const list = useRef<HTMLDivElement>(null);
  const blob = useRef<HTMLSpanElement>(null);
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [selected_, setSelected] = useState(selectedId);
  useEffect(() => setSelected(selectedId), [selectedId]);
  const index = Math.max(0, items.findIndex((i) => i.id === selected_));
  useBlob(blob, list, () => refs.current[index] ?? null, index);

  return (
    <nav aria-label={label}>
      <div ref={list} className="cp-bottom-nav">
        <span ref={blob} className="cp-blob" aria-hidden="true" style={{ top: 0, left: 0 }} />
        <ul className="cp-bottom-nav__list">
        {items.map((it, i) => {
          const selected = i === index;
          const showLabel = labels === 'always' || (labels === 'selected' && selected);
          return (
            <li key={it.id} className="cp-bottom-nav__li">
              <Link
                ref={(el) => {
                  refs.current[i] = el;
                }}
                href={it.href}
                onPress={() => {
                  setSelected(it.id);
                  onSelectedChange?.(it.id);
                }}
                className="cp-bottom-nav__item"
                aria-current={selected ? 'page' : undefined}
                data-selected={selected || undefined}
              >
                <Icon name={it.icon} />
                <span className="cp-bottom-nav__label" data-hidden={showLabel ? undefined : true}>
                  {it.label}
                </span>
              </Link>
            </li>
          );
        })}
        </ul>
      </div>
    </nav>
  );
}
