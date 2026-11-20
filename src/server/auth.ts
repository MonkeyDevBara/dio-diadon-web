// Login admin: satu password dari env ADMIN_PASSWORD, sesi lewat cookie bertanda tangan (HMAC).
// Rahasia sesi dan pembatas percobaan login disimpan di database, karena di serverless tiap request
// bisa dilayani instance yang berbeda.
import { createHmac, randomBytes, timingSafeEqual, createHash } from 'node:crypto';
import { db, ensureMeta } from './db';

export const COOKIE = 'dd_admin';
export const SESSION_SECONDS = 60 * 60 * 24 * 7;

const metaEnv: Record<string, string | undefined> = import.meta.env;
const password = () => process.env.ADMIN_PASSWORD ?? metaEnv.ADMIN_PASSWORD ?? '';

export const adminEnabled = () => password().length >= 8;

let cachedSecret: string | undefined;
async function secret(): Promise<string> {
  cachedSecret ??= await ensureMeta('session_secret', () => randomBytes(32).toString('hex'));
  // Mengganti ADMIN_PASSWORD otomatis mengakhiri semua sesi lama.
  return `${cachedSecret}:${password()}`;
}

const sign = async (payload: string) => createHmac('sha256', await secret()).update(payload).digest('base64url');

const digest = (v: string) => createHash('sha256').update(v).digest();

export function checkPassword(input: string): boolean {
  return adminEnabled() && timingSafeEqual(digest(input), digest(password()));
}

export async function createSession(): Promise<string> {
  const exp = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  return `${exp}.${await sign(exp)}`;
}

export async function verifySession(token: string | undefined): Promise<boolean> {
  if (!token || !adminEnabled()) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  const expected = await sign(exp);
  return sig.length === expected.length && timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

// Pembatas percobaan login: 5 gagal per IP, kunci 10 menit.
const MAX_FAILS = 5;
const LOCK_MS = 10 * 60 * 1000;

/** Sisa menit penguncian untuk IP ini, 0 jika tidak terkunci. */
export async function loginBlockedFor(ip: string): Promise<number> {
  const res = await (await db()).execute({ sql: 'SELECT n, until FROM login_attempts WHERE ip = ?', args: [ip] });
  if (!res.rows.length) return 0;
  const { n, until } = res.rows[0];
  return Number(n) >= MAX_FAILS && Number(until) > Date.now() ? Math.ceil((Number(until) - Date.now()) / 60000) : 0;
}

export async function recordLogin(ip: string, ok: boolean) {
  const c = await db();
  if (ok) {
    await c.execute({ sql: 'DELETE FROM login_attempts WHERE ip = ?', args: [ip] });
    return;
  }
  const now = Date.now();
  // Hitungan lama yang sudah kedaluwarsa dimulai lagi dari 1.
  await c.execute({
    sql: `INSERT INTO login_attempts (ip, n, until) VALUES (?, 1, ?)
          ON CONFLICT(ip) DO UPDATE SET n = CASE WHEN until < ? THEN 1 ELSE n + 1 END, until = ?`,
    args: [ip, now + LOCK_MS, now, now + LOCK_MS],
  });
}
