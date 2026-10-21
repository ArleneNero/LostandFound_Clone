# UBL LostnFound — BACKEND MVP

**Dokumen:** `docs/BACKEND_MVP.md`  
**Jenis:** rencana eksekusi Backend + integrasi MVP, **bukan** pengganti OpenAPI, ERD, atau milestone Backend  
**Pelaksana:** satu AntiGravity, satu monorepo; dikerjakan **setelah Frontend MVP Gate disetujui**  
**Status awal:** `PLANNED` (tidak ada klaim server/API/database sudah berjalan)

## 1. Target terukur

Membuat Backend sungguhan untuk UBL LostnFound dengan **Fastify + TypeScript + Drizzle + Neon PostgreSQL**, data dummy yang benar-benar tersimpan di database, serta tiga endpoint inti yang berfungsi. Setelah Backend MVP Gate disetujui, integrasikan React Frontend ke Fastify → Neon.

**Tiga endpoint inti wajib:**

1. `GET /api/v1/items` — daftar katalog publik dari database.
2. `GET /api/v1/items/{item_id}` — detail publik berdasarkan ID.
3. `POST /api/v1/officer/items` — pencatatan barang langsung oleh Petugas berotorisasi.

Ketiga operasi ini **sudah ada dalam OpenAPI final v1.0**. Jangan membuat API alternatif, menambah endpoint buatan, atau mengubah payload agar lebih mudah dites.

**Target tiga endpoint bukan batas jumlah endpoint total.** Karena POST barang memerlukan upload foto aman, **dua endpoint pendukung** yang sudah ada pada OpenAPI juga harus disiapkan untuk alur foto nyata: `POST /api/v1/uploads/intents` dan `POST /api/v1/uploads/{upload_id}/finalize`. Presigned PUT ke Cloudflare R2 bukan endpoint REST Fastify. Bila dependensi upload belum siap, tandai alur POST `BLOCKED`, bukan menghilangkan kewajiban foto.

## 2. Dokumen yang harus dibaca sebelum coding

1. Root `AGENTS.md`, `.agent-internal/README.md`, `PRD.md`, `PHASES.md`, `MILESTONES.md`, `TODO.md`, `ARCHITECTURE.md`, `WORKFLOW.md`, `CLEAN_CODE.md`, `GIT_POLICY.md`, `SERVICE_SETUP.md`, `DEPLOYMENT_SECURITY.md` jika tersedia.
2. **Canonical** `.agent-internal/contracts/openapi-v1.0.yaml`, `api-contract-v1.0.md`, `erd-v6.2.dbml` (atau lokasi aktual yang dibuktikan sama). Snapshot Frontend harus diverifikasi identik sebelum integrasi.
3. Blueprint Backend final yang tersedia dan standar implementasi. Baca dokumentasi Frontend MVP sebagai kontrak kebutuhan integrasi, **bukan** izin mengubah `apps/web/`.
4. Milestone Backend `B/*` yang benar-benar ada; pemetaan task ke milestone dilakukan berdasarkan audit, bukan asumsi.

**Aturan konflik:** OpenAPI final menentukan path/method/payload/response/error/security; ERD v6.2 menentukan skema; keputusan scope menentukan cakupan produk; blueprint adalah panduan implementasi. Contoh blueprint yang menggunakan `camelCase` **tidak mengalahkan** `snake_case` pada OpenAPI. Jika ada ketidaksesuaian yang menghambat implementasi, hentikan dan minta keputusan.

**Catatan konflik foto:** OpenAPI final mendefinisikan `item_photo_upload_tokens` **array 1–5**, sedangkan keputusan UI MVP hanya **satu foto**. Implementasikan API sesuai kontrak final dan kirim satu token dari UI MVP; **jangan** diam-diam mempersempit batas kontrak menjadi satu atau membolehkan nol foto. Catat bila aturan bisnis/ERD memerlukan keputusan lanjutan.

## 3. Ruang lingkup domain dan keamanan

