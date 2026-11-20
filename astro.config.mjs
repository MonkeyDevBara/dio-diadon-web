import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://diodiadon.id',
  vite: { plugins: [tailwindcss()] },
});
