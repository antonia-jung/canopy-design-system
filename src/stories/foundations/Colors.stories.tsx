import type { Meta, StoryObj } from '@storybook/react-vite';
import { tokens } from '../../tokens/tokens.generated';
import { Page, Section, Code, Grid } from './helpers';

const meta: Meta = { title: 'Foundations/Farben', parameters: { layout: 'padded' } };
export default meta;

const swatch = (cssVar: string, large = false) => (
  <div
    style={{
      height: large ? 72 : 48,
      borderRadius: 'var(--cp-radius-md)',
      background: `var(${cssVar})`,
      boxShadow: 'inset 0 0 0 1px color-mix(in srgb, var(--cp-text-heading) 12%, transparent)',
    }}
  />
);

const groups = ['Surface', 'Border', 'Text', 'Icon', 'Shadow'] as const;

export const Semantisch: StoryObj = {
  name: 'Semantische Farben',
  render: () => (
    <Page
      title="Farben"
      intro="Komponenten nutzen nur semantische Farben aus der Sammlung Mapped. Sie wechseln mit dem Theme. Schalte oben in der Toolbar zwischen Light und Dark."
    >
      {groups.map((g) => (
        <Section key={g} title={g}>
          <Grid min={200}>
            {tokens.Mapped.tokens
              .filter((t) => t.name.startsWith(`${g}/`))
              .map((t) => (
                <div key={t.name} style={{ display: 'grid', gap: 6 }}>
                  {swatch(t.cssVar)}
                  <strong className="cp-text-paragraph-small" style={{ color: 'var(--cp-text-heading)' }}>{t.name}</strong>
                  <Code>{t.cssVar}</Code>
                  <Code>
                    Light {String(t.values[0])} · Dark {String(t.values[1])}
                  </Code>
                </div>
              ))}
          </Grid>
        </Section>
      ))}
      <Section title="Context" note="Outline-Farben. Auf grünen Aktionsflächen schaltet data-context=&quot;on-action&quot; sie um.">
        <Grid min={200}>
          {tokens.Context.tokens.map((t) => (
            <div key={t.name} style={{ display: 'grid', gap: 6 }}>
              {swatch(t.cssVar)}
              <strong className="cp-text-paragraph-small" style={{ color: 'var(--cp-text-heading)' }}>{t.name}</strong>
              <Code>{t.cssVar}</Code>
            </div>
          ))}
        </Grid>
      </Section>
    </Page>
  ),
};

const scales = ['Forest', 'Sand', 'Coral', 'Grey', 'Red', 'Yellow', 'Blue', 'Green'];

export const Palette: StoryObj = {
  name: 'Palette',
  render: () => (
    <Page
      title="Palette"
      intro="Rohe Farbskalen aus der Sammlung Brand. Sie werden nur über Alias und Mapped verwendet, nie direkt in Komponenten."
    >
      {scales.map((s) => {
        const items = tokens.Brand.tokens
          .filter((t) => t.name.startsWith(`${s}/`) && /\d/.test(t.name))
          .sort((a, b) => parseInt(a.name.split('/')[1]) - parseInt(b.name.split('/')[1]));
        return (
          <Section key={s} title={s}>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 4 }}>
              {items.map((t) => (
                <div key={t.name} style={{ display: 'grid', gap: 4 }}>
                  {swatch(t.cssVar, true)}
                  <span className="cp-text-caption" style={{ color: 'var(--cp-text-heading)' }}>{t.name.split('/')[1].replace(' - Default', '')}</span>
                  <Code>{String(t.values[0])}</Code>
                </div>
              ))}
            </div>
          </Section>
        );
      })}
    </Page>
  ),
};
