import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
 import { Carousel } from '../../components/Carousel/Carousel';
const slides = [1, 2, 3].map((n) => <span key={n}>Folie {n} von 3</span>);
const meta: Meta<typeof Carousel> = { title: 'Data Display/Carousel', component: Carousel, parameters: { layout: 'padded' }, args: { slides, 'aria-label': 'Projektbilder' }, decorators: [(S) => <div style={{ width: 480 }}><S /></div>] };
export default meta;
type Story = StoryObj<typeof Carousel>;
export const Playground: Story = {};
export const Uebersicht: Story = {
  name: 'Übersicht',
  decorators: [],
  render: () => (
    <Page title="Carousel" intro="Inhalte nacheinander. Pfeile oder die Tasten ← und → blättern, die Leiste zeigt den Fortschritt. Kein Autoplay.">
      <Section title="Drei Folien"><div style={{ width: 480 }}><Carousel slides={slides} aria-label="Projektbilder" /></div></Section>
    </Page>
  ),
};
