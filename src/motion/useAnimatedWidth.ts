import { useLayoutEffect, useRef, type RefObject } from 'react';

/**
 * Lässt die Breite eines Elements weich mitgleiten, wenn sich sein Inhalt ändert
 * (etwa ein Button, dessen Text von „Speichern“ zu „Gespeichert“ wechselt).
 * Technik: alte Breite merken, neue messen, per Web Animations dazwischen blenden.
 */
export function useAnimatedWidth(ref: RefObject<HTMLElement | null>, key: unknown) {
  const last = useRef<number | null>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const to = el.getBoundingClientRect().width;
    const from = last.current;
    last.current = to;
    if (from === null || Math.abs(from - to) < 1 || typeof el.animate !== 'function') return;
    const cs = getComputedStyle(el);
    const reduced = cs.getPropertyValue('--cp-motion-reduced').trim() === '1';
    el.animate([{ width: `${from}px` }, { width: `${to}px` }], {
      duration: reduced ? 0 : 340,
      easing: cs.getPropertyValue('--cp-easing-bounce-subtle').trim() || 'ease-out',
    });
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
}
