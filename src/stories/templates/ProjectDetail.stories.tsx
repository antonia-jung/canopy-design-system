import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { ProjectDetail } from '../../templates/ProjectDetail';
const meta: Meta = { title: 'Templates/Project Detail', parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj;
export const Playground: Story = { render: () => <ProjectDetail /> };
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Project Detail" intro="Fallstudie mit Eckdaten, Hauptbild, Abschnitten, Galerie und nächstem Projekt. Das Layout folgt der Breite des Bereichs.">
      <Section title="Desktop"><div style={{ width: 1280, maxWidth: '100%' }}><ProjectDetail /></div></Section>
      <Section title="Mobile"><div style={{ width: 375, maxWidth: '100%' }}><ProjectDetail /></div></Section>
    </Page>
  ),
};
