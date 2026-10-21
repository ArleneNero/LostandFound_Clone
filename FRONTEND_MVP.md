# UBL LostnFound — FRONTEND MVP

**Dokumen:** `docs/FRONTEND_MVP.md`  
**Jenis:** rencana eksekusi prioritas MVP, **bukan** pengganti milestone/kontrak yang sudah ada  
**Pelaksana:** satu AntiGravity, satu monorepo, satu jalur kerja aktif pada satu waktu  
**Urutan:** **Frontend MVP → persetujuan pengguna → Backend MVP → persetujuan pengguna → integrasi nyata**  
**Status awal:** `PLANNED` (jangan tandai selesai sebelum ada bukti)

## 1. Sasaran dan batas

Bangun **Frontend MVP yang benar-benar dapat didemonstrasikan secara lokal** dengan *mock service in-memory* sebelum Backend dibuat. Fokus pada alur **Petugas → Guest**. Alur Mahasiswa/Login lengkap, seluruh operasional pascapenerimaan, analitik, notifikasi, dan deployment ditunda sampai setelah integrasi dasar.

Target akhir keseluruhan proyek (bukan klaim capaian fase ini): React terhubung ke Fastify dan Neon PostgreSQL, memiliki data dummy yang tersimpan, serta sedikitnya tiga endpoint inti yang berfungsi sesuai kontrak.

**Definisi fase ini:** UI dapat dipakai untuk simulasi; **tidak** boleh mengklaim API, autentikasi Clerk, Cloudflare R2, atau database sudah terhubung. Mock hanya sementara dan harus mudah diganti oleh HTTP adapter.

## 2. Sumber kebenaran dan aturan perubahan

Sebelum mengubah kode, AntiGravity wajib membaca sumber yang **benar-benar ada** di repository:

1. Root `AGENTS.md` dan `apps/web/AGENTS.md` bila tersedia.
2. Kontrak final OpenAPI v1.0, API contract v1.0, dan ERD v6.2 di `.agent-internal/contracts/` atau snapshot frontend yang diverifikasi identik.
3. `apps/web/.agent-internal/` termasuk `README.md`, `MILESTONES.md`, `TODO.md`, `FIGMA_EXACT_RULES.md`, `FIGMA_MAPPING.md`, `DESIGN_SYSTEM.md`, `CLEAN_CODE.md`, `DTO_MAPPING.md`, `API_ROUTE_MATRIX.md`, dan `ROOT_TRACK_COMPATIBILITY.md` jika ada.
4. Blueprint Frontend dan ketentuan Clean Code versi final yang tersedia; Figma Page 05 untuk frame per role, serta panduan Page 00 untuk gaya visual.
5. Manifest dan enam aset asli di `apps/web/public/`, jika paket aset sudah dipasang.

**Prioritas bila terjadi pertentangan:** kontrak OpenAPI final untuk request/response/status → ERD final untuk model data → keputusan scope produk terbaru → frame Figma relevan untuk UI → blueprint/standar → dokumen rencana MVP ini untuk **urutan pengerjaan saja**. Jika sumber tidak ada, tidak cocok, atau saling bertentangan, **laporkan `BLOCKED` dan minta keputusan**; jangan menebak atau diam-diam mengubah kontrak.

Penting: paket role-first menetapkan `F/A → F/B Petugas → F/C Guest → F/D Mahasiswa → ...`. Dokumen ini adalah **checkpoint MVP yang disetujui khusus**, bukan izin mengubah seluruh ID/urutan milestone lama. Bila `AGENTS.md` atau root milestone masih menggunakan penomoran Frontend versi lama, lakukan **audit kompatibilitas dan minta izin sinkronisasi** sebelum mencatat ID tugas. Jangan membuat nomor task fiktif atau mengubah status tugas yang belum dikerjakan.

## 3. Struktur proyek

```text
UBL-LostnFound/
├── AGENTS.md                        # aturan agent lokal, bila sudah ada
├── docs/
│   ├── FRONTEND_MVP.md              # dokumen ini
│   └── BACKEND_MVP.md
├── apps/
│   ├── web/                         # React + Vite + TypeScript + Tailwind
│   └── api/                         # dikerjakan pada fase berikutnya
└── .agent-internal/                 # referensi/kontrak lokal yang sudah ada
```

Jangan membuat repository Git baru di dalam `apps/web/`. Jangan merombak atau menghapus struktur/proyek yang sudah ada. Bila struktur aktual berbeda, audit dan minta keputusan sebelum migrasi.

## 4. Cakupan minimum Frontend MVP

