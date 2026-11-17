import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import type { MenuGroup } from '../../components/Menu/Menu';
import { Page, Section } from '../foundations/helpers';

const groups: MenuGroup[] = [
  { title: 'Design', items: [{ id: 'ux', label: 'UX Design' }, { id: 'ui', label: 'UI Design' }] },
  { title: 'Entwicklung', items: [{ id: 'fe', label: 'Frontend' }, { id: 'be', label: 'Backend', disabled: true }] },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Form Elements/Dropdown',
  component: Dropdown,
  parameters: { layout: 'padded' },
  args: { label: 'Fachgebiet', groups },
  decorators: [(S) => <div style={{ width: 320, minHeight: 280 }}><S /></div>],
};
export default meta;
type Story = StoryObj<typeof Dropdown>;
export const Playground: Story = {};

export const Uebersicht: Story = {
  name: 'Übersicht',
  decorators: [],
  render: () => (
    <Page title="Dropdown" intro="Auswahlfeld im Look des Inputs. Öffnet ein Menü in Feldbreite; Pfeile, Tippen und Enter funktionieren auch ohne Maus.">
      <Section title="Größen">
        <div style={{ display: 'grid', gap: 16, width: 320 }}>
          {(['S', 'M', 'L'] as const).map((s) => <Dropdown key={s} size={s} label={`Größe ${s}`} groups={groups} />)}
        </div>
      </Section>
      <Section title="Mit Suche">
        <div style={{ width: 320 }}><Dropdown label="Land" searchable groups={[{ items: ['Deutschland', 'Dänemark', 'Frankreich', 'Italien', 'Österreich', 'Polen', 'Schweiz', 'Spanien'].map((l) => ({ id: l, label: l })) }]} /></div>
      </Section>
      <Section title="Zustände">
        <div style={{ display: 'grid', gap: 16, width: 320 }}>
          <Dropdown label="Mit Wert" groups={groups} defaultSelectedKey="ui" />
          <Dropdown label="Pflicht" isRequired hint="Bitte ein Fachgebiet wählen" groups={groups} />
          <Dropdown label="Fehler" validation="error" hint="Auswahl fehlt" groups={groups} />
          <Dropdown label="Erfolg" validation="success" hint="Passt" groups={groups} defaultSelectedKey="fe" />
          <Dropdown label="Deaktiviert" isDisabled groups={groups} />
        </div>
      </Section>
    </Page>
  ),
};
