import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Menu, type MenuGroup } from '../../components/Menu/Menu';
import { Page, Section } from '../foundations/helpers';

const groups: MenuGroup[] = [
  { items: [
    { id: 'edit', label: 'Bearbeiten', icon: 'settings', shortcut: '⌘E' },
    { id: 'share', label: 'Teilen', icon: 'openInNew' },
    { id: 'fav', label: 'Favorit', icon: 'favoriteBorder' },
  ] },
  { title: 'Gefährlich', items: [
    { id: 'archive', label: 'Archivieren', icon: 'folder', disabled: true },
    { id: 'del', label: 'Löschen', icon: 'close' },
  ] },
];
const fruits: MenuGroup[] = [{ items: ['Apfel', 'Birne', 'Kirsche', 'Pflaume', 'Quitte'].map((l) => ({ id: l, label: l })) }];

const meta: Meta<typeof Menu> = {
  title: 'Form Elements/Menu',
  component: Menu,
  parameters: { layout: 'padded' },
  args: { groups, 'aria-label': 'Aktionen' },
};
export default meta;
type Story = StoryObj<typeof Menu>;
export const Playground: Story = {};

const Live = () => {
  const [last, setLast] = useState('–');
  return (
    <div style={{ display: 'grid', gap: 8, width: 260 }}>
      <Menu groups={groups} aria-label="Aktionen" onAction={(k) => setLast(String(k))} />
      <span className="cp-text-paragraph-small" aria-live="polite">Zuletzt gewählt: {last}</span>
    </div>
  );
};

export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Menu" intro="Liste von Aktionen oder Optionen. Pfeiltasten bewegen, Enter wählt, Tippen springt zum Eintrag, Esc schließt. Einträge können Icons, Kurzbefehle, Gruppen und Häkchen haben.">
      <Section title="Aktionen"><Live /></Section>
      <Section title="Einzelauswahl"><div style={{ width: 260 }}><Menu groups={fruits} aria-label="Obst" selectionMode="single" defaultSelectedKeys={['Birne']} /></div></Section>
      <Section title="Mehrfachauswahl"><div style={{ width: 260 }}><Menu groups={fruits} aria-label="Obst" selectionMode="multiple" defaultSelectedKeys={['Apfel', 'Kirsche']} /></div></Section>
      <Section title="Mit Suche und Scrollen"><div style={{ width: 260 }}><Menu groups={fruits} aria-label="Obst" selectionMode="single" searchable maxHeight={200} /></div></Section>
    </Page>
  ),
};
