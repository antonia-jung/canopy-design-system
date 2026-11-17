import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Page, Section } from '../foundations/helpers';
 import { NumberFlow } from '../../components/NumberFlow/NumberFlow';
import { Button } from '../../components/Button/Button';
const meta: Meta<typeof NumberFlow> = { title: 'Data Display/Number Flow', component: NumberFlow, parameters: { layout: 'padded' }, args: { value: 7 } };
export default meta;
type Story = StoryObj<typeof NumberFlow>;
export const Playground: Story = {};
const Live = () => {
  const [v, setV] = useState(8);
  return <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}><Button onPress={() => setV(Math.max(0, v - 1))} aria-label="Eins weniger">−</Button><NumberFlow value={v} /><Button onPress={() => setV(v + 1)} aria-label="Eins mehr">+</Button></div>;
};
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Number Flow" intro="Ziffern rollen einzeln zum neuen Wert, auch von 9 auf 10 und zurück. Screenreader lesen die Zahl als Text. Bei reduzierter Bewegung springt sie.">
      <Section title="Interaktiv"><Live /></Section>
    </Page>
  ),
};
