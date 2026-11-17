import type { ReactNode } from 'react';
import { Button as AriaButton, Link } from 'react-aria-components';
import './ListItem.css';

export interface ListProps {
  children: ReactNode;
  'aria-label'?: string;
}

/** Liste aus ListItem-Zeilen. */
export function List({ children, 'aria-label': ariaLabel }: ListProps) {
  return <ul className="cp-list" aria-label={ariaLabel}>{children}</ul>;
}

export interface ListItemProps {
  title: ReactNode;
  description?: ReactNode;
  /** Vorne, etwa ein Avatar oder Icon */
  leading?: ReactNode;
  /** Hinten, etwa ein Badge, Icon oder Button */
  trailing?: ReactNode;
  /** Linie unter dem Eintrag */
  divider?: boolean;
  selected?: boolean;
  disabled?: boolean;
  /** Macht die Zeile zu einem Button */
  onPress?: () => void;
  /** Macht die Zeile zu einem Link */
  href?: string;
}

/** Zeile mit Titel, optionaler Beschreibung und Elementen davor und danach. Mit onPress oder href ist sie bedienbar. */
export function ListItem({ title, description, leading, trailing, divider = true, selected, disabled, onPress, href }: ListItemProps) {
  const content = (
    <>
      {leading && <span className="cp-listitem__leading">{leading}</span>}
      <span className="cp-listitem__text">
        <span className="cp-listitem__title">{title}</span>
        {description && <span className="cp-listitem__description">{description}</span>}
      </span>
      {trailing && <span className="cp-listitem__trailing">{trailing}</span>}
    </>
  );
  const common = { className: 'cp-listitem__row', 'data-selected': selected || undefined, 'data-disabled': disabled || undefined } as const;
  return (
    <li className="cp-listitem" data-divider={divider || undefined}>
      {href ? (
        <Link {...common} href={href} isDisabled={disabled} aria-current={selected ? 'true' : undefined}>{content}</Link>
      ) : onPress ? (
        <AriaButton {...common} onPress={onPress} isDisabled={disabled} aria-pressed={selected}>{content}</AriaButton>
      ) : (
        <div {...common}>{content}</div>
      )}
    </li>
  );
}
