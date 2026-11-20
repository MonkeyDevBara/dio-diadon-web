# PRD — Website Profil Dio Diadon

| | |
|---|---|
| Versi | 0.1 (draft) |
| Tanggal | 20 November 2026 |
| Status | Menunggu review Dio & tim Starday |
| Repo | `dio-diadon-web` |
| Referensi visual | `docs/assets/referensi-desain.png` (portfolio "ROBIN", gaya scrapbook/buku tulis) |
| Foto profil | `docs/assets/dio-diadon-profile.png` (1067×1600, latar putih, sweater oranye) |
| Sumber konten | Proposal Canva "Proposal Starday" (21 slide), `linktr.ee/diodiadon`, `linktr.ee/starday.rm` |

---

## 1. Ringkasan

Website profil personal untuk **Dio A. Diadon** (`@diodiadon`), musisi dan pendakwah Gen Z: marbot masjid di **Real Masjid** (`@realmasjid.official`) dan gitaris di **Starday** (`@starday.rm` / `@stdforyou`), program **dakwah reflektif** yang membawa pengajian plus live musik akustik ke sekolah, kampus, komunitas, dan masjid.

Website ini menggantikan peran Linktree sebagai "rumah" Dio: satu halaman yang menjelaskan siapa Dio, kenapa dakwahnya beda, bukti dampaknya, dan cara mengundang Dio/Starday ke acara.

Gaya visual mengadaptasi referensi: kertas bergaris, sticky note, washi tape, polaroid, coretan tangan, judul pixel. Elemen yang menjadi ciri Dio ikut dimasukkan: warna oranye, gelembung chat ("Salam kenal"), dan kolase huruf Starday.

## 2. Latar Belakang (dari proposal Starday)

**Masalah.** Bagi Gen Z, pengajian sering terasa *tidak related, bosen, monoton, ngantuk*, padahal mereka sedang bergulat dengan isu nyata:

- **Cinta**
- **Keluarga**
- **Keuangan**
- **Pertemanan**
- **Kesehatan mental**

**Solusi.** Starday Go to School / Kampus / Komunitas / Masjid: pengajian dengan pendekatan reflektif plus musik akustik live. Programnya fokus ke Gen Z, tapi terbuka untuk semua kalangan.

**Bukti (angka per proposal, wajib di-update sebelum launch):**

| Metrik | Nilai |
|---|---|
| Target titik dakwah 2024 | 120 (10/bulan × 12) |
| Realisasi 2024 | 178 titik (148,33% dari target), jadwal sudah terisi sampai tahun berikutnya |
| Rencana 2025 | 80 titik area se-Jawa Tengah |
| Video teratas ("Tapi Memenangkan Akhirat…") | 533 rb views |
| "Putus Masal SMP Muh 1 Purwokerto" | 102 rb views |
| Video lain | 37,5 rb dan 18,1 rb views |
| Instagram @diodiadon | 534 kiriman, 17,7 rb pengikut |
| Instagram @stdforyou | 269 kiriman, 2.114 pengikut |
| Tur | 18–24 Agustus, Surabaya (tahunnya belum jelas) |

**Contoh lokasi yang pernah dikunjungi (dari jadwal Nov 2024 – Mar 2025 di proposal):** SMP N 3 Godean, SMKN 1 Godean, SMK & SMA Al Irsyad Cilacap, Masjid Al Ishlah Cilacap, SMK Muhammadiyah 2 Ajibarang, Masjid Al Muhajirin Purbalingga, SMAIT Al Irsyad Purwokerto, IMM Purwokerto, Amikom Purwokerto, Sedulur Ngaji Banjarnegara, Lapas Narkotika, STIQ Al Multazam Kuningan, UKM AMI Universitas Pekalongan, Cafe 1912 UMY, Pesantren Masyarakat Merapi Merbabu (PM3). Daftar ini dibaca dari screenshot kecil, jadi ejaannya harus dicek tim sebelum dipakai.

**Channel lain (Linktree):** talkshow offline RRI Purwokerto, talkshow online Bagas Rais Istiqomah, komunitas **Rest Area** di Telegram (`t.me/restarearealmasjid`), dan "Titip Doa di Tanah Suci" (Slido).

## 3. Tujuan

