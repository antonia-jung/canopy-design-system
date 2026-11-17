import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
 import { Table, type TableRow } from '../../components/Table/Table';
import { Badge } from '../../components/Badge/Badge';
const columns = [
  { id: 'name', name: 'Projekt', sortable: true, isRowHeader: true },
  { id: 'role', name: 'Rolle', sortable: true },
  { id: 'year', name: 'Jahr', sortable: true, align: 'right' as const },
  { id: 'status', name: 'Status' },
];
const rows: TableRow[] = [
  { id: '1', name: 'Canopy', role: 'Design System', year: '2026', status: <Badge intent="success">Live</Badge> },
  { id: '2', name: 'Atelier Nord', role: 'Website', year: '2026', status: <Badge intent="info">Läuft</Badge> },
  { id: '3', name: 'e-Xplore', role: 'UI/UX', year: '2025', status: <Badge intent="success">Live</Badge> },
  { id: '4', name: 'Sammel-App', role: 'Konzept', year: '2026', status: <Badge intent="warning">Idee</Badge> },
];
const meta: Meta<typeof Table> = { title: 'Data Display/Table', component: Table, parameters: { layout: 'padded' }, args: { columns, rows, 'aria-label': 'Projekte' } };
export default meta;
type Story = StoryObj<typeof Table>;
export const Playground: Story = {};
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Table" intro="Daten in Zeilen und Spalten. Klick auf einen Spaltenkopf sortiert, Pfeiltasten bewegen den Fokus, Checkboxen wählen Zeilen.">
      <Section title="Sortierbar und gestreift"><Table aria-label="Projekte" columns={columns} rows={rows} striped /></Section>
      <Section title="Mit Auswahl, klein"><Table aria-label="Projekte" columns={columns} rows={rows} selectionMode="multiple" size="S" /></Section>
      <Section title="Leer"><Table aria-label="Leer" columns={columns} rows={[]} /></Section>
    </Page>
  ),
};
