import type { APIRoute } from 'astro';
import { readUpload } from '../../server/uploads';

// Nama file acak dan tidak pernah dipakai ulang, jadi aman di-cache selamanya.
export const GET: APIRoute = ({ params }) => {
  const file = readUpload(params.name ?? '');
  if (!file) return new Response('Not found', { status: 404 });
  return new Response(file.data, {
    headers: {
      'Content-Type': file.type,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      ...(file.type === 'application/pdf' ? { 'Content-Disposition': 'inline; filename="proposal-starday.pdf"' } : {}),
    },
  });
};