| # | Tujuan | Ukuran keberhasilan |
|---|---|---|
| G1 | Panitia (sekolah, kampus, masjid, komunitas) bisa memahami program dan langsung mengundang | Klik "Undang Dio" → WhatsApp; target awal ditetapkan setelah 1 bulan data baseline |
| G2 | Gen Z kenal Dio dan lanjut follow / gabung komunitas | Klik ke Instagram dan Telegram Rest Area |
| G3 | Membangun kredibilitas di luar Instagram | Bisa ditemukan di Google untuk "Dio Diadon" dan "Starday Go to School" (halaman 1) |
| G4 | Panitia tidak perlu bolak-balik tanya kebutuhan teknis | Rider teknis dan PDF proposal bisa diunduh langsung dari website |

## 4. Target Pengguna

1. **Panitia acara**: guru/OSIS/rohis, BEM/UKM kampus, takmir masjid, pengurus komunitas, petugas lapas. Mereka butuh: program ini apa, sudah dibawakan di mana saja, apa yang harus disiapkan, dan cara booking. Pengguna inilah yang menghasilkan konversi.
2. **Gen Z (13–25 tahun)**: pernah nonton reels Dio atau ikut acara Starday. Mereka butuh: kenal Dio lebih dekat, nonton ulang video, gabung komunitas.
3. **Media, kolaborator, dan brand**: radio, podcast, kreator lain. Mereka butuh: bio singkat, foto resmi, dan kontak.

## 5. Non-goals

- Bukan platform streaming atau toko (tidak ada checkout, membership, atau donasi online di versi ini).
- Tidak ada Supabase atau CMS pihak ketiga. Konten disimpan di database libSQL/SQLite dan diubah lewat `/admin` (lihat §12.1).
- Tidak menggantikan Instagram sebagai kanal konten harian. Website hanya merangkum dan mengarahkan ke sana.
- Tidak ada sistem kalender booking otomatis. Booking tetap lewat WhatsApp tim Starday.

## 6. Anti-goals (gagal walaupun "jalan")

- Terlihat seperti template company profile pesantren yang kaku. Kalau Gen Z merasa ini bukan "Dio banget", berarti gagal.
- Terlalu ramai sampai panitia tidak menemukan tombol undang dalam satu scroll.
- Gaya playful yang mengurangi adab: tidak boleh ada stiker/emoji di dekat ayat atau hadits, dan foto jamaah perempuan tidak boleh dipakai sebagai dekorasi tanpa izin.
- Angka statistik yang basi atau tidak bisa dipertanggungjawabkan.

## 7. Arah Desain

### 7.1 Adaptasi referensi

| Elemen referensi (ROBIN) | Versi Dio Diadon |
|---|---|
| Kertas bergaris buku tulis | Sama, kertas krem bergaris; bisa ditambah margin merah seperti buku tulis sekolah (nyambung dengan "Go to School") |
| "my name is" + nama pixel dalam kotak coretan | "assalamu'alaikum, namaku" + **DIO DIADON** huruf pixel dalam kotak coretan oranye |
| Sticky note "make things" / "sweat the details" | "tukang gitar 🎸" dan "marbot masjid 🕌" |
| Label "Product Designer" + "open to new work" | "Musisi & Pendakwah Gen Z" + titik hijau "terima undangan 2027" (teksnya bisa diatur dari config) |
| Avatar bulat melayang | Foto bulat Dio dengan gelembung chat "Salam kenal" (dari slide 1 proposal) |
| Headline + ikon inline | "Ngaji bareng, pakai gitar 🎸 biar dakwah nggak bikin ngantuk." |
| Paragraf tulisan tangan "what's up" | "apa kabar?" (bio singkat bergaya tulisan tangan) |
| Polaroid + washi tape | Foto profil (sweater oranye) dan foto manggung bergitar |
| Tag warna sobek (Interaction Design, dll.) | Dakwah Reflektif, Live Akustik, Gen Z, Marbot Masjid, Talkshow |
| Kartu proyek gelap dengan tab "PROJECT 01" | Kartu program dengan tab "PROGRAM 01–04" (School, Kampus, Komunitas, Masjid) |
| Kartu kuning "Forge" | Kartu kuning untuk Rest Area (komunitas Telegram) |

### 7.2 Warna