- Produk hanya **barang ditemukan**, bukan portal laporan kehilangan atau klaim online.
- Operasional pertama **Pos Pengajaran**; model tetap mendukung tiga pos yang didefinisikan pada ERD. Jangan mengaktifkan pos lain secara operasional tanpa keputusan.
- Role DB hanya `STUDENT` dan `OFFICER`; Guest adalah akses publik tanpa akun, tidak ada `ADMIN` DB.
- Endpoint publik hanya menampilkan `status=STORED AND is_visible=true`; detail item tersembunyi/non-STORED menghasilkan **404**, bukan bocor sebagai item privat.
- Endpoint POST hanya untuk Petugas dengan **Clerk JWT diverifikasi server-side**, role OFFICER dari database, dan **assigned post dari database** (bukan `post_id` yang dikirim bebas oleh client).
- Foto privat di Cloudflare R2, MIME JPEG/PNG/WebP, batas 5 MiB per file, upload intent → presigned PUT → finalize → token. Jangan memakai URL publik permanen atau file base64 dalam JSON sebagai jalan pintas.
- Validasi Zod, query parameterized/Drizzle, error envelope sesuai kontrak (`error.code`, `error.message`, `error.request_id`), request logging tanpa token/PII, transaksi DB untuk mutasi yang perlu atomik.
- NIM Mahasiswa bersifat deklarasi mandiri, bukan verifikasi akademik; tidak diperlukan untuk tiga endpoint inti.
- Tidak ada secret/connection string dalam source, log, screenshot, commit, atau laporan. Gunakan env lokal yang aman dan `.env.example` **tanpa nilai rahasia**.

## 4. Struktur dan batas kepemilikan

```text
UBL-LostnFound/
├── docs/
│   ├── FRONTEND_MVP.md
│   └── BACKEND_MVP.md              # dokumen ini
├── apps/
│   ├── web/                       # jangan diubah sebelum Integration Gate
│   └── api/                       # fokus implementasi Backend
└── .agent-internal/contracts/     # canonical, jangan diubah tanpa izin
```

Satu repository Git, tidak perlu Git worktree, tidak perlu dua sesi agent. Jangan membuat repo Git baru di `apps/api/`. Hindari perubahan file root/shared lockfile tanpa audit dan persetujuan. Package manager harus mengikuti kondisi aktual repository.

## 5. Tahap pengerjaan

### B0 — Preflight dan izin mulai

- [ ] Pastikan **Frontend MVP Gate sudah disetujui** pengguna; jika belum, berhenti.
- [ ] Audit Git status, struktur aktual, runtime/package manager, kontrak final, snapshot Frontend, dan ID milestone `B/*`.
- [ ] Cek kesiapan kredensial **Neon dev/test, Clerk, Cloudflare R2** tanpa menampilkan nilainya. Bila tidak tersedia, laporkan dependency yang `BLOCKED`; jangan mengarang akses atau menyatakan sudah terhubung.
- [ ] Buat peta operasi → skema → test case → file yang akan diubah, lalu minta izin coding.

### B1 — Fastify + Neon + Drizzle

- [ ] Setup `apps/api/` dengan TypeScript, Fastify, Zod, Drizzle, config/env validation, health check **hanya bila sudah termasuk kontrak atau diputuskan sebagai endpoint internal nonpublik**.
- [ ] Implementasikan migration berdasarkan **8 tabel ERD v6.2**; jangan menghapus tabel atau membuat skema alternatif hanya untuk mempercepat demo.
- [ ] Hubungkan ke **Neon dev/test nyata**, bukan SQLite/in-memory DB sebagai pengganti. Pastikan migration dapat dijalankan ulang dengan aman dan koneksi diverifikasi tanpa membocorkan DSN.
- [ ] Siapkan seed idempoten dengan contoh barang, kategori/status, visibilitas, pos, dan hubungan FK yang valid. Gunakan data sintetis saja, bukan data pribadi asli.
- [ ] Minimal sediakan contoh: item `STORED + visible`, item `STORED + hidden`, dan item non-`STORED`, sehingga aturan publikasi bisa diuji. Jumlah seed menyesuaikan struktur ERD; idealnya cukup untuk menguji paginasi 10/halaman.

