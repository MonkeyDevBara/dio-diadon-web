// Pembaca konten untuk halaman publik (hanya baris yang berstatus tampil).
// Satu round-trip ke database memuat semuanya; hasilnya di-cache singkat per instance dan
// otomatis dibuang saat admin menyimpan perubahan (lihat dataVersion di db.ts).
import { videoGradients } from '../data/static';
import { dataVersion, loadPublic, type PublicSnapshot } from './db';
import { uploadUrl } from './uploads';

type Snapshot = PublicSnapshot;

const TTL_MS = 15_000;
let cache: { at: number; version: number; data: Promise<Snapshot> } | null = null;

function snapshot(): Promise<Snapshot> {
  const version = dataVersion();
  if (!cache || cache.version !== version || Date.now() - cache.at > TTL_MS) {
    const data = loadPublic();
    cache = { at: Date.now(), version, data };
    data.catch(() => (cache = null));
  }
  return cache.data;
}

const lines = (s: string) => s.split('\n').map((l) => l.trim()).filter(Boolean);
const rotation = [-3, 2, -1.5, 3, -2];

export async function getSite() {
  const { settings: s } = await snapshot();
  return {
    name: 'Dio Diadon',
    handle: '@diodiadon',
    role: s.role,
    tagline: s.tagline,
    whatsapp: s.whatsapp,
    bookingStatus: { open: s.booking_open === '1', label: s.booking_label },
    proposalPdf: s.proposal_pdf ? uploadUrl(s.proposal_pdf) : null,
    aboutText: s.about_text,
    aboutPhoto: s.about_photo ? uploadUrl(s.about_photo) : null,
    socials: {
      instagram: s.instagram,
      stdforyou: s.stdforyou,
      realmasjid: s.realmasjid,
      threads: s.threads,
      telegram: s.telegram,
    },
  };
}

export async function getRider() {
  const { settings: s } = await snapshot();
  return {
    team: s.rider_team,
    bring: lines(s.rider_bring),
    need: lines(s.rider_need),
    stage: s.rider_stage,
    place: s.rider_place,
    seating: s.rider_seating,
  };
}

export async function getIssues() {
  const { tables } = await snapshot();
  return tables.isu.map((r, i) => ({ title: String(r.title), note: String(r.note), tint: String(r.tint), rot: rotation[i % rotation.length] }));
}

export async function getPrograms() {
  const { tables } = await snapshot();
  return tables.program.map((r, i) => ({
    no: String(i + 1).padStart(2, '0'),
    slug: String(r.slug),
    title: String(r.title),
    summary: String(r.summary),
    audience: String(r.audience).split(',').map((a) => a.trim()).filter(Boolean),
    theme: String(r.theme) as 'ink' | 'sun' | 'grape',
    emoji: String(r.emoji),
  }));
}

export async function getStats() {
  const { tables } = await snapshot();
  return tables.dampak.map((r) => ({
    value: Number(r.value),
    suffix: String(r.suffix),
    label: String(r.label),
    note: String(r.note),
    asOf: String(r.as_of),
  }));
}

export async function getPlaces() {
  const { tables } = await snapshot();
  return tables.jejak.map((r) => ({ name: String(r.name), cat: String(r.cat), city: String(r.city) }));
}

export async function getVideos() {
  const { tables } = await snapshot();
  return tables.video.map((r) => ({
    title: String(r.title),
    views: String(r.views),
    url: String(r.url),
    thumbnail: r.thumbnail ? uploadUrl(String(r.thumbnail)) : null,
    grad: (videoGradients[String(r.grad)] ?? videoGradients.violet).cls,
    quote: r.quote_text ? { text: String(r.quote_text), author: String(r.quote_author) } : null,
  }));
}

export async function getTestimonials() {
  const { tables } = await snapshot();
  return tables.testimoni.map((r, i) => ({
    text: String(r.text),
    who: String(r.who),
    org: String(r.org),
    tint: String(r.tint),
    rot: [-2, 1.5, -1][i % 3],
  }));
}
