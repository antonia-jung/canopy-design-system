import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Page, Section } from '../foundations/helpers';
 import { Tag } from '../../components/Tag/Tag';
const meta: Meta<typeof Tag> = { title: 'Data Display/Tag', component: Tag, parameters: { layout: 'padded' }, args: { children: 'Design' } };
export default meta;
type Story = StoryObj<typeof Tag>;
export const Playground: Story = {};
const Filters = () => {
  const all = ['UX', 'UI', 'Frontend', 'Forschung'];
  const [on, setOn] = useState<string[]>(['UX']);
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {all.map((t) => <Tag key={t} isSelected={on.includes(t)} onSelectedChange={(s) => setOn(s ? [...on, t] : on.filter((x) => x !== t))}>{t}</Tag>)}
      </div>
      <span className="cp-text-paragraph-small" aria-live="polite">Aktiv: {on.join(', ') || '–'}</span>
    </div>
  );
};
const Removable = () => {
  const [tags, setTags] = useState(['Figma', 'React', 'Storybook']);
  return <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{tags.map((t) => <Tag key={t} onRemove={() => setTags(tags.filter((x) => x !== t))}>{t}</Tag>)}{tags.length === 0 && <span className="cp-text-paragraph-small">Alle entfernt</span>}</div>;
};
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Tag" intro="Beschriftung oder Filter. Wählbare Tags schalten mit Leertaste um, entfernbare haben einen eigenen Knopf mit Namen.">
      <Section title="Beschriftung"><div style={{ display: 'flex', gap: 8 }}><Tag>Projekt</Tag><Tag isDisabled>Deaktiviert</Tag></div></Section>
      <Section title="Filter"><Filters /></Section>
      <Section title="Entfernbar"><Removable /></Section>
    </Page>
  ),
};