### B2 — GET katalog dan detail publik

- [ ] `GET /api/v1/items`: query Neon nyata; filter publikasi **sebelum** sort/pagination; validasi query; bentuk envelope dan `meta` sesuai OpenAPI; default/limit maksimum dari kontrak, bukan asumsi.
- [ ] `GET /api/v1/items/{item_id}`: mengambil detail dari Neon; validasi ID; 404 untuk ID tidak ada, hidden, atau non-`STORED`.
- [ ] Tambahkan unit/integration test untuk kasus sukses, kosong, pagination, filter, invalid query/ID, 404, dan kebocoran data privat.
- [ ] Buktikan dua GET dengan HTTP request sungguhan dan perubahan data DB yang terbaca; bukan fixture response yang di-hardcode.

### B3 — Clerk, Petugas, R2 dan POST barang

- [ ] Verifikasi Clerk JWT **di server**; cocokkan identitas ke user DB dengan role OFFICER dan assigned post yang valid. Tidak ada bypass `DEV_AUTH=true`, akun admin palsu, atau `post_id` dari client sebagai sumber otorisasi.
- [ ] Implementasikan upload pendukung sesuai OpenAPI: `POST /api/v1/uploads/intents`, PUT R2 presigned, `POST /api/v1/uploads/{upload_id}/finalize`; token harus terikat user/purpose, diverifikasi, dan tidak boleh dipakai ulang jika kontrak melarang.
- [ ] Implementasikan `POST /api/v1/officer/items` dengan body `ItemCreateRequest` sesuai OpenAPI (`item_name`, `category`, `public_description`, `item_photo_upload_tokens`, serta field opsional yang sah). Validasi dan simpan ke Neon secara atomik sesuai desain.
- [ ] Status awal dan `is_visible` ditetapkan **berdasarkan kontrak/model/aturan bisnis yang diverifikasi**, jangan mengasumsikan barang otomatis terpublikasi. Bila belum jelas, `BLOCKED` dan minta keputusan.
- [ ] Uji 201 sukses dengan **akun OFFICER nyata pada lingkungan dev/test** dan foto R2 valid; uji 400/401/403/404/409/422 sesuai kasus yang relevan dan kontrak; pastikan DB berubah dan item dapat dibaca melalui jalur yang diizinkan.
- [ ] Bila Clerk/R2 belum dapat dikonfigurasi, boleh melanjutkan GET dan DB; **POST belum dianggap lulus** sampai alur otorisasi dan upload benar-benar diuji.

### B4 — Backend MVP Gate (**berhenti untuk persetujuan**)

| Kriteria | Bukti minimum |
|---|---|
| Neon tersambung | Migration sukses, query ke DB dev/test nyata, seed dapat diulang tanpa duplikasi tidak disengaja. |
| GET daftar | HTTP 200 sesuai schema, data dari Neon, hanya item publik, paginasi benar. |
| GET detail | HTTP 200 untuk item publik; 404 untuk hidden/non-STORED/tidak ada. |
| POST catat barang | HTTP 201 dengan Clerk OFFICER dan token upload R2 sah; record tersimpan; unauthorized/forbidden ditolak. |
| Validasi/keamanan | Response/error sesuai OpenAPI; tidak ada rahasia di repo/log; test negatif dijalankan. |
| Build dan tes | Typecheck, lint, build, unit/integration tests dilaporkan `PASS/FAIL/NOT RUN` dengan output nyata. |

**Jangan melabeli tiga endpoint `COMPLETED` jika POST hanya di-mock, R2 dilewati, atau autentikasi dinonaktifkan.** Bila sebagian gagal, laporkan hasil parsial secara eksplisit.

## 6. Integrasi Frontend → Backend (setelah persetujuan B4)

