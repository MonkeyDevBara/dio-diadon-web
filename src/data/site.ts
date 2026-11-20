// DUMMY: semua nilai di folder src/data adalah placeholder sampai data asli dari Dio/tim Starday tersedia.
// Lihat docs/PRD.md §13 (aset) dan §16 (pertanyaan terbuka).

export const site = {
  name: 'Dio Diadon',
  handle: '@diodiadon',
  tagline: 'Ngaji bareng, pakai gitar biar dakwah nggak bikin ngantuk.',
  role: 'Musisi & Pendakwah Gen Z',
  whatsapp: '6281234567890', // DUMMY: PRD Pertanyaan #4
  bookingStatus: { open: true, label: 'terima undangan 2027' },
  proposalPdf: '/proposal-starday.pdf', // DUMMY: file belum ada
  socials: {
    instagram: 'https://instagram.com/diodiadon',
    stdforyou: 'https://instagram.com/stdforyou',
    realmasjid: 'https://instagram.com/realmasjid.official',
    threads: 'https://threads.net/@diodiadon',
    telegram: 'https://t.me/restarearealmasjid',
  },
};

export const nav = [
  { href: '#beranda', label: 'Beranda', icon: '🏠' },
  { href: '#tentang', label: 'Tentang', icon: '👋' },
  { href: '#starday', label: 'Starday', icon: '🎸' },
  { href: '#dampak', label: 'Dampak', icon: '📈' },
  { href: '#video', label: 'Video', icon: '🎬' },
];

export const issues = [
  { title: 'Cinta', note: 'Move on tapi masih lihat story-nya.', rot: -3, tint: '#F9C7D8' },
  { title: 'Keluarga', note: 'Pengen didengerin, bukan diceramahin.', rot: 2, tint: '#CFE8FF' },
  { title: 'Keuangan', note: 'Gaji habis tanggal 15, cicilan masih 11 bulan.', rot: -1.5, tint: '#D7F2C9' },
  { title: 'Pertemanan', note: 'Circle makin kecil, makin jujur.', rot: 3, tint: '#FFE8A3' },
  { title: 'Kesehatan Mental', note: 'Capek, tapi bilangnya "gapapa".', rot: -2, tint: '#E3D9FF' },
];

export const programs = [
  {
    no: '01',
    slug: 'school',
    title: 'Go to School',
    summary: 'Kajian reflektif plus live akustik buat siswa SMP/SMA/SMK. Durasi 60–90 menit, tanpa bikin ngantuk.',
    audience: ['SMP', 'SMA/SMK', 'Rohis'],
    theme: 'ink',
    emoji: '🎒',
  },
  {
    no: '02',
    slug: 'kampus',
    title: 'Go to Kampus',
    summary: 'Ngobrol santai soal arah hidup, relasi, dan duit untuk mahasiswa. Cocok buat acara UKM, BEM, dan LDK.',
    audience: ['Mahasiswa', 'UKM', 'LDK'],
    theme: 'sun',
    emoji: '🎓',
  },
  {
    no: '03',
    slug: 'komunitas',
    title: 'Go to Komunitas',
    summary: 'Hadir di komunitas, kafe, dan ruang publik. Format fleksibel, dari 30 sampai 300 orang.',
    audience: ['Komunitas', 'Kafe', 'Lapas'],
    theme: 'grape',
    emoji: '🤝',
  },
  {
    no: '04',
    slug: 'masjid',
    title: 'Go to Masjid',
    summary: 'Kajian malam dan pengajian rutin dengan iringan akustik di serambi atau halaman masjid.',
    audience: ['Takmir', 'Remaja Masjid', 'Umum'],
    theme: 'ink',
    emoji: '🕌',
  },
] as const;

export const stats = [
  { value: 178, suffix: '', label: 'titik dakwah', note: 'se-Jawa Tengah & sekitarnya', asOf: 'Des 2025' },
  { value: 148, suffix: '%', label: 'dari target tahunan', note: 'target 120 titik', asOf: 'Des 2025' },
  { value: 533, suffix: ' rb', label: 'views video teratas', note: 'di Instagram Reels', asOf: 'Nov 2025' },
  { value: 17.7, suffix: ' rb', label: 'pengikut Instagram', note: '@diodiadon', asOf: 'Nov 2025' },
];

