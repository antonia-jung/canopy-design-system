import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Divider } from './Divider/Divider';
import { Tooltip } from './Tooltip/Tooltip';
import { Kbd } from './Kbd/Kbd';
import { SkipLink } from './SkipLink/SkipLink';
import { Skeleton } from './Skeleton/Skeleton';
import { ImageFrame } from './ImageFrame/ImageFrame';
import { Button } from './Button/Button';

describe('Utilities', () => {
  it('Divider mit Label ist ein separator mit Namen', () => {
    render(<Divider label="oder" />);
    expect(screen.getByRole('separator', { name: 'oder' })).toBeTruthy();
  });
  it('Kbd rendert ein kbd-Element', () => {
    render(<Kbd>K</Kbd>);
    expect(screen.getByText('K').tagName).toBe('KBD');
  });
  it('SkipLink verweist aufs Ziel', () => {
    render(<SkipLink href="#main" />);
    expect(screen.getByRole('link', { name: 'Zum Inhalt springen' }).getAttribute('href')).toBe('#main');
  });
  it('Skeleton ist für Screenreader versteckt', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
  });
  it('ImageFrame zeigt Bild mit alt', () => {
    render(<ImageFrame src="x.png" alt="Wald" />);
    expect(screen.getByAltText('Wald')).toBeTruthy();
  });
  it('Tooltip erscheint bei Fokus', async () => {
    const user = userEvent.setup();
    render(<Tooltip label="Hilfe" delay={0}><Button>Ziel</Button></Tooltip>);
    await user.tab();
    expect(await screen.findByRole('tooltip')).toBeTruthy();
  });
});
