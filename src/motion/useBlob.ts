import { useLayoutEffect, useRef, type RefObject } from 'react';

/**
 * Blob-Bewegung: Ein Indikator wandert von einer Option zur nächsten wie eine zähe
 * Flüssigkeit. Er haftet am Start, zieht sich zu einem dünnen Faden über beide
 * Positionen, schnappt am Ziel ein und federt leicht aus.
 *
 * Zeiten und Kurven kommen aus den Motion-Tokens. Bei reduzierter Bewegung
 * (prefers-reduced-motion oder data-motion="reduced") gleitet der Indikator nur.
 */
export interface BlobOptions {
  /** Achse der Bewegung */
  axis?: 'x' | 'y';
  /** Dicke des Fadens in px während der Dehnung */
  thread?: number;
  /** Überschwingen beim Einschnappen in px (0 = kein Bounce) */
  pop?: number;
}

type Rect = { x: number; y: number; w: number; h: number };

const readMs = (el: Element, name: string, fallback: number) => {
  // CSS-Minifier schreiben 200ms gern als .2s, deshalb die Einheit beachten
  const v = getComputedStyle(el).getPropertyValue(name).trim();
  const n = parseFloat(v);
  if (!Number.isFinite(n)) return fallback;
  return /ms$/.test(v) ? n : /s$/.test(v) ? n * 1000 : n;
};
const readEase = (el: Element, name: string, fallback: string) =>
  getComputedStyle(el).getPropertyValue(name).trim() || fallback;

export function measure(target: HTMLElement, container: HTMLElement): Rect {
  const t = target.getBoundingClientRect();
  const c = container.getBoundingClientRect();
  return { x: t.left - c.left, y: t.top - c.top, w: t.width, h: t.height };
}

const place = (el: HTMLElement, r: Rect) => {
  el.style.transform = `translate(${r.x}px, ${r.y}px)`;
  el.style.width = `${r.w}px`;
  el.style.height = `${r.h}px`;
};

/**
 * Verschiebt `blobRef` auf das Element `targetRef` innerhalb von `containerRef`.
 * Ändert sich `key` (z. B. der gewählte Wert), läuft die Blob-Animation.
 */
export function useBlob(
  blobRef: RefObject<HTMLElement | null>,
  containerRef: RefObject<HTMLElement | null>,
  getTarget: () => HTMLElement | null,
  key: unknown,
  { axis = 'x', thread = 8, pop = 3 }: BlobOptions = {},
) {
  const last = useRef<Rect | null>(null);
  const anim = useRef<Animation | null>(null);

  useLayoutEffect(() => {
    const blob = blobRef.current;
    const container = containerRef.current;
    const target = getTarget();
    if (!blob || !container || !target) return;
    const to = measure(target, container);
    const from = last.current;
    last.current = to;
    anim.current?.cancel();

    if (!from || typeof blob.animate !== 'function' || (from.x === to.x && from.y === to.y)) {
      place(blob, to);
      return;
    }

    const reduced =
      getComputedStyle(blob).getPropertyValue('--cp-motion-reduced').trim() === '1';
    const stretchMs = readMs(blob, '--cp-duration-stretch', 200);
    const snapMs = readMs(blob, '--cp-duration-snap', 420);
    const settleMs = readMs(blob, '--cp-duration-settle', 340);

    if (reduced || stretchMs === 0) {
      anim.current = blob.animate(
        [
          { transform: `translate(${from.x}px, ${from.y}px)`, width: `${from.w}px`, height: `${from.h}px` },
          { transform: `translate(${to.x}px, ${to.y}px)`, width: `${to.w}px`, height: `${to.h}px` },
        ],
        { duration: snapMs, easing: readEase(blob, '--cp-easing-standard', 'ease-out') },
      );
      place(blob, to);
      return;
    }

    // Faden: spannt sich über Start und Ziel, dünn und mittig
    const span: Rect =
      axis === 'x'
        ? {
            x: Math.min(from.x, to.x),
            y: from.y + from.h / 2 - thread / 2,
            w: Math.max(from.x + from.w, to.x + to.w) - Math.min(from.x, to.x),
            h: thread,
          }
        : {
            x: from.x + from.w / 2 - thread / 2,
            y: Math.min(from.y, to.y),
            w: thread,
            h: Math.max(from.y + from.h, to.y + to.h) - Math.min(from.y, to.y),
          };
    const popRect: Rect = { x: to.x - pop, y: to.y - pop, w: to.w + 2 * pop, h: to.h + 2 * pop };
    const total = stretchMs + 200 + settleMs;
    const f = (r: Rect, offset: number, easing: string) => ({
      transform: `translate(${r.x}px, ${r.y}px)`,
      width: `${r.w}px`,
      height: `${r.h}px`,
      offset,
      easing,
    });
    anim.current = blob.animate(
      [
        f(from, 0, readEase(blob, '--cp-easing-stretch', 'ease-in')),
        f(span, stretchMs / total, readEase(blob, '--cp-easing-snap', 'ease-out')),
        f(pop ? popRect : to, (stretchMs + 200) / total, readEase(blob, '--cp-easing-bounce', 'ease-out')),
        f(to, 1, 'linear'),
      ],
      { duration: total, fill: 'none' },
    );
    place(blob, to);
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  // Bei Größenänderung ohne Animation neu ausrichten
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      const blob = blobRef.current;
      const target = getTarget();
      if (!blob || !target || anim.current?.playState === 'running') return;
      const r = measure(target, container);
      last.current = r;
      place(blob, r);
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
