import { placeFilters, programThemes, videoGradients } from '../data/static';

export type FieldType = 'text' | 'textarea' | 'number' | 'url' | 'select' | 'color' | 'tags' | 'checkbox' | 'image' | 'file';

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  help?: string;
  placeholder?: string;
  max?: number;
  pattern?: RegExp;
  patternMessage?: string;
  unique?: boolean;
}

export interface Resource {
  key: string; // segmen URL: /admin/<key>
  table: string;
  title: string;
  singular: string;
  description: string;
  fields: Field[];
  columns: string[]; // nama field yang tampil di tabel
}

const opt = (values: readonly string[], labels?: Record<string, string>) =>
  values.map((v) => ({ value: v, label: labels?.[v] ?? v }));

export const resources: Resource[] = [
  {
    key: 'program',
    table: 'programs',
    title: 'Program Starday',
    singular: 'program',
    description: 'Kartu di section "Solusi kami". Slug dipakai sebagai pilihan jenis acara di form undangan.',
    columns: ['emoji', 'title', 'slug', 'audience'],
    fields: [
      { name: 'title', label: 'Nama program', type: 'text', required: true, placeholder: 'Go to School' },
      {
        name: 'slug', label: 'Slug', type: 'text', required: true, unique: true,
        pattern: /^[a-z0-9-]{2,30}$/, patternMessage: 'Huruf kecil, angka, atau tanda hubung (2–30 karakter).',
        help: 'Dipakai internal, mis. "school". Tidak terlihat pengunjung.',
      },
      { name: 'emoji', label: 'Emoji', type: 'text', max: 8, placeholder: '🎒' },
      { name: 'summary', label: 'Deskripsi', type: 'textarea', required: true, max: 400 },
      { name: 'audience', label: 'Cocok untuk', type: 'tags', help: 'Pisahkan dengan koma, mis. SMP, SMA/SMK, Rohis.' },
      { name: 'theme', label: 'Warna kartu', type: 'select', required: true, options: opt(programThemes, { ink: 'Hitam', sun: 'Kuning', grape: 'Ungu' }) },
    ],
  },
  {
    key: 'dampak',
    table: 'stats',
    title: 'Angka Dampak',
    singular: 'angka',
    description: 'Angka besar di section "Hasilnya". Wajib isi periode supaya tidak basi tanpa disadari.',
    columns: ['label', 'value', 'suffix', 'as_of'],
    fields: [
      { name: 'value', label: 'Angka', type: 'number', required: true, help: 'Pakai titik untuk desimal, mis. 17.7' },
      { name: 'suffix', label: 'Satuan di belakang angka', type: 'text', max: 12, placeholder: '% atau " rb"' },
      { name: 'label', label: 'Label', type: 'text', required: true, placeholder: 'titik dakwah' },
      { name: 'note', label: 'Catatan kecil', type: 'text', placeholder: 'se-Jawa Tengah' },
      { name: 'as_of', label: 'Per kapan', type: 'text', required: true, max: 30, placeholder: 'Des 2025' },
    ],
  },
  {
    key: 'jejak',
    table: 'places',
    title: 'Jejak (tempat)',
    singular: 'tempat',
    description: 'Sticker nama sekolah, kampus, masjid, dan lainnya yang pernah dikunjungi.',
    columns: ['name', 'cat', 'city'],
    fields: [
      { name: 'name', label: 'Nama tempat', type: 'text', required: true },
      { name: 'cat', label: 'Kategori', type: 'select', required: true, options: placeFilters.filter((f) => f.key !== 'all').map((f) => ({ value: f.key, label: f.label })) },
      { name: 'city', label: 'Kota', type: 'text', required: true },
    ],
  },
  {
    key: 'video',
    table: 'videos',
    title: 'Video unggulan',
    singular: 'video',
    description: 'Kartu video. Klik membuka link-nya di tab baru; tidak ada embed supaya halaman tetap ringan.',
    columns: ['title', 'views', 'url'],
    fields: [
      { name: 'title', label: 'Judul', type: 'text', required: true },
      { name: 'views', label: 'Jumlah views', type: 'text', required: true, max: 20, placeholder: '533 rb' },
      { name: 'url', label: 'Link video', type: 'url', required: true, placeholder: 'https://instagram.com/reel/…' },
      { name: 'thumbnail', label: 'Thumbnail', type: 'image', help: 'Rasio 9:16 paling pas. Dikecilkan otomatis. Kosongkan untuk pakai gradasi.' },
      { name: 'grad', label: 'Gradasi (jika tanpa thumbnail)', type: 'select', required: true, options: Object.entries(videoGradients).map(([value, g]) => ({ value, label: g.label })) },
      { name: 'quote_text', label: 'Kutipan komentar', type: 'text', max: 160 },
      { name: 'quote_author', label: 'Username pengomentar', type: 'text', max: 40, help: 'Tanpa @.' },
    ],
  },
  {
    key: 'testimoni',
    table: 'testimonials',
    title: 'Testimoni',
    singular: 'testimoni',
    description: 'Kutipan dari panitia atau jamaah. Pastikan sudah ada izin dari yang bersangkutan.',
    columns: ['who', 'org', 'text'],
    fields: [
      { name: 'text', label: 'Isi testimoni', type: 'textarea', required: true, max: 300 },
      { name: 'who', label: 'Nama', type: 'text', required: true },
      { name: 'org', label: 'Jabatan / instansi', type: 'text' },
      { name: 'tint', label: 'Warna sticky note', type: 'color', required: true },
    ],
  },
  {
    key: 'isu',
    table: 'issues',
    title: 'Isu Gen Z',
    singular: 'isu',
    description: 'Polaroid di section "Latar belakang".',
    columns: ['title', 'note'],
    fields: [
      { name: 'title', label: 'Judul isu', type: 'text', required: true, max: 40, placeholder: 'Cinta' },
      { name: 'note', label: 'Tulisan tangan di polaroid', type: 'text', required: true, max: 120 },
      { name: 'tint', label: 'Warna', type: 'color', required: true },
    ],
  },
];

