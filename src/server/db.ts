// Database SQLite tertanam (node:sqlite bawaan Node, tanpa layanan eksternal).
// File: ./data/dio.db (atur lewat env DATA_DIR). Semua konten diubah lewat /admin.
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { randomBytes } from 'node:crypto';
import type * as SqliteModule from 'node:sqlite';
import type { DatabaseSync } from 'node:sqlite';
import { resources, type Field, type Resource } from './resources';
import {
  seedSettings, seedIssues, seedPrograms, seedStats, seedPlaces, seedVideos, seedTestimonials,
} from '../data/seed';

// createRequire: node:sqlite hanya bisa diimpor dengan prefix `node:`, dan tidak semua bundler mengenalinya.
const require = createRequire(import.meta.url);
const sqlite = require('node:sqlite') as typeof SqliteModule;

export const DATA_DIR = path.resolve(process.env.DATA_DIR ?? 'data');
export const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');

// Skema kita hanya memakai kolom TEXT, REAL, dan INTEGER.
export type Row = Record<string, string | number>;
type Db = DatabaseSync;

const store = globalThis as unknown as { __dioDb?: Db };

// Hasil node:sqlite bertipe generik; skema di atas menjamin bentuknya Row.
const rows = (r: unknown) => r as Row[];
const one = (r: unknown) => r as Row | undefined;

function columnSql(f: Field) {
  const sqlType = f.type === 'number' ? 'REAL' : f.type === 'checkbox' ? 'INTEGER' : 'TEXT';
  return `"${f.name}" ${sqlType} NOT NULL DEFAULT ${sqlType === 'TEXT' ? "''" : '0'}`;
}

