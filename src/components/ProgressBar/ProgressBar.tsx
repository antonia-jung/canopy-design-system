import { ProgressBar as AriaProgressBar, Label } from 'react-aria-components';
import './ProgressBar.css';

export interface ProgressBarProps {
  /** 0 bis 100 */
  value: number;
  /** Sichtbare Beschriftung, sonst aria-label nutzen */
  label?: string;
  'aria-label'?: string;
  /** Prozentzahl neben der Beschriftung zeigen */
  showValue?: boolean;
}

/** Fortschritt in Prozent. Für unbekannte Dauer den Spinner nehmen. */
export function ProgressBar({ value, label, showValue, ...rest }: ProgressBarProps) {
  return (
    <AriaProgressBar value={value} aria-label={label ? undefined : rest['aria-label'] ?? 'Fortschritt'} className="cp-progress">
      {({ percentage, valueText }) => (
        <>
          {(label || showValue) && (
            <div className="cp-progress__head">
              {label && <Label className="cp-progress__label">{label}</Label>}
              {showValue && <span className="cp-progress__value">{valueText}</span>}
            </div>
          )}
          <div className="cp-progress__track">
            <div className="cp-progress__fill" style={{ width: `${percentage}%` }} />
          </div>
        </>
      )}
    </AriaProgressBar>
  );
}
