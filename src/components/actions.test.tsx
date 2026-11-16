import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button/Button';
import { ButtonIcon } from './ButtonIcon/ButtonIcon';
import { BellButton } from './BellButton/BellButton';
import { ButtonGroup, ButtonGroupItem } from './ButtonGroup/ButtonGroup';

describe('Button', () => {
  it('löst onPress aus', async () => {
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Speichern</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'Speichern' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('sperrt Klicks beim Laden', async () => {
    const onPress = vi.fn();
    render(<Button status="loading" onPress={onPress}>Speichert</Button>);
    const btn = screen.getByRole('button');
    await userEvent.click(btn);
    expect(onPress).not.toHaveBeenCalled();
    expect(btn).toHaveAttribute('data-pending');
  });

  it('gibt Variante und Status als data-Attribute weiter', () => {
    render(<Button variant="outline" status="success">Gespeichert</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('data-variant', 'outline');
    expect(btn).toHaveAttribute('data-status', 'success');
  });
});

describe('ButtonIcon', () => {
  it('hat einen zugänglichen Namen', () => {
    render(<ButtonIcon icon="close" aria-label="Schließen" />);
    expect(screen.getByRole('button', { name: 'Schließen' })).toBeInTheDocument();
  });
});

describe('BellButton', () => {
  it('nennt die Anzahl im Label', () => {
    render(<BellButton count={3} />);
    expect(screen.getByRole('button', { name: 'Benachrichtigungen, 3 ungelesen' })).toBeInTheDocument();
  });

  it('kürzt große Zahlen auf 99+', () => {
    const { container } = render(<BellButton count={150} />);
    expect(container.querySelector('.cp-bell__badge')).toHaveTextContent('99+');
  });
});

describe('ButtonGroup', () => {
  it('wählt per Klick und per Tastatur', async () => {
    const onChange = vi.fn();
    render(
      <ButtonGroup aria-label="Ansicht" defaultSelectedKeys={['list']} onSelectionChange={onChange}>
        <ButtonGroupItem id="list">Liste</ButtonGroupItem>
        <ButtonGroupItem id="grid">Raster</ButtonGroupItem>
        <ButtonGroupItem id="table">Tabelle</ButtonGroupItem>
      </ButtonGroup>,
    );
    const list = screen.getByRole('radio', { name: 'Liste' });
    const grid = screen.getByRole('radio', { name: 'Raster' });
    expect(list).toBeChecked();

    await userEvent.click(grid);
    expect(grid).toBeChecked();
    expect(list).not.toBeChecked();

    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('radio', { name: 'Tabelle' })).toHaveFocus();
    await userEvent.keyboard(' ');
    expect(screen.getByRole('radio', { name: 'Tabelle' })).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});
