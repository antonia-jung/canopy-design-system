import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  // Storybook baut mit relativen Pfaden, dadurch läuft es auch unter
  // /canopy-design-system/ auf GitHub Pages ohne eigene base-Einstellung.
};
export default config;
