import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
 import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl';
const segs = [{ id: 'list', label: 'Liste' }, { id: 'grid', label: 'Raster' }, { id: 'card', label: 'Karte' }, { id: 'table', label: 'Tabelle' }];
const meta: Meta<typeof SegmentedControl> = { title: 'Data Display/Segmented Control', component: SegmentedControl, parameters: { layout: 'padded' }, args: { segments: segs, 'aria-label': 'Ansicht' } };
export default meta;
type Story = StoryObj<typeof SegmentedControl>;
export const Playground: Story = {};
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Segmented Control" intro="Wenige Modi umschalten, immer genau einer aktiv. Der erhabene Indikator wandert als Faden durch die eingedrückte Spur.">
      <Section title="Zwei, drei, vier Segmente"><div style={{ display: 'grid', gap: 16, justifyItems: 'start' }}>
        <SegmentedControl aria-label="Zwei" segments={segs.slice(0, 2)} />
        <SegmentedControl aria-label="Drei" segments={segs.slice(0, 3)} defaultSelectedKey="grid" />
        <SegmentedControl aria-label="Vier" segments={segs} defaultSelectedKey="table" />
      </div></Section>
    </Page>
  ),
};
