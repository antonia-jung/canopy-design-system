import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from '../../components/Footer/Footer';

const columns = [
  { heading: 'Portfolio', links: [{ id: 'p', label: 'Projekte', href: '#' }, { id: 'u', label: 'Über mich', href: '#' }, { id: 'k', label: 'Kontakt', href: '#' }] },
  { heading: 'Ressourcen', links: [{ id: 'd', label: 'Design System', href: '#' }, { id: 'b', label: 'Blog', href: '#' }, { id: 'l', label: 'Lebenslauf', href: '#' }] },
  { heading: 'Folgen', links: [{ id: 'li', label: 'LinkedIn', href: '#', external: true }, { id: 'gh', label: 'GitHub', href: '#', external: true }] },
];
const legal = [{ id: 'i', label: 'Impressum', href: '#' }, { id: 'ds', label: 'Datenschutz', href: '#' }];

const meta: Meta<typeof Footer> = {
  title: 'Navigation/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
  args: { logo: 'Lichtung', claim: 'Gestaltung und Entwicklung mit Herz für Details.', columns, legal, copyright: '© 2026 Lichtung. Alle Rechte vorbehalten.' },
};
export default meta;
type Story = StoryObj<typeof Footer>;

export const Extended: Story = {};
export const Minimal: Story = { args: { variant: 'minimal' } };
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } };
