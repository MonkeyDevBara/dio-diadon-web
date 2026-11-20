import type { APIRoute } from 'astro';
import { backupBuffer } from '../../server/db';

// Salinan konsisten database (VACUUM INTO). Foto/PDF yang diunggah ada di folder data/uploads dan perlu disalin terpisah.
export const GET: APIRoute = () => {
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(backupBuffer(), {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="dio-backup-${stamp}.db"`,
    },
  });
};
