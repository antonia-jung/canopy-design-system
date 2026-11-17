import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { Skeleton } from '../../components/Skeleton/Skeleton';
const meta: Meta<typeof Skeleton> = { title: 'Utilities/Skeleton', component: Skeleton, parameters: { layout: 'padded' } };
export default meta;
type Story = StoryObj<typeof Skeleton>;
export const Playground: Story = {};
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Skeleton" intro="Platzhalter beim Laden, der die spätere Form andeutet. Der umgebende Bereich trägt aria-busy.">
      <Section title="Formen"><div style={{ display: 'flex', gap: 16, alignItems: 'center' }}><Skeleton type="circle" size="S" /><Skeleton type="circle" size="M" /><Skeleton type="circle" size="L" /></div><div style={{ display: 'grid', gap: 8, marginTop: 16 }}><Skeleton size="S" /><Skeleton size="M" /><Skeleton size="L" /></div></Section>
      <Section title="Karte"><div aria-busy="true" style={{ width: 280, display: 'grid', gap: 12 }}><Skeleton type="rectangle" size="M" /><Skeleton width="70%" /><Skeleton width="45%" size="S" /></div></Section>
      <Section title="Listeneintrag"><div aria-busy="true" style={{ display: 'flex', gap: 12, alignItems: 'center' }}><Skeleton type="circle" size="M" /><div style={{ display: 'grid', gap: 8 }}><Skeleton width={180} /><Skeleton width={120} size="S" /></div></div></Section>
    </Page>
  ),
};
