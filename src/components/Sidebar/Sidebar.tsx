import { useEffect, useState, type ReactNode } from 'react';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { NavItem } from '../NavItem/NavItem';
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
  return (
    <aside className="cp-sidebar" data-collapsed={collapsed || undefined}>
      <div className="cp-sidebar__head">
        {!collapsed && <span className="cp-sidebar__logo">{logo}</span>}
        <ButtonIcon
          variant="transparent"
          icon={collapsed ? 'chevronRight' : 'chevronLeft'}
          aria-label={collapsed ? 'Seitenleiste ausklappen' : 'Seitenleiste einklappen'}
          aria-expanded={!collapsed}
          onPress={() => setCollapsed((v) => !v)}
        />
      </div>
      <nav aria-label={label} style={{ width: '100%' }}>
        <ul className="cp-sidebar__nav">
          {items.map((it) => (
            <li key={it.id}>
              <NavItem href={it.href} icon={it.icon} orientation="vertical" iconOnly={collapsed} isSelected={it.id === current}
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
      </nav>
      <div className="cp-sidebar__spacer" />
      <hr className="cp-sidebar__divider" />
      {footer}
    </aside>
  );
}
