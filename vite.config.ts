import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: { entry: resolve(__dirname, 'src/index.ts'), formats: ['es'], fileName: 'index' },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react-aria-components'],
      output: { assetFileNames: 'styles.css' },
    },
  },
  test: { environment: 'jsdom', setupFiles: ['./src/test-setup.ts'], css: true },
});
