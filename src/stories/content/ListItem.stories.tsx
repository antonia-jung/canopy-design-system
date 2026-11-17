import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Page, Section } from '../foundations/helpers';
import { List, ListItem } from '../../components/ListItem/ListItem';
import { Avatar } from '../../components/Avatar/Avatar';
import { Badge } from '../../components/Badge/Badge';
import { Icon } from '../../components/Icon/Icon';
const meta: Meta<typeof ListItem> = { title: 'Content/List Item', component: ListItem, parameters: { layout: 'padded' }, args: { title: 'Listeneintrag', description: 'Kurze Zusatzinformation' } };
export default meta;
type Story = StoryObj<typeof ListItem>;
export const Playground: Story = { render: (a) => <List aria-label="Beispiel"><ListItem {...a} /></List> };
function Selectable() {
  const [sel, setSel] = useState(1);
  return (
    <List aria-label="Auswahl">
      {['Eins', 'Zwei', 'Drei'].map((t, i) => <ListItem key={t} title={t} description="Auswählbar" selected={sel === i} onPress={() => setSel(i)} leading={<Avatar name={t} size="S" />} />)}
    </List>
  );
}
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="List Item" intro="Zeile mit Titel, Beschreibung und Elementen davor und danach. Mit onPress oder href ist sie bedienbar, sonst nur Anzeige.">
      <Section title="Aufbau"><List aria-label="Aufbau"><ListItem title="Nur Titel" /><ListItem title="Mit Beschreibung" description="Kurze Zusatzinformation" /><ListItem title="Alles dabei" description="Avatar, Badge, Pfeil" leading={<Avatar name="Cole Palmer" size="S" />} trailing={<><Badge intent="error">3</Badge></>} divider={false} /></List></Section>
      <Section title="Auswählbar"><Selectable /></Section>
      <Section title="Link und deaktiviert"><List aria-label="Link"><ListItem title="Link" href="#x" trailing={<Icon name="chevronRight" />} /><ListItem title="Deaktiviert" description="Nicht verfügbar" disabled onPress={() => {}} /></List></Section>
    </Page>
  ),
};
