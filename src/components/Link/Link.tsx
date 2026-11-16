import type { ReactNode } from 'react';
import { Link as AriaLink, type LinkProps as AriaLinkProps } from 'react-aria-components';
import { Icon, type IconName } from '../Icon/Icon';
import './Link.css';

export interface LinkProps extends Omit<AriaLinkProps, 'children' | 'className' | 'style'> {
  children: ReactNode;
  iconLeft?: IconName;
  iconRight?: IconName;
  /** Öffnet in neuem Tab und zeigt das Icon „open in new“ */
  isExternal?: boolean;
  className?: string;
}

/** Verweis auf eine andere Seite oder Stelle. Für Aktionen den Button nehmen. */
export function Link({ children, iconLeft, iconRight, isExternal, className, ...rest }: LinkProps) {
  const right = iconRight ?? (isExternal ? 'openInNew' : undefined);
  return (
    <AriaLink
      {...rest}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={['cp-link', className].filter(Boolean).join(' ')}
    >
      {iconLeft && <Icon name={iconLeft} />}
      {children}
      {right && <Icon name={right} label={isExternal && !iconRight ? 'öffnet in neuem Tab' : undefined} />}
    </AriaLink>
  );
}
