import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { LandingPage } from '../../templates/LandingPage';
const meta: Meta = { title: 'Templates/Landing Page', parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj;
export const Playground: Story = { render: () => <LandingPage /> };
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Landing Page" intro="Startseite mit Hero, Projekten, Kurzvorstellung und Einladung zum Kontakt. Das Layout folgt der Breite des Bereichs.">
      <Section title="Desktop"><div style={{ width: 1280, maxWidth: '100%' }}><LandingPage /></div></Section>
      <Section title="Mobile"><div style={{ width: 375, maxWidth: '100%' }}><LandingPage /></div></Section>
    </Page>
  ),
};
