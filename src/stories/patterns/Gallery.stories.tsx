import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page, Section } from '../foundations/helpers';
import { GalleryPattern } from '../../patterns/Gallery/GalleryPattern';
import { galleryItems } from './data';
const meta: Meta = { title: 'Patterns/Gallery', parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj;
export const Playground: Story = { render: () => <GalleryPattern items={galleryItems} categories={['Systeme', 'Apps', 'Websites']} /> };
export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Gallery" intro="Bildraster aus Cards mit Filter und Seitenwechsel. Die Spalten passen sich der Breite des Bereichs an.">
      <Section title="Desktop"><div style={{ width: 960, maxWidth: '100%' }}><GalleryPattern items={galleryItems} categories={['Systeme', 'Apps', 'Websites']} /></div></Section>
      <Section title="Mobile"><div style={{ width: 375, maxWidth: '100%' }}><GalleryPattern items={galleryItems} categories={['Systeme', 'Apps', 'Websites']} /></div></Section>
    </Page>
  ),
};
