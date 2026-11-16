import { useLayoutEffect, useRef, type RefObject } from 'react';

/**
 * Blob-Bewegung: Ein Indikator wandert von einer Option zur nächsten wie eine zähe
 * Flüssigkeit.
 *
 * Die beiden Kanten werden von zwei Federn bewegt. Die vordere Kante zieht sofort
 * los, die hintere haftet kurz am Start und schnappt dann hinterher. Dadurch dehnt
 * sich der Blob fließend, wird dabei dünner (sein „Volumen“ bleibt ungefähr gleich)
 * und federt am Ziel leicht aus. Weil alles physikalisch und Bild für Bild
 * berechnet wird, gibt es keine Sprünge zwischen Zwischenzuständen, und ein neuer
 * Klick mitten in der Bewegung setzt nahtlos an der aktuellen Position an.
 *
 * Bei reduzierter Bewegung (prefers-reduced-motion oder data-motion="reduced")
 * gleitet der Indikator nur kurz zum Ziel.
 */
export interface BlobOptions {
  /** Achse der Bewegung */
  axis?: 'x' | 'y';
  /** Mindestdicke in px, auf die der Blob beim Dehnen schrumpfen darf */
  thread?: number;
  /** Wie lange die hintere Kante haftet, in ms */
  stick?: number;
  /** Federhärte der vorderen und hinteren Kante */
  stiffness?: { lead: number; trail: number };
  /** Dämpfung: kleiner = mehr Nachfedern */
  damping?: { lead: number; trail: number };
}

type Rect = { x: number; y: number; w: number; h: number };

export const blobDefaults: Required<BlobOptions> = {
  axis: 'x',
  thread: 10,
  stick: 70,
  stiffness: { lead: 420, trail: 260 },
  damping: { lead: 30, trail: 26 },
};

export function measure(target: HTMLElement, container: HTMLElement): Rect {
  const t = target.getBoundingClientRect();
  const c = container.getBoundingClientRect();
  return { x: t.left - c.left, y: t.top - c.top, w: t.width, h: t.height };
}

const place = (el: HTMLElement, r: Rect) => {
  el.style.transform = `translate3d(${r.x}px, ${r.y}px, 0)`;
  el.style.width = `${Math.max(r.w, 0)}px`;
  el.style.height = `${Math.max(r.h, 0)}px`;
};

const isReduced = (el: Element) =>
  getComputedStyle(el).getPropertyValue('--cp-motion-reduced').trim() === '1';

const readMs = (el: Element, name: string, fallback: number) => {
  // CSS-Minifier schreiben 200ms gern als .2s, deshalb die Einheit beachten
  const v = getComputedStyle(el).getPropertyValue(name).trim();
  const n = parseFloat(v);
  if (!Number.isFinite(n)) return fallback;
  return /ms$/.test(v) ? n : /s$/.test(v) ? n * 1000 : n;
};

/** Eine gedämpfte Feder für einen Wert */
interface Spring {
  x: number;
  v: number;
}
const step = (s: Spring, target: number, k: number, c: number, dt: number) => {
  const a = -k * (s.x - target) - c * s.v;
  s.v += a * dt;
  s.x += s.v * dt;
};

/**
 * Bewegt `blobRef` auf das Element, das `getTarget` liefert, innerhalb von
 * `containerRef`. Ändert sich `key` (z. B. der gewählte Wert), läuft die Bewegung.
 */
