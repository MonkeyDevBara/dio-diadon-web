import type { Field } from './resources';
import { removeUploads, saveImage, savePdf } from './uploads';

export type Values = Record<string, string | number>;

export interface ParseResult {
  values: Values;
  errors: Record<string, string>;
  created: string[]; // file baru yang sudah ditulis (hapus jika simpan gagal)
  replaced: string[]; // file lama yang harus dihapus setelah simpan berhasil
}

const isHttpUrl = (v: string) => {
  try {
    return ['http:', 'https:'].includes(new URL(v).protocol);
  } catch {
    return false;
  }
};

function parseField(f: Field, raw: string): string | number | { error: string } {
  if (!raw) return f.required ? { error: 'Wajib diisi.' } : f.type === 'number' ? 0 : '';

  const max = f.max ?? (f.type === 'textarea' ? 1000 : 200);
  if (raw.length > max) return { error: `Maksimal ${max} karakter.` };
  if (f.pattern && !f.pattern.test(raw)) return { error: f.patternMessage ?? 'Format tidak valid.' };

  switch (f.type) {
    case 'number': {
      const n = Number(raw.replace(',', '.'));
      return Number.isFinite(n) ? n : { error: 'Harus berupa angka.' };
    }
    case 'url':
      return isHttpUrl(raw) ? raw : { error: 'Harus link lengkap, diawali http:// atau https://' };
    case 'color':
      return /^#[0-9a-f]{6}$/i.test(raw) ? raw.toLowerCase() : { error: 'Warna tidak valid.' };
    case 'select':
      return f.options?.some((o) => o.value === raw) ? raw : { error: 'Pilihan tidak valid.' };
    default:
      return raw;
  }
}

export async function parseForm(fields: Field[], form: FormData, existing: Values = {}): Promise<ParseResult> {
  const values: Values = {};
  const errors: Record<string, string> = {};
  const created: string[] = [];
  const replaced: string[] = [];

  for (const f of fields) {
    if (f.type === 'image' || f.type === 'file') continue;
    if (f.type === 'checkbox') {
      values[f.name] = form.get(f.name) === 'on' ? 1 : 0;
      continue;
    }
    const parsed = parseField(f, String(form.get(f.name) ?? '').trim());
    if (typeof parsed === 'object') errors[f.name] = parsed.error;
    else values[f.name] = parsed;
  }

  // File hanya diproses jika semua isian lain valid, supaya tidak ada file yatim.
  const uploads = fields.filter((f) => f.type === 'image' || f.type === 'file');
  if (Object.keys(errors).length === 0) {
    for (const f of uploads) {
      const file = form.get(f.name);
      const old = String(existing[f.name] ?? '');
      if (file instanceof File && file.size > 0) {
        try {
          const name = f.type === 'image' ? await saveImage(file) : await savePdf(file);
          values[f.name] = name;
          created.push(name);
          if (old) replaced.push(old);
        } catch (e) {
          errors[f.name] = e instanceof Error ? e.message : 'Gagal mengunggah file.';
        }
      } else if (form.get(`remove_${f.name}`) === 'on') {
        values[f.name] = '';
        if (old) replaced.push(old);
      } else {
        values[f.name] = old;
      }
    }
  } else {
    for (const f of uploads) values[f.name] = String(existing[f.name] ?? '');
  }

  if (Object.keys(errors).length > 0) {
    await removeUploads(created);
    created.length = 0;
    replaced.length = 0;
  }
  return { values, errors, created, replaced };
}
