import type { ReactElement, ReactNode } from 'react';
import { DialogTrigger, ModalOverlay, Modal, Dialog as AriaDialog, Heading } from 'react-aria-components';
import { Button } from '../Button/Button';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import '../Scrim/Scrim.css';
import './Dialog.css';

export interface DialogProps {
  /** Element, das den Dialog öffnet. Fehlt es, steuert die Seite ihn über isOpen. */
  trigger?: ReactElement;
  title: ReactNode;
  /** Beschreibung oder Inhalt */
  children?: ReactNode;
  size?: 'S' | 'M' | 'L';
  /** Zerstörerische Aktion: Der Hauptbutton ist rot, der Fokus startet auf Abbrechen */
  destructive?: boolean;
  /** Beschriftung der Hauptaktion */
  primaryLabel?: string;
  onPrimary?: () => void;
  /** Beschriftung der zweiten Aktion, null blendet sie aus */
  secondaryLabel?: string | null;
  onSecondary?: () => void;
  /** Schließen-Symbol oben rechts */
  closable?: boolean;
  /** Klick auf den Scrim schließt. Nur für nicht-kritische Dialoge. */
  dismissable?: boolean;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** Modaler Dialog für eine Entscheidung oder Eingabe. Der Fokus bleibt im Dialog, Esc schließt, danach springt er zum Auslöser zurück. */
export function Dialog({
  trigger, title, children, size = 'M', destructive, primaryLabel = 'Bestätigen', onPrimary,
  secondaryLabel = 'Abbrechen', onSecondary, closable = true, dismissable = false, isOpen, defaultOpen, onOpenChange,
}: DialogProps) {
  return (
    <DialogTrigger isOpen={isOpen} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger}
      <ModalOverlay className="cp-overlay" isDismissable={dismissable}>
        <Modal className="cp-dialog" data-size={size} data-destructive={destructive || undefined}>
          <AriaDialog className="cp-dialog__surface" role={destructive ? 'alertdialog' : 'dialog'}>
            {({ close }) => (
              <>
                <div className="cp-dialog__header">
                  <Heading slot="title" className="cp-dialog__title">{title}</Heading>
                  {closable && <ButtonIcon icon="close" variant="transparent" aria-label="Schließen" onPress={close} />}
                </div>
                {children && <div className="cp-dialog__body">{children}</div>}
                <div className="cp-dialog__actions">
                  {secondaryLabel !== null && (
                    <Button variant="transparent" autoFocus={destructive} onPress={() => { onSecondary?.(); close(); }}>{secondaryLabel}</Button>
                  )}
                  <span className="cp-dialog__primary">
                    <Button variant="outline" onPress={() => { onPrimary?.(); close(); }}>{primaryLabel}</Button>
                  </span>
                </div>
              </>
            )}
          </AriaDialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
