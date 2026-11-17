import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { ContactPattern } from '../../patterns/Contact/ContactPattern';
const meta: Meta = { title: 'Patterns/Contact', parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj;
export const Playground: Story = { render: () => <ContactPattern /> };
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Contact" intro="Kontaktformular mit Anliegen, Nachricht und Einwilligung. Fehler erscheinen erst nach dem Absenden.">
      <Section title="Desktop"><div style={{ width: 960, maxWidth: '100%' }}><ContactPattern /></div></Section>
      <Section title="Mobile"><div style={{ width: 375, maxWidth: '100%' }}><ContactPattern /></div></Section>
    </Page>
  ),
};
