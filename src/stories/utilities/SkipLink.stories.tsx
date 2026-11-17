import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { SkipLink } from '../../components/SkipLink/SkipLink';
const meta: Meta<typeof SkipLink> = { title: 'Utilities/Skip Link', component: SkipLink, parameters: { layout: 'padded' }, args: { href: '#main' } };
export default meta;
type Story = StoryObj<typeof SkipLink>;
export const Playground: Story = { render: (a) => <div style={{ position: 'relative', height: 80 }}><p>Klick hier und drücke Tab.</p><SkipLink {...a} /></div> };
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Skip Link" intro="Erscheint nur per Tab und springt über die Navigation zum Inhalt. Als erstes Element der Seite einsetzen.">
      <Section title="Fokussiert"><div style={{ position: 'relative', height: 64 }}><SkipLink href="#main" /></div><p>Tab drücken, um ihn zu sehen.</p></Section>
    </Page>
  ),
};
