import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon';
import { iconNames } from '../../components/Icon/Icon';
import { Page, Section } from '../foundations/helpers';

const meta: Meta<typeof ButtonIcon> = {
  title: 'Actions/Button Icon',
  component: ButtonIcon,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'inverse', 'outline', 'transparent'] },
    icon: { control: 'select', options: iconNames },
    isLoading: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
  },
  args: { icon: 'favorite', 'aria-label': 'Merken', variant: 'default' },
};
export default meta;
type Story = StoryObj<typeof ButtonIcon>;

export const Playground: Story = {};

const Fav = () => {
  const [on, setOn] = useState(false);
  return (
    <ButtonIcon
      icon="favorite"
      aria-label={on ? 'Aus Merkliste entfernen' : 'Merken'}
      aria-pressed={on}
      variant={on ? 'inverse' : 'default'}
      onPress={() => setOn((v) => !v)}
    />
  );
};

export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Button Icon" intro="Aktion ohne Text, etwa Schließen, Suche oder Merken. Das aria-label ist Pflicht, damit Screenreader die Aktion ansagen.">
      {(['default', 'inverse', 'outline', 'transparent'] as const).map((v) => (
        <Section key={v} title={v[0].toUpperCase() + v.slice(1)}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <ButtonIcon variant={v} icon="search" aria-label="Suchen" />
            <ButtonIcon variant={v} icon="close" aria-label="Schließen" />
            <ButtonIcon variant={v} icon="add" aria-label="Hinzufügen" />
            <ButtonIcon variant={v} icon="favorite" aria-label="Merken" isLoading />
            <ButtonIcon variant={v} icon="favorite" aria-label="Merken" isDisabled />
          </div>
        </Section>
      ))}
      <Section title="Umschalter" note="Mit aria-pressed wird der Button zum Umschalter. Hier wechselt er beim Merken auf Inverse.">
        <Fav />
      </Section>
    </Page>
  ),
};
