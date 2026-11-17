import { useState } from 'react';
import { RadioGroup, Radio } from 'react-aria-components';
import { Icon } from '../Icon/Icon';
import './Rating.css';

export interface RatingProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  size?: 'S' | 'M' | 'L';
  /** Nur anzeigen, nicht ändern */
  readOnly?: boolean;
  max?: number;
  'aria-label'?: string;
}

const px = { S: 16, M: 20, L: 28 } as const;

/** Bewertung mit Sternen. Hover zeigt eine Vorschau, Klick setzt, Pfeiltasten ändern. Ein zweiter Klick auf denselben Stern nimmt die Bewertung zurück. */
export function Rating({ value, defaultValue = 0, onChange, size = 'M', readOnly, max = 5, 'aria-label': label = 'Bewertung' }: RatingProps) {
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const [hover, setHover] = useState(0);
  const shown = hover || current;
  const set = (v: number) => {
    setInner(v);
    onChange?.(v);
  };
  if (readOnly) {
    return (
      <span className="cp-rating" data-size={size} role="img" aria-label={`${label}: ${current} von ${max}`}>
        {Array.from({ length: max }, (_, i) => (
          <span key={i} className="cp-rating__star" data-on={i < current || undefined}>
            <Icon name={i < current ? 'star' : 'starBorder'} size={px[size]} />
          </span>
        ))}
      </span>
    );
  }
  return (
    <RadioGroup
      aria-label={label}
      value={String(current)}
      onChange={(v) => set(Number(v))}
      orientation="horizontal"
      className="cp-rating"
      data-size={size}
      onMouseLeave={() => setHover(0)}
    >
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <Radio
          key={n}
          value={String(n)}
          aria-label={`${n} von ${max} Sternen`}
          className="cp-rating__star"
          data-on={n <= shown || undefined}
          data-preview={hover !== 0 && n <= hover || undefined}
          onHoverStart={() => setHover(n)}
          onClick={() => {
            if (n === current) set(0);
          }}
        >
          <Icon name={n <= shown ? 'star' : 'starBorder'} size={px[size]} />
        </Radio>
      ))}
    </RadioGroup>
  );
}
