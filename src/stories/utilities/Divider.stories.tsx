import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { Divider } from '../../components/Divider/Divider';
const meta: Meta<typeof Divider> = { title: 'Utilities/Divider', component: Divider, parameters: { layout: 'padded' } };
export default meta;
type Story = StoryObj<typeof Divider>;
export const Playground: Story = { render: (a) => <div style={{ width: 320 }}><Divider {...a} /></div> };
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Divider" intro="Trennt Inhalte optisch. Mit Beschriftung etwa für 'oder' in Formularen.">
      <Section title="Horizontal"><div style={{ width: 320, display: 'grid', gap: 24 }}><Divider /><Divider weight="strong" /><Divider label="oder" /></div></Section>
      <Section title="Vertikal"><div style={{ display: 'flex', gap: 16, height: 32, alignItems: 'center' }}>Eins<Divider orientation="vertical" />Zwei<Divider orientation="vertical" weight="strong" />Drei</div></Section>
    </Page>
  ),
};
