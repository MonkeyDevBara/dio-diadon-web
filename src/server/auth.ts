// Login admin: satu password dari env ADMIN_PASSWORD, sesi lewat cookie bertanda tangan (HMAC).
import { createHmac, randomBytes, timingSafeEqual, createHash } from 'node:crypto';
import { getMeta, setMeta } from './db';

export const COOKIE = 'dd_admin';
export const SESSION_SECONDS = 60 * 60 * 24 * 7;

const password = () => process.env.ADMIN_PASSWORD ?? import.meta.env.ADMIN_PASSWORD ?? '';

export const adminEnabled = () => password().length >= 8;

function secret(): string {
  let s = getMeta('session_secret');
  if (!s) {
    s = randomBytes(32).toString('hex');
    setMeta('session_secret', s);
  }
  // Mengganti ADMIN_PASSWORD otomatis mengakhiri semua sesi lama.
  return `${s}:${password()}`;
}

const sign = (payload: string) => createHmac('sha256', secret()).update(payload).digest('base64url');

const digest = (v: string) => createHash('sha256').update(v).digest();

export function checkPassword(input: string): boolean {
  return adminEnabled() && timingSafeEqual(digest(input), digest(password()));
}

export function createSession(): string {
  const exp = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  return `${exp}.${sign(exp)}`;
}

export function verifySession(token: string | undefined): boolean {
  if (!token || !adminEnabled()) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  const expected = sign(exp);
  return sig.length === expected.length && timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

// Pembatas percobaan login (di memori): 5 gagal per IP, kunci 10 menit.
const attempts = new Map<string, { n: number; until: number }>();
const MAX_FAILS = 5;
const LOCK_MS = 10 * 60 * 1000;

export function loginBlockedFor(ip: string): number {
  const a = attempts.get(ip);
  return a && a.n >= MAX_FAILS && a.until > Date.now() ? Math.ceil((a.until - Date.now()) / 60000) : 0;
}
export function recordLogin(ip: string, ok: boolean) {
  if (ok) return void attempts.delete(ip);
  const a = attempts.get(ip);
  const fresh = !a || a.until < Date.now();
  attempts.set(ip, { n: fresh ? 1 : a.n + 1, until: Date.now() + LOCK_MS });
}