| Prioritas | Modul | Fungsi wajib yang dapat diuji |
|---|---|---|
| P0 | Fondasi UI | Router, layout role Petugas dan Guest, komponen bersama, responsive mobile/desktop, loading/empty/error state. |
| P0 | Petugas — Dashboard | Ringkasan dasar dari data mock yang sama dengan inventaris; **tanpa** analitik kompleks. |
| P0 | Petugas — Inventaris | Tabel/daftar barang, status/visibilitas yang benar, navigasi detail, state kosong. |
| P0 | Petugas — Catat barang | Form nama, kategori, deskripsi publik, lokasi/tanggal bila didukung kontrak, dan **satu foto pada UI MVP**; validasi; hasil muncul pada inventaris mock. |
| P0 | Petugas — Detail inventaris | Detail barang dan foto; data privat Petugas hanya muncul pada konteks Petugas. |
| P0 | Guest — Katalog | Menampilkan **hanya** `status=STORED && is_visible=true`, pencarian/filter yang memang tersedia di kontrak, paginasi **10 item per halaman**. |
| P0 | Guest — Detail barang | Detail publik; barang tersembunyi atau bukan `STORED` tampil sebagai 404/not-found, termasuk akses langsung lewat URL. |
| P1 | Login/akun Mahasiswa dan laporan temuan | **Ditunda**; boleh hanya menyediakan navigasi yang jujur bila frame Figma memerlukannya, tanpa mengaku alur sudah aktif. |
| P1 | Pengembalian, penyaluran, riwayat, notifikasi, analitik penuh | **Ditunda**; tidak boleh membuat endpoint atau simulasi backend seolah-olah sudah tersedia. |

**Batas foto penting:** UI MVP hanya meminta **1 foto barang** sesuai keputusan produk. Kontrak OpenAPI yang tersedia mendefinisikan `item_photo_upload_tokens` sebagai **array 1–5 token**. Jangan mengubah OpenAPI; pada integrasi, UI satu foto dipetakan menjadi array **berisi satu token** setelah upload sah. Jika dokumen lain menyatakan tepat satu foto dan memerlukan pembatasan API juga, catat sebagai perbedaan kontrak yang perlu persetujuan; jangan mengubah skema diam-diam.

**Aturan domain:** UBL LostnFound hanya barang ditemukan; operasional awal Pos Pengajaran; tidak ada online lost-report, klaim kepemilikan online, role `ADMIN` atau `GUEST` di database. Guest adalah pengunjung publik tanpa akun. Tidak boleh membuat login Petugas palsu yang disalahartikan sebagai Clerk asli.

## 5. Cara implementasi — satu AntiGravity

### Fase F0 — Preflight (wajib, tanpa coding)

- [ ] Audit isi repository dan perubahan Git yang belum di-commit; jangan overwrite hasil kerja pengguna.
- [ ] Identifikasi package manager yang **sudah digunakan** dan versi runtime; jangan mencampur lockfile.
- [ ] Verifikasi file kontrak, roadmap role-first, Figma, dan aset tersedia; jika tidak, nyatakan `BLOCKED` secara spesifik.
- [ ] Petakan tugas MVP ke ID `F/*` yang **benar-benar ada**; jangan memaksa seluruh milestone lengkap sebelum checkpoint MVP jika pengguna sudah mengizinkan jalur singkat.
- [ ] Laporkan daftar file yang direncanakan, dependensi, risiko, serta tes sebelum menulis kode.

### Fase F1 — Foundation

- [ ] Setup/perbaiki `apps/web/` tanpa menyentuh `apps/api/` atau kontrak bersama.
- [ ] Ikuti Figma: Page 05 frame Petugas/Guest, Page 00 untuk design system; jangan mengarang redesign, aset, atau frame yang belum terbaca.
- [ ] Buat typed DTO + interface service yang memisahkan `mock` dan `http` adapter. Struktur response harus mengikuti OpenAPI (`snake_case`, envelope `{data}`, metadata paginasi sesuai kontrak).
- [ ] Buat mock **in-memory** konsisten antarhalaman; tidak boleh berpura-pura persisten ke Neon. Bila refresh mereset data, dokumentasikan sebagai keterbatasan mock.

### Fase F2 — Petugas MVP (dikerjakan pertama)

- [ ] Dashboard ringkas.
- [ ] Inventaris dan detail inventaris.
- [ ] Form catat barang: validasi, preview foto lokal, feedback sukses/gagal, pembaruan inventaris mock.
- [ ] Pisahkan catatan verifikasi privat dari data yang bisa dilihat Guest.
- [ ] Tampilan mobile dan desktop mengikuti frame Figma yang **tersedia dan terverifikasi**; navbar Petugas mengikuti desain (Dashboard/Inventaris/Laporan/Akun), fitur non-MVP boleh diberi status belum tersedia secara jujur.

### Fase F3 — Guest MVP

