import { forwardRef, type ReactNode } from 'react';
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';
import { Icon, type IconName } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';
import type { ButtonVariant } from '../Button/Button';
import '../Button/Button.css';

export interface ButtonIconProps extends Omit<AriaButtonProps, 'children' | 'className' | 'style'> {
  /** Icon des Buttons */
  icon: IconName;
  /** Pflicht: beschreibt die Aktion für Screenreader, etwa „Schließen“ */
  'aria-label': string;
  variant?: ButtonVariant;
  /** Zeigt einen Spinner statt des Icons und sperrt Klicks */
  isLoading?: boolean;
  className?: string;
  /** Zusätzliche Elemente, etwa ein Badge */
  children?: ReactNode;
}

/** Aktion ohne Text, etwa Schließen, Menü oder Suche. */
export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(function ButtonIcon(
  { icon, variant = 'default', isLoading, className, children, ...rest },
  ref,
) {
  return (
    <AriaButton
      {...rest}
      ref={ref}
      isPending={isLoading}
      className={['cp-button', className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-icon-only=""
    >
      {isLoading ? <Spinner size="S" tone={variant === 'inverse' ? 'on-action' : 'default'} label="" /> : <Icon name={icon} />}
      {children}
    </AriaButton>
  );
});
