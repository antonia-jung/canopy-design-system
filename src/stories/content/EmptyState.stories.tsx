import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { Button } from '../../components/Button/Button';
const meta: Meta<typeof EmptyState> = { title: 'Content/Empty State', component: EmptyState, parameters: { layout: 'padded' }, args: { title: 'Noch nichts vorhanden', description: 'Sobald es etwas zu sehen gibt, erscheint es hier.', type: 'default' } };
export default meta;
type Story = StoryObj<typeof EmptyState>;
export const Playground: Story = {};
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Empty State" intro="Platzhalter für leere Listen, ergebnislose Suchen und Fehler. Er sagt, was los ist, und bietet den nächsten Schritt an.">
      <Section title="Typen"><div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <EmptyState title="Noch nichts vorhanden" description="Sobald es etwas zu sehen gibt, erscheint es hier." action={<Button variant="outline">Neu anlegen</Button>} />
        <EmptyState type="search" title="Keine Treffer" description="Probiere einen anderen Suchbegriff." action={<Button variant="outline">Suche zurücksetzen</Button>} />
        <EmptyState type="error" title="Das hat nicht geklappt" description="Die Daten konnten nicht geladen werden." action={<Button variant="outline">Erneut versuchen</Button>} />
      </div></Section>
    </Page>
  ),
};
