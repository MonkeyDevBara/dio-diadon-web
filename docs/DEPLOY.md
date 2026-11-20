# Deploy: Vercel + Turso (gratis)

Website berjalan di Vercel (SSR) dan menyimpan semua konten, termasuk foto/PDF yang diunggah, di database Turso.
Lokal tidak perlu konfigurasi apa pun: database otomatis berupa file `data/dio.db`.

## 1. Buat database Turso

1. Daftar di https://turso.tech (login GitHub paling cepat).
2. Buat database baru. Pilih lokasi terdekat dengan Vercel Functions dan pengunjung (mis. Singapore atau Mumbai).
3. Ambil dua nilai dari dashboard Turso (menu database > Generate token / Connect):
   - `TURSO_DATABASE_URL`, berbentuk `libsql://nama-db-akun.turso.io`
   - `TURSO_AUTH_TOKEN`, token dengan akses baca dan tulis

Tabel dan data awal (dummy) dibuat otomatis saat website pertama kali dibuka. Tidak perlu menjalankan migrasi manual.

## 2. Hubungkan ke Vercel

1. Import repo `MonkeyDevBara/dio-diadon-web` di Vercel. Framework preset: **Astro**. Build command dan output dibiarkan default.
2. Project Settings > Environment Variables, tambahkan untuk **Production** (dan Preview jika dipakai):

   | Nama | Isi |
   |---|---|
   | `ADMIN_PASSWORD` | password admin, minimal 8 karakter |
   | `TURSO_DATABASE_URL` | dari langkah 1 |
   | `TURSO_AUTH_TOKEN` | dari langkah 1 |

3. Deploy ulang (Deployments > Redeploy) supaya env terbaca.
4. Buka `https://<domain-vercel>/admin`, masuk dengan `ADMIN_PASSWORD`, lalu isi nomor WhatsApp asli di menu Pengaturan.

## Catatan

- **Preview dan Production memakai database yang sama** jika URL Turso sama di keduanya. Buat database terpisah untuk Preview jika tidak ingin saling menimpa.
- **Batas upload 4 MB** per file karena body request fungsi Vercel dibatasi 4,5 MB.
- **Vercel Hobby hanya untuk proyek non-komersial.** Jika website dipakai komersial, perlu paket Pro.
- **Backup:** menu admin "Unduh backup (JSON)". Turso juga menyimpan backup sendiri.
- **Mengganti `ADMIN_PASSWORD`** otomatis mengeluarkan semua sesi admin yang sedang login.
- **Lupa password / admin tidak bisa masuk:** ubah `ADMIN_PASSWORD` di Vercel, redeploy.
- **Cold start:** request pertama setelah lama sepi sedikit lebih lambat karena fungsi menyiapkan koneksi ke Turso.
