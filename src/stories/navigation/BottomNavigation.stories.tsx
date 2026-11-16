import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { BottomNavigation, type BottomNavItem } from '../../components/BottomNavigation/BottomNavigation';
import { Page, Section } from '../foundations/helpers';

const all: BottomNavItem[] = [
  { id: 'home', label: 'Start', href: '#home', icon: 'home' },
  { id: 'search', label: 'Suche', href: '#search', icon: 'search' },
  { id: 'fav', label: 'Favoriten', href: '#fav', icon: 'favoriteBorder' },
  { id: 'inbox', label: 'Inbox', href: '#inbox', icon: 'bell' },
  { id: 'me', label: 'Profil', href: '#me', icon: 'person' },
];

const Demo = ({ count, labels }: { count: 3 | 4 | 5; labels: 'always' | 'selected' | 'never' }) => {
  const items = all.slice(0, count - 1).concat(all[4]);
  const [sel, setSel] = useState('home');
  return (
    <div style={{ width: 343 }} onClick={(e) => {
      const a = (e.target as HTMLElement).closest('a');
      if (a) { e.preventDefault(); setSel(a.getAttribute('href')!.slice(1)); }
    }}>
      <BottomNavigation items={items} selectedId={sel} labels={labels} />
    </div>
  );
};

const meta: Meta<typeof BottomNavigation> = { title: 'Navigation/Bottom Navigation', component: BottomNavigation, parameters: { layout: 'padded' } };
export default meta;
type Story = StoryObj<typeof BottomNavigation>;

export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Bottom Navigation" intro="Hauptnavigation für Mobile mit drei bis fünf Zielen. Die Leiste schwebt über dem Inhalt, die Markierung wandert als Blob zum gewählten Eintrag.">
      <Section title="Labels immer sichtbar (empfohlen)"><Demo count={4} labels="always" /></Section>
      <Section title="Drei und fünf Einträge">
        <div style={{ display: 'grid', gap: 16 }}>
          <Demo count={3} labels="always" />
          <Demo count={5} labels="always" />
        </div>
      </Section>
      <Section title="Label nur am gewählten Eintrag"><Demo count={4} labels="selected" /></Section>
      <Section title="Nur Icons" note="Der Name bleibt für Screenreader erhalten.">
        <Demo count={4} labels="never" />
      </Section>
    </Page>
  ),
};
