import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Label } from './Label/Label';
import { Input } from './Input/Input';
import { SearchBox } from './SearchBox/SearchBox';
import { TextArea } from './TextArea/TextArea';
import { Checkbox, CheckboxGroup } from './Checkbox/Checkbox';
import { Radio, RadioGroup } from './Radio/Radio';
import { Switch } from './Switch/Switch';
import { Slider } from './Slider/Slider';

describe('Label', () => {
  it('zeigt Hilfetext für Screenreader', () => {
    render(<Label help="Nur für die Antwort">E-Mail</Label>);
    expect(screen.getByRole('img', { name: 'Nur für die Antwort' })).toBeInTheDocument();
  });
});

describe('Input', () => {
  it('verbindet Label und Feld und nimmt Eingaben an', async () => {
    const onChange = vi.fn();
    render(<Input label="Vorname" onChange={onChange} />);
    const field = screen.getByLabelText('Vorname');
    await userEvent.type(field, 'Toni');
    expect(field).toHaveValue('Toni');
    expect(onChange).toHaveBeenLastCalledWith('Toni');
  });

  it('verknüpft den Hinweis und markiert Fehler', () => {
    render(<Input label="E-Mail" validation="error" hint="Braucht ein @" />);
    const field = screen.getByLabelText('E-Mail');
    expect(field).toHaveAttribute('aria-invalid', 'true');
    expect(field).toHaveAccessibleDescription('Braucht ein @');
  });

  it('sperrt deaktivierte Felder', async () => {
    render(<Input label="Name" isDisabled defaultValue="x" />);
    expect(screen.getByLabelText('Name')).toBeDisabled();
  });
});

describe('SearchBox', () => {
  it('sucht mit Enter und leert mit Escape', async () => {
    const onSubmit = vi.fn();
    render(<SearchBox onSubmit={onSubmit} />);
    const box = screen.getByRole('searchbox');
    await userEvent.type(box, 'Button{Enter}');
    expect(onSubmit).toHaveBeenCalledWith('Button');
    await userEvent.keyboard('{Escape}');
    expect(box).toHaveValue('');
  });

  it('löscht über den Button', async () => {
    render(<SearchBox defaultValue="abc" />);
    await userEvent.click(screen.getByRole('button', { name: 'Eingabe löschen' }));
    expect(screen.getByRole('searchbox')).toHaveValue('');
  });
});

describe('TextArea', () => {
  it('zählt Zeichen und begrenzt die Länge', async () => {
    render(<TextArea label="Nachricht" showCount maxLength={5} />);
    await userEvent.type(screen.getByLabelText('Nachricht'), 'abcdefgh');
    expect(screen.getByLabelText('Nachricht')).toHaveValue('abcde');
    expect(screen.getByText('5 / 5')).toBeInTheDocument();
  });
});

describe('Checkbox', () => {
  it('schaltet per Klick und Leertaste', async () => {
    render(<Checkbox>Newsletter</Checkbox>);
    const box = screen.getByRole('checkbox', { name: 'Newsletter' });
    await userEvent.click(box);
    expect(box).toBeChecked();
    await userEvent.keyboard(' ');
    expect(box).not.toBeChecked();
  });

  it('meldet die Auswahl einer Gruppe', async () => {
    const onChange = vi.fn();
    render(
      <CheckboxGroup legend="Themen" onChange={onChange}>
        <Checkbox value="ux">UX</Checkbox>
        <Checkbox value="ui">UI</Checkbox>
      </CheckboxGroup>,
    );
    await userEvent.click(screen.getByRole('checkbox', { name: 'UX' }));
    await userEvent.click(screen.getByRole('checkbox', { name: 'UI' }));
    expect(onChange).toHaveBeenLastCalledWith(['ux', 'ui']);
  });

  it('zeigt den Zwischenzustand', () => {
    render(<Checkbox isIndeterminate>Alle</Checkbox>);
    expect(screen.getByRole('checkbox')).toBePartiallyChecked();
  });
});

describe('Radio', () => {
  it('wählt eine Option und wechselt mit den Pfeiltasten', async () => {
    const onChange = vi.fn();
    render(
      <RadioGroup legend="Weg" defaultValue="mail" onChange={onChange}>
        <Radio value="mail">E-Mail</Radio>
        <Radio value="phone">Telefon</Radio>
      </RadioGroup>,
    );
    const mail = screen.getByRole('radio', { name: 'E-Mail' });
    expect(mail).toBeChecked();
    await userEvent.click(mail);
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('radio', { name: 'Telefon' })).toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith('phone');
  });
});

describe('Switch', () => {
  it('schaltet um', async () => {
    const onChange = vi.fn();
    render(<Switch onChange={onChange}>Dunkel</Switch>);
    const sw = screen.getByRole('switch', { name: 'Dunkel' });
    await userEvent.click(sw);
    expect(sw).toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe('Slider', () => {
  it('ändert den Wert mit der Tastatur', async () => {
    render(<Slider label="Lautstärke" defaultValue={50} />);
    const thumb = screen.getByRole('slider');
    thumb.focus();
    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    expect(thumb).toHaveValue('52');
    await userEvent.keyboard('{Home}');
    expect(thumb).toHaveValue('0');
  });

  it('zeigt zwei Griffe für einen Bereich', () => {
    render(<Slider label="Preis" defaultValue={[20, 60]} />);
    expect(screen.getAllByRole('slider')).toHaveLength(2);
  });
});
