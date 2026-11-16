import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup, ButtonGroupItem } from '../../components/ButtonGroup/ButtonGroup';
import { Page, Section } from '../foundations/helpers';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Actions/Button Group',
  component: ButtonGroup,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Playground: Story = {
  args: { 'aria-label': 'Ansicht', defaultSelectedKeys: ['list'] },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem id="list" icon="list">Liste</ButtonGroupItem>
      <ButtonGroupItem id="grid" icon="grid">Raster</ButtonGroupItem>
      <ButtonGroupItem id="table" icon="table">Tabelle</ButtonGroupItem>
    </ButtonGroup>
  ),
};

export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page
      title="Button Group"
      intro="Verbundene Leiste verwandter Buttons. Der aktive Button ist eingedrückt wie eine gedrückte Taste. Pfeiltasten wechseln zwischen den Buttons, Leertaste oder Enter wählt."
    >
      <Section title="Einzelauswahl" note="Genau ein Eintrag ist aktiv.">
        <ButtonGroup aria-label="Ansicht" defaultSelectedKeys={['list']}>
          <ButtonGroupItem id="list" icon="list">Liste</ButtonGroupItem>
          <ButtonGroupItem id="grid" icon="grid">Raster</ButtonGroupItem>
          <ButtonGroupItem id="table" icon="table">Tabelle</ButtonGroupItem>
        </ButtonGroup>
      </Section>
      <Section title="Nur Icons" note="Jeder Eintrag braucht dann ein aria-label.">
        <ButtonGroup aria-label="Ansicht" defaultSelectedKeys={['grid']}>
          <ButtonGroupItem id="list" icon="list" aria-label="Liste" />
          <ButtonGroupItem id="grid" icon="grid" aria-label="Raster" />
          <ButtonGroupItem id="table" icon="table" aria-label="Tabelle" />
        </ButtonGroup>
      </Section>
      <Section title="Mehrfachauswahl" note='selectionMode="multiple", etwa für Filter.'>
        <ButtonGroup aria-label="Filter" selectionMode="multiple" disallowEmptySelection={false} defaultSelectedKeys={['ux']}>
          <ButtonGroupItem id="ux">UX</ButtonGroupItem>
          <ButtonGroupItem id="ui">UI</ButtonGroupItem>
          <ButtonGroupItem id="code">Code</ButtonGroupItem>
          <ButtonGroupItem id="research">Research</ButtonGroupItem>
        </ButtonGroup>
      </Section>
      <Section title="Deaktiviert">
        <ButtonGroup aria-label="Ansicht" defaultSelectedKeys={['list']} isDisabled>
          <ButtonGroupItem id="list" icon="list">Liste</ButtonGroupItem>
          <ButtonGroupItem id="grid" icon="grid">Raster</ButtonGroupItem>
        </ButtonGroup>
      </Section>
    </Page>
  ),
};
