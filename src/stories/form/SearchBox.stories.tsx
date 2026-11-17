import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SearchBox } from '../../components/SearchBox/SearchBox';
import { Page, Section } from '../foundations/helpers';

const meta: Meta<typeof SearchBox> = {
  title: 'Form Elements/Search Box',
  component: SearchBox,
  parameters: { layout: 'padded' },
  args: { placeholder: 'Suchen' },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof SearchBox>;

export const Playground: Story = {};

const Live = () => {
  const [last, setLast] = useState('');
  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 400 }}>
      <SearchBox shortcut={['⌘', 'K']} onSubmit={setLast} />
      <span className="cp-text-paragraph-small" aria-live="polite">{last ? `Gesucht: „${last}“` : 'Enter löst die Suche aus, Escape leert das Feld.'}</span>
    </div>
  );
};

export const Uebersicht: Story = {
  name: 'Übersicht',
  decorators: [],
  render: () => (
    <Page title="Search Box" intro="Suchfeld mit Lupe und Löschen-Button. Enter löst onSubmit aus, Escape leert das Feld.">
      <Section title="Interaktiv"><Live /></Section>
      <Section title="Zustände">
        <div style={{ display: 'grid', gap: 16, maxWidth: 400 }}>
          <SearchBox />
          <SearchBox defaultValue="Design System" />
          <SearchBox shortcut={['⌘', 'K']} />
          <SearchBox isDisabled />
        </div>
      </Section>
    </Page>
  ),
};
