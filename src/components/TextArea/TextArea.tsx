import { useState, type ReactNode } from 'react';
import { TextField, TextArea as AriaTextArea, Text, type TextFieldProps } from 'react-aria-components';
import { Label } from '../Label/Label';
import type { FieldValidation } from '../Field/Field';
import '../Field/Field.css';
import '../Input/Input.css';
import './TextArea.css';

export interface TextAreaProps extends Omit<TextFieldProps, 'className' | 'style' | 'children' | 'isInvalid'> {
  label: ReactNode;
  help?: string;
  placeholder?: string;
  /** Hinweis zwischen Label und Feld */
  hint?: ReactNode;
  validation?: FieldValidation;
  /** Zeigt „n / max“ unter dem Feld. Mit maxLength wird die Eingabe begrenzt. */
  showCount?: boolean;
  /** Sichtbare Zeilen. Standard sind etwa 9 Zeilen (240 px). */
  rows?: number;
}

/** Mehrzeiliges Eingabefeld mit Label, Hinweis und Zeichenzähler. */
export function TextArea({ label, help, placeholder, hint, validation = 'none', showCount, rows, isRequired, ...rest }: TextAreaProps) {
  const [inner, setInner] = useState(rest.defaultValue ?? '');
  const value = rest.value ?? inner;
  return (
    <TextField
      {...rest}
      isRequired={isRequired}
      isInvalid={validation === 'error'}
      onChange={(v) => {
        setInner(v);
        rest.onChange?.(v);
      }}
      className="cp-input cp-textarea"
      data-validation={validation === 'none' ? undefined : validation}
    >
      <Label required={isRequired} help={help}>
        {label}
      </Label>
      {hint && (
        <Text slot={validation === 'error' ? 'errorMessage' : 'description'} className="cp-hint cp-hint--caption">
          {hint}
        </Text>
      )}
      <div className="cp-fieldbox" data-multiline data-validation={validation === 'none' ? undefined : validation}>
        <AriaTextArea className="cp-fieldbox__input" placeholder={placeholder} rows={rows} />
      </div>
      {showCount && (
        <span className="cp-textarea__count" aria-live="polite">
          {value.length}
          {rest.maxLength ? ` / ${rest.maxLength}` : ' Zeichen'}
        </span>
      )}
    </TextField>
  );
}
