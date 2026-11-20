import type { APIRoute } from 'astro';
import { exportAll } from '../../server/db';

// Ekspor seluruh konten dan file unggahan (base64) sebagai JSON.
// Turso juga menyimpan backup/point-in-time sendiri; ini salinan tambahan yang bisa kamu simpan.
export const GET: APIRoute = async () => {
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(JSON.stringify(await exportAll()), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="dio-backup-${stamp}.json"`,
    },
  });
};
