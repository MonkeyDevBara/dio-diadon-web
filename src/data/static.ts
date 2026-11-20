// Bagian yang bukan konten: struktur navigasi dan pilihan yang dipakai kode.

export const nav = [
  { href: '#beranda', label: 'Beranda', icon: '🏠' },
  { href: '#tentang', label: 'Tentang', icon: '👋' },
  { href: '#starday', label: 'Starday', icon: '🎸' },
  { href: '#dampak', label: 'Dampak', icon: '📈' },
  { href: '#video', label: 'Video', icon: '🎬' },
];

export const placeFilters = [
  { key: 'all', label: 'Semua' },
  { key: 'sekolah', label: 'Sekolah' },
  { key: 'kampus', label: 'Kampus' },
  { key: 'masjid', label: 'Masjid' },
  { key: 'komunitas', label: 'Komunitas' },
  { key: 'media', label: 'Media' },
];

export const placeCategories = placeFilters.filter((f) => f.key !== 'all').map((f) => f.key);

// Kelas Tailwind ditulis utuh supaya terdeteksi saat build.
export const videoGradients: Record<string, { label: string; cls: string }> = {
  violet: { label: 'Ungu', cls: 'from-navy to-grape' },
  sunrise: { label: 'Oranye', cls: 'from-dio to-sun' },
  pink: { label: 'Pink', cls: 'from-grape to-bubblegum' },
  mint: { label: 'Hijau', cls: 'from-mint to-navy' },
};

export const programThemes = ['ink', 'sun', 'grape'] as const;
