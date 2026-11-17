import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, RadioGroup } from '../../components/Radio/Radio';
import { Page, Section } from '../foundations/helpers';

const meta: Meta<typeof RadioGroup> = {
  title: 'Form Elements/Radio',
  component: RadioGroup,
  parameters: { layout: 'padded' },
  argTypes: { orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] }, validation: { control: 'inline-radio', options: ['none', 'error'] } },
  args: { legend: 'Kontaktweg', orientation: 'vertical', validation: 'none', defaultValue: 'mail' },
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Playground: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="mail">E-Mail</Radio>
      <Radio value="phone">Telefon</Radio>
      <Radio value="post">Post</Radio>
    </RadioGroup>
  ),
};

export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Radio" intro="Genau eine Option aus mehreren. Pfeiltasten wechseln die Auswahl, die Markierung wandert als Blob von Option zu Option.">
      <Section title="Vertikal und horizontal">
        <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
          <RadioGroup legend="Kontaktweg" message="Wie dürfen wir antworten?" defaultValue="mail">
            <Radio value="mail">E-Mail</Radio>
            <Radio value="phone">Telefon</Radio>
            <Radio value="post">Post</Radio>
          </RadioGroup>
          <RadioGroup legend="Größe" orientation="horizontal" defaultValue="m">
            <Radio value="s">S</Radio>
            <Radio value="m">M</Radio>
            <Radio value="l">L</Radio>
          </RadioGroup>
        </div>
      </Section>
      <Section title="Zustände">
        <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
          <RadioGroup legend="Mit Fehler" validation="error" message="Bitte eine Option wählen.">
            <Radio value="a">Option A</Radio>
            <Radio value="b">Option B</Radio>
          </RadioGroup>
          <RadioGroup legend="Deaktiviert" isDisabled defaultValue="a">
            <Radio value="a">Option A</Radio>
            <Radio value="b">Option B</Radio>
          </RadioGroup>
          <RadioGroup legend="Eine Option gesperrt" defaultValue="a">
            <Radio value="a">Option A</Radio>
            <Radio value="b" isDisabled>Option B (gesperrt)</Radio>
            <Radio value="c">Option C</Radio>
          </RadioGroup>
        </div>
      </Section>
    </Page>
  ),
};
