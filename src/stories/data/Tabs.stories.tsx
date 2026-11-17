import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
 import { Tabs } from '../../components/Tabs/Tabs';
const tabs = [
  { id: 'a', label: 'Übersicht', icon: 'home' as const, content: <p>Inhalt der Übersicht.</p> },
  { id: 'b', label: 'Details', content: <p>Details zum Projekt.</p> },
  { id: 'c', label: 'Aktivität', content: <p>Letzte Änderungen.</p> },
  { id: 'd', label: 'Einstellungen', icon: 'settings' as const, content: <p>Einstellungen.</p> },
  { id: 'e', label: 'Archiv', disabled: true },
];
const meta: Meta<typeof Tabs> = { title: 'Data Display/Tabs', component: Tabs, parameters: { layout: 'padded' }, args: { tabs, 'aria-label': 'Projekt' } };
export default meta;
type Story = StoryObj<typeof Tabs>;
export const Playground: Story = {};
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Tabs" intro="Gleichrangige Ansichten. Klick oder Pfeiltasten wechseln den Tab, die Unterstreichung wandert als Blob. Deaktivierte Tabs werden übersprungen.">
      <Section title="Mit Icons"><Tabs tabs={tabs} aria-label="Projekt" /></Section>
    </Page>
  ),
};
