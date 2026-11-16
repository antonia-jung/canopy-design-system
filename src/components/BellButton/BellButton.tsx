import { useEffect, useRef, useState } from 'react';
import type { PressEvent } from 'react-aria-components';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import type { ButtonVariant } from '../Button/Button';
import './BellButton.css';

export interface BellButtonProps {
  /** Anzahl ungelesener Meldungen. 0 blendet das Badge aus. */
  count?: number;
  /** number zeigt die Zahl, dot nur einen Punkt */
  badge?: 'number' | 'dot';
  variant?: ButtonVariant;
  onPress?: (e: PressEvent) => void;
  isDisabled?: boolean;
  /** Grundlabel, die Anzahl wird angehängt */
  label?: string;
}

/**
 * Öffnet die Benachrichtigungen. Steigt die Anzahl, schwingt die Glocke kurz
 * und das Badge poppt auf.
 */
export function BellButton({ count = 0, badge = 'number', variant = 'default', onPress, isDisabled, label = 'Benachrichtigungen' }: BellButtonProps) {
  const prev = useRef(count);
  const [ringing, setRinging] = useState(false);

  useEffect(() => {
    if (count > prev.current) {
      setRinging(false);
      // nächster Frame, damit die Animation auch bei schnellen Folgen neu startet
      const raf = requestAnimationFrame(() => setRinging(true));
      const t = setTimeout(() => setRinging(false), 700);
      prev.current = count;
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(t);
      };
    }
    prev.current = count;
  }, [count]);

  const text = count > 99 ? '99+' : String(count);
  const aria = count > 0 ? `${label}, ${count} ungelesen` : label;

  return (
    <span className="cp-bell" data-ringing={ringing || undefined}>
      <ButtonIcon icon="bell" aria-label={aria} variant={variant} onPress={onPress} isDisabled={isDisabled} />
      <span className="cp-bell__badge" data-type={badge} data-hidden={count === 0 || undefined} aria-hidden="true">
        {badge === 'number' && count > 0 ? text : null}
      </span>
    </span>
  );
}
