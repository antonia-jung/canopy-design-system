import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link } from './Link/Link';
import { Breadcrumbs } from './Breadcrumbs/Breadcrumbs';
import { Header } from './Header/Header';
import { Stepper } from './Stepper/Stepper';
import { BottomNavigation } from './BottomNavigation/BottomNavigation';
import { Sidebar } from './Sidebar/Sidebar';

const items = [
  { id: 'a', label: 'Projekte', href: '#a' },
  { id: 'b', label: 'Kontakt', href: '#b' },
];

describe('Navigation', () => {
  it('Link öffnet externe Ziele in neuem Tab', () => {
    render(<Link href="https://example.com" isExternal>Extern</Link>);
    const a = screen.getByRole('link', { name: /Extern/ });
    expect(a).toHaveAttribute('target', '_blank');
    expect(a).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('Breadcrumbs markieren die aktuelle Seite', () => {
    render(<Breadcrumbs items={[{ id: '1', label: 'Start', href: '#' }, { id: '2', label: 'Projekte' }]} />);
    expect(screen.getByRole('link', { name: 'Projekte' })).toHaveAttribute('aria-current', 'page');
  });

  it('Header markiert den aktuellen Eintrag und öffnet das Menü', async () => {
    render(<Header logo="Lichtung" items={items} currentId="b" />);
    expect(screen.getAllByRole('link', { name: 'Kontakt' })[0]).toHaveAttribute('aria-current', 'page');
    const btn = screen.getByLabelText('Menü öffnen');
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(btn);
    expect(screen.getByLabelText('Menü schließen')).toHaveAttribute('aria-expanded', 'true');
  });

  it('Stepper gibt Status per Text und aria-current weiter', () => {
    render(<Stepper steps={[{ id: '1', label: 'Eins' }, { id: '2', label: 'Zwei' }, { id: '3', label: 'Drei' }]} current={1} />);
    const items = screen.getAllByRole('listitem').filter((li) => li.hasAttribute('data-status'));
    expect(items[0]).toHaveTextContent('abgeschlossen');
    expect(items[1]).toHaveAttribute('aria-current', 'step');
    expect(items[2]).toHaveTextContent('offen');
  });

  it('Bottom Navigation hält Namen auch ohne sichtbare Labels', () => {
    render(
      <BottomNavigation
        labels="never"
        selectedId="a"
        items={[
          { id: 'a', label: 'Start', href: '#a', icon: 'home' },
          { id: 'b', label: 'Suche', href: '#b', icon: 'search' },
          { id: 'c', label: 'Profil', href: '#c', icon: 'person' },
        ]}
      />,
    );
    expect(screen.getByRole('link', { name: 'Suche' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Start' })).toHaveAttribute('aria-current', 'page');
  });

  it('Sidebar klappt ein und behält Namen', async () => {
    render(<Sidebar logo="L" items={[{ id: 'h', label: 'Übersicht', href: '#', icon: 'home' }]} currentId="h" />);
    await userEvent.click(screen.getByRole('button', { name: 'Seitenleiste einklappen' }));
    expect(screen.getByRole('link', { name: 'Übersicht' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Seitenleiste ausklappen' })).toBeInTheDocument();
  });
});
