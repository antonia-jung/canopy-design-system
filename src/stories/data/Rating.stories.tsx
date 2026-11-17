import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Page, Section } from '../foundations/helpers';
 import { Rating } from '../../components/Rating/Rating';
const meta: Meta<typeof Rating> = { title: 'Data Display/Rating', component: Rating, parameters: { layout: 'padded' }, args: { defaultValue: 3 } };
export default meta;
type Story = StoryObj<typeof Rating>;
export const Playground: Story = {};
const Live = () => {
  const [v, setV] = useState(3);
  return <div style={{ display: 'grid', gap: 8 }}><Rating size="L" value={v} onChange={setV} /><span className="cp-text-paragraph-small" aria-live="polite">{v} von 5</span></div>;
};
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Rating" intro="Bewertung mit Sternen. Hover zeigt eine Vorschau, Klick setzt, der Stern wird kurz eingedrückt. Zweiter Klick auf denselben Stern nimmt zurück. Pfeiltasten ändern den Wert.">
      <Section title="Interaktiv"><Live /></Section>
      <Section title="Größen"><div style={{ display: 'grid', gap: 12 }}>{(['S', 'M', 'L'] as const).map((s) => <Rating key={s} size={s} defaultValue={4} />)}</div></Section>
      <Section title="Nur Anzeige"><Rating readOnly defaultValue={4} /></Section>
    </Page>
  ),
};
