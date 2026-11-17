import type { ReactNode } from 'react';
import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  Text,
  type CheckboxProps as AriaCheckboxProps,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
} from 'react-aria-components';
import { Icon } from '../Icon/Icon';
import { Label } from '../Label/Label';
import './Checkbox.css';

export interface CheckboxProps extends Omit<AriaCheckboxProps, 'className' | 'style' | 'children'> {
  children?: ReactNode;
}

/** Einzelne Auswahl. Leertaste schaltet um. Mit isIndeterminate zeigt sie einen Strich für teilweise gewählte Gruppen. */
export function Checkbox({ children, ...rest }: CheckboxProps) {
  return (
    <AriaCheckbox {...rest} className="cp-checkbox">
      {({ isSelected, isIndeterminate }) => (
        <>
          <span className="cp-checkbox__box" aria-hidden="true">
            {isIndeterminate ? <Icon name="remove" size={16} /> : isSelected ? <Icon name="check" size={16} /> : null}
          </span>
          {children && <span className="cp-checkbox__label">{children}</span>}
        </>
      )}
    </AriaCheckbox>
  );
}

export interface CheckboxGroupProps extends Omit<AriaCheckboxGroupProps, 'className' | 'style' | 'children' | 'isInvalid'> {
  /** Überschrift der Gruppe */
  legend?: ReactNode;
  children: ReactNode;
  /** Hilfetext unter der Gruppe, bei Fehler die Fehlermeldung */
  message?: ReactNode;
  validation?: 'none' | 'error';
  orientation?: 'vertical' | 'horizontal';
}

/** Gruppe zusammengehöriger Checkboxen mit Legende und Hinweis. */
export function CheckboxGroup({ legend, children, message, validation = 'none', orientation = 'vertical', ...rest }: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup {...rest} isInvalid={validation === 'error'} className="cp-choice-group" data-validation={validation === 'none' ? undefined : validation}>
      {legend && <Label>{legend}</Label>}
      <div className="cp-choice-group__options" data-orientation={orientation}>
        {children}
      </div>
      {message && (
        <Text slot={validation === 'error' ? 'errorMessage' : 'description'} className="cp-choice-group__message">
          {message}
        </Text>
      )}
    </AriaCheckboxGroup>
  );
}