- [ ] Katalog publik menggunakan sumber mock yang sama; filter publikasi dilakukan di service layer, bukan sekadar menyembunyikan kartu di UI.
- [ ] Detail publik menolak barang tersembunyi/non-STORED.
- [ ] Paginasi 10 per halaman, pencarian/filter yang terdefinisi, loading/empty/error/not-found state.
- [ ] Uji alur: Petugas menambah barang → muncul di inventaris → hanya barang eligible tampil di Guest.

### Fase F4 — Frontend MVP Gate (**berhenti untuk persetujuan**)

**Jangan memulai Backend atau integrasi HTTP sebelum pengguna menerima checkpoint ini.**

- [ ] Seluruh P0 dapat dinavigasi dan dioperasikan, bukan sekadar screenshot statis.
- [ ] Mock data konsisten antarhalaman dan sesuai tipe/field OpenAPI.
- [ ] Guest tidak bisa melihat catatan privat atau item nonpublik, termasuk via URL.
- [ ] Upload foto hanya simulasi UI lokal dan diberi label **MOCK**, tidak mengklaim R2.
- [ ] Tidak ada route/API palsu yang dinyatakan live; tidak ada kredensial hardcoded.
- [ ] Lint, typecheck, dan build **dijalankan**; hasil `PASS/FAIL/NOT RUN` dilaporkan apa adanya.
- [ ] Pemeriksaan visual terhadap frame Figma yang tersedia; catat selisih yang belum diperbaiki, jangan klaim pixel-perfect tanpa bukti.
- [ ] Tidak ada perubahan `apps/api/`, OpenAPI, ERD, atau file bersama tanpa persetujuan.

## 6. Kontrak integrasi yang harus disiapkan (belum dieksekusi)

| Metode + path | Penggunaan UI | Ketentuan |
|---|---|---|
| `GET /api/v1/items` | Guest katalog | Public; hanya `STORED` dan visible; paginasi sesuai kontrak. |
| `GET /api/v1/items/{item_id}` | Guest detail | Public; hidden/non-STORED harus 404. |
| `POST /api/v1/officer/items` | Petugas catat barang | Perlu Clerk JWT OFFICER, post assignment dari DB, dan upload token yang sah. |

**Jangan menyamakan detail inventaris Petugas dengan detail publik.** Endpoint Petugas berotorisasi berbeda dari `GET /items/{item_id}`; pada MVP mock, detail inventaris tetap disimulasikan melalui service tersendiri. Jika integrasi dashboard/inventaris Petugas membutuhkan endpoint tambahan dari 3 endpoint inti, gunakan endpoint **yang sudah ada** dalam OpenAPI dan minta izin memperluas cakupan integrasi; jangan membuat endpoint baru.

Pembuatan barang nyata membutuhkan upload R2 `POST /api/v1/uploads/intents` → PUT ke URL presigned → `POST /api/v1/uploads/{upload_id}/finalize` → token untuk `POST /api/v1/officer/items`. Ini **dua endpoint pendukung di luar tiga endpoint inti**, bukan penyimpangan target. Jika R2/Clerk belum siap, jangan mengklaim POST berhasil end-to-end.

## 7. Aturan kerja, Git, dan laporan akhir

- Satu agent, satu workspace/repository; jalankan tugas **sekuensial**, bukan mengasumsikan ada dua agent.
- Selesaikan task kecil yang dipilih sesuai ID roadmap; catat status `PLANNED / IN_PROGRESS / BLOCKED / COMPLETED` berdasarkan bukti.
- Commit lokal hanya sesuai kebijakan Git yang sudah berlaku dan setelah tes; **push, pindah milestone, merge, deploy masing-masing memerlukan izin eksplisit terpisah**.
- Jangan `git add .`; audit file yang di-stage; rahasia, `.env`, `AGENTS.md`, `.agent-internal/` tidak di-push sesuai kebijakan lokal.
- Handoff wajib berisi: ID task, file berubah, layar/flow selesai, hasil lint/typecheck/build, bukti visual yang benar-benar diperiksa, kendala, commit lokal jika ada, serta status **MOCK** dan **BELUM TERINTEGRASI**.

## 8. Instruksi mulai untuk AntiGravity

> Baca `AGENTS.md`, `apps/web/AGENTS.md`, seluruh sumber kontrak dan aturan Frontend yang tersedia, lalu `docs/FRONTEND_MVP.md`. Audit konsistensi ID role-first dan kesiapan Figma/aset. Kerjakan hanya **Fase F0** dahulu; laporkan rencana serta blocker dan tunggu izin coding. Setelah diizinkan, implementasikan Frontend MVP Petugas → Guest dengan mock in-memory. Berhenti pada **Frontend MVP Gate** untuk persetujuan. Jangan menyentuh Backend, mengubah kontrak, push, merge, atau deploy tanpa izin terpisah.
