import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Avatar, AvatarGroup, initialsOf } from './Avatar/Avatar';
import { Card } from './Card/Card';
import { List, ListItem } from './ListItem/ListItem';
import { Alert } from './Alert/Alert';
import { Accordion, AccordionGroup } from './Accordion/Accordion';
import { EmptyState } from './EmptyState/EmptyState';

describe('Content', () => {
  it('Initialen aus Namen', () => {
    expect(initialsOf('Cole Palmer')).toBe('CP');
    expect(initialsOf('toni')).toBe('T');
    expect(initialsOf('  ')).toBe('');
  });
  it('Avatar hat den Namen als Beschreibung', () => {
    render(<Avatar name="Cole Palmer" />);
    expect(screen.getByRole('img', { name: 'Cole Palmer' }).textContent).toBe('CP');
  });
  it('Avatar fällt bei Bildfehler auf Initialen zurück', () => {
    const { container } = render(<Avatar name="Cole Palmer" src="x.png" />);
    const img = container.querySelector('img')!;
    img.dispatchEvent(new Event('error'));
    return screen.findByText('CP');
  });
  it('AvatarGroup zählt den Rest', () => {
    render(<AvatarGroup people={[{ name: 'A B' }, { name: 'C D' }, { name: 'E F' }]} max={2} />);
    expect(screen.getByRole('img', { name: 'und 1 weitere' })).toBeTruthy();
  });
  it('Card mit href macht den Titel zum Link', () => {
    render(<Card title="Projekt" href="#p" />);
    expect(screen.getByRole('link', { name: 'Projekt' }).getAttribute('href')).toBe('#p');
    expect(screen.getByRole('heading', { name: 'Projekt' })).toBeTruthy();
  });
  it('ListItem mit onPress löst aus und kennt selected', async () => {
    const user = userEvent.setup();
    const fn = vi.fn();
    render(<List><ListItem title="Eins" selected onPress={fn} /></List>);
    const b = screen.getByRole('button', { name: 'Eins' });
    expect(b.getAttribute('aria-pressed')).toBe('true');
    await user.click(b);
    expect(fn).toHaveBeenCalled();
  });
  it('Alert: Fehler ist alert, Info ist status; Schließen funktioniert', async () => {
    const user = userEvent.setup();
    const fn = vi.fn();
    const { rerender } = render(<Alert intent="error" title="Fehler" onClose={fn} />);
    expect(screen.getByRole('alert')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Hinweis schließen' }));
    expect(fn).toHaveBeenCalled();
    rerender(<Alert intent="info" title="Info" />);
    expect(screen.getByRole('status')).toBeTruthy();
  });
  it('Accordion öffnet und schließt per Klick', async () => {
    const user = userEvent.setup();
    render(<Accordion title="Frage">Antwort</Accordion>);
    const trigger = screen.getByRole('button', { name: 'Frage' });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    await user.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });
  it('AccordionGroup hält nur einen offen', async () => {
    const user = userEvent.setup();
    render(<AccordionGroup><Accordion id="a" title="A">a</Accordion><Accordion id="b" title="B">b</Accordion></AccordionGroup>);
    await user.click(screen.getByRole('button', { name: 'A' }));
    await user.click(screen.getByRole('button', { name: 'B' }));
    expect(screen.getByRole('button', { name: 'A' }).getAttribute('aria-expanded')).toBe('false');
    expect(screen.getByRole('button', { name: 'B' }).getAttribute('aria-expanded')).toBe('true');
  });
  it('EmptyState zeigt Titel, Beschreibung, Aktion', () => {
    render(<EmptyState title="Leer" description="Nichts da" action={<button>Neu</button>} />);
    expect(screen.getByRole('heading', { name: 'Leer' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Neu' })).toBeTruthy();
  });
});
