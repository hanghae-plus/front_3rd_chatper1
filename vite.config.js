import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config';
import { defineConfig } from 'vite';

export default mergeConfig(
  defineConfig({
    resolve: {
      extensions: ['.js', '.jsx'], // .jsx 파일도 자동으로 해석되도록 설정
    },
    esbuild: {
      jsxFactory: 'createVNode',
    },
    optimizeDeps: {
      esbuildOptions: {
        jsx: 'transform',
        jsxFactory: 'createVNode',
      },
    },
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
    },
  })
);
