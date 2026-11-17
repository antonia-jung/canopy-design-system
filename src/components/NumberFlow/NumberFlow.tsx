import { useEffect, useRef, useState } from 'react';
import './NumberFlow.css';

export interface NumberFlowProps {
  value: number;
  /** Mindestanzahl Stellen, mit führenden Nullen aufgefüllt */
  minDigits?: number;
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/** Eine Ziffer rollt auf einem Streifen. Der Streifen ist dreimal 0 bis 9 lang, damit auch 9 → 0 weiterrollt statt zurückzuspulen. */
function Digit({ digit, dir }: { digit: number; dir: 1 | -1 }) {
  const [idx, setIdx] = useState(10 + digit);
  const [anim, setAnim] = useState(true);
  const last = useRef(digit);
  useEffect(() => {
    if (digit === last.current) return;
    let delta = digit - (idx % 10);
    if (dir > 0 && delta < 0) delta += 10;
    if (dir < 0 && delta > 0) delta -= 10;
    last.current = digit;
    setAnim(true);
    setIdx(idx + delta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digit]);
  const settle = () => {
    if (idx >= 20 || idx < 10) {
      setAnim(false);
      setIdx(10 + (idx % 10));
    }
  };
  return (
    <span className="cp-numberflow__digit" aria-hidden="true">
      <span className="cp-numberflow__strip" data-anim={anim || undefined} style={{ transform: `translateY(${-idx}em)` }} onTransitionEnd={settle}>
        {[...DIGITS, ...DIGITS, ...DIGITS].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </span>
    </span>
  );
}

/** Zahl, deren Ziffern einzeln zum neuen Wert rollen. Screenreader lesen den Wert als Text. */
export function NumberFlow({ value, minDigits = 1 }: NumberFlowProps) {
  const prev = useRef(value);
  const dir: 1 | -1 = value >= prev.current ? 1 : -1;
  useEffect(() => {
    prev.current = value;
  }, [value]);
  const text = String(Math.max(0, Math.floor(value))).padStart(minDigits, '0');
  return (
    <span className="cp-numberflow" role="text" aria-label={text}>
      {text.split('').map((c, i) => (
        // Von rechts zählen, damit Einer und Zehner beim Wechsel der Stellenzahl ihre Spalte behalten
        <Digit key={text.length - i} digit={Number(c)} dir={dir} />
      ))}
    </span>
  );
}
