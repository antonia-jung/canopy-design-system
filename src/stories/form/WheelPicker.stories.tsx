import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { WheelPicker, type WheelColumn } from '../../components/WheelPicker/WheelPicker';
import { Page, Section } from '../foundations/helpers';

const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
const columns: WheelColumn[] = [
  { id: 'day', label: 'Tag', options: Array.from({ length: 31 }, (_, i) => ({ value: i + 1, label: String(i + 1) })) },
  { id: 'month', label: 'Monat', options: months.map((m, i) => ({ value: i + 1, label: m })) },
];

const meta: Meta<typeof WheelPicker> = { title: 'Form Elements/Wheel Picker', component: WheelPicker, parameters: { layout: 'padded' } };
export default meta;
type Story = StoryObj<typeof WheelPicker>;

const Live = ({ cols = columns }: { cols?: WheelColumn[] }) => {
  const [v, setV] = useState<Record<string, string | number>>({ day: 17, month: 11 });
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <WheelPicker aria-label="Datum" columns={cols} value={v} onChange={setV} />
      <span className="cp-text-paragraph-small" aria-live="polite">{v.day}. {months[Number(v.month) - 1]}</span>
    </div>
  );
};

export const Playground: Story = { render: () => <Live /> };
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Wheel Picker" intro="Walzen wie am Handy. Wischen oder scrollen, die Zeile rastet in der Mitte ein. Mit Tastatur: Pfeile, Bild auf/ab, Pos1 und Ende.">
      <Section title="Tag und Monat"><Live /></Section>
      <Section title="Eine Spalte"><Live cols={[columns[1]]} /></Section>
    </Page>
  ),
};
