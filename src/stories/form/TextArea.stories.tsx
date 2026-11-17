import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextArea } from '../../components/TextArea/TextArea';
import { Page, Section } from '../foundations/helpers';

const meta: Meta<typeof TextArea> = {
  title: 'Form Elements/Text Area',
  component: TextArea,
  parameters: { layout: 'padded' },
  argTypes: { validation: { control: 'inline-radio', options: ['none', 'error', 'success'] } },
  args: { label: 'Nachricht', placeholder: 'Worum geht es?', hint: 'Je konkreter, desto besser.', showCount: true, maxLength: 300, validation: 'none' },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof TextArea>;

export const Playground: Story = {};

export const Uebersicht: Story = {
  name: 'Übersicht',
  decorators: [],
  render: () => (
    <Page title="Text Area" intro="Mehrzeiliges Eingabefeld. Der Zähler zeigt die Länge, mit maxLength begrenzt er die Eingabe. Die Höhe lässt sich am Griff unten rechts ändern.">
      <Section title="Zustände">
        <div style={{ display: 'grid', gap: 32, gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', maxWidth: 1000 }}>
          <TextArea label="Standard" placeholder="Worum geht es?" hint="Hinweis zum Feld." showCount maxLength={300} rows={5} />
          <TextArea label="Ausgefüllt" defaultValue="Hallo Toni, ich würde gern über ein Projekt sprechen." showCount maxLength={300} rows={5} />
          <TextArea label="Fehler" validation="error" defaultValue="Zu kurz" hint="Bitte mindestens 20 Zeichen." rows={5} />
          <TextArea label="Erfolg" validation="success" defaultValue="Das passt so." hint="Danke!" rows={5} />
          <TextArea label="Deaktiviert" isDisabled defaultValue="Gesperrt" rows={5} />
          <TextArea label="Nur lesbar" isReadOnly defaultValue="Nur lesbar" rows={5} />
        </div>
      </Section>
    </Page>
  ),
};
