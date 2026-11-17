import { useRef, useState, type ReactNode } from 'react';
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
  Text,
  type RadioProps as AriaRadioProps,
  type RadioGroupProps as AriaRadioGroupProps,
} from 'react-aria-components';
import { Label } from '../Label/Label';
import { useBlob } from '../../motion/useBlob';
import '../Checkbox/Checkbox.css';
import './Radio.css';

export interface RadioProps extends Omit<AriaRadioProps, 'className' | 'style' | 'children'> {
  /** Wert der Option */
  value: string;
  children?: ReactNode;
}

/** Eine Option in einer RadioGroup. */
export function Radio({ children, ...rest }: RadioProps) {
  return (
    <AriaRadio {...rest} className="cp-radio">
      <span className="cp-radio__box" aria-hidden="true">
        <span className="cp-radio__dot" />
      </span>
      {children && <span className="cp-radio__label">{children}</span>}
    </AriaRadio>
  );
}

export interface RadioGroupProps extends Omit<AriaRadioGroupProps, 'className' | 'style' | 'children' | 'isInvalid'> {
  legend?: ReactNode;
  children: ReactNode;
  message?: ReactNode;
  validation?: 'none' | 'error';
  orientation?: 'vertical' | 'horizontal';
}

/**
 * Gruppe von Optionen, aus denen genau eine gewählt wird. Pfeiltasten wechseln die Auswahl.
 * Die Markierung wandert als Blob von Option zu Option.
 */
export function RadioGroup({ legend, children, message, validation = 'none', orientation = 'vertical', ...rest }: RadioGroupProps) {
  const [inner, setInner] = useState(rest.defaultValue ?? null);
  const value = rest.value !== undefined ? rest.value : inner;
  const options = useRef<HTMLDivElement>(null);
  const blob = useRef<HTMLSpanElement>(null);
  const found = useRef(false);
  const first = !found.current && value !== null;
  if (value !== null) found.current = true;

  useBlob(
    blob,
    options,
    () => options.current?.querySelector<HTMLElement>('[data-selected] .cp-radio__box') ?? null,
    value,
    { axis: orientation === 'horizontal' ? 'x' : 'y', teleport: first },
  );

  return (
    <AriaRadioGroup
      {...rest}
      orientation={orientation}
      isInvalid={validation === 'error'}
      onChange={(v) => {
        setInner(v);
        rest.onChange?.(v);
      }}
      className="cp-choice-group cp-radio-group"
      data-validation={validation === 'none' ? undefined : validation}
    >
      {legend && <Label>{legend}</Label>}
      <div ref={options} className="cp-choice-group__options" data-orientation={orientation}>
        <span ref={blob} className="cp-blob cp-radio-group__blob" aria-hidden="true" data-visible={value !== null || undefined} style={{ top: 0, left: 0 }} />
        {children}
      </div>
      {message && (
        <Text slot={validation === 'error' ? 'errorMessage' : 'description'} className="cp-choice-group__message">
          {message}
        </Text>
      )}
    </AriaRadioGroup>
  );
}
