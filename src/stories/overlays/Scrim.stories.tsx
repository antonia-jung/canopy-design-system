import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { Scrim } from '../../components/Scrim/Scrim';
void Scrim;
const meta: Meta<typeof Scrim> = { title: 'Overlays/Scrim', component: Scrim, parameters: { layout: 'padded' } };
export default meta;
type Story = StoryObj<typeof Scrim>;
export const Playground: Story = { render: () => <div style={{ position: 'relative', height: 200, overflow: 'hidden', borderRadius: 16 }}><p style={{ padding: 24 }}>Inhalt dahinter</p><div style={{ position: 'absolute', inset: 0 }}><div className="cp-scrim" style={{ position: 'absolute' }} /></div></div> };
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Scrim" intro="Abdunklung hinter Overlays. Dialog und Drawer bringen ihren eigenen mit. Die Komponente ist für eigene Overlays gedacht und für Screenreader unsichtbar.">
      <Section title="Vorschau"><div style={{ position: 'relative', height: 160, overflow: 'hidden', borderRadius: 16, background: 'var(--cp-surface-raised)' }}><p style={{ padding: 24, margin: 0 }}>Seiteninhalt</p><div className="cp-scrim" style={{ position: 'absolute' }} /></div></Section>
      <Section title="Verwendung"><p>Import: <code>Scrim</code>. Klick darauf schließt nur nicht-kritische Overlays.</p></Section>
    </Page>
  ),
};
