/// <reference types="vitest" />

import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  vite: {
    inlineStylesExtension: 'scss',
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      content: {
        prismOptions: {
          additionalLangs: ['yaml', 'sql', 'graphql', 'bash'],
        },
      },
      prerender: {
        routes: async () => [
          '/login',
          '/register',
          {
            contentDir: 'src/content/blog',
            transform: file => {
              const slug = file.attributes?.['slug'] || file.name;
              return `/blog/${slug}`;
            },
          },
        ],
      },
      nitro: {
        routeRules: {
          '/my-list': { ssr: false },
        },
      },
    }),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
