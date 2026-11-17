import type { ReactElement, ReactNode } from 'react';
import { DialogTrigger, ModalOverlay, Modal, Dialog, Heading } from 'react-aria-components';
import { Button } from '../Button/Button';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import '../Scrim/Scrim.css';
import './Drawer.css';

export interface DrawerProps {
  trigger?: ReactElement;
  title: ReactNode;
  /** Scrollbarer Inhalt, etwa Filter oder Details */
  children?: ReactNode;
  placement?: 'right' | 'left' | 'bottom';
  /** Fußzeile mit Aktionen. Beschriftungen steuern, ob sie erscheint. */
  primaryLabel?: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** Seitenpanel für Zusatzinhalte oder Einstellungen. Klick auf den Scrim und Esc schließen. */
export function Drawer({ trigger, title, children, placement = 'right', primaryLabel, onPrimary, secondaryLabel, onSecondary, isOpen, defaultOpen, onOpenChange }: DrawerProps) {
  const footer = primaryLabel || secondaryLabel;
  return (
    <DialogTrigger isOpen={isOpen} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger}
      <ModalOverlay className="cp-overlay cp-drawer-overlay" data-placement={placement} isDismissable>
        <Modal className="cp-drawer" data-placement={placement}>
          <Dialog className="cp-drawer__surface">
            {({ close }) => (
              <>
                {placement === 'bottom' && <span className="cp-drawer__handle" aria-hidden="true" />}
                <div className="cp-drawer__header">
                  <Heading slot="title" className="cp-drawer__title">{title}</Heading>
                  <ButtonIcon icon="close" variant="transparent" aria-label="Schließen" onPress={close} />
                </div>
                <div className="cp-drawer__content">{children}</div>
                {footer && (
                  <div className="cp-drawer__footer">
                    {secondaryLabel && <Button variant="transparent" onPress={() => { onSecondary?.(); close(); }}>{secondaryLabel}</Button>}
                    {primaryLabel && <Button variant="outline" onPress={() => { onPrimary?.(); close(); }}>{primaryLabel}</Button>}
                  </div>
                )}
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
