import { forwardRef, type ReactNode } from 'react';
import { Link as AriaLink, type LinkProps as AriaLinkProps } from 'react-aria-components';
import { Icon, type IconName } from '../Icon/Icon';
import './NavItem.css';

export interface NavItemProps extends Omit<AriaLinkProps, 'children' | 'className' | 'style'> {
  children: ReactNode;
  /** Aktuelle Seite. Setzt aria-current und die Markierung. */
  isSelected?: boolean;
  orientation?: 'horizontal' | 'vertical';
  icon?: IconName;
  /** Nur das Icon zeigen. Der Name bleibt für Screenreader erhalten. */
  iconOnly?: boolean;
  /** Intern: Hover-Fläche übernimmt der gemeinsame Blob */
  inBlob?: boolean;
}

/** Eintrag einer Navigation. Ein Link, der anzeigt, ob er die aktuelle Seite ist. */
export const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(function NavItem(
  { children, isSelected, orientation = 'horizontal', icon, iconOnly, inBlob, ...rest },
  ref,
) {
  return (
    <AriaLink
      {...rest}
      ref={ref}
      aria-current={isSelected ? 'page' : undefined}
      aria-label={iconOnly && typeof children === 'string' ? children : rest['aria-label']}
      className="cp-nav-item"
      data-selected={isSelected || undefined}
      data-orientation={orientation}
      data-icon-only={iconOnly || undefined}
      data-in-blob={inBlob || undefined}
    >
      {icon && <Icon name={icon} />}
      {!iconOnly && children}
    </AriaLink>
  );
});
