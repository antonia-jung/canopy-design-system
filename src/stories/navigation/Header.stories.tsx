import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/Button/Button';
import { NavItem } from '../../components/NavItem/NavItem';
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

export const Desktop: Story = {
  render: () => (
    <div style={{ padding: 24, display: 'grid', gap: 24 }}>
      <Page title="Header" intro="Kopfzeile mit Logo, Navigation und Hauptaktion. Am Desktop wandert die Hover-Fläche als Blob von Eintrag zu Eintrag. Am Handy öffnet ein Menü-Button die Liste, weil Touch kein Hover kennt.">
        <Section title="Desktop" note="Mit der Maus oder Pfeil-Tab über die Einträge fahren.">
          <div style={{ border: '1px solid var(--cp-border-default)', borderRadius: 'var(--cp-radius-lg)', overflow: 'hidden' }}>
            <Demo />
          </div>
        </Section>
        <Section title="Nav Item" note="Horizontal mit Unterstrich, vertikal mit erhabener Fläche.">
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
    </div>
  ),
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
  render: () => <Demo />,
};
