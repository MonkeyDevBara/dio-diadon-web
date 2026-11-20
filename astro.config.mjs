import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// SSR di Vercel; konten dibaca dari libSQL (Turso di produksi, file ./data/dio.db di lokal).
export default defineConfig({
  site: 'https://diodiadon.id',
  output: 'server',
  adapter: vercel(),
  vite: { plugins: [tailwindcss()] },
});
