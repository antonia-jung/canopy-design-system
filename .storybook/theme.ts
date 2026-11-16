import { create } from 'storybook/theming';

/** Storybook-Oberfläche im Canopy-Look */
export const canopyTheme = create({
  base: 'light',
  brandTitle: 'Canopy Design System',
  brandUrl: 'https://github.com/antonia-jung/canopy-design-system',
  colorPrimary: '#1f4d3a',
  colorSecondary: '#1f4d3a',
  appBg: '#f4f3ec',
  appContentBg: '#faf9f5',
  appBorderColor: '#dfdac5',
  appBorderRadius: 12,
  fontBase: '"Funnel Sans", system-ui, sans-serif',
  textColor: '#2c2b26',
  barBg: '#faf9f5',
  barSelectedColor: '#1f4d3a',
  inputBorderRadius: 12,
});
