import type { Meta, StoryObj } from '@storybook/react-vite';
import { tokens } from '../../tokens/tokens.generated';
import { Page, Section, Code, Grid } from './helpers';

const meta: Meta = { title: 'Foundations/Abstände und Radius', parameters: { layout: 'padded' } };
export default meta;

const pick = (prefix: string) => tokens.Responsive.tokens.filter((t) => t.name.startsWith(prefix));

const Bar = ({ cssVar, label }: { cssVar: string; label: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16, alignItems: 'center' }}>
    <div style={{ display: 'grid' }}>
      <strong className="cp-text-paragraph-small" style={{ color: 'var(--cp-text-heading)' }}>{label}</strong>
      <Code>{cssVar}</Code>
    </div>
    <div style={{ height: 16, width: `var(${cssVar})`, background: 'var(--cp-surface-action)', borderRadius: 4, minWidth: 2 }} />
  </div>
);

export const Uebersicht: StoryObj = {
  name: 'Übersicht',
  render: () => (
    <Page
      title="Abstände und Radius"
      intro="Spacing ist die Grundskala. Stack (zwischen Elementen) und Inset (innen) sind getrennte Skalen darauf. Responsive wählt das Token, nicht den Wert."
    >
      <Section title="Spacing">
        <div style={{ display: 'grid', gap: 8 }}>{pick('Spacing/').map((t) => <Bar key={t.name} cssVar={t.cssVar} label={t.name} />)}</div>
      </Section>
      <Section title="Stack und Inset">
        <div style={{ display: 'grid', gap: 8 }}>
          {[...pick('Stack/'), ...pick('Inset/')].map((t) => (
            <Bar key={t.name} cssVar={t.cssVar} label={t.name} />
          ))}
        </div>
      </Section>
      <Section title="Radius" note="12 für Felder und Meldungen, 16 für Container, Pille für Aktionen.">
        <Grid min={140}>
          {pick('Radius/').map((t) => (
            <div key={t.name} style={{ display: 'grid', gap: 6 }}>
              <div
                style={{
                  height: 72,
                  background: 'var(--cp-surface-soft)',
                  boxShadow: 'var(--cp-shadow-soft-raised)',
                  borderRadius: `var(${t.cssVar})`,
                }}
              />
              <strong className="cp-text-paragraph-small" style={{ color: 'var(--cp-text-heading)' }}>{t.name}</strong>
              <Code>{t.cssVar}</Code>
            </div>
          ))}
        </Grid>
      </Section>
      <Section title="Border Width">
        <Grid min={140}>
          {pick('Border Width/').map((t) => (
            <div key={t.name} style={{ display: 'grid', gap: 6 }}>
              <div
                style={{
                  height: 56,
                  borderRadius: 'var(--cp-radius-md)',
                  border: `var(${t.cssVar}) solid var(--cp-border-action)`,
                }}
              />
              <strong className="cp-text-paragraph-small" style={{ color: 'var(--cp-text-heading)' }}>{t.name}</strong>
              <Code>{t.cssVar}</Code>
            </div>
          ))}
        </Grid>
      </Section>
    </Page>
  ),
};
