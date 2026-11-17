import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { NavItem } from '../NavItem/NavItem';
import { useBlob } from '../../motion/useBlob';
import type { IconName } from '../Icon/Icon';
import './Sidebar.css';

export interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon: IconName;
}

export interface SidebarProps {
  logo: ReactNode;
  items: SidebarItem[];
  /** id des aktuellen Eintrags. Ein Klick auf einen Eintrag setzt ihn selbst, ohne dass die Seite ihn nachführen muss. */
  currentId?: string;
  /** Wird aufgerufen, wenn ein Eintrag gewählt wird */
  onCurrentChange?: (id: string) => void;
  /** Bereich unten, etwa Avatar und Name */
  footer?: ReactNode;
  defaultCollapsed?: boolean;
  'aria-label'?: string;
}

/** Seitliche Navigation für Bereiche mit vielen Zielen. Eingeklappt zeigt sie nur Icons. */
export function Sidebar({ logo, items, currentId, onCurrentChange, footer, defaultCollapsed = false, 'aria-label': label = 'Seitenleiste' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [current, setCurrent] = useState(currentId);
  useEffect(() => setCurrent(currentId), [currentId]);

  // Zwei Blobs: einer folgt dem Hover, einer markiert den gewählten Eintrag
  const [hover, setHover] = useState<number | null>(null);
  const [resizing, setResizing] = useState(false);
  const [tick, setTick] = useState(0);
  const nav = useRef<HTMLDivElement>(null);
  const hoverBlob = useRef<HTMLSpanElement>(null);
  const selectBlob = useRef<HTMLSpanElement>(null);
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const lastHover = useRef(0);
  const wasIdle = useRef(true);
  const lastTick = useRef(tick);
  const selectedIndex = items.findIndex((i) => i.id === current);
  if (hover !== null) lastHover.current = hover;
  // Springt ohne Bewegung: wenn der Hover-Blob erst sichtbar wird oder sich die Breite geändert hat
  const resized = lastTick.current !== tick;
  lastTick.current = tick;
  const hoverTeleport = (hover !== null && wasIdle.current) || resized;
  wasIdle.current = hover === null;

  useBlob(hoverBlob, nav, () => refs.current[lastHover.current] ?? null, `${hover ?? `idle-${lastHover.current}`}-${tick}`, {
    axis: 'y',
    teleport: hoverTeleport,
  });
  useBlob(selectBlob, nav, () => refs.current[selectedIndex] ?? null, `${current}-${tick}`, { axis: 'y', teleport: resized });
  return (
    <aside
      className="cp-sidebar"
      data-collapsed={collapsed || undefined}
      data-resizing={resizing || undefined}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && e.propertyName === 'width') {
          setResizing(false);
          setTick((t) => t + 1);
        }
      }}
    >
      <div className="cp-sidebar__head">
        {!collapsed && <span className="cp-sidebar__logo">{logo}</span>}
        <ButtonIcon
          variant="transparent"
          icon={collapsed ? 'chevronRight' : 'chevronLeft'}
          aria-label={collapsed ? 'Seitenleiste ausklappen' : 'Seitenleiste einklappen'}
          aria-expanded={!collapsed}
          onPress={() => {
            setResizing(true);
            setCollapsed((v) => !v);
          }}
        />
      </div>
      <nav aria-label={label} style={{ width: '100%' }}>
        <div
          ref={nav}
          className="cp-sidebar__items"
          data-hovering={hover !== null || undefined}
          onMouseLeave={() => setHover(null)}
          onPointerOver={(e) => {
            const a = (e.target as HTMLElement).closest('a');
            const i = a ? refs.current.indexOf(a as HTMLAnchorElement) : -1;
            if (i >= 0 && e.pointerType !== 'touch') setHover(i);
          }}
        >
        <span ref={hoverBlob} className="cp-blob cp-sidebar__blob-hover" aria-hidden="true" style={{ top: 0, left: 0 }} />
        <span ref={selectBlob} className="cp-blob cp-sidebar__blob-selected" aria-hidden="true" data-visible={selectedIndex >= 0 || undefined} style={{ top: 0, left: 0 }} />
        <ul className="cp-sidebar__nav">
          {items.map((it, i) => (
            <li key={it.id}>
              <NavItem
                ref={(el) => {
                  refs.current[i] = el;
                }}
                href={it.href}
                icon={it.icon}
                orientation="vertical"
                iconOnly={collapsed}
                inBlob
                isSelected={it.id === current}
                onHoverStart={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                onPress={() => {
                  setCurrent(it.id);
                  onCurrentChange?.(it.id);
                }}
              >
                {it.label}
              </NavItem>
            </li>
          ))}
        </ul>
        </div>
      </nav>
      <div className="cp-sidebar__spacer" />
      <hr className="cp-sidebar__divider" />
      {footer}
    </aside>
  );
}
