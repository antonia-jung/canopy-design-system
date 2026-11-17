import { useEffect, useRef, type KeyboardEvent } from 'react';
import './WheelPicker.css';

export interface WheelOption {
  value: string | number;
  label: string;
}
export interface WheelColumn {
  id: string;
  label: string;
  options: WheelOption[];
}
export interface WheelPickerProps {
  columns: WheelColumn[];
  value: Record<string, string | number>;
  onChange: (value: Record<string, string | number>) => void;
  'aria-label': string;
}

const ROW = 40;

function Wheel({ column, current, onPick }: { column: WheelColumn; current: string | number; onPick: (v: string | number) => void }) {
  const ref = useRef<HTMLUListElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const idx = Math.max(0, column.options.findIndex((o) => o.value === current));

  // Von außen geänderten Wert in die Scrollposition übernehmen
  useEffect(() => {
    const el = ref.current;
    if (el && Math.abs(el.scrollTop - idx * ROW) > 1) el.scrollTo({ top: idx * ROW, behavior: 'smooth' });
  }, [idx]);

  const settle = () => {
    const el = ref.current;
    if (!el) return;
    const i = Math.min(column.options.length - 1, Math.max(0, Math.round(el.scrollTop / ROW)));
    const v = column.options[i].value;
    if (v !== current) onPick(v);
  };
  const onScroll = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(settle, 80);
  };
  const step = (d: number) => {
    const i = Math.min(column.options.length - 1, Math.max(0, idx + d));
    onPick(column.options[i].value);
  };
  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, () => void> = {
      ArrowDown: () => step(1),
      ArrowUp: () => step(-1),
      PageDown: () => step(5),
      PageUp: () => step(-5),
      Home: () => step(-idx),
      End: () => step(column.options.length),
    };
    if (map[e.key]) {
      e.preventDefault();
      map[e.key]();
    }
  };

  return (
    <ul
      ref={ref}
      className="cp-wheel__col"
      role="listbox"
      tabIndex={0}
      aria-label={column.label}
      aria-activedescendant={`${column.id}-${idx}`}
      onScroll={onScroll}
      onKeyDown={onKey}
    >
      {column.options.map((o, i) => (
        <li
          key={o.value}
          id={`${column.id}-${i}`}
          role="option"
          aria-selected={i === idx}
          className="cp-wheel__row"
          data-dist={Math.min(3, Math.abs(i - idx))}
          onClick={() => onPick(o.value)}
        >
          {o.label}
        </li>
      ))}
    </ul>
  );
}

/** Walzen-Auswahl wie am Handy: Spalten scrollen und rasten ein, Pfeile, Bild auf/ab, Pos1/Ende funktionieren auch. */
export function WheelPicker({ columns, value, onChange, 'aria-label': ariaLabel }: WheelPickerProps) {
  return (
    <div className="cp-wheel" role="group" aria-label={ariaLabel}>
      <div className="cp-wheel__band" aria-hidden="true" />
      {columns.map((c) => (
        <Wheel key={c.id} column={c} current={value[c.id]} onPick={(v) => onChange({ ...value, [c.id]: v })} />
      ))}
    </div>
  );
}
