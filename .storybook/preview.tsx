import type { Preview, Decorator } from '@storybook/react-vite';
import { useEffect } from 'react';
import '../src/styles/base.css';
import { canopyTheme } from './theme';

/** Setzt Theme und Bewegung als Attribute auf <html>, wie in einer echten App. */
const withCanopy: Decorator = (Story, context) => {
  const { theme, motion } = context.globals;
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    html.setAttribute('data-motion', motion);
  }, [theme, motion]);
  return (
    <div className="cp-root" style={{ padding: 24, minHeight: '100%' }}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withCanopy],
  globalTypes: {
    theme: {
      description: 'Light oder Dark',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
    motion: {
      description: 'Bewegung voll oder reduziert (prefers-reduced-motion)',
      toolbar: {
        title: 'Bewegung',
        icon: 'lightning',
        items: [
          { value: 'full', title: 'Volle Bewegung' },
          { value: 'reduced', title: 'Reduzierte Bewegung' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light', motion: 'full' },
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true, matchers: { color: /(background|color)$/i } },
    backgrounds: { disable: true },
    a11y: { test: 'error' },
    docs: { theme: canopyTheme },
    options: {
      storySort: {
        order: ['Einführung', 'Foundations', ['Farben', 'Typografie', 'Abstände und Radius', 'Schatten', 'Motion'], 'Actions', 'Navigation', 'Form Elements', 'Data Display', 'Utilities', 'Content', 'Overlays', 'Patterns', 'Templates'],
      },
    },
    viewport: {
      options: {
        mobile: { name: 'Mobile (375)', styles: { width: '375px', height: '812px' } },
        tablet: { name: 'Tablet (768)', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop (1280)', styles: { width: '1280px', height: '800px' } },
      },
    },
  },
};
export default preview;
