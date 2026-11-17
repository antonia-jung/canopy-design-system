import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { ContactPage } from '../../templates/ContactPage';
const meta: Meta = { title: 'Templates/Contact Page', parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj;
export const Playground: Story = { render: () => <ContactPage /> };
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Contact Page" intro="Kontaktseite mit Formular und direktem Weg per E-Mail. Das Layout folgt der Breite des Bereichs.">
      <Section title="Desktop"><div style={{ width: 1280, maxWidth: '100%' }}><ContactPage /></div></Section>
      <Section title="Mobile"><div style={{ width: 375, maxWidth: '100%' }}><ContactPage /></div></Section>
    </Page>
  ),
};
