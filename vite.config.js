import { defineConfig } from 'vitest/config';
import babel from 'vite-plugin-babel';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  plugins: [
    babel({
      babelHelpers: 'bundled',
      plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]],
    }),
  ],
});
