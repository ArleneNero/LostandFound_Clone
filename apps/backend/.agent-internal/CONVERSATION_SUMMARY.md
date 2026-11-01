# UBL Lost and Found — Ringkasan Percakapan & Status Backend (Session Log)

**ID Sesi:** `85ded140-e9dd-41be-a509-58d8ae1427b6`  
**Waktu Penyimpanan:** 2026-10-25T05:25:00+07:00  
**Target Git Repository:** `https://github.com/ArleneNero/UBL-Lost-and-Found.git` (Branch: `main`)  
**Workspace:** `c:\Users\Nero\Downloads\UBL_LostandFound_Project`

---

## 1. Status Capaian Milestone

### A. Backend Milestones (`B/A` s/d `B/F` — 100% LULUS)
Seluruh milestone MVP P0 telah selesai, teruji, dan di-push ke remote repository Git:

| Commit Hash | Milestone | Deskripsi Perubahan |
|---|---|---|
| `4c6c8cc` | `B/B - B/D` | Modularisasi Clean Code Sweet Spot skema database, pemisahan service/repository, fixtures seed idempoten, dan pemisahan auth guard (`authenticate.guard.ts` & `require-officer.guard.ts`). |
| `d7166cb` | `B/E.1` | Implementasi Cloudflare R2 adapter, registry upload intent, helper upload-path, Zod DTO, dan presigned PUT pipeline. |
| `02d37a6` | `B/E.2` | Finalisasi upload, validasi objek R2 (MIME & size), token anti-replay HMAC-SHA256, dan rute `POST /uploads/:id/finalize`. |
| `cf798ed` | `B/F.1` | Kontrak pencatatan barang `POST /officer/items`, auto inventory code `INV-YYYY-XXXX`, single-use upload token verification, dan transaksi atomik database. |
| `294fac0` | `B/F.2` | Pengujian E2E integrasi penuh (9 test suites menyeluruh: alur lengkap, filter publik vs privat, mitigasi 401/403/409/422/IDOR). |
| `cffba0b` | `README` | Inisialisasi dokumentasi komprehensif monorepo `README.md` terpisah (About, peran pengguna, tech stack, roadmap B/A-B/M & F/A-F/G, panduan setup, dan testing). |

**Hasil Pengujian Terakhir:**
* `npx vitest run`: **12 Test Suites, 94/94 Tests PASS (100%)**
* `npx tsc --noEmit`: **0 Type Errors (PASS)**

---

## 2. Tanya-Jawab Kunci (Q&A History)

### Q1: "Apakah data dummy seed saat ini dihapus dulu agar petugas bisa upload barang sendiri?"
* **Jawaban:** **JANGAN DIHAPUS.**
* **Alasan:** Data dummy (15 item: 12 publik, 3 privat/negative) dibutuhkan oleh test suite untuk menguji paginasi (katalog publik mengharuskan pengujian limit >10 item) dan filter status. Setiap barang baru yang didaftarkan petugas akan otomatis mendapatkan ID baru dan muncul di urutan paling atas katalog (`received_at DESC`).

### Q2: "Pertanyaan: Office route test bisa sebanyak itu menguji apa saja?"
* **Jawaban:** Pengujian menguji 9 skenario keamanan dan fungsionalitas end-to-end:
  1. Alur lengkap pendaftaran barang sukses (201 Created + format `INV-YYYY-XXXX`).
  2. Visibilitas katalog publik (barang otomatis muncul di `GET /items/:id`).
  3. Perlindungan data privat (field `private_verification_notes` disaring dari publik).
  4. Penolakan tanpa token login (401 Unauthorized).
  5. Penolakan role Mahasiswa mencoba mencatat barang pos (403 Forbidden).
  6. Penolakan Petugas tanpa pos penugasan resmi (403 Forbidden).
  7. Penolakan token upload milik user lain / IDOR (403 Forbidden).
  8. Penolakan token upload yang salah peruntukan / purpose mismatch (422 Unprocessable).
  9. Pencegahan *Replay Attack* (409 Conflict jika token upload bekas dipakai lagi).

### Q3: "Pengujian E2E (End-to-End) itu apa maksudnya?"
* **Jawaban:** Pengujian alur utuh dari ujung ke ujung tanpa memotong proses. Simulasi meniru interaksi pengguna nyata: mulai dari request intent upload $\to$ simulasi direct upload $\to$ finalize & dapat token $\to$ petugas kirim form pendaftaran $\to$ data tersimpan atomik di PostgreSQL $\to$ dicek apakah barang langsung muncul di katalog publik dan apakah data rahasia tersaring.

### Q4: "Intinya backend udah integrasi ke frontend apa belum?"
* **Jawaban:** **BELUM.**
* **Fakta Teknis:** Frontend (`apps/frontend`) saat ini masih berjalan 100% menggunakan data mock lokal (*In-Memory Service Adapter* di `registry.ts`). Integrasi kabel HTTP riil terjadwal di Milestone `F/E`, `F/F`, dan `B/K`.

---

## 3. Pemetaan Lengkap File Backend (`apps/backend`)

### A. Core & Inisialisasi Server
* `src/index.ts` — Titik masuk utama aplikasi (entry point) yang membaca port dari konfigurasi dan menjalankan server Fastify.
* `src/app.ts` — Factory perakitan server: registrasi plugin CORS, error handler global, dan mounting seluruh rute API.
* `src/config/env.ts` — Validasi skema variabel lingkungan (`.env`) saat startup menggunakan Zod.