| Token | Hex (usulan) | Dipakai untuk |
|---|---|---|
| `paper` | `#F6F3EA` | Latar halaman |
| `paper-line` | `#D9E3EE` | Garis buku |
| `ink` | `#151515` | Teks utama, tombol utama |
| `dio-orange` | `#EE6A1F` | Aksen utama, diambil dari sweater di foto profil |
| `starday-yellow` | `#F7D84A` | Gelembung chat, kartu sorotan (dari proposal) |
| `starday-violet` | `#7468F2` | Tab program, link (latar di proposal) |
| `starday-navy` | `#2F2A86` | Teks di atas kuning (dari proposal) |
| `tag-green` | `#5CC98A` | Tag |
| `tag-pink` | `#F2789F` | Tag |

Semua kombinasi teks/latar wajib lolos kontras WCAG AA. Teks putih di atas oranye tidak lolos untuk ukuran kecil; pakai `ink` di atas oranye.

### 7.3 Tipografi (semua dari Google Fonts, di-host sendiri)

| Peran | Font | Catatan |
|---|---|---|
| Nama/display | Pixelify Sans atau Silkscreen | Hanya untuk nama dan angka besar |
| Tulisan tangan | Caveat | Anotasi, paragraf "apa kabar?", label panah |
| Body | Plus Jakarta Sans | Desainnya dari Indonesia, mudah dibaca untuk paragraf |
| Label/mono | JetBrains Mono | Tab "PROGRAM 01", tanggal, nav |
| Arab | Amiri atau Noto Naskh Arabic | Untuk ayat/doa saja, `dir="rtl"`, tanpa dekorasi |

### 7.4 Motif & gerak

- **Gelembung chat** (dari proposal: "Salam kenal", "SOLUSI", "HASILNYA"): judul section diletakkan di dalam gelembung kuning. Ini benang merah antara website dan materi Starday.
- **Panah coretan merah + label tulisan tangan** (dari slide rider teknis). Dipakai di section rider.
- Animasi: elemen sedikit miring lalu lurus saat hover, sticky note muncul berurutan. Semua animasi mati jika pengguna mengaktifkan `prefers-reduced-motion`.
- Elemen Starday seperti logo kolase "Star day Go to School" memakai file asli dari tim, tidak digambar ulang.

### 7.5 Wireframe hero (mobile-first)

```
┌───────────────────────────────────┐
│ [Beranda][Tentang][Starday] [Undang]│  ← nav pill, aktif = kuning
│                                     │
│  (tukang gitar)   (marbot masjid)   │  ← sticky notes
│      assalamu'alaikum, namaku       │  ← Caveat
│   ┌───────────────────────────┐     │
│   │      D I O  D I A D O N    │     │  ← pixel, kotak coretan oranye
│   └───────────────────────────┘     │
│ [Musisi & Pendakwah Gen Z] ● terima undangan │
│  (o)"Salam kenal"                   │  ← avatar + gelembung
│  Ngaji bareng, pakai gitar 🎸        │
│  biar dakwah nggak bikin ngantuk.   │
│        [ ✉ UNDANG DIO ]             │  ← tombol hitam
└───────────────────────────────────┘
```

## 8. Struktur Halaman

Satu halaman panjang dengan anchor, ditambah halaman `/rider` (rider teknis yang bisa dicetak) dan `/404`.

