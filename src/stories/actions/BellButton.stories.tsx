import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { BellButton } from '../../components/BellButton/BellButton';
import { Button } from '../../components/Button/Button';
import { Page, Section } from '../foundations/helpers';

const meta: Meta<typeof BellButton> = {
  title: 'Actions/Bell Button',
  component: BellButton,
  parameters: { layout: 'padded' },
  argTypes: {
    count: { control: { type: 'number', min: 0, max: 150 } },
    badge: { control: 'inline-radio', options: ['number', 'dot'] },
    variant: { control: 'inline-radio', options: ['default', 'inverse', 'outline', 'transparent'] },
  },
  args: { count: 3, badge: 'number', variant: 'default' },
};
export default meta;
type Story = StoryObj<typeof BellButton>;

export const Playground: Story = {};

const Live = ({ badge }: { badge: 'number' | 'dot' }) => {
  const [count, setCount] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <BellButton count={count} badge={badge} onPress={() => setCount(0)} />
      <Button variant="outline" iconLeft="add" onPress={() => setCount((c) => c + 1)}>
        Neue Meldung
      </Button>
      <span className="cp-text-paragraph-small" aria-live="polite">
        {count === 0 ? 'Alles gelesen' : `${count} ungelesen`}
      </span>
    </div>
  );
};

export const Interaktiv: Story = {
  render: () => (
    <Page
      title="Bell Button"
      intro="Öffnet die Benachrichtigungen. Kommt eine neue Meldung, schwingt die Glocke kurz aus und das Badge poppt auf. Ein Klick auf die Glocke markiert alles als gelesen."
    >
      <Section title="Mit Anzahl" note="Ab 100 steht 99+. Das aria-label enthält die Anzahl, etwa „Benachrichtigungen, 3 ungelesen“.">
        <Live badge="number" />
      </Section>
      <Section title="Mit Punkt" note="Wenn die genaue Zahl egal ist.">
        <Live badge="dot" />
      </Section>
      <Section title="Zustände">
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <BellButton count={0} />
          <BellButton count={3} />
          <BellButton count={128} />
          <BellButton count={1} badge="dot" />
          <BellButton count={2} variant="transparent" />
        </div>
      </Section>
    </Page>
  ),
};
