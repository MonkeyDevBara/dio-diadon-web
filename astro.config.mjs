import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// SSR: konten dibaca dari database SQLite tertanam (./data/dio.db), jadi perlu server Node.
export default defineConfig({
  site: 'https://diodiadon.id',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  vite: { plugins: [tailwindcss()] },
});
