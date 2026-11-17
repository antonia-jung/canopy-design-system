import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Page, Section } from '../foundations/helpers';
 import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
const meta: Meta<typeof ProgressBar> = { title: 'Data Display/Progress Bar', component: ProgressBar, parameters: { layout: 'padded' }, args: { value: 60, label: 'Upload', showValue: true }, decorators: [(S) => <div style={{ width: 320 }}><S /></div>] };
export default meta;
type Story = StoryObj<typeof ProgressBar>;
export const Playground: Story = {};
const Live = () => {
  const [v, setV] = useState(30);
  return <div style={{ display: 'grid', gap: 12, width: 320 }}><ProgressBar value={v} label="Fortschritt" showValue /><div style={{ display: 'flex', gap: 8 }}><button onClick={() => setV(Math.max(0, v - 20))}>−20</button><button onClick={() => setV(Math.min(100, v + 20))}>+20</button></div></div>;
};
export const Uebersicht: Story = {
  name: 'Übersicht',
  decorators: [],
  render: () => (
    <Page title="Progress Bar" intro="Fortschritt in Prozent. Für unbekannte Dauer den Spinner nehmen.">
      <Section title="Interaktiv"><Live /></Section>
      <Section title="Werte"><div style={{ display: 'grid', gap: 16, width: 320 }}>{[0, 25, 60, 100].map((v) => <ProgressBar key={v} value={v} aria-label={`${v} Prozent`} />)}</div></Section>
    </Page>
  ),
};
