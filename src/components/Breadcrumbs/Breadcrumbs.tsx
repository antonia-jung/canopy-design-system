import type { ReactNode } from 'react';
import { Breadcrumbs as AriaBreadcrumbs, Breadcrumb as AriaBreadcrumb, Link } from 'react-aria-components';
import { Icon } from '../Icon/Icon';
import './Breadcrumbs.css';

export interface BreadcrumbItem {
  id: string;
  label: ReactNode;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Beschreibt die Navigation, Standard „Brotkrümel“ */
  'aria-label'?: string;
  onAction?: (id: string) => void;
}

/** Zeigt, wo man sich in der Seitenstruktur befindet. Der letzte Eintrag ist die aktuelle Seite. */
export function Breadcrumbs({ items, onAction, 'aria-label': label = 'Brotkrümel' }: BreadcrumbsProps) {
  return (
    <nav aria-label={label}>
      <AriaBreadcrumbs className="cp-breadcrumbs" items={items} onAction={onAction ? (k) => onAction(String(k)) : undefined}>
        {(item) => (
          <AriaBreadcrumb id={item.id} className="cp-breadcrumbs__item">
            {({ isCurrent }) => (
              <>
                <Link href={item.href} className="cp-breadcrumbs__link">
                  {item.label}
                </Link>
                {!isCurrent && <Icon name="chevronRight" size={16} />}
              </>
            )}
          </AriaBreadcrumb>
        )}
      </AriaBreadcrumbs>
    </nav>
  );
}
