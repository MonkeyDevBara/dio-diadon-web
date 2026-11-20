// Pembaca konten untuk halaman publik (hanya baris yang berstatus tampil).
import { videoGradients } from '../data/static';
import { getSettings, listRows } from './db';
import { resourceByKey } from './resources';
import { uploadUrl } from './uploads';

const rows = (key: string) => listRows(resourceByKey(key)!, { onlyPublished: true });
const lines = (s: string) => s.split('\n').map((l) => l.trim()).filter(Boolean);
const rotation = [-3, 2, -1.5, 3, -2];

export function getSite() {
  const s = getSettings();
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

export function getRider() {
  const s = getSettings();
  return {
    team: s.rider_team,
    bring: lines(s.rider_bring),
    need: lines(s.rider_need),
    stage: s.rider_stage,
    place: s.rider_place,
    seating: s.rider_seating,
  };
}

export const getIssues = () =>
  rows('isu').map((r, i) => ({ title: String(r.title), note: String(r.note), tint: String(r.tint), rot: rotation[i % rotation.length] }));

export const getPrograms = () =>
  rows('program').map((r, i) => ({
    no: String(i + 1).padStart(2, '0'),
    slug: String(r.slug),
    title: String(r.title),
    summary: String(r.summary),
    audience: String(r.audience).split(',').map((a) => a.trim()).filter(Boolean),
    theme: String(r.theme) as 'ink' | 'sun' | 'grape',
    emoji: String(r.emoji),
  }));

export const getStats = () =>
  rows('dampak').map((r) => ({
    value: Number(r.value),
    suffix: String(r.suffix),
    label: String(r.label),
    note: String(r.note),
    asOf: String(r.as_of),
  }));

export const getPlaces = () => rows('jejak').map((r) => ({ name: String(r.name), cat: String(r.cat), city: String(r.city) }));

export const getVideos = () =>
  rows('video').map((r) => ({
    title: String(r.title),
    views: String(r.views),
    url: String(r.url),
    thumbnail: r.thumbnail ? uploadUrl(String(r.thumbnail)) : null,
    grad: (videoGradients[String(r.grad)] ?? videoGradients.violet).cls,
    quote: r.quote_text ? { text: String(r.quote_text), author: String(r.quote_author) } : null,
  }));

export const getTestimonials = () =>
  rows('testimoni').map((r, i) => ({
    text: String(r.text),
    who: String(r.who),
    org: String(r.org),
    tint: String(r.tint),
    rot: [-2, 1.5, -1][i % 3],
  }));
