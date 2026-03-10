// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ptservicesagency.com',
  trailingSlash: 'never',
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'th',
        locales: {
          th: 'th',
          en: 'en',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'th',
    locales: ['th', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
