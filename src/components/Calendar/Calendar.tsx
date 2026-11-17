import {
  Calendar as AriaCalendar,
  RangeCalendar as AriaRangeCalendar,
  CalendarGrid,
  CalendarGridHeader,
  CalendarGridBody,
  CalendarHeaderCell,
  CalendarCell,
  Heading,
  Button as AriaButton,
  I18nProvider,
  type CalendarProps as AriaCalendarProps,
  type RangeCalendarProps as AriaRangeCalendarProps,
  type DateValue,
} from 'react-aria-components';
import { Icon } from '../Icon/Icon';
import './Calendar.css';

function Header() {
  return (
    <header className="cp-calendar__header">
      <AriaButton slot="previous" className="cp-calendar__nav" aria-label="Vorheriger Monat">
        <Icon name="chevronLeft" />
      </AriaButton>
      <Heading className="cp-calendar__title" />
      <AriaButton slot="next" className="cp-calendar__nav" aria-label="Nächster Monat">
        <Icon name="chevronRight" />
      </AriaButton>
    </header>
  );
}

function Grid() {
  return (
    <CalendarGrid className="cp-calendar__grid">
      <CalendarGridHeader>{(day) => <CalendarHeaderCell className="cp-calendar__weekday">{day}</CalendarHeaderCell>}</CalendarGridHeader>
      <CalendarGridBody>{(date) => <CalendarCell date={date} className="cp-calendar__day" />}</CalendarGridBody>
    </CalendarGrid>
  );
}

export type CalendarProps<T extends DateValue = DateValue> = Omit<AriaCalendarProps<T>, 'className' | 'style' | 'children'> & { locale?: string };
export type RangeCalendarProps<T extends DateValue = DateValue> = Omit<AriaRangeCalendarProps<T>, 'className' | 'style' | 'children'> & { locale?: string };

/** Monatskalender für ein Datum. Pfeiltasten bewegen den Fokus, Bild auf/ab wechselt den Monat, Enter wählt. Woche beginnt in de-DE am Montag. */
export function Calendar({ locale = 'de-DE', ...rest }: CalendarProps) {
  return (
    <I18nProvider locale={locale}>
      <AriaCalendar {...rest} className="cp-calendar">
        <Header />
        <Grid />
      </AriaCalendar>
    </I18nProvider>
  );
}

/** Monatskalender für einen Zeitraum: erst Start, dann Ende wählen. */
export function RangeCalendar({ locale = 'de-DE', ...rest }: RangeCalendarProps) {
  return (
    <I18nProvider locale={locale}>
      <AriaRangeCalendar {...rest} className="cp-calendar" data-range="">
        <Header />
        <Grid />
      </AriaRangeCalendar>
    </I18nProvider>
  );
}
