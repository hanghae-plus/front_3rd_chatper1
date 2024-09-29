import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config';
import { defineConfig } from 'vite';
import path from 'path';

export default mergeConfig(
  defineConfig({
    esbuild: {
      jsxFactory: 'createVNode',
    },
    optimizeDeps: {
      esbuildOptions: {
        jsx: 'transform',
        jsxFactory: 'createVNode',
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
      },
    },
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
    },
  }),
);
