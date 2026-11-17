import { forwardRef, type ReactNode } from 'react';
import { Input as AriaInput, type InputProps as AriaInputProps } from 'react-aria-components';
import { Icon, type IconName } from '../Icon/Icon';
import './Field.css';

export type FieldValidation = 'none' | 'error' | 'success';

export interface FieldProps extends Omit<AriaInputProps, 'className' | 'style' | 'size' | 'prefix'> {
  size?: 'S' | 'M' | 'L';
  iconLeft?: IconName;
  iconRight?: IconName;
  /** Text vor dem Wert, etwa eine Währung */
  prefix?: ReactNode;
  /** Text nach dem Wert, etwa eine Einheit */
  suffix?: ReactNode;
  validation?: FieldValidation;
}

/**
 * Eingabefläche mit optionalen Icons, Präfix und Suffix. Gehört in ein Input (TextField),
 * das Label und Hinweis verbindet, lässt sich aber auch allein nutzen.
 */
export const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { size = 'M', iconLeft, iconRight, prefix, suffix, validation = 'none', ...rest },
  ref,
) {
  return (
    <div className="cp-fieldbox" data-size={size} data-validation={validation === 'none' ? undefined : validation}>
      {iconLeft && <Icon name={iconLeft} />}
      {prefix && <span className="cp-fieldbox__affix">{prefix}</span>}
      <AriaInput {...rest} ref={ref} className="cp-fieldbox__input" />
      {suffix && <span className="cp-fieldbox__affix">{suffix}</span>}
      {iconRight && <Icon name={iconRight} />}
    </div>
  );
});
