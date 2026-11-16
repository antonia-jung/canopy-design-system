import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  // GitHub Pages liefert das Storybook unter /canopy-design-system/ aus
  viteFinal: async (cfg) => {
    if (process.env.STORYBOOK_BASE) cfg.base = process.env.STORYBOOK_BASE;
    return cfg;
  },
};
export default config;
