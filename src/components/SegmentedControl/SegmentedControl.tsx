import { useRef, useState } from 'react';
import { ToggleButtonGroup, ToggleButton, type Key } from 'react-aria-components';
import { useBlob } from '../../motion/useBlob';
import './SegmentedControl.css';

export interface SegmentedControlProps {
  segments: { id: string; label: string; disabled?: boolean }[];
  selectedKey?: Key;
  defaultSelectedKey?: Key;
  onSelectionChange?: (key: Key) => void;
  'aria-label': string;
}

/** Wenige Modi umschalten, genau einer ist aktiv. Der erhabene Indikator wandert als Faden durch die eingedrückte Spur. */
export function SegmentedControl({ segments, selectedKey, defaultSelectedKey, onSelectionChange, 'aria-label': ariaLabel }: SegmentedControlProps) {
  const [inner, setInner] = useState<Key>(defaultSelectedKey ?? segments[0].id);
  const current = selectedKey ?? inner;
  const track = useRef<HTMLDivElement>(null);
  const blob = useRef<HTMLSpanElement>(null);
  const seen = useRef(false);
  const first = !seen.current;
  seen.current = true;
  useBlob(blob, track, () => track.current?.querySelector<HTMLElement>('[data-selected]') ?? null, current, { axis: 'x', teleport: first });
  return (
    <div className="cp-segmented" ref={track}>
      <span ref={blob} className="cp-blob cp-segmented__blob" aria-hidden="true" style={{ top: 0, left: 0 }} />
      <ToggleButtonGroup
        aria-label={ariaLabel}
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={[current]}
        onSelectionChange={(keys) => {
          const k = [...keys][0];
          if (k !== undefined) {
            setInner(k);
            onSelectionChange?.(k);
          }
        }}
        className="cp-segmented__group"
      >
        {segments.map((s) => (
          <ToggleButton key={s.id} id={s.id} isDisabled={s.disabled} className="cp-segmented__item">
            {s.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}