export function useBlob(
  blobRef: RefObject<HTMLElement | null>,
  containerRef: RefObject<HTMLElement | null>,
  getTarget: () => HTMLElement | null,
  key: unknown,
  options: BlobOptions = {},
) {
  const o = { ...blobDefaults, ...options };
  // Zustand der Simulation: Anfang und Ende der Hauptachse, Mitte und Dicke der Querachse
  const sim = useRef<{ a: Spring; b: Spring; mid: Spring; thick: Spring } | null>(null);
  const frame = useRef<number>(0);

  useLayoutEffect(() => {
    const blob = blobRef.current;
    const container = containerRef.current;
    const target = getTarget();
    if (!blob || !container || !target) return;
    const to = measure(target, container);
    const X = o.axis === 'x';
    const tA = X ? to.x : to.y; // Anfang Ziel
    const tB = X ? to.x + to.w : to.y + to.h; // Ende Ziel
    const tMid = X ? to.y + to.h / 2 : to.x + to.w / 2;
    const tThick = X ? to.h : to.w;
    const rect = (a: number, b: number, mid: number, thick: number): Rect =>
      X ? { x: a, y: mid - thick / 2, w: b - a, h: thick } : { x: mid - thick / 2, y: a, w: thick, h: b - a };

    cancelAnimationFrame(frame.current);

    // Erster Aufruf: ohne Bewegung an die Stelle setzen
    if (!sim.current) {
      sim.current = { a: { x: tA, v: 0 }, b: { x: tB, v: 0 }, mid: { x: tMid, v: 0 }, thick: { x: tThick, v: 0 } };
      place(blob, to);
      return;
    }
    const s = sim.current;
    if (Math.abs(s.a.x - tA) < 0.5 && Math.abs(s.b.x - tB) < 0.5) {
      place(blob, to);
      return;
    }

    if (isReduced(blob) || typeof requestAnimationFrame !== 'function') {
      const from = rect(s.a.x, s.b.x, s.mid.x, s.thick.x);
      sim.current = { a: { x: tA, v: 0 }, b: { x: tB, v: 0 }, mid: { x: tMid, v: 0 }, thick: { x: tThick, v: 0 } };
      if (typeof blob.animate === 'function') {
        blob.animate(
          [
            { transform: `translate3d(${from.x}px, ${from.y}px, 0)`, width: `${from.w}px`, height: `${from.h}px` },
            { transform: `translate3d(${to.x}px, ${to.y}px, 0)`, width: `${to.w}px`, height: `${to.h}px` },
          ],
          { duration: readMs(blob, '--cp-duration-base', 250), easing: 'cubic-bezier(0.2, 0, 0, 1)' },
        );
      }
      place(blob, to);
      return;
    }

    // Vorne ist die Kante in Bewegungsrichtung, hinten die, die haftet
    const forward = tA > s.a.x;
    const lead = forward ? s.b : s.a;
    const trail = forward ? s.a : s.b;
    const leadT = forward ? tB : tA;
    const trailT = forward ? tA : tB;
    const restLen = tB - tA;
    const restThick = tThick;
    let elapsed = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      elapsed += dt * 1000;
      // in kleinen Schritten rechnen, damit die Federn stabil bleiben
      const n = 4;
      for (let i = 0; i < n; i++) {
        const h = dt / n;
        step(lead, leadT, o.stiffness.lead, o.damping.lead, h);
        if (elapsed > o.stick) step(trail, trailT, o.stiffness.trail, o.damping.trail, h);
        step(s.mid, tMid, 300, 30, h);
      }
      // Dicke folgt der Dehnung: lang = dünn, gestaucht = leicht bauchig
      const len = Math.abs(s.b.x - s.a.x);
      const ratio = len / Math.max(restLen, 1);
      const want = Math.min(restThick * 1.12, Math.max(o.thread, restThick / Math.pow(Math.max(ratio, 0.6), 0.9)));
      s.thick.x += (want - s.thick.x) * Math.min(1, dt * 30);
      const a = Math.min(s.a.x, s.b.x);
      const b = Math.max(s.a.x, s.b.x);
      place(blob, rect(a, b, s.mid.x, s.thick.x));

      const done =
        elapsed > o.stick &&
        Math.abs(s.a.x - tA) + Math.abs(s.b.x - tB) < 0.3 &&
        Math.abs(s.a.v) + Math.abs(s.b.v) < 2 &&
        Math.abs(s.thick.x - restThick) < 0.3;
      if (done) {
        s.a = { x: tA, v: 0 };
        s.b = { x: tB, v: 0 };
        s.mid = { x: tMid, v: 0 };
        s.thick = { x: restThick, v: 0 };
        place(blob, to);
        return;
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  // Bei Größenänderung ohne Bewegung neu ausrichten
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      const blob = blobRef.current;
      const target = getTarget();
      if (!blob || !target || !sim.current) return;
      const s = sim.current;
      if (Math.abs(s.a.v) + Math.abs(s.b.v) > 2) return;
      const r = measure(target, container);
      const X = o.axis === 'x';
      sim.current = {
        a: { x: X ? r.x : r.y, v: 0 },
        b: { x: X ? r.x + r.w : r.y + r.h, v: 0 },
        mid: { x: X ? r.y + r.h / 2 : r.x + r.w / 2, v: 0 },
        thick: { x: X ? r.h : r.w, v: 0 },
      };
      place(blob, r);
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
