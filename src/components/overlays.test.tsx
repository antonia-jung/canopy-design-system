import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from './Dialog/Dialog';
import { Popover } from './Popover/Popover';
import { Drawer } from './Drawer/Drawer';
import { Button } from './Button/Button';

describe('Overlays', () => {
  it('Dialog öffnet, ruft Hauptaktion und schließt', async () => {
    const user = userEvent.setup();
    const fn = vi.fn();
    render(<Dialog title="Titel" onPrimary={fn} trigger={<Button>Auf</Button>}>Text</Dialog>);
    await user.click(screen.getByRole('button', { name: 'Auf' }));
    expect(screen.getByRole('dialog', { name: 'Titel' })).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Bestätigen' }));
    expect(fn).toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });
  it('Dialog schließt mit Esc', async () => {
    const user = userEvent.setup();
    render(<Dialog title="Titel" trigger={<Button>Auf</Button>}>Text</Dialog>);
    await user.click(screen.getByRole('button', { name: 'Auf' }));
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });
  it('Zerstörerischer Dialog ist alertdialog, Fokus auf Abbrechen', async () => {
    const user = userEvent.setup();
    render(<Dialog destructive title="Löschen?" primaryLabel="Löschen" trigger={<Button>Auf</Button>}>Text</Dialog>);
    await user.click(screen.getByRole('button', { name: 'Auf' }));
    expect(screen.getByRole('alertdialog')).toBeTruthy();
    await waitFor(() => expect(document.activeElement?.textContent).toBe('Abbrechen'));
  });
  it('Popover öffnet per Klick und schließt mit Esc', async () => {
    const user = userEvent.setup();
    render(<Popover title="Info" trigger={<Button>Pop</Button>}>Inhalt</Popover>);
    await user.click(screen.getByRole('button', { name: 'Pop' }));
    expect(screen.getByRole('dialog', { name: 'Info' })).toBeTruthy();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });
  it('Drawer öffnet und schließt über das Symbol', async () => {
    const user = userEvent.setup();
    render(<Drawer title="Seite" trigger={<Button>Auf</Button>}>Inhalt</Drawer>);
    await user.click(screen.getByRole('button', { name: 'Auf' }));
    expect(screen.getByRole('dialog', { name: 'Seite' })).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Schließen' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });
});
