import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/Button/Button';
import { NavItem } from '../../components/NavItem/NavItem';
import { NavList } from '../../components/NavList/NavList';
import { Page, Section } from '../foundations/helpers';

const items = [
  { id: 'projekte', label: 'Projekte', href: '#projekte' },
  { id: 'about', label: 'Über mich', href: '#about' },
  { id: 'kontakt', label: 'Kontakt', href: '#kontakt' },
];

const meta: Meta<typeof Header> = {
  title: 'Navigation/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof Header>;

const Demo = () => {
  const [cur] = useState('projekte');
  return (
    <Header
      logo="Lichtung"
      items={items.map((i) => ({ ...i, href: '#' + i.id }))}
      currentId={cur}
      action={<Button variant="outline">Kontakt</Button>}
    />
  );
};

/** Volle Breite: so sieht der Header am Desktop aus. Mit der Maus über die Einträge fahren, dann wandert der Blob. */
export const Desktop: Story = { render: () => <Demo /> };

/** Mobile: 375 px breiter Rahmen. Die Komponente reagiert auf ihre Breite, nicht aufs Fenster. */
export const Mobile: Story = {
  render: () => (
    <div style={{ width: 375, border: '1px solid var(--cp-border-default)', margin: 24 }}>
      <Demo />
    </div>
  ),
};

export const Uebersicht: Story = {
  name: 'Übersicht',
  parameters: { layout: 'padded' },
  render: () => (
    <Page title="Header und Nav Item" intro="Kopfzeile mit Logo, Navigation und Hauptaktion. Am Desktop wandert die Hover-Fläche als Blob von Eintrag zu Eintrag, am Handy öffnet ein Menü-Button die Liste, weil Touch kein Hover kennt.">
      <Section title="Desktop" note="Mit der Maus oder per Tab über die Einträge fahren, dann wandert der Blob.">
        <div style={{ width: 'min(1100px, calc(100vw - 48px))', border: '1px solid var(--cp-border-default)', borderRadius: 'var(--cp-radius-lg)', overflow: 'hidden' }}>
          <Demo />
        </div>
      </Section>
      <Section title="Mobil (375 px breiter Rahmen)" note="Der Header reagiert auf die Breite seines Platzes. Das Menü lässt sich per Button öffnen.">
        <div style={{ width: 375, border: '1px solid var(--cp-border-default)', borderRadius: 'var(--cp-radius-lg)', overflow: 'hidden' }}>
          <Demo />
        </div>
      </Section>
      <Section title="Nav List" note="Mehrere Nav Items nebeneinander. Der Blob gehört immer dazu, nicht nur im Header.">
        <NavList items={items} currentId="about" />
      </Section>
      <Section title="Nav Item" note="Ein einzelner Eintrag. Horizontal mit Unterstrich, vertikal mit erhabener Fläche. Für Gruppen die Nav List nehmen.">
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <NavItem href="#">Standard</NavItem>
          <NavItem href="#" isSelected>Gewählt</NavItem>
          <NavItem href="#" isDisabled>Deaktiviert</NavItem>
          <div style={{ width: 200 }}>
            <NavItem href="#" orientation="vertical" icon="home" isSelected>Vertikal</NavItem>
          </div>
        </div>
      </Section>
    </Page>
  ),
};
