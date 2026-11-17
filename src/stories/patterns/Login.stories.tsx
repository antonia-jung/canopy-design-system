import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { LoginPattern } from '../../patterns/Login/LoginPattern';
const meta: Meta = { title: 'Patterns/Login', parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj;
export const Playground: Story = { render: () => <LoginPattern /> };
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Login" intro="Anmeldeformular. Fehler stehen am Feld, ein Serverfehler oben im Formular. Probiere es mit leeren Feldern aus.">
      <Section title="Desktop"><div style={{ width: 960, maxWidth: '100%' }}><LoginPattern /></div></Section>
      <Section title="Mobile"><div style={{ width: 375, maxWidth: '100%' }}><LoginPattern /></div></Section>
    </Page>
  ),
};
