import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { Kbd } from '../../components/Kbd/Kbd';
const meta: Meta<typeof Kbd> = { title: 'Utilities/Kbd', component: Kbd, parameters: { layout: 'padded' }, args: { children: '⌘' } };
export default meta;
type Story = StoryObj<typeof Kbd>;
export const Playground: Story = {};
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Kbd" intro="Zeigt eine Taste oder ein Kürzel.">
      <Section title="Größen und Zustand"><div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Kbd size="S">⌘</Kbd><Kbd size="S">K</Kbd><Kbd>⌘</Kbd><Kbd>K</Kbd><Kbd pressed>Esc</Kbd></div></Section>
    </Page>
  ),
};
