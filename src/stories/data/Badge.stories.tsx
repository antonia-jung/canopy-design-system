import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
 import { Badge } from '../../components/Badge/Badge';
const meta: Meta<typeof Badge> = { title: 'Data Display/Badge', component: Badge, parameters: { layout: 'padded' }, args: { children: 5 } };
export default meta;
type Story = StoryObj<typeof Badge>;
export const Playground: Story = {};
const intents = ['default', 'error', 'success', 'info', 'warning'] as const;
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Badge" intro="Kleine Markierung für Status oder Anzahl. Als Punkt braucht sie ein Label, sonst überspringen Screenreader sie. Ab 100 steht 99+.">
      <Section title="Zahl"><div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>{intents.map((i) => <Badge key={i} intent={i}>{12}</Badge>)}<Badge>{150}</Badge></div></Section>
      <Section title="Punkt"><div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>{intents.map((i) => <Badge key={i} intent={i} label={i} />)}</div></Section>
    </Page>
  ),
};
