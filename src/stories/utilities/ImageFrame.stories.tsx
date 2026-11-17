import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { ImageFrame } from '../../components/ImageFrame/ImageFrame';
const meta: Meta<typeof ImageFrame> = { title: 'Utilities/Image Frame', component: ImageFrame, parameters: { layout: 'padded' } };
export default meta;
type Story = StoryObj<typeof ImageFrame>;
export const Playground: Story = { render: (a) => <div style={{ width: 240 }}><ImageFrame {...a} /></div> };
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Image Frame" intro="Rahmen mit festem Seitenverhältnis. Ohne Bild steht ein Platzhalter, so springt nichts beim Laden.">
      <Section title="Seitenverhältnisse"><div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>{(['1:1', '4:3', '16:9', '3:4'] as const).map((r) => <ImageFrame key={r} ratio={r} width={120} />)}</div></Section>
      <Section title="Ecken"><div style={{ display: 'flex', gap: 16 }}><ImageFrame width={120} /><ImageFrame width={120} rounded={false} /></div></Section>
    </Page>
  ),
};
