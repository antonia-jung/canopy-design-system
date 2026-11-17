import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Checkbox, CheckboxGroup } from '../../components/Checkbox/Checkbox';
import { Page, Section } from '../foundations/helpers';

const meta: Meta<typeof Checkbox> = {
  title: 'Form Elements/Checkbox',
  component: Checkbox,
  parameters: { layout: 'padded' },
  args: { children: 'Newsletter abonnieren' },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {};

const topics = ['UX', 'UI', 'Code'];
const SelectAll = () => {
  const [sel, setSel] = useState<string[]>(['UX']);
  const all = sel.length === topics.length;
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <Checkbox isSelected={all} isIndeterminate={sel.length > 0 && !all} onChange={(v) => setSel(v ? topics : [])}>
        Alle Themen
      </Checkbox>
      <div style={{ paddingLeft: 36 }}>
        <CheckboxGroup aria-label="Themen" value={sel} onChange={setSel}>
          {topics.map((t) => <Checkbox key={t} value={t}>{t}</Checkbox>)}
        </CheckboxGroup>
      </div>
    </div>
  );
};

export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Checkbox" intro="Einzelne Auswahl oder Gruppe. Leertaste schaltet um, die Gruppe meldet die Auswahl gesammelt. Teilweise gewählte Gruppen zeigen einen Strich.">
      <Section title="Zustände">
        <div style={{ display: 'grid', gap: 12 }}>
          <Checkbox>Nicht gewählt</Checkbox>
          <Checkbox defaultSelected>Gewählt</Checkbox>
          <Checkbox isIndeterminate>Teilweise</Checkbox>
          <Checkbox isDisabled>Deaktiviert</Checkbox>
          <Checkbox isDisabled defaultSelected>Deaktiviert und gewählt</Checkbox>
          <Checkbox isInvalid>Fehler</Checkbox>
          <Checkbox isInvalid defaultSelected>Fehler und gewählt</Checkbox>
        </div>
      </Section>
      <Section title="Gruppe">
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          <CheckboxGroup legend="Interessen" message="Mehrfachauswahl möglich." defaultValue={['ux']}>
            <Checkbox value="ux">UX Design</Checkbox>
            <Checkbox value="ui">UI Design</Checkbox>
            <Checkbox value="code">Frontend</Checkbox>
          </CheckboxGroup>
          <CheckboxGroup legend="Mit Fehler" validation="error" message="Bitte wähle mindestens eins." orientation="horizontal">
            <Checkbox value="a">A</Checkbox>
            <Checkbox value="b">B</Checkbox>
            <Checkbox value="c">C</Checkbox>
          </CheckboxGroup>
        </div>
      </Section>
      <Section title="Alle wählen" note="Die übergeordnete Checkbox zeigt den Strich, wenn nur ein Teil gewählt ist.">
        <SelectAll />
      </Section>
    </Page>
  ),
};
