import type { ReactNode } from 'react';
import { TextField, Text, type TextFieldProps } from 'react-aria-components';
import { Label } from '../Label/Label';
import { Field, type FieldValidation } from '../Field/Field';
import type { IconName } from '../Icon/Icon';
import './Input.css';

export interface InputProps extends Omit<TextFieldProps, 'className' | 'style' | 'children' | 'isInvalid'> {
  label: ReactNode;
  /** Hilfetext hinter dem Label */
  help?: string;
  placeholder?: string;
  /** Hinweis unter dem Feld. Bei error und success wird er passend gefärbt. */
  hint?: ReactNode;
  validation?: FieldValidation;
  size?: 'S' | 'M' | 'L';
  iconLeft?: IconName;
  iconRight?: IconName;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

/** Eingabefeld mit Label, Hinweis und Validierung. Label und Hinweis sind für Screenreader verknüpft. */
export function Input({
  label,
  help,
  placeholder,
  hint,
  validation = 'none',
  size = 'M',
  iconLeft,
  iconRight,
  prefix,
  suffix,
  isRequired,
  ...rest
}: InputProps) {
  return (
    <TextField {...rest} isRequired={isRequired} isInvalid={validation === 'error'} className="cp-input" data-validation={validation === 'none' ? undefined : validation}>
      <Label required={isRequired} help={help}>
        {label}
      </Label>
      <Field
        size={size}
        iconLeft={iconLeft}
        iconRight={iconRight}
        prefix={prefix}
        suffix={suffix}
        placeholder={placeholder}
        validation={validation}
      />
      {hint && (
        <Text slot={validation === 'error' ? 'errorMessage' : 'description'} className="cp-hint">
          {hint}
        </Text>
      )}
    </TextField>
  );
}
