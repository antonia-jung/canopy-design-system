import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { DataPagePattern } from '../../patterns/DataPage/DataPagePattern';
import { dataRows } from './data';
const meta: Meta = { title: 'Patterns/Data Page', parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj;
export const Playground: Story = { render: () => <DataPagePattern rows={dataRows} statuses={['Neu', 'Offen', 'Erledigt']} /> };
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Data Page" intro="Datenseite mit Kopfzeile, Suche, Filter und Tabelle. In schmalen Bereichen wird aus der Tabelle eine Liste.">
      <Section title="Desktop"><div style={{ width: 960, maxWidth: '100%' }}><DataPagePattern rows={dataRows} statuses={['Neu', 'Offen', 'Erledigt']} /></div></Section>
      <Section title="Mobile"><div style={{ width: 375, maxWidth: '100%' }}><DataPagePattern rows={dataRows} statuses={['Neu', 'Offen', 'Erledigt']} /></div></Section>
    </Page>
  ),
};
