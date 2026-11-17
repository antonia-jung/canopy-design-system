import type { ReactNode } from 'react';
import './SkipLink.css';

export interface SkipLinkProps {
  /** Ziel, etwa "#main". Das Ziel braucht eine id und tabIndex={-1}. */
  href: string;
  children?: ReactNode;
}

/** Sprung zum Hauptinhalt für Tastaturnutzer. Unsichtbar, bis er per Tab den Fokus bekommt. Gehört als erstes Element auf die Seite. */
export function SkipLink({ href, children = 'Zum Inhalt springen' }: SkipLinkProps) {
  return (
    <a href={href} className="cp-skiplink">
      {children}
    </a>
  );
}
