import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { SearchPattern } from '../../patterns/Search/SearchPattern';
import { searchItems } from './data';
const meta: Meta = { title: 'Patterns/Search', parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj;
export const Playground: Story = { render: () => <SearchPattern items={searchItems} categories={['Projekte', 'Artikel']} defaultQuery="" /> };
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Search" intro="Suche mit Filter-Tags, Ergebnisliste und Seitenwechsel. Tippe, filtere, und suche etwas, das es nicht gibt.">
      <Section title="Desktop"><div style={{ width: 960, maxWidth: '100%' }}><SearchPattern items={searchItems} categories={['Projekte', 'Artikel']} defaultQuery="" /></div></Section>
      <Section title="Mobile"><div style={{ width: 375, maxWidth: '100%' }}><SearchPattern items={searchItems} categories={['Projekte', 'Artikel']} defaultQuery="" /></div></Section>
    </Page>
  ),
};
