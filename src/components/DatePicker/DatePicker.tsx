import type { ReactNode } from 'react';
import {
  DatePicker as AriaDatePicker,
  DateRangePicker as AriaDateRangePicker,
  DateInput,
  DateSegment,
  Group,
  Button as AriaButton,
  Popover,
  Dialog,
  Text,
  I18nProvider,
  type DateValue,
} from 'react-aria-components';
import { Label } from '../Label/Label';
import { Icon } from '../Icon/Icon';
import { Calendar, RangeCalendar } from '../Calendar/Calendar';
import type { FieldValidation } from '../Field/Field';
import '../Field/Field.css';
import '../Input/Input.css';
import './DatePicker.css';

interface BaseProps {
  label: ReactNode;
  help?: string;
  hint?: ReactNode;
  validation?: FieldValidation;
  size?: 'S' | 'M' | 'L';
  isRequired?: boolean;
  isDisabled?: boolean;
  minValue?: DateValue;
  maxValue?: DateValue;
  locale?: string;
}
type RangeValue<T> = { start: T; end: T };
export interface DatePickerProps extends BaseProps {
  value?: DateValue | null;
  defaultValue?: DateValue | null;
  onChange?: (value: DateValue | null) => void;
}
export interface DateRangePickerProps extends BaseProps {
  value?: RangeValue<DateValue> | null;
  defaultValue?: RangeValue<DateValue> | null;
  onChange?: (value: RangeValue<DateValue> | null) => void;
}

function Box({ size, validation, range }: { size: 'S' | 'M' | 'L'; validation: FieldValidation; range?: boolean }) {
  return (
    <Group className="cp-fieldbox cp-datepicker__box" data-size={size} data-validation={validation === 'none' ? undefined : validation}>
      <DateInput slot={range ? 'start' : undefined} className="cp-datepicker__input">
        {(segment) => <DateSegment segment={segment} className="cp-datepicker__segment" />}
      </DateInput>
      {range && (
        <>
          <span aria-hidden="true" className="cp-datepicker__dash">–</span>
          <DateInput slot="end" className="cp-datepicker__input">
            {(segment) => <DateSegment segment={segment} className="cp-datepicker__segment" />}
          </DateInput>
        </>
      )}
      <AriaButton className="cp-datepicker__button" aria-label="Kalender öffnen">
        <Icon name="grid" />
      </AriaButton>
    </Group>
  );
}

function Hint({ validation, hint }: { validation: FieldValidation; hint?: ReactNode }) {
  return hint ? <Text slot={validation === 'error' ? 'errorMessage' : 'description'} className="cp-hint">{hint}</Text> : null;
}

/** Datumsfeld mit tippbaren Segmenten (TT.MM.JJJJ) und Kalender-Popover. */
export function DatePicker({ label, help, hint, validation = 'none', size = 'M', locale = 'de-DE', isRequired, ...rest }: DatePickerProps) {
  return (
    <I18nProvider locale={locale}>
      <AriaDatePicker {...rest} isRequired={isRequired} isInvalid={validation === 'error'} className="cp-datepicker" data-validation={validation === 'none' ? undefined : validation}>
        <Label required={isRequired} help={help}>{label}</Label>
        <Box size={size} validation={validation} />
        <Hint validation={validation} hint={hint} />
        <Popover className="cp-datepicker__popover" offset={8}>
          <Dialog className="cp-datepicker__dialog"><Calendar locale={locale} /></Dialog>
        </Popover>
      </AriaDatePicker>
    </I18nProvider>
  );
}

/** Zeitraumfeld mit Start und Ende und Bereichskalender. */
export function DateRangePicker({ label, help, hint, validation = 'none', size = 'M', locale = 'de-DE', isRequired, ...rest }: DateRangePickerProps) {
  return (
    <I18nProvider locale={locale}>
      <AriaDateRangePicker {...rest} isRequired={isRequired} isInvalid={validation === 'error'} className="cp-datepicker" data-validation={validation === 'none' ? undefined : validation}>
        <Label required={isRequired} help={help}>{label}</Label>
        <Box size={size} validation={validation} range />
        <Hint validation={validation} hint={hint} />
        <Popover className="cp-datepicker__popover" offset={8}>
          <Dialog className="cp-datepicker__dialog"><RangeCalendar locale={locale} /></Dialog>
        </Popover>
      </AriaDateRangePicker>
    </I18nProvider>
  );
}