### B. Lapisan Database (`src/db/`)
* `src/db/client.ts` — Inisialisasi pool koneksi database PostgreSQL Neon dan instance Drizzle ORM.
* `src/db/schema.ts` — Facade backward-compatible yang mengekspor seluruh skema dari subfolder `schema/`.
* `src/db/seed.ts` — Runner script idempoten untuk mengisi pos, kategori, petugas, dan 15 data dummy awal.
* `src/db/fixtures/officer.fixture.ts` — Data deterministik akun petugas Pos Pengajaran.
* `src/db/fixtures/items.fixture.ts` — 15 data dummy barang temuan terstandarisasi untuk pengujian paginasi.
* `src/db/schema/enums.ts` — Definisi enum database PostgreSQL (`item_status`, `user_role`, `submission_status`).
* `src/db/schema/users.ts` — Tabel `users`, `roles`, `user_roles`, dan `user_service_posts`.
* `src/db/schema/posts.ts` — Tabel `service_posts` (Pos Pengajaran, Pos Keamanan, dll.).
* `src/db/schema/items.ts` — Tabel inti `found_items` dan `item_photos`.
* `src/db/schema/submissions.ts` — Tabel laporan mandiri mahasiswa (`found_submissions`).
* `src/db/schema/relations.ts` — Pemetaan foreign key relasional antar tabel Drizzle.
* `src/db/schema/index.ts` — Agregator modular ekspor skema database.

### C. Keamanan & Middleware (`src/middleware/`)
* `src/middleware/authenticate.guard.ts` — Middleware verifikasi header `Authorization: Bearer <JWT>` dan pencocokan sesi Neon Auth.
* `src/middleware/require-officer.guard.ts` — Middleware otorisasi yang memastikan user memiliki role `OFFICER` dan pos resmi di database.

### D. Modul Autentikasi (`src/modules/auth/`)
* `src/modules/auth/jwt.service.ts` — Utilitas verifikasi kriptografis signature token JWT.
* `src/modules/auth/auth.service.ts` — Logika sinkronisasi profil Neon Auth (Better Auth) ke tabel `users` lokal.
* `src/modules/auth/auth.routes.ts` — Endpoint internal pengecekan profil (`GET /api/v1/auth/me`).

### E. Modul Katalog Publik (`src/modules/items/`)
* `src/modules/items/items.dto.ts` — Validasi query params (`limit`, `page`, `category`, `search`) dan envelope response.
* `src/modules/items/items.repository.ts` — Query builder Drizzle berkinerja tinggi, sanitasi pencarian SQL, dan filter `STORED + visible`.
* `src/modules/items/items.service.ts` — Logika bisnis pembungkus pagination meta dan penolakan 404 barang non-publik.
* `src/modules/items/items.routes.ts` — Rute publik `GET /api/v1/items` dan `GET /api/v1/items/:id`.

### F. Modul Penyimpanan & Upload R2 (`src/modules/uploads/`)
* `src/modules/uploads/storage/storage.interface.ts` — Kontrak interface penyedia object storage.
* `src/modules/uploads/storage/mock.provider.ts` — Provider in-memory untuk pengujian lokal cepat.
* `src/modules/uploads/storage/r2.provider.ts` — Adapter AWS S3 SDK untuk integrasi Cloudflare R2 bucket.
* `src/modules/uploads/intent.registry.ts` — Penyimpanan sementara intent unggah file.
* `src/modules/uploads/upload-path.util.ts` — Generator path direktori R2 yang terisolasi per user dan tanggal.
* `src/modules/uploads/token.signer.ts` — Engine kriptografi HMAC-SHA256 untuk tanda tangan token.
* `src/modules/uploads/token.service.ts` — Manajemen masa berlaku token (15 menit), single-use memory store, dan anti-replay.
* `src/modules/uploads/upload.validator.ts` — Validasi MIME type aman (JPEG/PNG/WebP) dan ukuran maksimal 5 MB.
* `src/modules/uploads/uploads.dto.ts` — Validasi body request intent dan finalize.
* `src/modules/uploads/uploads.service.ts` — Orkestrasi alur upload dan penerbitan token.
* `src/modules/uploads/uploads.routes.ts` — Rute `POST /uploads/intents` dan `POST /uploads/:id/finalize`.

### G. Modul Operasional Petugas (`src/modules/officer/`)
* `src/modules/officer/inventory-code.util.ts` — Generator kode inventaris resmi (`INV-YYYY-XXXX`).
* `src/modules/officer/officer.dto.ts` — Validasi Zod form pendaftaran barang (wajib tepat 1 token upload foto).
* `src/modules/officer/officer.repository.ts` — Eksekutor transaksi atomik Drizzle (`db.transaction`) untuk insert item dan foto.
* `src/modules/officer/officer.service.ts` — Verifikasi single-use token, konsumsi token anti-replay, dan pemetaan data.
* `src/modules/officer/officer.routes.ts` — Endpoint terlindungi `POST /api/v1/officer/items`.

---

## 4. Langkah Lanjutan Berikutnya
1. **Milestone `B/G` (Backend):** Implementasi inventaris petugas internal (`GET /api/v1/officer/inventory`), toggle visibilitas barang, dan tracking barang kedaluwarsa (>90 hari).
2. **Milestone `F/C` (Frontend):** Melanjutkan antarmuka Guest publik lengkap pada React Frontend.
