import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Input } from '../../components/Input/Input';
import { Field } from '../../components/Field/Field';
import { Page, Section } from '../foundations/helpers';

const meta: Meta<typeof Input> = {
  title: 'Form Elements/Input',
  component: Input,
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'inline-radio', options: ['S', 'M', 'L'] },
    validation: { control: 'inline-radio', options: ['none', 'error', 'success'] },
    iconLeft: { control: 'select', options: [undefined, 'mail', 'search', 'person'] },
    iconRight: { control: 'select', options: [undefined, 'helpOutline', 'check'] },
  },
  args: { label: 'E-Mail', placeholder: 'name@beispiel.de', hint: 'Hier erreichen wir dich.', size: 'M', validation: 'none', iconLeft: 'mail' },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Playground: Story = {};

const Live = () => {
  const [v, setV] = useState('');
  const bad = v.length > 0 && !v.includes('@');
  const good = v.includes('@') && v.includes('.');
  return (
    <Input
      label="E-Mail"
      placeholder="name@beispiel.de"
      iconLeft="mail"
      value={v}
      onChange={setV}
      validation={bad ? 'error' : good ? 'success' : 'none'}
      hint={bad ? 'Die Adresse braucht ein @.' : good ? 'Sieht gut aus.' : 'Hier erreichen wir dich.'}
    />
  );
};

export const Uebersicht: Story = {
  name: 'Übersicht',
  decorators: [],
  render: () => (
    <Page
      title="Input"
      intro="Eingabefeld mit Label, Hinweis und Validierung. Das Feld selbst (Field) lässt sich mit Icons, Präfix und Suffix ausstatten. Alle Zustände kommen aus dem Browser: Hover, Fokus, deaktiviert, nur lesbar."
    >
      <Section title="Live-Validierung" note="Tippe eine Adresse ein. Fehler und Erfolg färben Feld und Hinweis.">
        <div style={{ maxWidth: 400 }}><Live /></div>
      </Section>
      <Section title="Zustände">
        <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', maxWidth: 960 }}>
          <Input label="Standard" placeholder="Platzhalter" />
          <Input label="Ausgefüllt" defaultValue="Antonia Jung" />
          <Input label="Pflichtfeld" isRequired placeholder="Pflicht" help="Ohne Angabe können wir nicht antworten." />
          <Input label="Fehler" validation="error" defaultValue="abc" hint="Das sieht nicht richtig aus." />
          <Input label="Erfolg" validation="success" defaultValue="antonia@beispiel.de" hint="Adresse bestätigt." />
          <Input label="Deaktiviert" isDisabled defaultValue="Gesperrt" hint="Nicht änderbar." />
          <Input label="Nur lesbar" isReadOnly defaultValue="Nur lesbar" />
        </div>
      </Section>
      <Section title="Größen">
        <div style={{ display: 'grid', gap: 16, maxWidth: 400 }}>
          <Input label="Klein (S)" size="S" placeholder="32 px hoch" />
          <Input label="Mittel (M)" size="M" placeholder="40 px hoch" />
          <Input label="Groß (L)" size="L" placeholder="48 px hoch" />
        </div>
      </Section>
      <Section title="Icons, Präfix und Suffix">
        <div style={{ display: 'grid', gap: 16, maxWidth: 400 }}>
          <Input label="E-Mail" iconLeft="mail" iconRight="helpOutline" placeholder="name@beispiel.de" />
          <Input label="Preis" prefix="€" placeholder="0,00" />
          <Input label="Gewicht" suffix="kg" placeholder="0" />
        </div>
      </Section>
      <Section title="Field allein" note="Ohne Label, etwa in Toolbars. Dann braucht es ein aria-label.">
        <div style={{ maxWidth: 400 }}><Field aria-label="Name" placeholder="Name" iconLeft="person" /></div>
      </Section>
    </Page>
  ),
};
