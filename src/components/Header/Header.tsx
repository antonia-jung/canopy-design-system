import { useEffect, useId, useState, type ReactNode } from 'react';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { NavItem } from '../NavItem/NavItem';
import { NavList } from '../NavList/NavList';
import './Header.css';

export interface NavLinkDef {
  id: string;
  label: string;
  href: string;
}

export interface HeaderProps {
  logo: ReactNode;
  logoHref?: string;
  items: NavLinkDef[];
  /** id des aktuellen Eintrags */
  currentId?: string;
  /** Hauptaktion rechts, etwa ein Outline-Button. Am Handy im Menü. */
  action?: ReactNode;
  'aria-label'?: string;
}

/**
 * Kopfzeile. Am Desktop wandert die Hover-Fläche als Blob zwischen den Einträgen,
 * am Handy öffnet ein Menü-Button die Liste (Touch kennt kein Hover, daher kein Blob).
 */
export function Header({ logo, logoHref = '/', items, currentId, action, 'aria-label': label = 'Hauptnavigation' }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [current, setCurrent] = useState(currentId);
  useEffect(() => setCurrent(currentId), [currentId]);
  const menuId = useId();
  return (
    <div className="cp-container">
    <header className="cp-header">
      <div className="cp-header__bar">
        <a className="cp-header__logo" href={logoHref}>
          {logo}
        </a>
        <div className="cp-header__nav">
          <NavList blob items={items} currentId={current} onCurrentChange={setCurrent} aria-label={label} />
        </div>
        <div className="cp-header__spacer" />
        {action && <div className="cp-header__action">{action}</div>}
        <ButtonIcon
          className="cp-header__menu-button"
          icon={menuOpen ? 'close' : 'menu'}
          variant={menuOpen ? 'transparent' : 'outline'}
          aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onPress={() => setMenuOpen((v) => !v)}
        />
      </div>
      <nav id={menuId} className="cp-header__menu" aria-label={`${label} (Menü)`} hidden={!menuOpen}>
        {items.map((it) => (
          <NavItem key={it.id} href={it.href} orientation="vertical" isSelected={it.id === current} onPress={() => setCurrent(it.id)}>
            {it.label}
          </NavItem>
        ))}
        {action}
      </nav>
    </header>
    </div>
  );
}
