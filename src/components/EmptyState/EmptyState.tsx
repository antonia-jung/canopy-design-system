import type { ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import './EmptyState.css';

export interface EmptyStateProps {
  type?: 'default' | 'search' | 'error';
  title: ReactNode;
  description?: ReactNode;
  /** Eigenes Icon, oder false für keins */
  icon?: IconName | false;
  /** Nächster Schritt, etwa ein Button */
  action?: ReactNode;
}

const icons: Record<NonNullable<EmptyStateProps['type']>, IconName> = { default: 'inbox', search: 'search', error: 'error' };

/** Platzhalter für leere Listen, ergebnislose Suchen und Fehler. Sagt, was los ist und was man tun kann. */
export function EmptyState({ type = 'default', title, description, icon, action }: EmptyStateProps) {
  const name = icon === false ? null : icon ?? icons[type];
  return (
    <div className="cp-emptystate" data-type={type}>
      {name && <Icon name={name} size={48} className="cp-emptystate__icon" />}
      <h3 className="cp-emptystate__title">{title}</h3>
      {description && <p className="cp-emptystate__description">{description}</p>}
      {action && <div className="cp-emptystate__action">{action}</div>}
    </div>
  );
}
