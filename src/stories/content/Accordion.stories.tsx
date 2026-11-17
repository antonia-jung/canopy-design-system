import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { Accordion, AccordionGroup } from '../../components/Accordion/Accordion';
const meta: Meta<typeof Accordion> = { title: 'Content/Accordion', component: Accordion, parameters: { layout: 'padded' }, args: { title: 'Frage oder Abschnittstitel', children: 'Der Inhalt des Abschnitts steht hier und kann mehrere Zeilen umfassen.' } };
export default meta;
type Story = StoryObj<typeof Accordion>;
export const Playground: Story = {};
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Accordion" intro="Aufklappbare Abschnitte. Enter und Leertaste öffnen, Tab wechselt. In einer Gruppe ist standardmäßig nur einer offen.">
      <Section title="Einzeln"><Accordion title="Offen" defaultExpanded>Der Inhalt des Abschnitts.</Accordion><Accordion title="Geschlossen">Der Inhalt des Abschnitts.</Accordion><Accordion title="Deaktiviert" disabled>Nicht erreichbar.</Accordion></Section>
      <Section title="Gruppe"><AccordionGroup defaultExpandedKeys={['a']}><Accordion id="a" title="Wie funktioniert es?">Es ist immer nur ein Abschnitt offen.</Accordion><Accordion id="b" title="Kann ich mehrere öffnen?">Mit allowsMultiple an der Gruppe.</Accordion><Accordion id="c" title="Ist es barrierefrei?">Ja, Titel sind Überschriften mit Button.</Accordion></AccordionGroup></Section>
    </Page>
  ),
};