export const places = [
  { name: 'SMA Dummy 1 Purwokerto', cat: 'sekolah', city: 'Banyumas' },
  { name: 'SMK Contoh Cilacap', cat: 'sekolah', city: 'Cilacap' },
  { name: 'SMP Placeholder 2', cat: 'sekolah', city: 'Purbalingga' },
  { name: 'Universitas Contoh A', cat: 'kampus', city: 'Yogyakarta' },
  { name: 'Institut Contoh B', cat: 'kampus', city: 'Purwokerto' },
  { name: 'UKM Rohis Kampus C', cat: 'kampus', city: 'Pekalongan' },
  { name: 'Masjid Dummy Al-Ikhlas', cat: 'masjid', city: 'Cilacap' },
  { name: 'Masjid Contoh An-Nur', cat: 'masjid', city: 'Banjarnegara' },
  { name: 'Pesantren Contoh', cat: 'komunitas', city: 'Magelang' },
  { name: 'Komunitas Dummy Ngopi', cat: 'komunitas', city: 'Yogyakarta' },
  { name: 'Lapas Contoh', cat: 'komunitas', city: 'Purwokerto' },
  { name: 'Radio Contoh FM', cat: 'media', city: 'Purwokerto' },
] as const;

export const placeFilters = [
  { key: 'all', label: 'Semua' },
  { key: 'sekolah', label: 'Sekolah' },
  { key: 'kampus', label: 'Kampus' },
  { key: 'masjid', label: 'Masjid' },
  { key: 'komunitas', label: 'Komunitas' },
  { key: 'media', label: 'Media' },
];

export const videos = [
  {
    title: 'Tapi, memenangkan akhirat…',
    views: '533 rb',
    url: 'https://instagram.com/diodiadon',
    quote: { text: 'Masyaallah, kena banget.', author: 'tertiwan_31' },
    grad: 'from-navy to-grape',
  },
  {
    title: 'Putus masal SMP Muh 1',
    views: '102 rb',
    url: 'https://instagram.com/diodiadon',
    quote: { text: 'Mantap putus massal, wajib daerah lain juga.', author: 'giyyans_' },
    grad: 'from-dio to-sun',
  },
  {
    title: 'Kita jadi enjoy',
    views: '18,1 rb',
    url: 'https://instagram.com/diodiadon',
    quote: { text: 'Ustadz jarwo paling keren emang.', author: 'fhsran_' },
    grad: 'from-grape to-bubblegum',
  },
  {
    title: 'Nge-mall bareng',
    views: '37,5 rb',
    url: 'https://instagram.com/diodiadon',
    quote: { text: 'Kapan nih main ke kotaku?', author: 'iqbalpermana29' },
    grad: 'from-mint to-navy',
  },
];

export const testimonials = [
  { text: 'Siswa kami yang biasanya tidur di kajian, kali ini malah minta tambah sesi tanya jawab.', who: 'Bu Sari', org: 'Guru PAI, SMA Dummy', tint: '#FFE8A3', rot: -2 },
  { text: 'Tim-nya rapi, rider jelas, tinggal siapin kabel. Panitia nggak ribet sama sekali.', who: 'Kak Fadli', org: 'Ketua BEM Contoh', tint: '#CFE8FF', rot: 1.5 },
  { text: 'Jamaah remaja jadi rame datang ke masjid. Alhamdulillah.', who: 'Pak Haji Ahmad', org: 'Takmir Masjid Dummy', tint: '#F9C7D8', rot: -1 },
];

export const rider = {
  team: 'Tim 4 orang datang dengan kendaraan pribadi. Luar kota bisa didiskusikan.',
  bring: ['Gitar akustik', 'Mic pemateri', 'Stand iPad', 'Stand mic'],
  need: ['Kabel jack gitar ke Toa', 'Kabel XLR panjang untuk mic', 'Soundsystem yang jelas dan enak didengar'],
  stage: 'Meja kecil dan kursi tanpa sandaran tangan.',
  place: 'Tempat teduh, di luar ruang utama masjid. Jarak pemateri ke audiens maksimal 2 meter.',
  seating: 'Pemisahan jamaah model kanan–kiri atau depan–belakang.',
};
