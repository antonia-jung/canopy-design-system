import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Page, Section } from '../foundations/helpers';
 import { SnackBar } from '../../components/SnackBar/SnackBar';
const meta: Meta<typeof SnackBar> = { title: 'Data Display/Snack Bar', component: SnackBar, parameters: { layout: 'padded' }, args: { title: 'Gespeichert', children: 'Deine Änderungen sind gesichert.' } };
export default meta;
type Story = StoryObj<typeof SnackBar>;
export const Playground: Story = {};
const Timed = () => {
  const [open, setOpen] = useState(true);
  return <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>{open ? <SnackBar intent="success" title="Verschickt" duration={5000} onClose={() => setOpen(false)} action={{ label: 'Rückgängig' }}>Verschwindet nach 5 Sekunden, pausiert bei Hover.</SnackBar> : <button onClick={() => setOpen(true)}>Nochmal zeigen</button>}</div>;
};
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Snack Bar" intro="Kurze Rückmeldung nach einer Aktion. Mindestens 5 Sekunden sichtbar, pausiert bei Hover und Fokus. Fehler werden sofort angesagt.">
      <Section title="Mit Ablauf"><Timed /></Section>
      <Section title="Intents"><div style={{ display: 'grid', gap: 16, justifyItems: 'start' }}>
        {(['default', 'info', 'success', 'warning', 'error'] as const).map((i) => <SnackBar key={i} intent={i} title={i} action={{ label: 'Mehr' }}>Kurzer Hinweistext zur Aktion.</SnackBar>)}
      </div></Section>
    </Page>
  ),
};
