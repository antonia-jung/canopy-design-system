import type { Meta, StoryObj } from '@storybook/react-vite';
import { tokens } from '../../tokens/tokens.generated';
import { Page, Code } from './helpers';

const meta: Meta = { title: 'Foundations/Typografie', parameters: { layout: 'padded' } };
export default meta;

export const Textstile: StoryObj = {
  render: () => (
    <Page
      title="Typografie"
      intro="Überschriften in Funnel Display, Fließtext in Funnel Sans. H1 bis H4 werden ab Tablet größer, die Werte kommen aus der Sammlung Responsive."
    >
      <div style={{ display: 'grid', gap: 24 }}>
        {tokens.text.map((t) => (
          <div
            key={t.name}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(180px, 220px) 1fr',
              gap: 24,
              alignItems: 'baseline',
              paddingBottom: 24,
              borderBottom: '1px solid var(--cp-border-default)',
            }}
          >
            <div style={{ display: 'grid', gap: 4 }}>
              <strong className="cp-text-paragraph-small" style={{ color: 'var(--cp-text-heading)' }}>{t.name}</strong>
              <Code>.{t.className}</Code>
              <Code>
                {t.family} {t.style} · {t.size}/{t.lineHeight}
              </Code>
            </div>
            <span className={t.className} style={{ color: 'var(--cp-text-heading)' }}>
              Lichtung im Wald
            </span>
          </div>
        ))}
      </div>
    </Page>
  ),
};
