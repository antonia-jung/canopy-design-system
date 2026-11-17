import type { ReactElement, ReactNode } from 'react';
import { TooltipTrigger, Tooltip as AriaTooltip, OverlayArrow } from 'react-aria-components';
import './Tooltip.css';

export interface TooltipProps {
  /** Das Element, das den Tooltip auslöst. Muss fokussierbar sein, also etwa ein Button. */
  children: ReactElement;
  /** Kurzer Text */
  label?: ReactNode;
  /** Mit Titel und Erklärung (Detailed) */
  title?: ReactNode;
  content?: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Verzögerung in ms, bevor er erscheint */
  delay?: number;
}

/** Kurze Zusatzinfo bei Hover und Tastaturfokus. Esc schließt ihn. Wichtige Inhalte gehören nicht hinein, nur Ergänzungen. */
export function Tooltip({ children, label, title, content, placement = 'top', delay = 300 }: TooltipProps) {
  const detailed = title !== undefined || content !== undefined;
  return (
    <TooltipTrigger delay={delay} closeDelay={0}>
      {children}
      <AriaTooltip placement={placement} offset={8} className="cp-tooltip" data-detailed={detailed || undefined}>
        <OverlayArrow className="cp-tooltip__arrow">
          <svg width="18" height="8" viewBox="0 0 18 8" aria-hidden="true"><path d="M0 0 L9 8 L18 0 Z" /></svg>
        </OverlayArrow>
        {detailed ? (
          <>
            {title && <strong className="cp-tooltip__title">{title}</strong>}
            {content && <span className="cp-tooltip__text">{content}</span>}
          </>
        ) : (
          label
        )}
      </AriaTooltip>
    </TooltipTrigger>
  );
}
