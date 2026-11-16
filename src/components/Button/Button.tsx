import { forwardRef, useRef, type ReactNode } from 'react';
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';
import { Icon, type IconName } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';
import { useAnimatedWidth } from '../../motion/useAnimatedWidth';
import './Button.css';

export type ButtonVariant = 'default' | 'inverse' | 'outline' | 'transparent';
export type ButtonStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ButtonProps extends Omit<AriaButtonProps, 'children' | 'className' | 'style'> {
  children: ReactNode;
  /**
   * default: weich erhaben, auf Seitenflächen.
   * inverse: Hauptaktion neben einem Default-Button.
   * outline: auf Karten, Panels und grünen Flächen.
   * transparent: für Abbrechen, Schließen, Zurücksetzen.
   */
  variant?: ButtonVariant;
  /** Icon vor dem Text */
  iconLeft?: IconName;
  /** Icon nach dem Text */
  iconRight?: IconName;
  /**
   * Dynamischer Zustand: loading zeigt einen Spinner und sperrt Klicks,
   * success und error zeigen das Ergebnis direkt auf dem Button.
   */
  status?: ButtonStatus;
  className?: string;
}

/** Löst eine Aktion aus. Pro Ansicht höchstens eine Hauptaktion. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, variant = 'default', iconLeft, iconRight, status = 'idle', className, ...rest },
  forwarded,
) {
  const local = useRef<HTMLButtonElement | null>(null);
  useAnimatedWidth(local, `${status}|${typeof children === 'string' ? children : ''}`);
  const statusIcon: IconName | null = status === 'success' ? 'check' : status === 'error' ? 'error' : null;
  const leading =
    status === 'loading' ? (
      <Spinner size="S" tone={variant === 'inverse' ? 'on-action' : 'default'} label="" />
    ) : statusIcon ? (
      <Icon key={status} name={statusIcon} className="cp-button__status-icon" />
    ) : iconLeft ? (
      <Icon name={iconLeft} />
    ) : null;

  return (
    <AriaButton
      {...rest}
      ref={(el) => {
        local.current = el;
        if (typeof forwarded === 'function') forwarded(el);
        else if (forwarded) forwarded.current = el;
      }}
      isPending={status === 'loading' || rest.isPending}
      className={['cp-button', className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-status={status === 'success' || status === 'error' ? status : undefined}
    >
      {leading}
      <span className="cp-button__label" aria-live="polite">
        {children}
      </span>
      {iconRight && status === 'idle' && <Icon name={iconRight} />}
    </AriaButton>
  );
});
