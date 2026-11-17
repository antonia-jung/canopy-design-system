import { ToggleButton, Button as AriaButton } from 'react-aria-components';
import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import './Tag.css';

export interface TagProps {
  children: ReactNode;
  /** Als Filter an- und abwählbar */
  isSelected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  /** Zeigt ein Entfernen-Kreuz und ruft dies auf */
  onRemove?: () => void;
  isDisabled?: boolean;
}

/** Beschriftung oder Filter. Mit onSelectedChange wählbar (Leertaste, Enter), mit onRemove entfernbar (eigener Knopf). */
export function Tag({ children, onRemove, isDisabled, onSelectedChange, ...rest }: TagProps) {
  const selectable = rest.isSelected !== undefined || rest.defaultSelected !== undefined || onSelectedChange !== undefined;
  const label = <span className="cp-tag__label">{children}</span>;
  return (
    <span className="cp-tag" data-removable={onRemove ? '' : undefined} data-disabled={isDisabled || undefined}>
      {selectable ? (
        <ToggleButton {...rest} onChange={onSelectedChange} isDisabled={isDisabled} className="cp-tag__main">
          {label}
        </ToggleButton>
      ) : (
        <span className="cp-tag__main" data-static="">{label}</span>
      )}
      {onRemove && (
        <AriaButton
          className="cp-tag__remove"
          isDisabled={isDisabled}
          onPress={onRemove}
          aria-label={`${typeof children === 'string' ? children : 'Tag'} entfernen`}
        >
          <Icon name="close" size={16} />
        </AriaButton>
      )}
    </span>
  );
}
