import { useId, useRef, useState, type ReactNode } from 'react';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { NavItem } from '../NavItem/NavItem';
import { useBlob } from '../../motion/useBlob';
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
  const [hover, setHover] = useState<number | null>(null);
  const menuId = useId();
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
    <header className="cp-header">
      <div className="cp-header__bar">
        <a className="cp-header__logo" href={logoHref}>
          {logo}
        </a>
        <nav aria-label={label}>
          <div ref={nav} className="cp-header__nav" data-active={hover !== null || undefined} onMouseLeave={() => setHover(null)}>
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
          <NavItem key={it.id} href={it.href} orientation="vertical" isSelected={it.id === currentId}>
            {it.label}
          </NavItem>
        ))}
        {action}
      </nav>
    </header>
  );
}
