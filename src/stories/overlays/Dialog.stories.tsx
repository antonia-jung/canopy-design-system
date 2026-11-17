import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { Dialog } from '../../components/Dialog/Dialog';
import { Button } from '../../components/Button/Button';
const meta: Meta<typeof Dialog> = { title: 'Overlays/Dialog', component: Dialog, parameters: { layout: 'padded' }, args: { title: 'Dialogtitel', children: 'Beschreibe hier kurz, worum es geht und was als Nächstes passiert.', size: 'M' } };
export default meta;
type Story = StoryObj<typeof Dialog>;
export const Playground: Story = { render: (a) => <Dialog {...a} trigger={<Button variant="outline">Dialog öffnen</Button>} /> };
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Dialog" intro="Modaler Dialog für eine Entscheidung oder Eingabe. Der Fokus bleibt im Dialog, Esc schließt, danach springt er zum Auslöser zurück. Bei zerstörerischen Aktionen startet der Fokus auf Abbrechen.">
      <Section title="Größen"><div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>{(['S', 'M', 'L'] as const).map((s) => <Dialog key={s} size={s} title={`Größe ${s}`} trigger={<Button variant="outline">{s}</Button>}>Beschreibe hier kurz, worum es geht.</Dialog>)}</div></Section>
      <Section title="Zerstörerisch"><Dialog destructive title="Projekt löschen?" primaryLabel="Löschen" trigger={<Button variant="outline">Löschen</Button>}>Das Projekt und alle Inhalte werden entfernt. Das lässt sich nicht rückgängig machen.</Dialog></Section>
      <Section title="Ohne Schließen-Symbol, Scrim schließt"><Dialog closable={false} dismissable secondaryLabel={null} primaryLabel="Verstanden" title="Hinweis" trigger={<Button variant="outline">Öffnen</Button>}>Ein nicht-kritischer Dialog, ein Klick daneben schließt ihn.</Dialog></Section>
    </Page>
  ),
};
