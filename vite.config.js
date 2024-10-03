import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config';
import { defineConfig } from 'vite';

export default mergeConfig(
	defineConfig({
		esbuild: {
			jsxFactory: 'createVNode',
			jsxFragment: 'Fragment', // Fragment는 type을 'fragment'로 처리
		},
		optimizeDeps: {
			esbuildOptions: {
				jsx: 'transform',
				jsxFactory: 'createVNode',
				jsxFragment: 'Fragment', // Fragment는 type을 'fragment'로 처리
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
