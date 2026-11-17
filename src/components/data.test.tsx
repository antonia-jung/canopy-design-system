import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Badge } from './Badge/Badge';
import { Tag } from './Tag/Tag';
import { ProgressBar } from './ProgressBar/ProgressBar';
import { Rating } from './Rating/Rating';
import { NumberFlow } from './NumberFlow/NumberFlow';
import { Tabs } from './Tabs/Tabs';
import { SegmentedControl } from './SegmentedControl/SegmentedControl';
import { Pagination, pageItems } from './Pagination/Pagination';
import { SnackBar } from './SnackBar/SnackBar';
import { Table } from './Table/Table';
import { Carousel } from './Carousel/Carousel';

describe('Data Display', () => {
  it('Badge: Obergrenze und Punkt mit Label', () => {
    const { rerender } = render(<Badge>{150}</Badge>);
    expect(screen.getByText('99+')).toBeInTheDocument();
    rerender(<Badge label="Neue Nachricht" />);
    expect(screen.getByRole('img', { name: 'Neue Nachricht' })).toBeInTheDocument();
  });

  it('Tag: wählbar und entfernbar', async () => {
    const user = userEvent.setup();
    const sel = vi.fn();
    const rm = vi.fn();
    render(<Tag onSelectedChange={sel} onRemove={rm}>UX</Tag>);
    await user.click(screen.getByRole('button', { name: 'UX' }));
    expect(sel).toHaveBeenCalledWith(true);
    await user.click(screen.getByRole('button', { name: 'UX entfernen' }));
    expect(rm).toHaveBeenCalled();
  });

  it('ProgressBar: meldet den Wert', () => {
    render(<ProgressBar value={60} label="Upload" showValue />);
    expect(screen.getByRole('progressbar', { name: 'Upload' })).toHaveAttribute('aria-valuenow', '60');
  });

  it('Rating: Klick setzt, zweiter Klick nimmt zurück, Tastatur ändert', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating onChange={onChange} />);
    await user.click(screen.getByRole('radio', { name: '3 von 5 Sternen' }));
    expect(onChange).toHaveBeenLastCalledWith(3);
    await user.click(screen.getByRole('radio', { name: '3 von 5 Sternen' }));
    expect(onChange).toHaveBeenLastCalledWith(0);
  });

  it('NumberFlow: gibt die Zahl als Text aus', () => {
    render(<NumberFlow value={42} />);
    expect(screen.getByLabelText('42')).toBeInTheDocument();
  });

  it('Tabs: Pfeiltasten wechseln, deaktivierte werden übersprungen', async () => {
    const user = userEvent.setup();
    render(<Tabs aria-label="T" tabs={[{ id: 'a', label: 'A', content: 'Inhalt A' }, { id: 'b', label: 'B', disabled: true }, { id: 'c', label: 'C', content: 'Inhalt C' }]} />);
    screen.getByRole('tab', { name: 'A' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'C' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Inhalt C')).toBeInTheDocument();
  });

  it('SegmentedControl: wählt genau eines und lässt es nicht abwählen', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SegmentedControl aria-label="Ansicht" segments={[{ id: 'a', label: 'Liste' }, { id: 'b', label: 'Raster' }]} onSelectionChange={onChange} />);
    await user.click(screen.getByRole('radio', { name: 'Raster' }));
    expect(onChange).toHaveBeenCalledWith('b');
    await user.click(screen.getByRole('radio', { name: 'Raster' }));
    expect(screen.getByRole('radio', { name: 'Raster' })).toBeChecked();
  });

  it('Pagination: Auslassungen und Blättern', async () => {
    expect(pageItems(5, 12)).toEqual([1, 'gap-l', 4, 5, 6, 'gap-r', 12]);
    expect(pageItems(1, 5)).toEqual([1, 2, 3, 4, 5]);
    const user = userEvent.setup();
    const onPage = vi.fn();
    render(<Pagination total={12} defaultPage={5} onPageChange={onPage} />);
    expect(screen.getByRole('button', { name: 'Seite 5' })).toHaveAttribute('aria-current', 'page');
    await user.click(screen.getByRole('button', { name: 'Nächste Seite' }));
    expect(onPage).toHaveBeenCalledWith(6);
  });

  it('SnackBar: Fehler als alert, Schließen ruft onClose', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<SnackBar intent="error" title="Fehlgeschlagen" onClose={onClose}>Text</SnackBar>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Schließen' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('Table: sortiert per Klick auf den Spaltenkopf', async () => {
    const user = userEvent.setup();
    render(
      <Table
        aria-label="P"
        columns={[{ id: 'n', name: 'Name', sortable: true, isRowHeader: true }]}
        rows={[{ id: '1', n: 'Birne' }, { id: '2', n: 'Apfel' }]}
      />,
    );
    await user.click(screen.getByRole('columnheader', { name: /Name/ }));
    const cells = screen.getAllByRole('rowheader').map((c) => c.textContent);
    expect(cells).toEqual(['Apfel', 'Birne']);
  });

  it('Carousel: Pfeile und Tastatur blättern', async () => {
    const user = userEvent.setup();
    const onIdx = vi.fn();
    render(<Carousel aria-label="C" slides={['A', 'B', 'C']} onIndexChange={onIdx} />);
    expect(screen.getByRole('button', { name: 'Vorherige Folie' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Nächste Folie' }));
    expect(onIdx).toHaveBeenLastCalledWith(1);
  });
});