| # | Section (anchor) | Isi | Prioritas |
|---|---|---|---|
| 1 | Nav | Beranda, Tentang, Starday, Dampak, Video, **Undang Dio**; sticky; di mobile jadi pill yang bisa di-scroll horizontal | P0 |
| 2 | Hero (`#beranda`) | Lihat 7.5 | P0 |
| 3 | Tentang (`#tentang`) | Paragraf "apa kabar?", 2 polaroid, tag peran | P0 |
| 4 | Kenapa Starday (`#kenapa`) | 5 polaroid isu Gen Z (Cinta, Keluarga, Keuangan, Pertemanan, Kesehatan Mental), sticky note "bosen / monoton / ngantuk / tidak related" dicoret, lalu gelembung "Solusinya?" | P0 |
| 5 | Program (`#starday`) | Kartu Program 01–04: Go to School, Go to Kampus, Go to Komunitas, Go to Masjid. Tiap kartu: foto, deskripsi 1–2 kalimat, tag sasaran audiens | P0 |
| 6 | Dampak (`#dampak`) | Angka besar: 178 titik, 148% dari target, 533 rb views, dll. Tiap angka diberi label "per [bulan tahun]" | P0 |
| 7 | Jejak (`#jejak`) | Grid sticker nama sekolah/kampus/masjid/lapas yang pernah dikunjungi, bisa difilter per kategori. Peta interaktif masuk P2 | P1 |
| 8 | Video (`#video`) | 4–6 video unggulan. Tampilkan thumbnail + jumlah views + kutipan komentar; klik membuka Instagram. Tidak memakai embed IG langsung (lihat NFR) | P0 |
| 9 | Kata Mereka | Kutipan testimoni (dari komentar IG atau panitia), dengan izin | P1 |
| 10 | Undang Dio (`#undang`) | Form singkat → pesan WhatsApp terisi otomatis; ringkasan rider; tombol unduh proposal PDF | P0 |
| 11 | Komunitas | Kartu kuning Rest Area (Telegram), Instagram @diodiadon, @stdforyou, @realmasjid.official, Threads | P0 |
| 12 | Footer | Sosial, © tahun, "Part of Real Masjid Official" | P0 |
| — | `/rider` | Rider teknis versi lengkap, bisa dicetak (CSS print), tanpa dekorasi berat | P0 |
| — | Musik | Hanya jika ada rilisan orisinal (lihat Pertanyaan Terbuka #2): kartu rilis + embed Spotify/YouTube | P1 (bersyarat) |

## 9. Kebutuhan Fungsional

### Nav & Hero
- **F-01** Nav selalu terlihat. Saat discroll, item aktif mengikuti section yang sedang tampil (IntersectionObserver).
- **F-02** CTA "Undang Dio" ada di nav dan hero, dan keduanya scroll ke `#undang`.
- **F-03** Status "terima undangan [periode]" diambil dari `src/content/site.json` (`bookingStatus: { open: boolean, label: string }`). Jika `open: false`, titik berubah abu-abu dan label menjadi "jadwal penuh — tetap kirim pesan".

### Konten
- **F-04** Angka di section Dampak diambil dari `src/content/stats.json`. Tiap entri wajib punya `value`, `label`, `asOf` (tanggal), dan `source`. Build gagal jika `asOf` kosong.
- **F-05** Program, Jejak, Video, dan Testimoni disimpan sebagai content collection (skema di §10). Menambah item cukup dengan menambah file, tanpa mengubah kode.
- **F-06** Video tampil sebagai kartu statis (thumbnail lokal + views + judul) yang membuka URL Instagram di tab baru.

### Undang Dio (konversi utama)
- **F-07** Field form: Nama, Instansi/Komunitas, Jenis acara (Sekolah / Kampus / Komunitas / Masjid / Lainnya), Kota, Tanggal yang diinginkan, Perkiraan jumlah peserta, Catatan (opsional).
- **F-08** Tombol submit menyusun pesan teks lalu membuka `https://wa.me/<nomor>?text=<encoded>`. Nomor diambil dari `site.json`. Tidak ada backend dan tidak ada data yang disimpan.
- **F-09** Validasi di sisi klien: field wajib, dan tanggal tidak boleh di masa lalu. Pesan error ditulis dalam bahasa Indonesia santai.
- **F-10** Ringkasan rider tampil sebagai checklist bergaya tulisan tangan dengan panah merah:
  - Tim 4 orang datang dengan kendaraan pribadi; untuk luar kota bisa didiskusikan.
  - Tim membawa: gitar akustik, mic pemateri, stand iPad, stand mic.
  - Panitia menyiapkan: kabel jack untuk gitar ke Toa, kabel XLR panjang untuk mic, dan soundsystem yang jelas dan enak didengar (tidak ada permintaan khusus).
  - Panggung: meja kecil dan kursi **tanpa** sandaran tangan.
  - Tempat: teduh, **di luar ruang utama masjid** (karena memakai alat musik), jarak pemateri ke audiens maksimal 2 m.
  - Pemisahan jamaah: model kanan–kiri atau depan–belakang.
- **F-11** Tombol "Unduh Proposal (PDF)" menyajikan `public/proposal-starday.pdf` dengan link "Lihat rider lengkap" ke `/rider`.

### Komunitas
- **F-12** Link keluar (Instagram, Telegram, Threads) dibuka di tab baru dengan `rel="noopener"`.

## 10. Model Konten

```ts
// src/content/config.ts (skema Astro content collections, ditulis dengan zod)
program:     { slug, order, title, audience: ("sekolah"|"kampus"|"komunitas"|"masjid")[], summary, cover, accent: "violet"|"yellow"|"ink" }
jejak:       { name, category: "sekolah"|"kampus"|"masjid"|"komunitas"|"lapas"|"media", city, date?, verified: boolean }
video:       { title, url, thumbnail, views, viewsAsOf, quote?: { text, author } }
testimoni:   { text, author, role, org, permission: true }
stats.json:  [{ key, value, label, asOf, source }]
site.json:   { whatsapp, bookingStatus, socials: { instagram, stdforyou, realmasjid, threads, telegram }, proposalPdf }
```

Hanya entri `jejak` dengan `verified: true` yang ditampilkan.

## 11. Kebutuhan Non-fungsional

| Area | Syarat |
|---|---|
| Performa | Lighthouse mobile ≥ 90 (Performance, A11y, SEO, Best Practices); LCP < 2,5 dtk di 4G; total JS < 50 KB gz di halaman utama |
| Gambar | AVIF/WebP via `astro:assets`, ada `width`/`height`, lazy load di bawah fold. Foto hero di-preload |
| Embed | Tidak ada embed Instagram/YouTube yang dimuat saat halaman dibuka. Pakai thumbnail statis (embed IG berat dan memasang tracker) |
| Aksesibilitas | WCAG 2.1 AA; teks tulisan tangan dan pixel juga tersedia sebagai teks asli (bukan gambar); fokus keyboard terlihat; `prefers-reduced-motion` dihormati; `lang="id"` |
| Responsif | Mobile-first. Breakpoint 360 / 768 / 1280. Elemen dekoratif (sticky note, avatar melayang) disembunyikan atau diperkecil di bawah 400 px |
| SEO | Title/meta per halaman, Open Graph image 1200×630 (foto Dio + nama pixel), JSON-LD `Person` (sameAs ke semua sosial) dan `Organization` untuk Starday, sitemap.xml, robots.txt |
| Privasi | Tanpa cookie banner, karena analitik yang dipakai tidak memakai cookie (Plausible / Vercel Web Analytics / Cloudflare Web Analytics). Foto jamaah dan siswa hanya dipakai dengan izin, wajah anak di bawah umur di-blur jika tidak ada izin |
| Browser | 2 versi terakhir Chrome, Safari iOS, Samsung Internet, Firefox |
| Bahasa | Bahasa Indonesia (santai, sapaan "kamu/aku" sesuai gaya Dio). Bahasa Inggris tidak masuk scope |

## 12. Rekomendasi Teknis (keputusan builder, bisa dioverride)

- **Astro (SSR, adapter Vercel) + Tailwind CSS**: halaman publik membaca konten dari database libSQL (satu query batch, cache 15 detik per instance, dibuang otomatis saat admin menyimpan). JS di browser hanya untuk nav aktif, form WA, dan animasi kecil. Skema konten di §10 diwujudkan sebagai tabel SQLite.
- Font di-host sendiri via `@fontsource/*`.
- Deploy di **Vercel (Hobby, gratis, hanya non-komersial)** dengan database **Turso (gratis: 5 GB, 500 juta baca baris/bulan)**. Lokal memakai file `data/dio.db` tanpa konfigurasi. Langkah deploy: `docs/DEPLOY.md`. Domain usulan: `diodiadon.com` atau `diodiadon.id` (cek ketersediaan).
- Analitik event: `click_undang_nav`, `click_undang_hero`, `submit_undang_wa` (properti: jenis acara, kota), `download_proposal`, `click_social` (properti: platform), `click_video`.

### 12.1 Admin (`/admin`)

- Login satu password dari env `ADMIN_PASSWORD` (min. 8 karakter); sesi cookie bertanda tangan 7 hari; 5 gagal login per IP mengunci 10 menit. Admin nonaktif jika env kosong.
- Kelola: Pengaturan (WhatsApp, status booking, sosial media, rider, teks bio, foto, proposal PDF), Program, Angka dampak, Jejak, Video (dengan upload thumbnail), Testimoni, Isu Gen Z. Tiap item bisa diurutkan, disembunyikan, diedit, dan dihapus.
- Upload gambar dire-encode ke WebP (metadata EXIF dihapus, SVG ditolak); PDF divalidasi header. Maks 4 MB per file (batas body request Vercel 4,5 MB). File disimpan sebagai BLOB di tabel `uploads` pada database yang sama, jadi tidak perlu layanan penyimpanan lain.
- Backup: tombol "Unduh backup (JSON)" mengekspor semua konten dan file unggahan. Turso juga menyediakan backup/point-in-time sendiri.
- Database diisi data dummy dari `src/data/seed.ts` saat pertama kali jalan. Setelah itu seed tidak dibaca lagi.

## 13. Aset yang Dibutuhkan dari Dio / Tim

- [x] Foto profil resmi (sudah ada: `docs/assets/dio-diadon-profile.png`)
- [ ] 3–6 foto manggung/ngisi kajian resolusi tinggi, beserta izin pemakaian foto jamaah
- [ ] Logo Starday (kolase "Star day Go to School / Go to Komunitas") dan logo Real Masjid dalam format SVG/PNG transparan
- [ ] PDF proposal final (tanpa slide internal)
- [ ] Nomor WhatsApp booking resmi (lihat Pertanyaan #4)
- [ ] Daftar video unggulan beserta URL, thumbnail, dan jumlah views terbaru
- [ ] Bio singkat versi Dio sendiri (± 80 kata) dan bio versi media (± 40 kata, sudut pandang orang ketiga)
- [ ] Angka terbaru: total titik 2025–2026, follower terbaru
- [ ] 3–5 testimoni panitia, dengan izin

## 14. Tahapan Rilis

| Fase | Isi | Selesai jika |
|---|---|---|
| 1. Desain | Moodboard → mockup hi-fi mobile & desktop untuk Hero, Tentang, Program, Undang | Disetujui Dio |
| 2. Build P0 | Semua section P0 + `/rider` + SEO + analitik | Lighthouse ≥ 90, form WA teruji di Android & iOS |
| 3. Konten | Isi semua collection dengan data terverifikasi | Tidak ada placeholder; semua `asOf` terisi |
| 4. Launch | Domain, link di bio IG diganti ke website | Website live, Linktree mengarah ke website |
| 5. P1 | Jejak, Testimoni, Musik (jika ada rilisan) | — |

## 15. Risiko

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Sebagian audiens sensitif soal musik dalam dakwah | Kritik di komentar dan berkurangnya undangan dari masjid tertentu | Framing "dakwah reflektif dengan iringan akustik"; rider sudah menyebut kegiatan di luar ruang utama masjid; Dio menentukan sendiri wording final |
| Statistik cepat basi | Kredibilitas turun | `asOf` wajib (F-04); review angka per kuartal |
| Foto siswa di bawah umur | Masalah izin dan privasi | Hanya foto dengan izin; blur wajah jika tidak ada izin |
| Gaya scrapbook mengorbankan keterbacaan | Panitia (usia 30–50) kesulitan membaca | Tulisan tangan hanya untuk aksen; info penting (rider, form) memakai font body |
| Website vs Starday tumpang tindih | Bingung ini website Dio atau Starday | Website milik Dio, Starday tampil sebagai program utama yang ia jalankan. Lihat Pertanyaan #1 |

## 16. Pertanyaan Terbuka (perlu jawaban Dio)

1. **Peran Dio di Starday.** Di bio IG ia menulis "tukang gitar di @starday.rm", sementara di proposal ia tampil sebagai pemateri bergitar. Apakah website diposisikan sebagai *Dio sebagai pemateri utama Starday*, atau *Dio sebagai musisi di tim Starday*? Jawaban ini mengubah copy hero dan siapa yang "diundang".
2. **Musik.** Apakah sudah ada lagu orisinal atau rilisan (Spotify/YouTube)? Jika belum, section Musik diganti menjadi klip live di section Video.
3. **Slide "Kredibel".** Slide ini memuat logo UII 30%, UGM 15%, UIN 11%, UMY 5%, UNY 4%, UPN Veteran 2%, dan UAD 1,5%. Angka itu mengukur apa (asal audiens, follower, atau latar belakang tim)? Tanpa konteks yang jelas, slide ini tidak ditampilkan.
4. **Nomor WhatsApp.** Linktree Starday memuat dua link: `wa.me/6281542203475` ("minta video starday") dan `wa.link/3v0bwh` ("informasi penjadwalan"). Untuk form undangan dibutuhkan nomor yang bisa dipakai dengan `wa.me`. Nomor mana yang dipakai?
5. **Nama tampil.** "Dio Diadon" atau "Dio A. Diadon"? Apa kepanjangan "A."?
6. **Tur Surabaya 18–24 Agustus.** Tahun berapa, dan apakah ada jadwal tur mendatang yang perlu ditampilkan (section Jadwal)?
7. **Link Linktree lain** (talkshow RRI, Bagas Rais Istiqomah, Titip Doa): masih aktif dan perlu dipindah ke website, atau sudah lewat?
