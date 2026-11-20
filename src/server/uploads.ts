import { mkdirSync, readFileSync, rmSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import path from 'node:path';
import sharp from 'sharp';
import { UPLOAD_DIR } from './db';

const NAME_RE = /^[a-f0-9]{16}\.(webp|pdf)$/;
const IMAGE_FORMATS: Record<string, true> = { jpeg: true, png: true, webp: true, avif: true, gif: true }; // SVG sengaja ditolak (bisa memuat script)
const MAX_IMAGE = 8 * 1024 * 1024;
const MAX_PDF = 10 * 1024 * 1024;

const newName = (ext: string) => `${randomBytes(8).toString('hex')}.${ext}`;

export async function saveImage(file: File): Promise<string> {
  if (file.size > MAX_IMAGE) throw new Error('Gambar terlalu besar (maks 8 MB).');
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
  mkdirSync(UPLOAD_DIR, { recursive: true });
  const name = newName('webp');
  await writeFile(path.join(UPLOAD_DIR, name), out);
  return name;
}

export async function savePdf(file: File): Promise<string> {
  if (file.size > MAX_PDF) throw new Error('PDF terlalu besar (maks 10 MB).');
  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.subarray(0, 5).toString('latin1') !== '%PDF-') throw new Error('File bukan PDF yang valid.');
  mkdirSync(UPLOAD_DIR, { recursive: true });
  const name = newName('pdf');
  await writeFile(path.join(UPLOAD_DIR, name), buf);
  return name;
}

export function removeUpload(name: string | null | undefined) {
  if (!name || !NAME_RE.test(name)) return;
  rmSync(path.join(UPLOAD_DIR, name), { force: true });
}

export function readUpload(name: string): { data: Buffer; type: string } | null {
  if (!NAME_RE.test(name)) return null;
  try {
    return { data: readFileSync(path.join(UPLOAD_DIR, name)), type: name.endsWith('.pdf') ? 'application/pdf' : 'image/webp' };
  } catch {
    return null;
  }
}

export const uploadUrl = (name: string | null | undefined) => (name ? `/uploads/${name}` : '');