1. Minta **izin terpisah** untuk mulai Integration Gate karena tahap ini menyentuh `apps/web/` dan `apps/api/`.
2. Jalankan Fastify dan Vite lokal bersamaan; set base URL melalui env, bukan hardcode URL produksi.
3. Tukar mock service dengan HTTP adapter sesuai OpenAPI; gunakan DTO `snake_case` dan envelope yang sama, serta tangani loading/error/empty state nyata.
4. Hubungkan **Guest katalog** ke `GET /api/v1/items` dan **Guest detail** ke `GET /api/v1/items/{item_id}`.
5. Hubungkan **form catat barang Petugas** ke alur Clerk → upload intent → R2 PUT → finalize → `POST /api/v1/officer/items`.
6. **Perhatikan inventaris dan dashboard Petugas:** tiga endpoint inti **tidak mencakup** GET inventaris Petugas. Jika perlu data Petugas dari Neon, gunakan `GET /api/v1/officer/items` yang sudah ada pada OpenAPI, setelah izin memperluas cakupan. Jangan memakai endpoint katalog publik untuk menampilkan catatan privat Petugas atau menyebut inventaris real-time bila masih mock.
7. Uji E2E: buat barang melalui UI Petugas dengan akun sah → verifikasi row di Neon → verifikasi detail/inventaris yang berotorisasi → tampil di katalog Guest **hanya jika** status `STORED` dan visibilitas `true` sesuai mekanisme resmi. Jangan memaksa publikasi melalui perubahan DB manual lalu mengklaim alur UI lengkap.
8. Uji ulang lint, typecheck, build kedua aplikasi, integrasi HTTP, mobile/desktop, dan regresi mock yang dihapus.
9. Berhenti di **Integration Gate** dan laporkan bukti, blocker, serta fitur yang masih ditunda.

## 7. Scope yang sengaja ditunda

Alur Mahasiswa lengkap, pengelolaan laporan temuan, pengembalian/penyaluran barang, analitik penuh, notifikasi email, multi-pos aktif, dan deployment production. Setelah Integration Gate diterima, kembali ke roadmap `B/*` dan `F/*` untuk menyelesaikan cakupan yang belum dikerjakan. Jangan menandai milestone penuh selesai hanya karena checkpoint MVP lulus.

## 8. Kebijakan pengerjaan dan laporan

- Satu AntiGravity, satu task aktif pada satu waktu; patuhi ID milestone yang benar-benar tersedia dan kebijakan revisi `(n)` hanya setelah task sebelumnya selesai/diterima.
- Tidak mengubah kontrak API/ERD atau source Frontend tanpa izin. Kontrak dan docs yang sudah ada tidak ditimpa otomatis.
- Commit lokal sesuai aturan Git setelah audit diff dan tes. **Push, pindah milestone, merge, dan deploy masing-masing perlu persetujuan eksplisit terpisah.** Jangan `git add .`.
- Jangan pernah commit `.env`, token, signed URL, data asli, `AGENTS.md`, atau `.agent-internal/` bila dilarang kebijakan lokal.
- Laporan tiap checkpoint: ID task, file berubah, versi/kontrak yang dipakai, bukti DB/API/test, `PASS/FAIL/NOT RUN`, blocker, commit lokal (jika ada), dan status integrasi (`MOCK` / `DEV_DB` / `STAGING`) secara jujur.

## 9. Instruksi mulai untuk AntiGravity

> **Jangan jalankan Backend sampai Frontend MVP Gate disetujui.** Setelah disetujui, baca root `AGENTS.md`, dokumentasi Backend, kontrak OpenAPI final v1.0, ERD v6.2, dan `docs/BACKEND_MVP.md`. Mulai dari **B0 preflight**, audit koneksi Neon/Clerk/R2 dan milestone aktual, lalu laporkan rencana dan blocker sebelum coding. Implementasikan Neon + seed + tiga endpoint inti beserta upload pendukung sesuai kontrak. Berhenti di **Backend MVP Gate**; integrasi `apps/web/` hanya setelah izin terpisah. Jangan push, merge, atau deploy tanpa persetujuan eksplisit.
