import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { Tooltip } from '../../components/Tooltip/Tooltip';
import { Button } from '../../components/Button/Button';
const meta: Meta<typeof Tooltip> = { title: 'Utilities/Tooltip', component: Tooltip, parameters: { layout: 'padded' }, args: { label: 'Speichern', placement: 'top' } };
export default meta;
type Story = StoryObj<typeof Tooltip>;
export const Playground: Story = { render: (a) => <div style={{ padding: 60 }}><Tooltip {...a}><Button>Hover mich</Button></Tooltip></div> };
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Tooltip" intro="Kurze Zusatzinfo bei Hover und Tastaturfokus, Esc schließt. Nur Ergänzendes hinein, nichts Wichtiges.">
      <Section title="Platzierung"><div style={{ display: 'flex', gap: 24, padding: 48 }}>{(['top', 'bottom', 'left', 'right'] as const).map((p) => <Tooltip key={p} label={p} placement={p} delay={0}><Button variant="outline">{p}</Button></Tooltip>)}</div></Section>
      <Section title="Detailed"><div style={{ padding: 48 }}><Tooltip title="Teilen" content="Erzeugt einen Link, den alle öffnen können." delay={0}><Button variant="outline">Detailed</Button></Tooltip></div></Section>
    </Page>
  ),
};
