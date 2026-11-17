import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Switch } from '../../components/Switch/Switch';
import { Page, Section } from '../foundations/helpers';

const meta: Meta<typeof Switch> = {
  title: 'Form Elements/Switch',
  component: Switch,
  parameters: { layout: 'padded' },
  args: { children: 'Benachrichtigungen' },
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const Playground: Story = {};

const Live = () => {
  const [on, setOn] = useState(true);
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <Switch isSelected={on} onChange={setOn}>Dunkles Design</Switch>
      <span className="cp-text-paragraph-small" aria-live="polite">{on ? 'An' : 'Aus'}</span>
    </div>
  );
};

export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Switch" intro="Schaltet eine Einstellung sofort um, ohne Speichern. Der Knopf federt ans Ende, beim Drücken dehnt er sich leicht. Leertaste schaltet um.">
      <Section title="Interaktiv"><Live /></Section>
      <Section title="Zustände">
        <div style={{ display: 'grid', gap: 12 }}>
          <Switch>Aus</Switch>
          <Switch defaultSelected>An</Switch>
          <Switch isDisabled>Deaktiviert</Switch>
          <Switch isDisabled defaultSelected>Deaktiviert und an</Switch>
        </div>
      </Section>
    </Page>
  ),
};
