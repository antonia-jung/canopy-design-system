import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginPattern } from './Login/LoginPattern';
import { ContactPattern } from './Contact/ContactPattern';
import { SearchPattern } from './Search/SearchPattern';
import { GalleryPattern } from './Gallery/GalleryPattern';
import { DataPagePattern } from './DataPage/DataPagePattern';
import { searchItems, galleryItems, dataRows } from '../stories/patterns/data';

describe('Patterns', () => {
  it('Login zeigt Fehler am Feld und sendet erst, wenn alles stimmt', async () => {
    const user = userEvent.setup();
    const fn = vi.fn();
    render(<LoginPattern onSubmit={fn} />);
    await user.click(screen.getByRole('button', { name: 'Anmelden' }));
    expect(screen.getByText('Bitte gib deine E-Mail-Adresse ein.')).toBeTruthy();
    expect(fn).not.toHaveBeenCalled();
    await user.type(screen.getByLabelText(/E-Mail/), 'toni@example.com');
    await user.type(screen.getByLabelText(/Passwort/), 'geheim');
    await user.click(screen.getByRole('button', { name: 'Anmelden' }));
    expect(fn).toHaveBeenCalledWith({ email: 'toni@example.com', password: 'geheim', remember: false });
  });
  it('Login zeigt Serverfehler als Alert', () => {
    render(<LoginPattern error="Falsches Passwort." />);
    expect(screen.getByRole('alert').textContent).toContain('Falsches Passwort.');
  });
  it('Contact verlangt Einwilligung', async () => {
    const user = userEvent.setup();
    const fn = vi.fn();
    render(<ContactPattern onSubmit={fn} />);
    await user.click(screen.getByRole('button', { name: 'Nachricht senden' }));
    expect(screen.getByText('Bitte gib deinen Namen ein.')).toBeTruthy();
    expect(fn).not.toHaveBeenCalled();
  });
  it('Contact zeigt Bestätigung', () => {
    render(<ContactPattern sent />);
    expect(screen.getByRole('status').textContent).toContain('Nachricht gesendet');
  });
  it('Search filtert nach Text und Kategorie, leer zeigt Empty State', async () => {
    const user = userEvent.setup();
    render(<SearchPattern items={searchItems} categories={['Projekte', 'Artikel']} />);
    expect(screen.getByText('6 Ergebnisse')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Artikel' }));
    expect(screen.getByText('3 Ergebnisse')).toBeTruthy();
    await user.type(screen.getByRole('searchbox'), 'zzzz');
    expect(screen.getByRole('heading', { name: 'Keine Treffer' })).toBeTruthy();
  });
  it('Gallery filtert über das Segmented Control', async () => {
    const user = userEvent.setup();
    render(<GalleryPattern items={galleryItems} categories={['Systeme', 'Apps', 'Websites']} />);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
    await user.click(screen.getByRole('radio', { name: 'Systeme' }));
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(1);
  });
  it('Data Page hat Tabelle und Liste und filtert', async () => {
    const user = userEvent.setup();
    render(<DataPagePattern rows={dataRows} statuses={['Neu', 'Offen', 'Erledigt']} />);
    expect(screen.getByRole('grid', { name: 'Anfragen' })).toBeTruthy();
    await user.type(screen.getByRole('searchbox'), 'Anna');
    expect(screen.getAllByText('Anna Beispiel').length).toBeGreaterThan(0);
    expect(screen.queryAllByText('Max Muster')).toHaveLength(0);
  });
});
