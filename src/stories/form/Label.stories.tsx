import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '../../components/Label/Label';
import { Page, Section } from '../foundations/helpers';

const meta: Meta<typeof Label> = {
  title: 'Form Elements/Label',
  component: Label,
  parameters: { layout: 'padded' },
  args: { children: 'Vorname' },
};
export default meta;
type Story = StoryObj<typeof Label>;

export const Playground: Story = { args: { required: false, help: '' } };

export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Label" intro="Beschriftung für Formularfelder. Ein Label gehört immer zu genau einem Feld. Im Input, in der Text Area und in den Gruppen ist es bereits verbunden.">
      <Section title="Varianten">
        <div style={{ display: 'grid', gap: 24, paddingLeft: 16 }}>
          <Label>Vorname</Label>
          <Label required>Nachname</Label>
          <Label help="Wir nutzen deine Adresse nur für die Antwort.">E-Mail</Label>
          <Label required help="Pflichtfeld mit Hilfetext">Betreff</Label>
        </div>
      </Section>
    </Page>
  ),
};