function migrate(db: Db) {
  db.exec(`CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
           CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);`);

  for (const r of resources) {
    db.exec(
      `CREATE TABLE IF NOT EXISTS "${r.table}" (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         sort INTEGER NOT NULL DEFAULT 0,
         published INTEGER NOT NULL DEFAULT 1,
         ${r.fields.map(columnSql).join(', ')}
       )`,
    );
    // Tambah kolom baru jika definisi resource bertambah.
    const have = new Set(rows(db.prepare(`PRAGMA table_info("${r.table}")`).all()).map((c) => c.name));
    for (const f of r.fields) {
      if (!have.has(f.name)) db.exec(`ALTER TABLE "${r.table}" ADD COLUMN ${columnSql(f)}`);
    }
    for (const f of r.fields.filter((x) => x.unique)) {
      db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS "ux_${r.table}_${f.name}" ON "${r.table}" ("${f.name}")`);
    }
  }
}

function transaction(db: Db, fn: () => void) {
  db.exec('BEGIN');
  try {
    fn();
    db.exec('COMMIT');
  } catch (e) {
    db.exec('ROLLBACK');
    throw e;
  }
}

function seed(db: Db) {
  if (db.prepare("SELECT 1 FROM meta WHERE key='seeded'").get()) return;
  const byTable: Record<string, Row[]> = {
    programs: seedPrograms,
    stats: seedStats,
    places: seedPlaces,
    videos: seedVideos,
    testimonials: seedTestimonials,
    issues: seedIssues,
  };
  transaction(db, () => {
    const putSetting = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');
    for (const [k, v] of Object.entries(seedSettings)) putSetting.run(k, v);
    for (const r of resources) {
      (byTable[r.table] ?? []).forEach((row, i) => insertRow(db, r, row, i + 1));
    }
    db.prepare("INSERT INTO meta (key, value) VALUES ('seeded', ?)").run(new Date().toISOString());
  });
}

export function getDb(): Db {
  if (store.__dioDb) return store.__dioDb;
  mkdirSync(UPLOAD_DIR, { recursive: true });
  const db = new sqlite.DatabaseSync(path.join(DATA_DIR, 'dio.db'));
  db.exec('PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000; PRAGMA foreign_keys = ON;');
  migrate(db);
  seed(db);
  store.__dioDb = db;
  return db;
}

// ---------- meta ----------

export function getMeta(key: string): string | null {
  const row = one(getDb().prepare('SELECT value FROM meta WHERE key = ?').get(key));
  return row ? String(row.value) : null;
}
export function setMeta(key: string, value: string) {
  getDb().prepare('INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)').run(key, value);
}

// ---------- settings ----------

export function getSettings(): Record<string, string> {
  const out: Record<string, string> = { ...seedSettings };
  for (const r of rows(getDb().prepare('SELECT key, value FROM settings').all())) out[String(r.key)] = String(r.value);
  return out;
}

export function saveSettings(values: Record<string, string | number>) {
  const db = getDb();
  const stmt = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');
  transaction(db, () => {
    for (const [k, v] of Object.entries(values)) stmt.run(k, String(v));
  });
}

// ---------- CRUD generik (nama kolom hanya dari konfigurasi resource, bukan input pengguna) ----------

const plain = (r: Row): Row => ({ ...r });

export function listRows(r: Resource, opts: { onlyPublished?: boolean } = {}): Row[] {
  const where = opts.onlyPublished ? 'WHERE published = 1' : '';
  return rows(getDb().prepare(`SELECT * FROM "${r.table}" ${where} ORDER BY sort, id`).all()).map(plain);
}

export function getRow(r: Resource, id: number): Row | null {
  const row = one(getDb().prepare(`SELECT * FROM "${r.table}" WHERE id = ?`).get(id));
  return row ? plain(row) : null;
}

export function countRows(r: Resource): number {
  return Number(one(getDb().prepare(`SELECT COUNT(*) AS n FROM "${r.table}"`).get())?.n ?? 0);
}

function insertRow(db: Db, r: Resource, values: Partial<Row>, sort?: number): number {
  const next = sort ?? Number(one(db.prepare(`SELECT COALESCE(MAX(sort), 0) + 1 AS n FROM "${r.table}"`).get())?.n ?? 1);
  const cols = ['sort', 'published', ...r.fields.map((f) => f.name)];
  const vals = [next, values.published ?? 1, ...r.fields.map((f) => values[f.name] ?? (f.type === 'number' ? 0 : ''))];
  const res = db
    .prepare(`INSERT INTO "${r.table}" (${cols.map((c) => `"${c}"`).join(', ')}) VALUES (${cols.map(() => '?').join(', ')})`)
    .run(...vals);
  return Number(res.lastInsertRowid);
}
export const createRow = (r: Resource, values: Partial<Row>) => insertRow(getDb(), r, values);

export function updateRow(r: Resource, id: number, values: Row) {
  const names = ['published', ...r.fields.map((f) => f.name)];
  getDb()
    .prepare(`UPDATE "${r.table}" SET ${names.map((n) => `"${n}" = ?`).join(', ')} WHERE id = ?`)
    .run(...names.map((n) => values[n]), id);
}

export function deleteRow(r: Resource, id: number) {
  getDb().prepare(`DELETE FROM "${r.table}" WHERE id = ?`).run(id);
}

export function setPublished(r: Resource, id: number, on: boolean) {
  getDb().prepare(`UPDATE "${r.table}" SET published = ? WHERE id = ?`).run(on ? 1 : 0, id);
}

export function moveRow(r: Resource, id: number, dir: 'up' | 'down') {
  const db = getDb();
  const ids = rows(db.prepare(`SELECT id FROM "${r.table}" ORDER BY sort, id`).all()).map((x) => Number(x.id));
  const i = ids.indexOf(id);
  const j = dir === 'up' ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= ids.length) return;
  [ids[i], ids[j]] = [ids[j], ids[i]];
  const stmt = db.prepare(`UPDATE "${r.table}" SET sort = ? WHERE id = ?`);
  transaction(db, () => ids.forEach((rid, idx) => stmt.run(idx + 1, rid)));
}

// ---------- backup ----------

export function backupBuffer(): Buffer {
  const tmp = path.join(tmpdir(), `dio-backup-${randomBytes(6).toString('hex')}.db`);
  try {
    getDb().exec(`VACUUM INTO '${tmp.replace(/'/g, "''")}'`);
    return readFileSync(tmp);
  } finally {
    rmSync(tmp, { force: true });
  }
}
