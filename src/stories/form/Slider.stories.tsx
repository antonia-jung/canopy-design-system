import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from '../../components/Slider/Slider';
import { Page, Section } from '../foundations/helpers';

const meta: Meta<typeof Slider> = {
  title: 'Form Elements/Slider',
  component: Slider,
  parameters: { layout: 'padded' },
  args: { label: 'Lautstärke', defaultValue: 40, showValue: true },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Playground: Story = {};

export const Uebersicht: Story = {
  name: 'Übersicht',
  decorators: [],
  render: () => (
    <Page title="Slider" intro="Wählt einen Wert oder einen Bereich. Pfeiltasten ändern in Schritten, Pos1 und Ende springen zu den Enden. Mit zwei Werten entsteht ein Bereichs-Slider.">
      <Section title="Einzelwert">
        <div style={{ maxWidth: 360, display: 'grid', gap: 32 }}>
          <Slider label="Lautstärke" defaultValue={40} showValue />
          <Slider label="Schrittweite 10" defaultValue={50} step={10} showValue />
        </div>
      </Section>
      <Section title="Bereich">
        <div style={{ maxWidth: 360 }}>
          <Slider label="Preis in €" defaultValue={[20, 60]} showValue />
        </div>
      </Section>
      <Section title="Deaktiviert">
        <div style={{ maxWidth: 360 }}>
          <Slider label="Gesperrt" defaultValue={30} isDisabled />
        </div>
      </Section>
    </Page>
  ),
};
