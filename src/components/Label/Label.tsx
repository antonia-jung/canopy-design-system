import type { ReactNode } from 'react';
import { Label as AriaLabel, type LabelProps as AriaLabelProps } from 'react-aria-components';
import { Icon } from '../Icon/Icon';
import './Label.css';

export interface LabelProps extends Omit<AriaLabelProps, 'className' | 'style' | 'children'> {
  children: ReactNode;
  /** Markiert Pflichtfelder mit einem Sternchen */
  required?: boolean;
  /** Kurzer Hilfetext. Zeigt ein Hilfe-Icon, der Text steht im Tooltip und für Screenreader. */
  help?: string;
}

/** Beschriftung für Formularfelder. */
export function Label({ children, required, help, ...rest }: LabelProps) {
  return (
    <AriaLabel {...rest} className="cp-label" data-required={required || undefined}>
      {required && (
        <span className="cp-label__required" aria-hidden="true">
          *
        </span>
      )}
      {children}
      {help && (
        <span className="cp-label__help" title={help} role="img" aria-label={help}>
          <Icon name="helpOutline" />
        </span>
      )}
    </AriaLabel>
  );
}
