import { useState, type ReactNode } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { Icon } from '../Icon/Icon';
import { Link } from '../Link/Link';
import './SnackBar.css';

export interface SnackBarProps {
  intent?: 'default' | 'info' | 'success' | 'warning' | 'error';
  title: string;
  children?: ReactNode;
  /** Beschriftung und Ziel eines optionalen Links */
  action?: { label: string; href?: string; onPress?: () => void };
  /** Schließen-Knopf zeigen */
  closable?: boolean;
  onClose?: () => void;
  /** Sichtbarkeit in ms, mindestens 5000. 0 lässt die Meldung stehen. Pausiert bei Hover und Fokus. */
  duration?: number;
}

/** Kurze Rückmeldung. Der Balken unten läuft ab, bei Hover und Tastaturfokus pausiert er. Fehler werden sofort angesagt, der Rest höflich. */
export function SnackBar({ intent = 'default', title, children, action, closable = true, onClose, duration = 0 }: SnackBarProps) {
  const [paused, setPaused] = useState(false);
  const ms = duration > 0 ? Math.max(5000, duration) : 0;
  return (
    <div
      className="cp-snackbar"
      data-intent={intent}
      role={intent === 'error' ? 'alert' : 'status'}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Icon name={intent === 'error' || intent === 'warning' ? 'error' : 'info'} size={20} className="cp-snackbar__icon" />
      <div className="cp-snackbar__body">
        <p className="cp-snackbar__title">{title}</p>
        {children && <p className="cp-snackbar__text">{children}</p>}
        {action && (
          <Link href={action.href ?? '#'} onPress={action.onPress}>
            {action.label}
          </Link>
        )}
      </div>
      {closable && (
        <AriaButton className="cp-snackbar__close" onPress={onClose} aria-label="Schließen">
          <Icon name="close" size={20} />
        </AriaButton>
      )}
      {ms > 0 && (
        <div className="cp-snackbar__timer" aria-hidden="true">
          <div
            className="cp-snackbar__timer-fill"
            style={{ animationDuration: `${ms}ms`, animationPlayState: paused ? 'paused' : 'running' }}
            onAnimationEnd={onClose}
          />
        </div>
      )}
    </div>
  );
}
