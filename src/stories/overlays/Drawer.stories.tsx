import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { Drawer } from '../../components/Drawer/Drawer';
import { Button } from '../../components/Button/Button';
const meta: Meta<typeof Drawer> = { title: 'Overlays/Drawer', component: Drawer, parameters: { layout: 'padded' }, args: { title: 'Drawer-Titel', children: 'Hier steht scrollbarer Inhalt, zum Beispiel Filter, Details oder ein Formular.', placement: 'right', primaryLabel: 'Anwenden', secondaryLabel: 'Zurücksetzen' } };
export default meta;
type Story = StoryObj<typeof Drawer>;
export const Playground: Story = { render: (a) => <Drawer {...a} trigger={<Button variant="outline">Drawer öffnen</Button>} /> };
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Drawer" intro="Seitenpanel für Zusatzinhalte oder Einstellungen. Klick auf den Scrim und Esc schließen. Unten wird es zum Sheet mit Griff.">
      <Section title="Platzierung"><div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>{(['right', 'left', 'bottom'] as const).map((p) => <Drawer key={p} placement={p} title={`Drawer ${p}`} primaryLabel="Anwenden" secondaryLabel="Abbrechen" trigger={<Button variant="outline">{p}</Button>}>{Array.from({ length: 12 }, (_, i) => <p key={i} style={{ margin: 0 }}>Zeile {i + 1} des scrollbaren Inhalts.</p>)}</Drawer>)}</div></Section>
      <Section title="Ohne Fußzeile"><Drawer title="Details" trigger={<Button variant="outline">Details</Button>}>Nur Inhalt, geschlossen wird mit dem Symbol, Esc oder Klick daneben.</Drawer></Section>
    </Page>
  ),
};
