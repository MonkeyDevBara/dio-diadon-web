// DUMMY: data awal yang dimasukkan ke database SQLite saat pertama kali dijalankan.
// Setelah itu semua konten diubah lewat /admin; file ini tidak dibaca lagi.
// Lihat docs/PRD.md §13 (aset) dan §16 (pertanyaan terbuka).

export const seedSettings: Record<string, string> = {
  tagline: 'Ngaji bareng, pakai gitar biar dakwah nggak bikin ngantuk.',
  role: 'Musisi & Pendakwah Gen Z',
  whatsapp: '6281234567890', // DUMMY: PRD Pertanyaan #4
  booking_open: '1',
  booking_label: 'terima undangan 2027',
  proposal_pdf: '',
  about_text:
    'Aku Dio, anak muda yang percaya kalau ngaji itu bisa asik. Sehari-hari jadi marbot masjid, malamnya megang gitar. Aku peduli sama hal-hal yang sering dibahas pelan-pelan di kamar: cinta, keluarga, duit, circle, dan capeknya kepala. Starday lahir dari situ, ngobrol jujur, nyanyi bareng, lalu pulang dengan hati yang lebih ringan. 🎶',
  about_photo: '',
  instagram: 'https://instagram.com/diodiadon',
  stdforyou: 'https://instagram.com/stdforyou',
  realmasjid: 'https://instagram.com/realmasjid.official',
  threads: 'https://threads.net/@diodiadon',
  telegram: 'https://t.me/restarearealmasjid',
  rider_team: 'Tim 4 orang datang dengan kendaraan pribadi. Luar kota bisa didiskusikan.',
  rider_bring: 'Gitar akustik\nMic pemateri\nStand iPad\nStand mic',
  rider_need: 'Kabel jack gitar ke Toa\nKabel XLR panjang untuk mic\nSoundsystem yang jelas dan enak didengar',
  rider_stage: 'Meja kecil dan kursi tanpa sandaran tangan.',
  rider_place: 'Tempat teduh, di luar ruang utama masjid. Jarak pemateri ke audiens maksimal 2 meter.',
  rider_seating: 'Pemisahan jamaah model kanan–kiri atau depan–belakang.',
};

export const seedIssues = [
  { title: 'Cinta', note: 'Move on tapi masih lihat story-nya.', tint: '#F9C7D8' },
  { title: 'Keluarga', note: 'Pengen didengerin, bukan diceramahin.', tint: '#CFE8FF' },
  { title: 'Keuangan', note: 'Gaji habis tanggal 15, cicilan masih 11 bulan.', tint: '#D7F2C9' },
  { title: 'Pertemanan', note: 'Circle makin kecil, makin jujur.', tint: '#FFE8A3' },
  { title: 'Kesehatan Mental', note: 'Capek, tapi bilangnya "gapapa".', tint: '#E3D9FF' },
];

export const seedPrograms = [
  {
    slug: 'school',
    title: 'Go to School',
    summary: 'Kajian reflektif plus live akustik buat siswa SMP/SMA/SMK. Durasi 60–90 menit, tanpa bikin ngantuk.',
    audience: 'SMP, SMA/SMK, Rohis',
    theme: 'ink',
    emoji: '🎒',
  },
  {
    slug: 'kampus',
    title: 'Go to Kampus',
    summary: 'Ngobrol santai soal arah hidup, relasi, dan duit untuk mahasiswa. Cocok buat acara UKM, BEM, dan LDK.',
    audience: 'Mahasiswa, UKM, LDK',
    theme: 'sun',
    emoji: '🎓',
  },
  {
    slug: 'komunitas',
    title: 'Go to Komunitas',
    summary: 'Hadir di komunitas, kafe, dan ruang publik. Format fleksibel, dari 30 sampai 300 orang.',
    audience: 'Komunitas, Kafe, Lapas',
    theme: 'grape',
    emoji: '🤝',
  },
  {
    slug: 'masjid',
    title: 'Go to Masjid',
    summary: 'Kajian malam dan pengajian rutin dengan iringan akustik di serambi atau halaman masjid.',
    audience: 'Takmir, Remaja Masjid, Umum',
    theme: 'ink',
    emoji: '🕌',
  },
];

export const seedStats = [
  { value: 178, suffix: '', label: 'titik dakwah', note: 'se-Jawa Tengah & sekitarnya', as_of: 'Des 2025' },
  { value: 148, suffix: '%', label: 'dari target tahunan', note: 'target 120 titik', as_of: 'Des 2025' },
  { value: 533, suffix: ' rb', label: 'views video teratas', note: 'di Instagram Reels', as_of: 'Nov 2025' },
  { value: 17.7, suffix: ' rb', label: 'pengikut Instagram', note: '@diodiadon', as_of: 'Nov 2025' },
];

export const seedPlaces = [
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
];

export const seedVideos = [
  { title: 'Tapi, memenangkan akhirat…', views: '533 rb', url: 'https://instagram.com/diodiadon', quote_text: 'Masyaallah, kena banget.', quote_author: 'tertiwan_31', grad: 'violet' },
  { title: 'Putus masal SMP Muh 1', views: '102 rb', url: 'https://instagram.com/diodiadon', quote_text: 'Mantap putus massal, wajib daerah lain juga.', quote_author: 'giyyans_', grad: 'sunrise' },
  { title: 'Kita jadi enjoy', views: '18,1 rb', url: 'https://instagram.com/diodiadon', quote_text: 'Ustadz jarwo paling keren emang.', quote_author: 'fhsran_', grad: 'pink' },
  { title: 'Nge-mall bareng', views: '37,5 rb', url: 'https://instagram.com/diodiadon', quote_text: 'Kapan nih main ke kotaku?', quote_author: 'iqbalpermana29', grad: 'mint' },
];

export const seedTestimonials = [
  { text: 'Siswa kami yang biasanya tidur di kajian, kali ini malah minta tambah sesi tanya jawab.', who: 'Bu Sari', org: 'Guru PAI, SMA Dummy', tint: '#FFE8A3' },
  { text: 'Tim-nya rapi, rider jelas, tinggal siapin kabel. Panitia nggak ribet sama sekali.', who: 'Kak Fadli', org: 'Ketua BEM Contoh', tint: '#CFE8FF' },
  { text: 'Jamaah remaja jadi rame datang ke masjid. Alhamdulillah.', who: 'Pak Haji Ahmad', org: 'Takmir Masjid Dummy', tint: '#F9C7D8' },
];
