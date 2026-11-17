import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { Popover } from '../../components/Popover/Popover';
import { Button } from '../../components/Button/Button';
const meta: Meta<typeof Popover> = { title: 'Overlays/Popover', component: Popover, parameters: { layout: 'padded' }, args: { title: 'Titel', children: 'Kurzer erklärender Text zum Element, auf das sich das Popover bezieht.', placement: 'bottom' } };
export default meta;
type Story = StoryObj<typeof Popover>;
export const Playground: Story = { render: (a) => <div style={{ padding: 120 }}><Popover {...a} trigger={<Button variant="outline">Popover</Button>} action={<Button variant="outline">Mehr</Button>} /></div> };
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Popover" intro="Kleines Panel am Auslöser, öffnet per Klick. Esc oder Klick daneben schließt, der Fokus kehrt zurück. Für reine Hinweise bei Hover gibt es den Tooltip.">
      <Section title="Platzierung"><div style={{ display: 'flex', gap: 16, padding: '24px 160px', flexWrap: 'wrap' }}>{(['top', 'bottom', 'left', 'right'] as const).map((p) => <Popover key={p} placement={p} title={p} trigger={<Button variant="outline">{p}</Button>}>Erklärender Text.</Popover>)}</div></Section>
    </Page>
  ),
};
