import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { Avatar, AvatarLabel, AvatarGroup } from '../../components/Avatar/Avatar';
const meta: Meta<typeof Avatar> = { title: 'Content/Avatar', component: Avatar, parameters: { layout: 'padded' }, args: { name: 'Cole Palmer', size: 'M', shape: 'circle' } };
export default meta;
type Story = StoryObj<typeof Avatar>;
export const Playground: Story = {};
const people = ['Cole Palmer', 'Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Toni Jung', 'Mae Jemison', 'Linus T'].map((name) => ({ name }));
const img = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect width="10" height="10" fill="#7aa88a"/><circle cx="5" cy="4" r="2" fill="#e8e4d8"/><rect x="2" y="7" width="6" height="4" rx="2" fill="#e8e4d8"/></svg>');
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Avatar" intro="Person oder Konto als Bild oder Initialen. Lädt das Bild nicht, springen die Initialen ein.">
      <Section title="Größen"><div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>{(['XS', 'S', 'M', 'L', 'XL'] as const).map((s) => <Avatar key={s} name="Cole Palmer" size={s} />)}</div></Section>
      <Section title="Rounded"><div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>{(['XS', 'S', 'M', 'L', 'XL'] as const).map((s) => <Avatar key={s} name="Cole Palmer" size={s} shape="rounded" />)}</div></Section>
      <Section title="Bild"><div style={{ display: 'flex', gap: 16, alignItems: 'center' }}><Avatar name="Toni Jung" src={img} size="L" /><Avatar name="Toni Jung" src={img} size="L" shape="rounded" /><Avatar name="Kaputt Bild" src="/gibt-es-nicht.png" size="L" /></div></Section>
      <Section title="Mit Namen"><div style={{ display: 'grid', gap: 16 }}><AvatarLabel name="Cole Palmer" secondary="Design" size="S" /><AvatarLabel name="Cole Palmer" secondary="Design" /><AvatarLabel name="Cole Palmer" secondary="Design" size="L" /></div></Section>
      <Section title="Gruppe"><div style={{ display: 'grid', gap: 16 }}><AvatarGroup people={people} size="S" max={4} /><AvatarGroup people={people} /><AvatarGroup people={people} size="L" max={3} /></div></Section>
    </Page>
  ),
};
