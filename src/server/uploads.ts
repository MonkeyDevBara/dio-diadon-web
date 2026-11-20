import { randomBytes } from 'node:crypto';
import sharp from 'sharp';
import { db } from './db';

// File disimpan sebagai BLOB di tabel `uploads` (satu database untuk semuanya).
// Batas 4 MB karena fungsi serverless Vercel menolak body request di atas 4,5 MB.
const NAME_RE = /^[a-f0-9]{16}\.(webp|pdf)$/;
const IMAGE_FORMATS: Record<string, true> = { jpeg: true, png: true, webp: true, avif: true, gif: true }; // SVG sengaja ditolak (bisa memuat script)
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

const newName = (ext: string) => `${randomBytes(8).toString('hex')}.${ext}`;

async function put(name: string, type: string, data: Buffer) {
  await (await db()).execute({
    sql: 'INSERT INTO uploads (name, type, data, created) VALUES (?, ?, ?, ?)',
    args: [name, type, data, new Date().toISOString()],
  });
}

export async function saveImage(file: File): Promise<string> {
  if (file.size > MAX_UPLOAD_BYTES) throw new Error('Gambar terlalu besar (maks 4 MB).');
  const input = Buffer.from(await file.arrayBuffer());
  let format: string | undefined;
  try {
    format = (await sharp(input).metadata()).format;
  } catch {
    throw new Error('File bukan gambar yang valid.');
  }
  if (!format || !IMAGE_FORMATS[format]) throw new Error('Format gambar harus JPG, PNG, WebP, AVIF, atau GIF.');
  // Re-encode ke WebP: menghapus metadata (EXIF/GPS) dan memperkecil ukuran.
  const out = await sharp(input)
    .rotate()
    .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();
  const name = newName('webp');
  await put(name, 'image/webp', out);
  return name;
}

export async function savePdf(file: File): Promise<string> {
  if (file.size > MAX_UPLOAD_BYTES) throw new Error('PDF terlalu besar (maks 4 MB).');
  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.subarray(0, 5).toString('latin1') !== '%PDF-') throw new Error('File bukan PDF yang valid.');
  const name = newName('pdf');
  await put(name, 'application/pdf', buf);
  return name;
}

export async function removeUpload(name: string | null | undefined) {
  if (!name || !NAME_RE.test(name)) return;
  await (await db()).execute({ sql: 'DELETE FROM uploads WHERE name = ?', args: [name] });
}

export async function removeUploads(names: string[]) {
  await Promise.all(names.map(removeUpload));
}

export async function readUpload(name: string): Promise<{ data: Buffer; type: string } | null> {
  if (!NAME_RE.test(name)) return null;
  const res = await (await db()).execute({ sql: 'SELECT type, data FROM uploads WHERE name = ?', args: [name] });
  if (!res.rows.length) return null;
  return { type: String(res.rows[0].type), data: Buffer.from(res.rows[0].data as ArrayBuffer) };
}

export const uploadUrl = (name: string | null | undefined) => (name ? `/uploads/${name}` : '');
