import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  // Build-Kennung, damit man im Storybook sieht, welcher Stand geladen ist
  viteFinal: async (cfg) => {
    cfg.define = { ...cfg.define, __CANOPY_BUILD__: JSON.stringify((process.env.GITHUB_SHA ?? 'lokal').slice(0, 7)) };
    return cfg;
  },
  // Storybook baut mit relativen Pfaden, dadurch läuft es auch unter
  // /canopy-design-system/ auf GitHub Pages ohne eigene base-Einstellung.
};
export default config;
