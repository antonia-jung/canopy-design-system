import type { ReactNode } from 'react';
import { Switch as AriaSwitch, type SwitchProps as AriaSwitchProps } from 'react-aria-components';
import './Switch.css';

export interface SwitchProps extends Omit<AriaSwitchProps, 'className' | 'style' | 'children'> {
  children?: ReactNode;
}

/** Schaltet eine Einstellung sofort an oder aus. Leertaste schaltet um. */
export function Switch({ children, ...rest }: SwitchProps) {
  return (
    <AriaSwitch {...rest} className="cp-switch">
      <span className="cp-switch__track" aria-hidden="true">
        <span className="cp-switch__thumb" />
      </span>
      {children && <span className="cp-switch__label">{children}</span>}
    </AriaSwitch>
  );
}
