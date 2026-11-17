import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { ImageFrame } from '../../components/ImageFrame/ImageFrame';
const meta: Meta<typeof Card> = { title: 'Content/Card', component: Card, parameters: { layout: 'padded' }, args: { title: 'Kartentitel', description: 'Eine kurze Beschreibung mit ein bis zwei Zeilen, die den Inhalt erklärt.', variant: 'default', direction: 'vertical' } };
export default meta;
type Story = StoryObj<typeof Card>;
export const Playground: Story = {};
const act = <Button variant="outline">Mehr</Button>;
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Card" intro="Container für zusammengehörigen Inhalt. Mit href ist die ganze Karte klickbar, der Titel trägt den Link, Hover und Fokus sind sichtbar.">
      <Section title="Stile"><div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>{(['default', 'outline', 'elevated'] as const).map((v) => <Card key={v} variant={v} title={v} description="Eine kurze Beschreibung." action={act} />)}</div></Section>
      <Section title="Mit Bild"><div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}><Card variant="elevated" media={<ImageFrame ratio="16:9" rounded={false} />} title="Mit Medium" description="Das Bild füllt die Breite." action={act} /></div></Section>
      <Section title="Horizontal"><Card direction="horizontal" variant="outline" media={<ImageFrame rounded={false} />} title="Horizontal" description="Bild links, Text rechts." /></Section>
      <Section title="Klickbar"><div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}><Card href="#projekt" variant="outline" title="Ganze Karte ist ein Link" description="Fahre darüber oder drücke Tab." /><Card href="#projekt" variant="elevated" title="Elevated" description="Schatten wächst beim Hover." /></div></Section>
    </Page>
  ),
};
