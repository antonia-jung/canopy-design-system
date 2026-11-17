import type { ReactNode } from 'react';
import './Kbd.css';

export interface KbdProps {
  children: ReactNode;
  size?: 'S' | 'M';
  /** Zeigt die Taste als gedrückt */
  pressed?: boolean;
}

/** Taste oder Kürzel, etwa ⌘ K. Mehrere Tasten als einzelne Kbd nebeneinander setzen. */
export function Kbd({ children, size = 'M', pressed }: KbdProps) {
  return <kbd className="cp-kbd" data-size={size} data-pressed={pressed || undefined}>{children}</kbd>;
}
