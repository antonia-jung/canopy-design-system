import type { ReactNode } from 'react';
import { Link } from '../Link/Link';
import type { NavLinkDef } from '../Header/Header';
import './Footer.css';

export interface FooterColumn {
  heading: string;
  links: (NavLinkDef & { external?: boolean })[];
}

export interface FooterProps {
  logo?: ReactNode;
  claim?: ReactNode;
  columns?: FooterColumn[];
  copyright: ReactNode;
  legal?: NavLinkDef[];
  /** extended: mit Spalten. minimal: nur Copyright und Rechtliches. */
  variant?: 'extended' | 'minimal';
}

/** Fußzeile mit Linkspalten und Rechtlichem. */
export function Footer({ logo, claim, columns = [], copyright, legal = [], variant = 'extended' }: FooterProps) {
  return (
    <div className="cp-container">
    <footer className="cp-footer" data-style={variant}>
      {variant === 'extended' && (
        <div className="cp-footer__top">
          <div>
            {logo && <p className="cp-footer__logo">{logo}</p>}
            {claim && <p className="cp-footer__claim">{claim}</p>}
          </div>
          <nav className="cp-footer__columns" aria-label="Fußzeile">
            {columns.map((col) => (
              <ul key={col.heading} className="cp-footer__column" aria-label={col.heading}>
                <li>
                  <h2 className="cp-footer__heading">{col.heading}</h2>
                </li>
                {col.links.map((l) => (
                  <li key={l.id}>
                    <Link href={l.href} isExternal={l.external}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>
      )}
      <hr className="cp-footer__divider" />
      <div className="cp-footer__bottom">
        <p style={{ margin: 0 }}>{copyright}</p>
        <ul className="cp-footer__legal">
          {legal.map((l) => (
            <li key={l.id}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
    </div>
  );
}
