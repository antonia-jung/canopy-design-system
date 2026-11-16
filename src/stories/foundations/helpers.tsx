import type { CSSProperties, ReactNode } from 'react';

export const Page = ({ title, intro, children }: { title: string; intro?: ReactNode; children: ReactNode }) => (
  <div style={{ maxWidth: 1040, margin: '0 auto', display: 'grid', gap: 40 }}>
    <header style={{ display: 'grid', gap: 8 }}>
      <h1 className="cp-text-heading-h2" style={{ margin: 0, color: 'var(--cp-text-heading)' }}>{title}</h1>
      {intro && <p className="cp-text-paragraph-large" style={{ margin: 0, maxWidth: 720 }}>{intro}</p>}
    </header>
    {children}
  </div>
);

export const Section = ({ title, note, children }: { title: string; note?: ReactNode; children: ReactNode }) => (
  <section style={{ display: 'grid', gap: 16 }}>
    <div style={{ display: 'grid', gap: 4 }}>
      <h2 className="cp-text-heading-h5" style={{ margin: 0, color: 'var(--cp-text-heading)' }}>{title}</h2>
      {note && <p className="cp-text-paragraph-small" style={{ margin: 0, color: 'var(--cp-text-caption)' }}>{note}</p>}
    </div>
    {children}
  </section>
);

export const Code = ({ children }: { children: ReactNode }) => (
  <code
    style={{
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      fontSize: 12,
      color: 'var(--cp-text-caption)',
      wordBreak: 'break-all',
    }}
  >
    {children}
  </code>
);

export const Grid = ({ min = 180, children, style }: { min?: number; children: ReactNode; style?: CSSProperties }) => (
  <div style={{ display: 'grid', gap: 16, gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`, ...style }}>{children}</div>
);

export const Card = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div
    style={{
      background: 'var(--cp-surface-raised)',
      border: '1px solid var(--cp-border-default)',
      borderRadius: 'var(--cp-radius-lg)',
      padding: 16,
      display: 'grid',
      gap: 8,
      ...style,
    }}
  >
    {children}
  </div>
);
