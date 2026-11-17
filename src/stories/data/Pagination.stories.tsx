import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
 import { Pagination } from '../../components/Pagination/Pagination';
const meta: Meta<typeof Pagination> = { title: 'Data Display/Pagination', component: Pagination, parameters: { layout: 'padded' }, args: { total: 12, defaultPage: 5 } };
export default meta;
type Story = StoryObj<typeof Pagination>;
export const Playground: Story = {};
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Pagination" intro="Seiten einer Liste. Die Markierung gleitet als Blob. Compact passt auf schmale Plätze und zeigt nur Pfeile und Stand.">
      <Section title="Numbered"><Pagination total={12} defaultPage={5} /></Section>
      <Section title="Wenige Seiten"><Pagination total={5} /></Section>
      <Section title="Compact"><Pagination total={12} defaultPage={5} type="compact" /></Section>
    </Page>
  ),
};
