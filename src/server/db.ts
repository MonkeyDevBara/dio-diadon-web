// Database SQLite lewat libSQL.
// - Lokal: file ./data/dio.db (default, tanpa konfigurasi).
// - Produksi (Vercel): Turso lewat env TURSO_DATABASE_URL + TURSO_AUTH_TOKEN.
// Semua konten (termasuk foto/PDF yang diunggah) disimpan di database ini.
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { createClient, type Client, type InStatement, type InValue } from '@libsql/client';
import { resources, type Field, type Resource } from './resources';
import {
  seedSettings, seedIssues, seedPrograms, seedStats, seedPlaces, seedVideos, seedTestimonials,
} from '../data/seed';

// Skema kita hanya memakai kolom TEXT, REAL, dan INTEGER (kecuali tabel uploads).
export type Row = Record<string, string | number>;

interface Store {
  ready?: Promise<Client>;
  version: number; // naik setiap ada perubahan data; dipakai untuk membatalkan cache konten
}
// Satu instance per proses, bertahan saat HMR di dev.
declare global {
  // eslint-disable-next-line no-var
  var __dio: Store | undefined;
}
const store: Store = (globalThis.__dio ??= { version: 0 });

const metaEnv: Record<string, string | undefined> = import.meta.env;
const env = (k: string) => process.env[k] ?? metaEnv[k];

const DEFAULT_URL = 'file:data/dio.db';

// Hasil libSQL bertipe generik; skema di atas menjamin bentuknya Row.
const toRows = (r: { rows: unknown[] }) => r.rows.map((x) => ({ ...(x as Row) }));

function columnSql(f: Field) {
  const sqlType = f.type === 'number' ? 'REAL' : f.type === 'checkbox' ? 'INTEGER' : 'TEXT';
  return `"${f.name}" ${sqlType} NOT NULL DEFAULT ${sqlType === 'TEXT' ? "''" : '0'}`;
}

async function migrate(client: Client) {
  const create: InStatement[] = [
    'CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)',
    'CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)',
    'CREATE TABLE IF NOT EXISTS uploads (name TEXT PRIMARY KEY, type TEXT NOT NULL, data BLOB NOT NULL, created TEXT NOT NULL)',
    'CREATE TABLE IF NOT EXISTS login_attempts (ip TEXT PRIMARY KEY, n INTEGER NOT NULL, until INTEGER NOT NULL)',
    ...resources.map(
      (r) => `CREATE TABLE IF NOT EXISTS "${r.table}" (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sort INTEGER NOT NULL DEFAULT 0,
        published INTEGER NOT NULL DEFAULT 1,
        ${r.fields.map(columnSql).join(', ')}
      )`,
    ),
  ];
  await client.batch(create, 'write');

  // Tambah kolom baru jika definisi resource bertambah, lalu buat index unik.
  const info = await client.batch(resources.map((r) => `PRAGMA table_info("${r.table}")`), 'read');
  const alter: InStatement[] = [];
  resources.forEach((r, i) => {
    const have = new Set(info[i].rows.map((c) => String(c.name)));
    for (const f of r.fields) if (!have.has(f.name)) alter.push(`ALTER TABLE "${r.table}" ADD COLUMN ${columnSql(f)}`);
  });
  for (const r of resources) {
    for (const f of r.fields.filter((x) => x.unique)) {
      alter.push(`CREATE UNIQUE INDEX IF NOT EXISTS "ux_${r.table}_${f.name}" ON "${r.table}" ("${f.name}")`);
    }
  }
  if (alter.length) await client.batch(alter, 'write');
}

function insertStatement(r: Resource, values: Partial<Row>, sort?: number): InStatement {
  const cols = ['published', ...r.fields.map((f) => f.name)];
  const args: InValue[] = [values.published ?? 1, ...r.fields.map((f) => values[f.name] ?? (f.type === 'number' ? 0 : ''))];
  const sortSql = sort === undefined ? `(SELECT COALESCE(MAX(sort), 0) + 1 FROM "${r.table}")` : '?';
  if (sort !== undefined) args.unshift(sort);
  return {
    sql: `INSERT INTO "${r.table}" (sort, ${cols.map((c) => `"${c}"`).join(', ')}) VALUES (${sortSql}, ${cols.map(() => '?').join(', ')})`,
    args,
  };
}

async function seed(client: Client) {
  const seeded = async () => (await client.execute("SELECT 1 FROM meta WHERE key = 'seeded'")).rows.length > 0;
  if (await seeded()) return;

  const byTable: Record<string, Row[]> = {
    programs: seedPrograms,
    stats: seedStats,
    places: seedPlaces,
    videos: seedVideos,
    testimonials: seedTestimonials,
    issues: seedIssues,
  };
  // Pernyataan pertama adalah INSERT meta 'seeded'. Jika dua instance berebut seed, yang kedua
  // gagal di sini dan seluruh batch-nya dibatalkan, jadi data tidak ganda.
  const stmts: InStatement[] = [{ sql: "INSERT INTO meta (key, value) VALUES ('seeded', ?)", args: [new Date().toISOString()] }];
  for (const [k, v] of Object.entries(seedSettings)) stmts.push({ sql: 'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', args: [k, v] });
  for (const r of resources) (byTable[r.table] ?? []).forEach((row, i) => stmts.push(insertStatement(r, row, i + 1)));

  try {
    await client.batch(stmts, 'write');
  } catch (e) {
    if (!(await seeded())) throw e;
  }
}

async function init(): Promise<Client> {
  const url = env('TURSO_DATABASE_URL') || DEFAULT_URL;
  if (url.startsWith('file:')) mkdirSync(path.dirname(path.resolve(url.slice(5))), { recursive: true });
  const client = createClient({ url, authToken: env('TURSO_AUTH_TOKEN') || undefined });
  await migrate(client);
  await seed(client);
  return client;
}

