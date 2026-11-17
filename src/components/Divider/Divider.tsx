import { Separator } from 'react-aria-components';
import './Divider.css';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  weight?: 'thin' | 'strong';
  /** Text in der Mitte einer horizontalen Linie, etwa "oder" */
  label?: string;
}

/** Optische Trennung. Mit label entsteht eine beschriftete Linie, sie wird vorgelesen. */
export function Divider({ orientation = 'horizontal', weight = 'thin', label }: DividerProps) {
  if (label && orientation === 'horizontal') {
    return (
      <div className="cp-divider cp-divider--label" data-weight={weight} role="separator" aria-label={label}>
        <span className="cp-divider__line" aria-hidden="true" />
        <span className="cp-divider__label" aria-hidden="true">{label}</span>
        <span className="cp-divider__line" aria-hidden="true" />
      </div>
    );
  }
  return <Separator orientation={orientation} className="cp-divider" data-weight={weight} data-dir={orientation} />;
}
