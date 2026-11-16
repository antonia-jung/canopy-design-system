import type { Meta, StoryObj } from '@storybook/react-vite';
import { tokens } from '../../tokens/tokens.generated';
import { Page, Section, Code, Grid } from './helpers';

const meta: Meta = { title: 'Foundations/Schatten', parameters: { layout: 'padded' } };
export default meta;

export const Uebersicht: StoryObj = {
  name: 'Übersicht',
  render: () => (
    <Page
      title="Schatten"
      intro="Der Soft-Look: Was man drückt, ist erhaben. Was man ausfüllt oder was einen Wert zeigt, ist eingedrückt. Er wirkt nur auf Surface/page."
    >
      <Section title="Soft">
        <Grid min={200}>
          {tokens.effects
            .filter((e) => e.name.startsWith('Soft/'))
            .map((e) => (
              <div key={e.name} style={{ display: 'grid', gap: 8 }}>
                <div
                  style={{
                    height: 96,
                    borderRadius: 'var(--cp-radius-lg)',
                    background: e.name === 'Soft/Pressed' ? 'var(--cp-surface-soft-pressed)' : 'var(--cp-surface-soft)',
                    boxShadow: `var(${e.cssVar})`,
                  }}
                />
                <strong className="cp-text-paragraph-small" style={{ color: 'var(--cp-text-heading)' }}>{e.name}</strong>
                <Code>{e.cssVar}</Code>
              </div>
            ))}
        </Grid>
      </Section>
      <Section title="Elevation" note="Für schwebende Ebenen wie Menü, Popover und Dialog.">
        <Grid min={200}>
          {tokens.effects
            .filter((e) => e.name.startsWith('Elevation/'))
            .map((e) => (
              <div key={e.name} style={{ display: 'grid', gap: 8 }}>
                <div style={{ height: 96, borderRadius: 'var(--cp-radius-lg)', background: 'var(--cp-surface-overlay)', boxShadow: `var(${e.cssVar})` }} />
                <strong className="cp-text-paragraph-small" style={{ color: 'var(--cp-text-heading)' }}>{e.name}</strong>
                <Code>{e.cssVar}</Code>
              </div>
            ))}
        </Grid>
      </Section>
    </Page>
  ),
};
