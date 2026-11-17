import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CalendarDate, today, getLocalTimeZone } from '@internationalized/date';
import { Calendar, RangeCalendar } from '../../components/Calendar/Calendar';
import { DatePicker, DateRangePicker } from '../../components/DatePicker/DatePicker';
import { Page, Section } from '../foundations/helpers';

const meta: Meta<typeof DatePicker> = {
  title: 'Form Elements/Date Picker',
  component: DatePicker,
  parameters: { layout: 'padded' },
  args: { label: 'Startdatum' },
  decorators: [(S) => <div style={{ width: 320, minHeight: 420 }}><S /></div>],
};
export default meta;
type Story = StoryObj<typeof DatePicker>;
export const Playground: Story = {};

const Live = () => {
  const [d, setD] = useState<CalendarDate | null>(new CalendarDate(2026, 11, 17));
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <Calendar value={d} onChange={(v) => setD(v as CalendarDate)} aria-label="Datum" />
      <span className="cp-text-paragraph-small" aria-live="polite">Gewählt: {d ? d.toString() : '–'}</span>
    </div>
  );
};

export const Uebersicht: Story = {
  name: 'Übersicht',
  decorators: [],
  render: () => (
    <Page title="Date Picker" intro="Datum tippen (TT.MM.JJJJ) oder im Kalender wählen. Pfeiltasten bewegen den Fokus, Bild auf/ab wechselt den Monat. Der Zeitraum wählt erst Start, dann Ende.">
      <Section title="Kalender"><Live /></Section>
      <Section title="Zeitraum">
        <RangeCalendar aria-label="Zeitraum" defaultValue={{ start: new CalendarDate(2026, 11, 10), end: new CalendarDate(2026, 11, 16) }} />
      </Section>
      <Section title="Felder">
        <div style={{ display: 'grid', gap: 16, width: 360 }}>
          <DatePicker label="Datum" />
          <DatePicker label="Mit Wert" defaultValue={today(getLocalTimeZone())} />
          <DatePicker label="Fehler" validation="error" hint="Datum liegt in der Vergangenheit" />
          <DatePicker label="Deaktiviert" isDisabled />
          <DateRangePicker label="Zeitraum" />
        </div>
      </Section>
    </Page>
  ),
};