export function db(): Promise<Client> {
  if (!store.ready) {
    store.ready = init().catch((e) => {
      store.ready = undefined; // coba lagi di request berikutnya
      throw e;
    });
  }
  return store.ready;
}

export const dataVersion = () => store.version;
const touch = () => void store.version++;

// ---------- meta ----------

export async function getMeta(key: string): Promise<string | null> {
  const res = await (await db()).execute({ sql: 'SELECT value FROM meta WHERE key = ?', args: [key] });
  return res.rows.length ? String(res.rows[0].value) : null;
}

/** Menyimpan hanya jika belum ada, lalu mengembalikan nilai yang berlaku (aman untuk balapan antar instance). */
export async function ensureMeta(key: string, make: () => string): Promise<string> {
  const c = await db();
  await c.execute({ sql: 'INSERT OR IGNORE INTO meta (key, value) VALUES (?, ?)', args: [key, make()] });
  return String((await getMeta(key)) ?? '');
}

// ---------- settings ----------

const withDefaults = (rows: { key: unknown; value: unknown }[]) => {
  const out: Record<string, string> = { ...seedSettings };
  for (const r of rows) out[String(r.key)] = String(r.value);
  return out;
};

export async function getSettings(): Promise<Record<string, string>> {
  return withDefaults((await (await db()).execute('SELECT key, value FROM settings')).rows);
}

export async function saveSettings(values: Record<string, string | number>) {
  const stmts = Object.entries(values).map(([k, v]): InStatement => ({ sql: 'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', args: [k, String(v)] }));
  await (await db()).batch(stmts, 'write');
  touch();
}

/** Satu round-trip untuk semua konten publik (dipakai cache di content.ts). */
export interface PublicSnapshot {
  settings: Record<string, string>;
  tables: Record<string, Row[]>; // dikunci dengan key resource
}

export async function loadPublic(): Promise<PublicSnapshot> {
  const c = await db();
  const res = await c.batch(
    [
      'SELECT key, value FROM settings',
      ...resources.map((r) => `SELECT * FROM "${r.table}" WHERE published = 1 ORDER BY sort, id`),
    ],
    'read',
  );
  const tables: Record<string, Row[]> = {};
  resources.forEach((r, i) => (tables[r.key] = toRows(res[i + 1])));
  return { settings: withDefaults(res[0].rows as { key: unknown; value: unknown }[]), tables };
}

// ---------- CRUD generik (nama kolom hanya dari konfigurasi resource, bukan input pengguna) ----------

export async function listRows(r: Resource): Promise<Row[]> {
  return toRows(await (await db()).execute(`SELECT * FROM "${r.table}" ORDER BY sort, id`));
}

export async function getRow(r: Resource, id: number): Promise<Row | null> {
  const res = await (await db()).execute({ sql: `SELECT * FROM "${r.table}" WHERE id = ?`, args: [id] });
  return res.rows.length ? toRows(res)[0] : null;
}

export async function countRows(r: Resource): Promise<number> {
  const res = await (await db()).execute(`SELECT COUNT(*) AS n FROM "${r.table}"`);
  return Number(res.rows[0].n);
}

export async function createRow(r: Resource, values: Partial<Row>): Promise<number> {
  const res = await (await db()).execute(insertStatement(r, values));
  touch();
  return Number(res.lastInsertRowid);
}

export async function updateRow(r: Resource, id: number, values: Row) {
  const names = ['published', ...r.fields.map((f) => f.name)];
  await (await db()).execute({
    sql: `UPDATE "${r.table}" SET ${names.map((n) => `"${n}" = ?`).join(', ')} WHERE id = ?`,
    args: [...names.map((n) => values[n]), id],
  });
  touch();
}

export async function deleteRow(r: Resource, id: number) {
  await (await db()).execute({ sql: `DELETE FROM "${r.table}" WHERE id = ?`, args: [id] });
  touch();
}

export async function setPublished(r: Resource, id: number, on: boolean) {
  await (await db()).execute({ sql: `UPDATE "${r.table}" SET published = ? WHERE id = ?`, args: [on ? 1 : 0, id] });
  touch();
}

export async function moveRow(r: Resource, id: number, dir: 'up' | 'down') {
  const c = await db();
  const ids = (await c.execute(`SELECT id FROM "${r.table}" ORDER BY sort, id`)).rows.map((x) => Number(x.id));
  const i = ids.indexOf(id);
  const j = dir === 'up' ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= ids.length) return;
  [ids[i], ids[j]] = [ids[j], ids[i]];
  await c.batch(ids.map((rid, idx): InStatement => ({ sql: `UPDATE "${r.table}" SET sort = ? WHERE id = ?`, args: [idx + 1, rid] })), 'write');
  touch();
}

// ---------- backup ----------

/** Ekspor seluruh konten sebagai JSON (termasuk file upload dalam base64). */
export async function exportAll() {
  const c = await db();
  const res = await c.batch(
    ['SELECT key, value FROM settings', 'SELECT name, type, data, created FROM uploads', ...resources.map((r) => `SELECT * FROM "${r.table}" ORDER BY sort, id`)],
    'read',
  );
  const tables: Record<string, Row[]> = {};
  resources.forEach((r, i) => (tables[r.table] = toRows(res[i + 2])));
  return {
    app: 'dio-diadon-web',
    exportedAt: new Date().toISOString(),
    settings: Object.fromEntries(res[0].rows.map((x) => [String(x.key), String(x.value)])),
    tables,
    uploads: res[1].rows.map((x) => ({
      name: String(x.name),
      type: String(x.type),
      created: String(x.created),
      base64: Buffer.from(x.data as ArrayBuffer).toString('base64'),
    })),
  };
}
