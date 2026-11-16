import { Fragment, type ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import './Stepper.css';

export interface StepDef {
  id: string;
  label: string;
  description?: ReactNode;
}

export interface StepperProps {
  steps: StepDef[];
  /** Index des aktuellen Schritts, beginnend bei 0 */
  current: number;
  /** Index eines Schritts mit Fehler */
  errorAt?: number;
  'aria-label'?: string;
}

/** Zeigt den Fortschritt durch einen mehrstufigen Ablauf. */
export function Stepper({ steps, current, errorAt, 'aria-label': label = 'Fortschritt' }: StepperProps) {
  const statusOf = (i: number) => (i === errorAt ? 'error' : i < current ? 'complete' : i === current ? 'current' : 'upcoming');
  const text = { complete: 'abgeschlossen', current: 'aktuell', upcoming: 'offen', error: 'Fehler' } as const;
  return (
    <ol className="cp-stepper" aria-label={label}>
      {steps.map((s, i) => {
        const st = statusOf(i);
        return (
          <Fragment key={s.id}>
            {i > 0 && (
              <li className="cp-stepper__connector" data-done={i <= current && errorAt !== i ? true : undefined} aria-hidden="true" />
            )}
            <li className="cp-step" data-status={st} aria-current={st === 'current' ? 'step' : undefined}>
              <span className="cp-step__indicator">
                {st === 'complete' ? <Icon name="check" /> : st === 'error' ? <Icon name="error" /> : i + 1}
              </span>
              <span>
                {s.label}
                <span className="cp-visually-hidden" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                  {' '}
                  ({text[st]})
                </span>
                {s.description && <span className="cp-step__desc">{s.description}</span>}
              </span>
            </li>
          </Fragment>
        );
      })}
    </ol>
  );
}
