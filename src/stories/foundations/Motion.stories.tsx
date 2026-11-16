import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
import { tokens } from '../../tokens/tokens.generated';
import { useBlob } from '../../motion/useBlob';
import { Page, Section, Code } from './helpers';

const meta: Meta = { title: 'Foundations/Motion', parameters: { layout: 'padded' } };
export default meta;

const Track = ({ duration, easing, label, note }: { duration: string; easing: string; label: string; note: string }) => {
  const [on, setOn] = useState(false);
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <strong className="cp-text-paragraph-medium" style={{ color: 'var(--cp-text-heading)' }}>{label}</strong>
      <span className="cp-text-paragraph-small">{note}</span>
      <button
        type="button"
        aria-pressed={on}
        aria-label={`${label} abspielen`}
        onClick={() => setOn((v) => !v)}
        className="cp-focus-ring"
        style={{
          position: 'relative',
          width: 288,
          height: 40,
          border: 0,
          padding: 0,
          cursor: 'pointer',
          borderRadius: 999,
          background: 'var(--cp-surface-soft-pressed)',
          boxShadow: 'var(--cp-shadow-soft-pressed)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 4,
            left: 4,
            width: 32,
            height: 32,
            borderRadius: 999,
            background: 'var(--cp-surface-action)',
            transform: `translateX(${on ? 248 : 0}px)`,
            transition: `transform var(${duration}) var(${easing})`,
          }}
        />
      </button>
    </div>
  );
};

declare const __CANOPY_BUILD__: string;

const Status = () => {
  const [reduced, setReduced] = useState<boolean | null>(null);
  useEffect(() => {
    const read = () => setReduced(getComputedStyle(document.documentElement).getPropertyValue('--cp-motion-reduced').trim() === '1');
    read();
    const id = setInterval(read, 500);
    return () => clearInterval(id);
  }, []);
  return (
    <p className="cp-text-caption" style={{ margin: 0, color: 'var(--cp-text-caption)' }}>
      Stand {typeof __CANOPY_BUILD__ === 'string' ? __CANOPY_BUILD__ : 'lokal'} · Bewegung {reduced === null ? '…' : reduced ? 'reduziert (Blob gleitet nur)' : 'voll'}
    </p>
  );
};

const BlobDemo = () => {
  const items = ['Tag', 'Woche', 'Monat', 'Jahr'];
  const [sel, setSel] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const blob = useRef<HTMLSpanElement>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  useBlob(blob, container, () => refs.current[sel] ?? null, sel);
  return (
    <div
      ref={container}
      role="radiogroup"
      aria-label="Zeitraum"
      style={{
        position: 'relative',
        display: 'inline-flex',
        justifySelf: 'start',
        gap: 4,
        padding: 4,
        borderRadius: 999,
        background: 'var(--cp-surface-soft-pressed)',
        boxShadow: 'var(--cp-shadow-soft-pressed)',
      }}
    >
      <span ref={blob} className="cp-blob" style={{ top: 0, left: 0, borderRadius: 999, background: 'var(--cp-surface-soft)', boxShadow: 'var(--cp-shadow-soft-raised)' }} />
      {items.map((it, i) => (
        <button
          key={it}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="button"
          role="radio"
          aria-checked={sel === i}
          onClick={() => setSel(i)}
          className="cp-focus-ring cp-text-paragraph-small"
          style={{
            position: 'relative',
            zIndex: 1,
            border: 0,
            background: 'transparent',
            padding: '6px 16px',
            borderRadius: 999,
            cursor: 'pointer',
            color: sel === i ? 'var(--cp-text-heading)' : 'var(--cp-text-body)',
          }}
        >
          {it}
        </button>
      ))}
    </div>
  );
};

export const TransitionStyles: StoryObj = {
  name: 'Transition Styles',
  render: () => (
    <Page
      title="Motion"
      intro="Zeiten und Kurven stehen als Tokens bereit. Zum Testen die Spuren anklicken. In der Toolbar lässt sich reduzierte Bewegung einschalten: Dann entfallen Dehnen und Bounce, der Blob gleitet nur."
    >
      <Section title="Transition Styles">
        <div style={{ display: 'grid', gap: 32 }}>
          <Track label="hover" note="Duration/fast mit Easing/standard. Hover, Fokus, kleine Wechsel." duration="--cp-duration-fast" easing="--cp-easing-standard" />
          <Track label="state" note="Duration/base mit Easing/standard. Auswahl, Ein- und Ausblenden." duration="--cp-duration-base" easing="--cp-easing-standard" />
          <Track label="slide" note="Duration/slow mit Easing/standard. Große Wege." duration="--cp-duration-slow" easing="--cp-easing-standard" />
          <div style={{ display: 'grid', gap: 8 }}>
            <strong className="cp-text-paragraph-medium" style={{ color: 'var(--cp-text-heading)' }}>blob</strong>
            <span className="cp-text-paragraph-small">
              Im Code bewegen zwei Federn die Kanten: Die vordere zieht sofort los, die hintere haftet kurz und schnappt hinterher. Die Dicke folgt der Dehnung, am Ziel federt der Blob leicht aus. Ein neuer Klick setzt nahtlos an der aktuellen Position an. Baustein <Code>useBlob</Code>, Einstellungen in <Code>blobDefaults</Code>. In Figma ist dieselbe Bewegung mit den Tokens Duration/stretch, snap und settle angenähert.
            </span>
            <BlobDemo />
            <Status />
          </div>
        </div>
      </Section>
      <Section title="Tokens">
        <table className="cp-text-paragraph-small" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--cp-text-heading)' }}>
              <th style={{ padding: 8 }}>Token</th>
              <th style={{ padding: 8 }}>CSS-Variable</th>
              <th style={{ padding: 8 }}>Wert</th>
            </tr>
          </thead>
          <tbody>
            {tokens.Motion.tokens.map((t) => (
              <tr key={t.name} style={{ borderTop: '1px solid var(--cp-border-default)' }}>
                <td style={{ padding: 8 }}>{t.name}</td>
                <td style={{ padding: 8 }}>
                  <Code>{t.cssVar}</Code>
                </td>
                <td style={{ padding: 8 }}>
                  <Code>{String(t.values[0])}{t.type === 'F' ? ' ms' : ''}</Code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </Page>
  ),
};
