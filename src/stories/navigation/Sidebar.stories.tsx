import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from '../../components/Sidebar/Sidebar';

const items = [
  { id: 'home', label: 'Übersicht', href: '#', icon: 'home' as const },
  { id: 'projects', label: 'Projekte', href: '#', icon: 'folder' as const },
  { id: 'fav', label: 'Favoriten', href: '#', icon: 'favoriteBorder' as const },
  { id: 'inbox', label: 'Meldungen', href: '#', icon: 'bell' as const },
  { id: 'settings', label: 'Einstellungen', href: '#', icon: 'settings' as const },
];

const meta: Meta<typeof Sidebar> = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  args: { logo: 'Lichtung', items, currentId: 'projects', footer: <span className="cp-text-paragraph-small">Toni</span> },
  decorators: [(Story) => <div style={{ height: 560 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Expanded: Story = {};
export const Collapsed: Story = { args: { defaultCollapsed: true } };
