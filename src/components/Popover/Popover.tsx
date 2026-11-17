import type { ReactElement, ReactNode } from 'react';
import { DialogTrigger, Popover as AriaPopover, OverlayArrow, Dialog, Heading } from 'react-aria-components';
import './Popover.css';

export interface PopoverProps {
  /** Auslöser, muss fokussierbar sein, etwa ein Button */
  trigger: ReactElement;
  title?: ReactNode;
  /** Inhalt des Panels */
  children?: ReactNode;
  /** Aktion unten im Panel */
  action?: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Zugänglicher Name, wenn kein Titel da ist */
  'aria-label'?: string;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** Kleines Panel am Auslöser, öffnet per Klick. Esc oder Klick daneben schließt, der Fokus kehrt zurück. */
export function Popover({ trigger, title, children, action, placement = 'bottom', 'aria-label': ariaLabel, isOpen, defaultOpen, onOpenChange }: PopoverProps) {
  return (
    <DialogTrigger isOpen={isOpen} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger}
      <AriaPopover placement={placement} offset={12} className="cp-popover">
        {({ placement: p }) => (
          <>
            <OverlayArrow className="cp-popover__arrow">
              {p === 'left' || p === 'right' ? (
                <svg width="10" height="18" viewBox="0 0 10 18" aria-hidden="true">
                  <path d={p === 'left' ? 'M0 0 L9 9 L0 18' : 'M10 0 L1 9 L10 18'} />
                </svg>
              ) : (
                <svg width="18" height="10" viewBox="0 0 18 10" aria-hidden="true">
                  <path d={p === 'top' ? 'M0 0 L9 9 L18 0' : 'M0 10 L9 1 L18 10'} />
                </svg>
              )}
            </OverlayArrow>
            <Dialog className="cp-popover__content" aria-label={title ? undefined : ariaLabel}>
              {title && <Heading slot="title" className="cp-popover__title">{title}</Heading>}
              {children && <div className="cp-popover__text">{children}</div>}
              {action && <div className="cp-popover__action">{action}</div>}
            </Dialog>
          </>
        )}
      </AriaPopover>
    </DialogTrigger>
  );
}
