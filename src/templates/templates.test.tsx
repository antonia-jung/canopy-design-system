import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LandingPage } from './LandingPage';
import { ProjectDetail } from './ProjectDetail';
import { ContactPage } from './ContactPage';

describe('Templates', () => {
  it('Landing Page hat eine h1, Projektkarten als Links und Kontakt-Aktion', async () => {
    const onContact = vi.fn();
    render(<LandingPage onContact={onContact} />);
    expect(screen.getByRole('heading', { level: 1, name: /Ruhe und Klarheit/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Canopy System' })).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    await userEvent.click(screen.getAllByRole('button', { name: 'Kontakt' })[0]);
    expect(onContact).toHaveBeenCalled();
  });

  it('Project Detail zeigt Eckdaten und alle Abschnitte', () => {
    render(<ProjectDetail />);
    expect(screen.getByRole('heading', { level: 1, name: /Canopy/ })).toBeInTheDocument();
    expect(screen.getByText('Rolle')).toBeInTheDocument();
    for (const h of ['Ausgangslage', 'Lösung', 'Ergebnis']) expect(screen.getByRole('heading', { name: h })).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: 'Nächstes Projekt' })).toBeInTheDocument();
  });

  it('Contact Page enthält das Formular und die direkte Adresse', () => {
    render(<ContactPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Kontakt' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Nachricht senden' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'hallo@lichtung.example' })).toHaveAttribute('href', 'mailto:hallo@lichtung.example');
  });
});
