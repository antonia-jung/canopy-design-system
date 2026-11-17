import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Page, Section } from '../foundations/helpers';
import { Alert } from '../../components/Alert/Alert';
import { Button } from '../../components/Button/Button';
const meta: Meta<typeof Alert> = { title: 'Content/Alert', component: Alert, parameters: { layout: 'padded' }, args: { title: 'Hinweis', children: 'Eine kurze Erklärung, was passiert ist und was als Nächstes zu tun ist.', intent: 'default' } };
export default meta;
type Story = StoryObj<typeof Alert>;
export const Playground: Story = {};
function Closable() {
  const [open, setOpen] = useState(true);
  return open ? <Alert intent="info" title="Schließbar" onClose={() => setOpen(false)}>Mit dem Symbol ausblenden.</Alert> : <Button variant="outline" onPress={() => setOpen(true)}>Wieder anzeigen</Button>;
}
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Alert" intro="Dauerhafter Hinweis im Inhalt. Fehler und Warnungen werden sofort vorgelesen, der Rest höflich. Für kurze Rückmeldungen gibt es die Snack Bar.">
      <Section title="Intents"><div style={{ display: 'grid', gap: 16 }}>{(['default', 'info', 'success', 'warning', 'error'] as const).map((i) => <Alert key={i} intent={i} title={i}>Eine kurze Erklärung.</Alert>)}</div></Section>
      <Section title="Mit Aktion"><Alert intent="error" title="Speichern fehlgeschlagen" action={<Button variant="outline">Erneut versuchen</Button>}>Die Verbindung wurde unterbrochen.</Alert></Section>
      <Section title="Schließbar"><Closable /></Section>
    </Page>
  ),
};
