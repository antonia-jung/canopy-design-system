import type { ReactNode } from 'react';
import { Header, type NavLinkDef } from '../components/Header/Header';
import { Footer, type FooterColumn } from '../components/Footer/Footer';
import { Button } from '../components/Button/Button';
import './Templates.css';

export const siteNav: NavLinkDef[] = [
  { id: 'start', label: 'Start', href: '#start' },
  { id: 'projekte', label: 'Projekte', href: '#projekte' },
  { id: 'ueber-mich', label: 'Über mich', href: '#ueber-mich' },
];

export const siteColumns: FooterColumn[] = [
  { heading: 'Portfolio', links: [{ id: 'p1', label: 'Projekte', href: '#projekte' }, { id: 'p2', label: 'Über mich', href: '#ueber-mich' }, { id: 'p3', label: 'Kontakt', href: '#kontakt' }] },
  { heading: 'Ressourcen', links: [{ id: 'r1', label: 'Design System', href: '#' }, { id: 'r2', label: 'Blog', href: '#' }, { id: 'r3', label: 'Lebenslauf', href: '#' }] },
  { heading: 'Folgen', links: [{ id: 'f1', label: 'LinkedIn', href: '#', external: true }, { id: 'f2', label: 'GitHub', href: '#', external: true }, { id: 'f3', label: 'Instagram', href: '#', external: true }] },
];

export interface SiteFrameProps {
  /** id des aktuellen Navigationseintrags */
  currentId?: string;
  children: ReactNode;
  onContact?: () => void;
}

/** Gemeinsamer Rahmen der Seiten-Templates: Header, Inhalt und Footer. */
export function SiteFrame({ currentId, children, onContact }: SiteFrameProps) {
  return (
    <div className="cp-container cp-template">
      <Header
        logo="Lichtung"
        items={siteNav}
        currentId={currentId}
        action={<Button variant="outline" onPress={onContact}>Kontakt</Button>}
      />
      <main className="cp-template__main">{children}</main>
      <Footer
        logo="Lichtung"
        claim="Gestaltung und Entwicklung mit Ruhe und Klarheit."
        columns={siteColumns}
        copyright="© 2026 Lichtung. Alle Rechte vorbehalten."
        legal={[{ id: 'imp', label: 'Impressum', href: '#' }, { id: 'dat', label: 'Datenschutz', href: '#' }]}
      />
    </div>
  );
}
