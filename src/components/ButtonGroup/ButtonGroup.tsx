import type { ReactNode } from 'react';
import {
  ToggleButtonGroup,
  ToggleButton,
  type ToggleButtonGroupProps,
  type ToggleButtonProps,
} from 'react-aria-components';
import { Icon, type IconName } from '../Icon/Icon';
import './ButtonGroup.css';

export interface ButtonGroupProps extends Omit<ToggleButtonGroupProps, 'className' | 'style'> {
  children: ReactNode;
  /** Beschreibt die Gruppe für Screenreader, etwa „Ansicht“ */
  'aria-label': string;
}

/**
 * Verbundene Leiste verwandter Buttons mit Einzel- oder Mehrfachauswahl.
 * Pfeiltasten wechseln zwischen den Buttons, Leertaste oder Enter wählt.
 */
export function ButtonGroup({ children, selectionMode = 'single', disallowEmptySelection = true, ...rest }: ButtonGroupProps) {
  return (
    <ToggleButtonGroup {...rest} selectionMode={selectionMode} disallowEmptySelection={disallowEmptySelection} className="cp-button-group">
      {children}
    </ToggleButtonGroup>
  );
}

export interface ButtonGroupItemProps extends Omit<ToggleButtonProps, 'children' | 'className' | 'style'> {
  /** Schlüssel des Eintrags für selectedKeys */
  id: string;
  children?: ReactNode;
  icon?: IconName;
}

export function ButtonGroupItem({ children, icon, ...rest }: ButtonGroupItemProps) {
  return (
    <ToggleButton {...rest} className="cp-button-group__item" data-icon-only={!children || undefined}>
      {icon && <Icon name={icon} />}
      {children}
    </ToggleButton>
  );
}