export const resourceByKey = (key: string | undefined) => resources.find((r) => r.key === key);

export interface SettingsGroup {
  title: string;
  description?: string;
  fields: Field[];
}

export const settingsGroups: SettingsGroup[] = [
  {
    title: 'Umum',
    fields: [
      { name: 'role', label: 'Peran (di bawah nama)', type: 'text', required: true, max: 60 },
      { name: 'tagline', label: 'Tagline (footer & SEO)', type: 'text', required: true, max: 140 },
      { name: 'about_text', label: 'Teks "apa kabar?"', type: 'textarea', required: true, max: 700 },
      { name: 'about_photo', label: 'Foto manggung (polaroid kedua)', type: 'image', help: 'Kosongkan untuk placeholder.' },
    ],
  },
  {
    title: 'Booking & WhatsApp',
    fields: [
      {
        name: 'whatsapp', label: 'Nomor WhatsApp penerima undangan', type: 'text', required: true,
        pattern: /^\d{8,15}$/, patternMessage: 'Angka saja, tanpa + atau spasi, mis. 6281234567890.',
        help: 'Format internasional tanpa +. Form undangan membuka chat ke nomor ini.',
      },
      { name: 'booking_open', label: 'Terima undangan', type: 'checkbox', help: 'Mati = titik status di hero jadi abu-abu.' },
      { name: 'booking_label', label: 'Teks status', type: 'text', max: 60, placeholder: 'terima undangan 2027' },
      { name: 'proposal_pdf', label: 'Proposal (PDF)', type: 'file', help: 'Maks 10 MB. Tombol unduh hanya muncul kalau file ada.' },
    ],
  },
  {
    title: 'Sosial media',
    fields: [
      { name: 'instagram', label: 'Instagram Dio', type: 'url', required: true },
      { name: 'stdforyou', label: 'Instagram Starday', type: 'url', required: true },
      { name: 'realmasjid', label: 'Instagram Real Masjid', type: 'url', required: true },
      { name: 'threads', label: 'Threads', type: 'url', required: true },
      { name: 'telegram', label: 'Telegram Rest Area', type: 'url', required: true },
    ],
  },
  {
    title: 'Rider teknis',
    description: 'Tampil di kartu kuning "Rider singkat" dan halaman /rider.',
    fields: [
      { name: 'rider_team', label: 'Tim & transportasi', type: 'textarea', required: true, max: 300 },
      { name: 'rider_bring', label: 'Dibawa tim (satu per baris)', type: 'textarea', max: 500 },
      { name: 'rider_need', label: 'Disiapkan panitia (satu per baris)', type: 'textarea', max: 500 },
      { name: 'rider_stage', label: 'Panggung', type: 'textarea', max: 300 },
      { name: 'rider_place', label: 'Tempat & jarak', type: 'textarea', max: 300 },
      { name: 'rider_seating', label: 'Pemisahan jamaah', type: 'textarea', max: 300 },
    ],
  },
];

export const settingsFields = settingsGroups.flatMap((g) => g.fields);
