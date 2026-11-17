import type { ReactNode } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { Icon, type IconName } from '../Icon/Icon';
import './Alert.css';

export type AlertIntent = 'default' | 'info' | 'success' | 'warning' | 'error';

const defaultIcons: Record<AlertIntent, IconName> = { default: 'bell', info: 'info', success: 'checkCircle', warning: 'warning', error: 'error' };

export interface AlertProps {
  intent?: AlertIntent;
  title: ReactNode;
  /** Erklärung, was passiert ist und was als Nächstes zu tun ist */
  children?: ReactNode;
  /** Eigenes Icon, oder false für keins */
  icon?: IconName | false;
  /** Aktion unter dem Text, etwa ein Button */
  action?: ReactNode;
  /** Zeigt ein Schließen-Symbol. Die Sichtbarkeit steuert die Seite selbst. */
  onClose?: () => void;
}

/** Dauerhafter Hinweis im Inhalt. Fehler und Warnungen werden sofort vorgelesen, der Rest höflich. */
export function Alert({ intent = 'default', title, children, icon, action, onClose }: AlertProps) {
  const iconName = icon === false ? null : icon ?? defaultIcons[intent];
  return (
    <div className="cp-alert" data-intent={intent} role={intent === 'error' || intent === 'warning' ? 'alert' : 'status'}>
      {iconName && <Icon name={iconName} size={24} className="cp-alert__icon" />}
      <div className="cp-alert__content">
        <div className="cp-alert__title">{title}</div>
        {children && <div className="cp-alert__description">{children}</div>}
        {action && <div className="cp-alert__action">{action}</div>}
      </div>
      {onClose && (
        <AriaButton className="cp-alert__close" aria-label="Hinweis schließen" onPress={onClose}>
          <Icon name="close" size={24} />
        </AriaButton>
      )}
    </div>
  );
}
