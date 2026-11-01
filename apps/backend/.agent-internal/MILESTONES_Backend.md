# MILESTONES_Backend.md — UBL LostnFound / CampusFind

**Versi:** 2.0 (paket agent Backend dari ZIP lokal yang telah diverifikasi)  
**Dibuat:** 24 Oktober 2026  
**Status:** PLANNED; ID B/A..B/M usulan aktif paket ini, perlu approval sebelum implementasi  
**Target:** Fastify + TypeScript + Drizzle + Neon PostgreSQL + Neon Auth + Cloudflare R2  
**Batas saat ini:** menyusun roadmap, bukan memulai coding atau mengirim perubahan ke GitHub.

## 0. Status, sumber referensi, dan batas otoritas

- **Jenis:** rancangan MILESTONES *khusus Backend*, tidak menggantikan OpenAPI, ERD, blueprint, maupun milestone Frontend. File ini dibuat baru dan **struktur Frontend lokal sudah diperiksa**: `apps/web/.agent-internal/MILESTONES.md`, `milestones/F-A..F-G.md`, `TODO.md`, `task-registry.json`, dan `SKILL.md` dalam ZIP pengguna. Roadmap Backend ini tetap baru dan seluruh tugasnya PLANNED.
- **Status semua tugas:** `PLANNED`, kecuali pengujian preflight yang sungguh-sungguh dilaksanakan kelak. Tidak ada klaim bahwa Fastify, DB, Neon Auth, R2, atau endpoint telah diimplementasikan.
- **Sumber yang dipakai:** `BACKEND_MVP.md` (repo main); `FRONTEND_MVP.md`; `CampusFind_OpenAPI_Final_v1_0.yaml` (2026-10-18); `CampusFind_Blueprint_Backend_Final_ERD_v6_2` v1.3; referensi ERD v6.2 yang disebut di blueprint.
- **Verifikasi lokal wajib:** cek apakah ada `MILESTONES.md` dan `TODO.md` canonical Frontend/Backend beserta `AGENTS.md`, `CLEAN_CODE.md`, `GIT_POLICY.md`, `api-contract-v1.0.md`, `erd-v6.2.dbml` di folder lokal. Jika ada konflik otoritatif, jangan menimpa; tunjukkan *diff keputusan* dan minta persetujuan.
- **Sumber kebenaran:** OpenAPI final untuk HTTP (method, path, payload, response, auth, errors); ERD final untuk DB; keputusan scope produk untuk prioritas; blueprint untuk desain/quality; dokumen ini untuk task sequencing.
- **Akses Git:** dokumen untuk AI dibaca lokal saja. Mengikuti permintaan pengguna pada room ini, **jangan commit/push file `.md`, `.mdx`, folder AI/agent, credentials atau artefak internal** ke target GitHub. Jangan otomatis menghapus file lama yang sudah tracked; hentikan dan laporkan konfliknya. Atribusi commit manusia sah; GitHub Actions CI hanya read-only, tidak boleh melakukan auto-commit.

### Konflik dan koreksi kontrak yang wajib diketahui

1. `BACKEND_MVP.md` menjelaskan foto `item_photo_upload_tokens` berjumlah 1–5. **OpenAPI final v1.0 yang diperiksa untuk dokumen ini memuat `minItems: 1` dan `maxItems: 1`** untuk `ItemCreateRequest` dan `ReceiveRequest`. Ikuti OpenAPI final yang diverifikasi pada workspace; bila snapshot lokal berbeda, laporkan `CONTRACT_DRIFT` dan STOP sebelum coding endpoint foto.
2. Endpoint *list inventaris Petugas* dalam OpenAPI adalah **`GET /api/v1/officer/inventory`**, sedangkan `POST /api/v1/officer/items` untuk pencatatan dan `GET /api/v1/officer/items/{item_id}` untuk detail. Jangan membuat `GET /api/v1/officer/items` dari asumsi.
3. Blueprint v1.3 memakai fase **B1–B6** (roadmap luas), sementara `BACKEND_MVP.md` memakai **B0–B4** (urutan checkpoint cepat). **ID `B/A`–`B/M` adalah ID milestone Backend baru dalam paket ini** dan bukan bukti keberadaan/otorisasi ID lama. Tentukan pemetaan resmi di B/A.1.3 sebelum pencatatan status Git/AI Agent.
4. Kontrak OpenAPI memakai base `/api/v1` dengan properti `snake_case` dan error envelope `error.code`, `error.message`, `error.request_id`. Jangan menggunakan contoh blueprint `camelCase` sebagai pengganti.
5. Scope fase awal **Pos Pengajaran**. Skema siap multi-pos, tetapi aktivasi Perpustakaan/Lab Komputer memerlukan keputusan operasional tersendiri. Tidak ada klaim online, laporan barang hilang, role ADMIN DB, atau penyimpanan KTP/NIK/foto identitas.

## 1. Definisi milestone, prioritas, dan status

- **P0:** minimum Backend MVP. **P1:** fungsi operasional setelah MVP atau integrasi yang membutuhkan izin. **P2:** hardening/ops. **P3:** pilot setelah persetujuan pemilik sistem.
- Status task: `PLANNED`, `IN_PROGRESS`, `BLOCKED`, `COMPLETED`. Evidence test: `PASS`, `FAIL`, `NOT RUN`. `COMPLETED` hanya setelah evidence nyata dan acceptance lulus.
- Tiap fase dikerjakan serial: preflight -> izin -> implementasi -> test -> laporan -> checkpoint. Jangan menjalankan fase lain secara otomatis.
- Satu monorepo; Backend milik `apps/api/`; `apps/web/` hanya berubah saat **Integration Gate** disetujui.
- Setiap perubahan kontrak atau skema memerlukan review/approval terpisah.

## 2. Roadmap berurutan dan dependensi

| ID | Milestone | Priority | Dependency | Gate hasil | Status |
|---|---|---|---|---|---|
| `B/A` | Preflight, Governance & Contract Baseline | P0 | Sebelum coding; Frontend MVP Gate dan izin eksplisit | Dokumen sumber, matriks kontrak, baseline keamanan, dan rencana perubahan disepakati | PLANNED |
| `B/B` | Foundation, Fastify & Neon Database | P0 | B/A disetujui; akses DB dev/test tersedia | Service dapat boot, migration aman, 8 tabel cocok ERD, seed sintetis idempoten | PLANNED |
| `B/C` | Public Service Posts & Catalog APIs | P0 | B/B; canonical OpenAPI tervalidasi | Public endpoints benar-benar baca Neon, filter publikasi aman, DTO tanpa PII | PLANNED |
| `B/D` | Neon Auth Identity, RBAC & Scoped Authorization | P0 | B/B; Neon Auth dev siap | Verified JWT server-side, role/pos dari DB, semua akses privat dibatasi | PLANNED |
| `B/E` | Cloudflare R2 Secure Upload Pipeline | P0 | B/D; private R2 dev bucket siap | Upload intent, signed PUT, finalize, token purpose-bound, private object store | PLANNED |
| `B/F` | Officer Direct Item Registration & Backend MVP Gate | P0 | B/B, B/C, B/D, B/E | OFFICER membuat satu barang beserta foto nyata; DB & R2 konsisten | PLANNED |
| `B/G` | Officer Inventory & Visibility APIs | P1 | B/F; dapat dikerjakan sebelum/bersama integrasi hanya setelah izin | Inventaris privat per pos tanpa kebocoran, detail/visibility dan overdue sesuai kontrak | PLANNED |
| `B/H` | Student Bootstrap & Found Submissions | P1 | B/D, B/E; setelah MVP approval | Mahasiswa terverifikasi Neon Auth membuat/melihat/membatalkan laporan barang ditemukan | PLANNED |
| `B/I` | Officer Submission Review & Physical Receipt | P1 | B/G, B/H | Petugas memproses laporan masuk secara atomik dan membuat inventaris fisik | PLANNED |
| `B/J` | Physical Return, Distribution & Retention | P1 | B/G, B/I | Siklus fisik item selesai dengan status/visibilitas konsisten dan audit | PLANNED |
| `B/K` | Frontend HTTP Integration Gate | P1 | B/F Gate disetujui + izin terpisah mengubah apps/web | Frontend HTTP adapter mengganti mock pada alur yang benar-benar tersedia | PLANNED |
| `B/L` | QA, Security Hardening & Operations | P2 | Setelah milestone fitur yang relevan; sebelum staging | Negative regression, observability, backup restore terbukti di test/staging | PLANNED |
| `B/M` | Staging, UAT & Campus Pilot (Deferred) | P3 | B/L disetujui; persetujuan eksplisit kampus/pengguna | Lingkungan pilot terbatas dengan persetujuan, SOP, rollback, evaluasi | PLANNED |

### Crosswalk fase dokumen referensi

| Tahap `BACKEND_MVP.md` | Implementasi melalui milestone baru | Makna |
|---|---|---|
| B0 preflight | B/A | Audit dan persetujuan sebelum coding |
| B1 Fastify+Neon+Drizzle | B/B | Foundation dan database |
| B2 GET public | B/C | GET `/items` dan `/items/{item_id}`, plus pos publik tahap lanjutan dalam B/C |
| B3 Neon Auth+R2+POST officer | B/D + B/E + B/F | Autentikasi, upload, pencatatan |
| B4 MVP Gate | Exit B/F | Review PASS/FAIL; STOP untuk persetujuan |

`B1–B6` dari blueprint v1.3 **bukan** kode tugas yang sama; roadmap blueprint mengelompokkan foundation, security, core API semua role, R2/integrasi, hardening, dan pilot. Dokumen ini memecahnya menjadi kepemilikan tugas granular agar tidak terjadi benturan ID.

## 3. Domain invariants yang tidak dapat dinegosiasikan

| Area | Invariant |
|---|---|
| Data domain | Hanya barang ditemukan; DB `STUDENT`, `OFFICER`, Guest tanpa akun |
| Status laporan | `PENDING_RECEIPT`, `RECEIVED`, `REJECTED`, `CANCELLED` |
| Status inventaris | `STORED`, `RETURNED_TO_OWNER`, `DISTRIBUTED` |
| Katalog publik | Hanya `STORED AND is_visible=true`; hidden/non-STORED detail = 404 |
| Authority petugas | Neon Auth server JWT + `users.role=OFFICER` + post assignment DB, bukan input browser |
| Photos | Foto laporan tepat satu; foto item wajib sesuai ERD, tepat satu utama; kontrak request final saat ini menetapkan tepat satu token; galeri pos 0..3 |
| R2 | Private; JPEG/PNG/WebP maksimal 5 MiB, signed PUT 5 menit, finalized token 15 menit menurut OpenAPI |
| Serah terima | Return fisik: satu `item_returns`/item; recipient_name dan verification_summary; transaksi mencegah race |
| Penyaluran | `DISTRIBUTED`, `is_visible=false`, **tanpa** row `item_returns` |
| Batas simpan | Overdue hanya hitungan, tidak mengubah status otomatis |
| Privasi | Tidak menyimpan KTP/NIK/foto identitas; NIM deklaratif bukan verifikasi status akademik |

## 4. Delapan tabel yang harus tercakup di migration

| Tabel ERD final v6.2 | Tanggung jawab / constraint utama (verifikasi pada DBML canonical) |
|---|---|
| `users` | Neon Auth identity, STUDENT/OFFICER, verified subject; Neon Auth_user_id NOT NULL UNIQUE |
| `service_posts` | Pos dan penanggung jawab OFFICER, storage_limit_days NULL atau >0 |
| `service_post_photos` | Galeri pos 0..3, position 1..3, cover index 1 |
| `found_submissions` | Laporan temuan mahasiswa, exactly 1 report_photo_path, target post |
| `submission_status_history` | Riwayat perubahan status laporan, actor, reason dan timestamp |
| `found_items` | Inventaris fisik, visibility, status STORED/RETURNED_TO_OWNER/DISTRIBUTED |
| `item_photos` | Minimal satu foto inventaris, tepat satu is_primary |
| `item_returns` | Satu record pengembalian per item, recipient_name + verification_summary |

**Catatan:** deskripsi tabel di sini merujuk blueprint v1.3; detail tipe, FK dan index harus diperiksa ulang dari `erd-v6.2.dbml` yang benar-benar ada. Tidak boleh mengarang migration dari ringkasan ini saja.

## 5. Peta cakupan 22 operasi HTTP sesuai OpenAPI v1.0

| Method | Path relatif `/api/v1` | Role | Owner milestone |
|---|---|---|---|
| `GET` | `/posts` | Public | `B/C` |
| `GET` | `/posts/{post_id}` | Public | `B/C` |
| `GET` | `/items` | Public | `B/C` |
| `GET` | `/items/{item_id}` | Public | `B/C` |
| `GET` | `/me` | Identity | `B/D` |
| `POST` | `/me/bootstrap` | Student | `B/H` |
| `POST` | `/submissions` | Student | `B/H` |
| `GET` | `/submissions/me` | Student | `B/H` |
| `GET` | `/submissions/{submission_id}` | Student/Officer | `B/H` |
| `POST` | `/submissions/{submission_id}/cancel` | Student | `B/H` |
| `GET` | `/officer/submissions` | Officer | `B/I` |
| `POST` | `/officer/submissions/{submission_id}/receive` | Officer | `B/I` |
| `POST` | `/officer/submissions/{submission_id}/reject` | Officer | `B/I` |
| `GET` | `/officer/inventory` | Officer | `B/G` |
| `GET` | `/officer/inventory/overdue` | Officer | `B/G` |
| `POST` | `/officer/items` | Officer | `B/F` |
| `GET` | `/officer/items/{item_id}` | Officer | `B/G` |
| `PATCH` | `/officer/items/{item_id}/visibility` | Officer | `B/G` |
| `POST` | `/officer/items/{item_id}/return` | Officer | `B/J` |
| `POST` | `/officer/items/{item_id}/distribute` | Officer | `B/J` |
| `POST` | `/uploads/intents` | Student/Officer | `B/E` |
| `POST` | `/uploads/{upload_id}/finalize` | Student/Officer | `B/E` |

**Catatan:** PUT ke presigned R2 adalah request langsung ke R2, **bukan** endpoint Fastify. Route health/docs hanya diperbolehkan bila ketentuan canonical atau persetujuan internal mendukungnya.

## 6. Spesifikasi milestone dan exit criteria

### B/A — Preflight, Governance & Contract Baseline

**Prioritas:** P0  
**Prasyarat:** Sebelum coding; Frontend MVP Gate dan izin eksplisit  
**Definition of Done:** Dokumen sumber, matriks kontrak, baseline keamanan, dan rencana perubahan disepakati.  
**Status:** PLANNED

| Task ID | Pekerjaan wajib | Bukti penerimaan minimum |
|---|---|---|
| `B/A.1.0` | **Audit sumber lokal dan status Git.** Inventarisasi root/monorepo, AGENTS dan semua .md lokal termasuk hidden folder; git status, branch, runtime, package manager, secrets exposure (tanpa membuka nilainya). Jangan memodifikasi file. | Daftar dokumen/path, git status, toolchain, risiko overwrite |
| `B/A.1.1` | **Tetapkan sumber kebenaran.** Validasi OpenAPI v1.0, API Contract v1.0, ERD v6.2, blueprint final, Frontend MVP, standar Clean Code/Git Policy. Gunakan urutan: OpenAPI untuk HTTP, ERD untuk DB, keputusan scope, blueprint untuk guidance. | Manifest versi/hash/asal, tabel konflik dan keputusan |
| `B/A.1.2` | **Verifikasi Frontend MVP Gate.** Periksa bukti persetujuan Frontend MVP Gate; jangan menganggap merge atau tes frontend otomatis berarti disetujui pengguna. | Approval tertulis atau status BLOCKED |
| `B/A.1.3` | **Petakan roadmap ID.** Bandingkan B0-B4 dari BACKEND_MVP, B1-B6 blueprint, dan ID Backend existing bila ada; jangan menimpa/menebak ID lama. Perlakukan ID B/A-B/M dokumen ini sebagai usulan sampai kompatibilitas disetujui. | Matriks crosswalk dan ID yang disahkan |
| `B/A.2.0` | **Inventaris endpoint & DTO.** Petakan seluruh 22 operasi HTTP OpenAPI menjadi owner modul, role, request/response, status code, schema, test; bedakan 3 inti MVP dari pendukung dan lanjutan. | API traceability matrix 22 operasi |
| `B/A.2.1` | **Inventaris schema & constraint.** Verifikasi 8 tabel ERD v6.2, kunci dan 12 FK, CHECK/UNIQUE, state transitions, card/data contracts, kebijakan foto. | DB traceability matrix dari sumber kanonis |
| `B/A.2.2` | **Periksa dependensi layanan.** Verifikasi Neon dev/test, Neon Auth dev, R2 private bucket, origin CORS, dan izin/akses tanpa menampilkan kredensial; cek kemampuan testing real env. | Matriks READY/BLOCKED/UNVERIFIED per provider |
| `B/A.2.3` | **Perencanaan perubahan dan izin coding.** Rinci target file, package scripts, dependency graph, urutan migration/seed, negatif test, sumber daya dev, risiko; minta persetujuan coding sebelum mulai. | Handoff B/A + approval eksplisit |
### B/B — Foundation, Fastify & Neon Database

**Prioritas:** P0  
**Prasyarat:** B/A disetujui; akses DB dev/test tersedia  
**Definition of Done:** Service dapat boot, migration aman, 8 tabel cocok ERD, seed sintetis idempoten.  
**Status:** PLANNED

| Task ID | Pekerjaan wajib | Bukti penerimaan minimum |
|---|---|---|
| `B/B.1.0` | **Inisialisasi backend modular.** Siapkan apps/api pada monorepo yang ada; TypeScript, Fastify, Zod, Drizzle, scripts, lint/test/build; hindari nested Git dan lockfile ganda. | Build/typecheck/lint PASS; struktur modular terverifikasi |
| `B/B.1.1` | **Konfigurasi environment aman.** Validasi env saat startup, pemisahan dev/test, fail-fast, log redaction dan .env.example berisi nama variabel saja. Gunakan koneksi DB pooled untuk runtime dan direct untuk migration. | Tes missing/invalid env, secret scan PASS |
| `B/B.1.2` | **Bootstrap dan error envelope.** Registrasi plugin/router, request_id, uniform {error:{code,message,request_id}}, response serialization berdasar OpenAPI; health check hanya bila dikonfirmasi internal/nonpublik. | Fastify inject tests dan schema error |
| `B/B.2.0` | **Definisi Drizzle 8 tabel.** Model users, service_posts, service_post_photos, found_submissions, submission_status_history, found_items, item_photos, item_returns sesuai ERD v6.2; jangan menambah tabel sesuka hati. | Schema review field, type, constraint, indeks dan FKs |
| `B/B.2.1` | **Migration terkontrol.** Generate migration Drizzle dari schema; jalankan terhadap DB dev/test via direct connection; catat versi, rollback/restore plan dan uji lintasan migrasi dari DB bersih. | Migration log tanpa DSN, tabel/constraint query bukti |
| `B/B.2.2` | **Ketentuan relasi dan status.** Implementasi FK, NOT NULL, UNIQUE, CHECK, model foto, fixed role STUDENT/OFFICER, penyimpanan status; jangan menyamakan status laporan dengan inventaris. | Negative constraint tests dan review ERD parity |
| `B/B.3.0` | **Seed sintetis idempoten.** Buat data pengujian deterministik: pos, referensi user dengan ID dev yang sah, STORED visible/hidden, RETURNED_TO_OWNER/DISTRIBUTED, foto yang tidak berpura-pura tersedia; >10 publik jika layak menguji paginasi. | Seed dua kali tanpa duplikasi; count dan FK valid |
| `B/B.3.1` | **DB integration harness.** Siapkan test DB/isolated branch, fixtures cleanup transaksi, fake time bila perlu, koneksi ditutup bersih; hindari data pribadi nyata. | Repeatable DB tests di lingkungan nyata |
| `B/B.3.2` | **Bukti koneksi dan baseline.** Jalankan build/lint/typecheck/unit/migration/seed/read query; semua hasil dinyatakan PASS/FAIL/NOT RUN. | Gate B/B dengan output dan risk list |
### B/C — Public Service Posts & Catalog APIs

**Prioritas:** P0  
**Prasyarat:** B/B; canonical OpenAPI tervalidasi  
**Definition of Done:** Public endpoints benar-benar baca Neon, filter publikasi aman, DTO tanpa PII.  
**Status:** PLANNED

| Task ID | Pekerjaan wajib | Bukti penerimaan minimum |
|---|---|---|
| `B/C.1.0` | **Kontrak public DTO.** Bentuk serializer/schema Post dan FoundItemPublic sesuai OpenAPI; hanya field allowlist; jangan expose private notes, email, NIM, atau R2 storage_path. | Response schema tests dan PII leak regression |
| `B/C.1.1` | **GET /posts.** Implementasi listing service posts yang didefinisikan OpenAPI, pagination/default sesuai parameter kanonis, dan metadata publik yang sah. | HTTP 200 + schema/empty/pagination dari Neon |
| `B/C.1.2` | **GET /posts/{post_id}.** Implementasi detail pos termasuk galeri 0..3 foto melalui mekanisme URL baca sesuai kebijakan; foto pos bukan foto item. | 200/404, cover order 1, no raw object key |
| `B/C.2.0` | **GET /items.** Enforce status=STORED AND is_visible=true sebelum sort/pagination/count; filter q/category/post_id dan sort allowlist; limit <=10 mengikuti OpenAPI. | 200 empty/filter/sort/page/tie-break + hidden exclusion |
| `B/C.2.1` | **GET /items/{item_id}.** Validasi UUID/path; hidden/non-STORED/tidak ada hasil 404; DTO publik konsisten dan URL foto aman. | 200 public, 404 x3, no private columns |
| `B/C.2.2` | **Performa/query defensif.** Query terparameterisasi, indeks berdasarkan pola filter/sort yang nyata, tie breaker item_id, reasonable limits; cek page overflow dan SQLi search. | EXPLAIN bila perlu, SQLi case, index review |
| `B/C.2.3` | **Tes kontrak HTTP publik.** Gunakan Fastify inject + HTTP server nyata dengan DB dev/test; uji invalid query, error envelope, unknown paths, negative privacy. | Bukti PASS sesuai OpenAPI v1.0 |
### B/D — Neon Auth Identity, RBAC & Scoped Authorization

**Prioritas:** P0  
**Prasyarat:** B/B; Neon Auth dev siap  
**Definition of Done:** Verified JWT server-side, role/pos dari DB, semua akses privat dibatasi.  
**Status:** PLANNED

| Task ID | Pekerjaan wajib | Bukti penerimaan minimum |
|---|---|---|
| `B/D.1.0` | **Neon Auth JWT verifier.** Gunakan verifikasi JWT/JWKS yang didukung SDK official; cek issuer, audience bila dibutuhkan, expiration, tampered/missing token. Jangan gunakan bypass auth di test E2E nyata. | 401 untuk token salah/kedaluwarsa/tanpa token |
| `B/D.1.1` | **Mapping identity user.** Gunakan users.Neon Auth_user_id VARCHAR(255) NOT NULL UNIQUE, user_id UUID; jangan mengambil role dari token/body tanpa cek DB. | User mapping tests, missing profile 404 sesuai kontrak |
| `B/D.1.2` | **Role dan pos policy.** Implementasikan requireRole STUDENT/OFFICER dan resolved assigned post dari service_posts.officer_user_id; scope query ke post yang benar. | 403 role salah, 403/404 cross-post, direct param spoof ditolak |
| `B/D.2.0` | **GET /me.** Kembalikan Me DTO terverifikasi; jangan otomatis create profile; profile belum ada -> 404 PROFILE_NOT_FOUND sesuai OpenAPI. | 200 profile, 401 unauthenticated, 404 not-onboarded |
| `B/D.2.1` | **Officer provisioning trust boundary.** Dokumentasikan onboarding petugas oleh operator tepercaya; tidak ada public officer signup atau role ADMIN DB. Hak offboarding/provisioning tidak ditambahkan sebagai API publik. | Negative privilege escalation tests |
| `B/D.2.2` | **Error/CORS/rate guard.** Konfigurasi origin allowlist, headers, per-route limiter sesuai kebijakan, request logging dengan token/email/NIM redacted. | CORS preflight, 429 abuse, sanitized errors |
| `B/D.2.3` | **Security test identity.** Test missing/forged/expired JWT, POST role spoof, status spoof, IDOR dan boundary unauthenticated; gunakan accounts dev nyata hanya untuk E2E bila tersedia. | Matriks 401/403/404 + evidence |
### B/E — Cloudflare R2 Secure Upload Pipeline

**Prioritas:** P0  
**Prasyarat:** B/D; private R2 dev bucket siap  
**Definition of Done:** Upload intent, signed PUT, finalize, token purpose-bound, private object store.  
**Status:** PLANNED

| Task ID | Pekerjaan wajib | Bukti penerimaan minimum |
|---|---|---|
| `B/E.1.0` | **R2 adapter & config.** Konfigurasi akses privat S3-compatible, bucket CORS exact, no public permanent URL, storage path random, validasi env; jangan log presigned URL. | Konfigurasi redacted dan bucket private check |
| `B/E.1.1` | **POST /uploads/intents.** Autorisasi hanya STUDENT REPORT_PHOTO atau OFFICER ITEM_PHOTO; allowlist JPEG/PNG/WebP <=5 MiB, 5-menit signed PUT sesuai OpenAPI. | 201 success; 401/403/422 dan abuse tests |
| `B/E.1.2` | **Signed PUT direct-to-R2.** Uji browser/HTTP PUT terhadap URL sementara, header wajib; tanpa mengirim data biner melalui JSON Fastify. | Object exists in private R2 dev bucket |
| `B/E.2.0` | **POST /uploads/{upload_id}/finalize.** Verifikasi intent ownership/purpose/TTL dan object existence, byte size, MIME dan actual signature/content; token upload signed 15 menit. | 200 finalize sah; spoof/expired/missing object gagal |
| `B/E.2.1` | **Token replay & privacy.** Ikatan user+purpose+object; single-use melalui constraint storage_path unik dan transaksi saat consume; revoke/cleanup orphan sesuai desain yang disetujui. | Cross-user token, wrong-purpose, double-consume ditolak |
| `B/E.2.2` | **Signed image reads.** Sediakan URL baca singkat hanya pada DTO/route yang telah ditentukan kontrak; jangan buat public read endpoint baru tanpa izin. | Unauth private access denied; public eligible photo accessible via timed URL |
| `B/E.2.3` | **R2 integration/security tests.** Uji MIME spoof, oversized, duplicate finalize, wrong role, expired URL/token, orphan cleanup (terjadwal jika dirancang). | Test logs + bukti private bucket; not mock-only |
### B/F — Officer Direct Item Registration & Backend MVP Gate

**Prioritas:** P0  
**Prasyarat:** B/B, B/C, B/D, B/E  
**Definition of Done:** OFFICER membuat satu barang beserta foto nyata; DB & R2 konsisten.  
**Status:** PLANNED

| Task ID | Pekerjaan wajib | Bukti penerimaan minimum |
|---|---|---|
| `B/F.1.0` | **POST /officer/items contract.** Implementasikan request ItemCreateRequest snake_case: item_name, category, public_description, opsi valid, item_photo_upload_tokens tepat 1 menurut OpenAPI final yang tersedia. | Contract validation + 422 untuk 0/>1 token |
| `B/F.1.1` | **Server-derived post & actor.** Officer wajib memiliki assignment pada DB; jangan menerima post_id client untuk override pos; public/private fields dibedakan. | Cross-post escalation tests |
| `B/F.1.2` | **Transaction item + photo.** Konsumsi token ITEM_PHOTO sah; insert found_items dan item_photos dengan satu primary, inventory code yang aman/unik; transaksi rollback jika gagal. | 201 response; unique, partial failure rollback |
| `B/F.2.0` | **State and visibility rules.** Status awal dan is_visible mengikuti kontrak/ERD dan keputusan yang telah diverifikasi; tidak auto-publish dengan asumsi. | State assertion dan visibility regression |
| `B/F.2.1` | **End-to-end real providers.** Dengan token Neon Auth OFFICER dev dan file R2 nyata: intent → PUT → finalize → POST; cek persisted row dan API yang sah. | 201 HTTP + DB rows + referenced R2 object |
| `B/F.2.2` | **Negative/concurrency cases.** No token, STUDENT, no assigned post, wrong image token, replay, invalid data, simultaneous POST; status code tepat menurut kontrak. | 401/403/409/422 sesuai test yang relevan |
| `B/F.2.3` | **Backend MVP Gate review.** Kompilasi bukti B/B-B/F: migration+seed, GET catalog/detail, 201 officer post + R2/Neon Auth, security, lint/build/test. STOP untuk persetujuan; tidak mengklaim selesai bila provider BLOCKED. | Approval eksplisit sebelum integrasi; status PASS/FAIL/NOT RUN |

**STOP GATE — Backend MVP:** setelah B/F.2.3, jangan lanjut B/G atau integrasi tanpa review dan izin terpisah. Jika Neon Auth/R2 belum nyata, POST tetap BLOCKED dan Gate tidak dapat PASS penuh.

### B/G — Officer Inventory & Visibility APIs

**Prioritas:** P1  
**Prasyarat:** B/F; dapat dikerjakan sebelum/bersama integrasi hanya setelah izin  
**Definition of Done:** Inventaris privat per pos tanpa kebocoran, detail/visibility dan overdue sesuai kontrak.  
**Status:** PLANNED

| Task ID | Pekerjaan wajib | Bukti penerimaan minimum |
|---|---|---|
| `B/G.1.0` | **GET /officer/inventory.** Query assigned post, filter status/page/limit dari OpenAPI, private DTO officer; jangan gunakan GET /officer/items (tidak ada dalam kontrak). | 200 assigned-post scoped, 401/403 cross-role |
| `B/G.1.1` | **GET /officer/items/{item_id}.** Kembalikan detail inventaris lengkap termasuk private_verification_notes hanya petugas pos berhak. | 200 valid, 403/404 pos lain, response allowlist |
| `B/G.1.2` | **PATCH /officer/items/{item_id}/visibility.** Ubah is_visible hanya STORED sesuai rules; jangan mengubah status fisik; transaksi dan guard post. | 200, 409 invalid-state, public listing reflects change |
| `B/G.2.0` | **GET /officer/inventory/overdue.** Hitung overdue dinamis dari received_at dan storage_limit_days >0, only STORED; bukan auto-status. NULL limit berarti tak berbatas. | 200 exact boundary, no auto mutation |
| `B/G.2.1` | **Dashboard backend query mapping.** Petakan ringkasan Dashboard dari operasi OpenAPI yang ada; jika metrik khusus belum ada endpoint, dokumentasikan gap dan minta izin sebelum menambah endpoint. | No invented analytics endpoint; DB-backed display truthful |
| `B/G.2.2` | **Query/visibility regression.** Uji pagination authorized, invalid status, cross-post resource ID, is_visible toggle, data race and privacy. | HTTP integration + DB evidence |
### B/H — Student Bootstrap & Found Submissions

**Prioritas:** P1  
**Prasyarat:** B/D, B/E; setelah MVP approval  
**Definition of Done:** Mahasiswa terverifikasi Neon Auth membuat/melihat/membatalkan laporan barang ditemukan.  
**Status:** PLANNED

| Task ID | Pekerjaan wajib | Bukti penerimaan minimum |
|---|---|---|
| `B/H.1.0` | **POST /me/bootstrap.** Setelah Neon Auth verified email: create STUDENT profile dengan student_number self-declared, bukan verifikasi status akademik; jangan mengizinkan self-assign OFFICER. | 201 sesuai kontrak, conflict/missing email checks |
| `B/H.1.1` | **POST /submissions.** STUDENT create report dengan satu REPORT_PHOTO upload token, target_post_id yang sah dan field OpenAPI; status awal PENDING_RECEIPT + history awal transaksional. | 201 with DB+R2+history, wrong-purpose denied |
| `B/H.1.2` | **GET /submissions/me.** Daftar laporan milik akun yang login, filter/page dari kontrak, tanpa menampilkan laporan mahasiswa lain. | Owner-only list, pagination and empty |
| `B/H.2.0` | **GET /submissions/{submission_id}.** Kembalikan detail/history hanya untuk owner atau petugas yang berwenang sesuai OpenAPI, konsisten concealment 403/404. | Owner/cross-user/assigned officer tests |
| `B/H.2.1` | **POST /submissions/{submission_id}/cancel.** Hanya pemilik yang boleh cancel status PENDING_RECEIPT; alasan nonblank, transisi dan history atomik. | 200 success, 409 invalid state, 403 cross-user |
| `B/H.2.2` | **State machine submission.** Jaga PENDING_RECEIPT -> RECEIVED/REJECTED/CANCELLED hanya lewat role-appropriate route; conflict/race ditolak. | Transition matrix tests + immutable history |
| `B/H.2.3` | **Penyalahgunaan student auth.** Uji email tidak diverifikasi, NIM duplikat sesuai ERD, rate abuse, request role spoof, tidak ada KTP/NIK/foto identitas. | Negative security and privacy evidence |
### B/I — Officer Submission Review & Physical Receipt

**Prioritas:** P1  
**Prasyarat:** B/G, B/H  
**Definition of Done:** Petugas memproses laporan masuk secara atomik dan membuat inventaris fisik.  
**Status:** PLANNED

| Task ID | Pekerjaan wajib | Bukti penerimaan minimum |
|---|---|---|
| `B/I.1.0` | **GET /officer/submissions.** List laporan menuju assigned post saja; status/page/filter sesuai OpenAPI; tidak bocor ke petugas pos lain. | 200 scoped, role and cross-post tests |
| `B/I.1.1` | **POST /officer/submissions/{submission_id}/receive.** Verifikasi status pending, kepemilikan post dan penyerahan fisik, konsumsi tepat satu ITEM_PHOTO token (beda foto laporan), buat found_items + item_photos. | 201 sesuai schema, one inventory per source_submission_id |
| `B/I.1.2` | **Receive atomicity.** Transaksi ubah submission.status=RECEIVED, append history, insert item+photo dan uniqueness; request simultan tidak menggandakan barang. | Race tests, DB unchanged on failure |
| `B/I.2.0` | **POST /officer/submissions/{submission_id}/reject.** Tolak laporan PENDING_RECEIPT dengan reason nonblank; event history disimpan, scoped by post. | 200/409/403, reason-history evidence |
| `B/I.2.1` | **Foto report vs inventory.** Pisahkan report_photo_path dengan item_photos; galeri foto pos service_post_photos tidak boleh tercampur. | Data path/DTO tests |
| `B/I.2.2` | **Review/status tests.** Jalankan cross-post, duplicate receive, cancel-then-receive, reject-then-receive, forged status. | Integration race + invariant test matrix |
### B/J — Physical Return, Distribution & Retention

**Prioritas:** P1  
**Prasyarat:** B/G, B/I  
**Definition of Done:** Siklus fisik item selesai dengan status/visibilitas konsisten dan audit.  
**Status:** PLANNED

| Task ID | Pekerjaan wajib | Bukti penerimaan minimum |
|---|---|---|
| `B/J.1.0` | **POST /officer/items/{item_id}/return.** Hanya STORED pada pos berwenang, recipient_name dan verification_summary nonblank; verification_confirmed_at, create 1 item_returns, status RETURNED_TO_OWNER, is_visible=false. | 201 with DB transaction, 409 duplicate/concurrent |
| `B/J.1.1` | **Return ownership practice.** Verifikasi kepemilikan dilakukan langsung oleh petugas secara offline; jangan simpan KTP/NIK/foto identitas dan jangan buat klaim online. | Privacy check, SOP placeholder requiring campus approval |
| `B/J.1.2` | **POST /officer/items/{item_id}/distribute.** Hanya STORED; penyaluran manual -> DISTRIBUTED dan is_visible=false tanpa membuat item_returns. | 200 success, invalid state 409, public disappears |
| `B/J.2.0` | **Overdue policy & no automation.** Perhatikan storage_limit_days: NULL berarti tak terbatas, >0 dihitung; barang overdue tetap STORED sampai keputusan petugas. | Boundary tests dan tidak ada cron auto-distribute |
| `B/J.2.1` | **Race conditions & exactly once.** Parallel return/distribute, repeated request, wrong assigned post, invalid visibility/state; transaksi/index UNIQUE untuk anti-duplikasi. | Concurrent integration test and uniqueness evidence |
| `B/J.2.2` | **History and data retention review.** Catat audit yang diizinkan skema, jangan tambah tabel tanpa approval, review kebijakan retensi/koreksi data bersama pengelola. | Decision register dan test untuk data integrity |
### B/K — Frontend HTTP Integration Gate

**Prioritas:** P1  
**Prasyarat:** B/F Gate disetujui + izin terpisah mengubah apps/web  
**Definition of Done:** Frontend HTTP adapter mengganti mock pada alur yang benar-benar tersedia.  
**Status:** PLANNED

| Task ID | Pekerjaan wajib | Bukti penerimaan minimum |
|---|---|---|
| `B/K.1.0` | **Integrasi scope dan izin.** Konfirmasi approval khusus sebelum menyentuh apps/web. Audit adapter mock/interface dan UI F/A-F/C; semua route hasil integrasi harus ada di OpenAPI. | Frontend diff plan dan approval record |
| `B/K.1.1` | **HTTP client/config.** Gunakan runtime API base URL dari env, typed DTO snake_case, error envelope, timeouts/retry konservatif, token injection aman dari Neon Auth. | No hardcoded prod URL or leaked JWT |
| `B/K.1.2` | **Guest list/detail.** Hubungkan katalog/detail ke GET /items dan /items/{id} hanya; validasi limit10, hidden 404, loading/error/empty responsif. | Browser E2E against real Neon-backed API |
| `B/K.2.0` | **Officer register and upload.** UI satu foto: POST intent -> presigned PUT -> finalize -> POST /officer/items; error/retry aman, status tidak auto-publish palsu. | End-to-end photo+DB persisted evidence |
| `B/K.2.1` | **Officer inventory/detail.** Hubungkan ke GET /officer/inventory dan GET /officer/items/{id}; dashboard hanya metrik yang didukung kontrak. | Private record access via officer, no public DTO misuse |
| `B/K.2.2` | **Visibility & state sync.** PATCH visibility sesuai konfirmasi UI dan server; re-fetch/invalidate cache; mock features yang tidak terintegrasi diberi label jujur. | UI state persists across refresh, 403/409 UX |
| `B/K.3.0` | **Student & review integration.** Setelah B/H-B/J dan izin role scope, hubungkan Student report dan Officer receive/return/distribute secara bertahap; jangan klaim ini termasuk MVP Gate. | Separate E2E per role, no scope creep |
| `B/K.3.1` | **End-to-end full flow.** Uji petugas create → row + R2 → assigned inventory → Guest jika visible STORED; siswa report → receive → return/distribute hanya setelah semua milestone terkait completed. | Screenshot/test logs/DB row checks |
| `B/K.3.2` | **Frontend regression & accessibility.** Lint/typecheck/build/test aplikasi web/API, browser mobile/desktop, focus/empty/error, no mock leakage. | Integration Gate report PASS/FAIL/NOT RUN |

**STOP GATE — Integration:** hanya deklarasikan selesai jika aplikasi web benar-benar memanggil HTTP API dengan auth/DB/R2, bukan mock atau screenshot statis.

### B/L — QA, Security Hardening & Operations

**Prioritas:** P2  
**Prasyarat:** Setelah milestone fitur yang relevan; sebelum staging  
**Definition of Done:** Negative regression, observability, backup restore terbukti di test/staging.  
**Status:** PLANNED

| Task ID | Pekerjaan wajib | Bukti penerimaan minimum |
|---|---|---|
| `B/L.1.0` | **Contract coverage.** Setiap dari 22 operasi OpenAPI punya request/response validation dan skenario positive/negative; no undocumented public routes. | 22-endpoint coverage matrix with status |
| `B/L.1.1` | **Security attack matrix.** Uji BOLA/IDOR (owner/post), SQLi, privilege escalation, CORS, JSON/body limit, upload MIME spoof, replay, error disclosure. | S01-S22 blueprint review dan evidence |
| `B/L.1.2` | **Race/transaction proof.** Stress duplicate receive, return, distribute, upload token replay; hanya satu hasil domain yang sah. | Concurrent test logs dan invariant queries |
| `B/L.2.0` | **Dependency & secret scanning.** Audit dependency risk, secrets in staged files, package vulnerabilities; documented risk acceptance jika ada. | Audit output dan remediation list |
| `B/L.2.1` | **CI read-only human commits.** CI hanya lint/typecheck/test/build/scan, permission contents:read; jangan jalankan bot auto-commit/push, never stage .md/.mdx per kebijakan pengguna. | Workflow review + git log author/committer |
| `B/L.2.2` | **Performance/limits.** Ukur response katalog/sort pada data uji realistis, index usage, rate limits, startup/env failure; jangan klaim SLO tanpa pengukuran. | Bench measurement dan thresholds agreed |
| `B/L.3.0` | **Logging/monitoring.** Request ID dan sanitized logs, errors/5xx, auth failures, R2 upload errors, DB metrics; jangan log token/PII/presigned URL. | Sample sanitized logs/alerts |
| `B/L.3.1` | **Backup & recovery rehearsal.** Buktikan restore Neon dev/staging branch serta metadata/foto R2, cek referential consistency, tetapkan RPO/RTO bersama operator. | Restore drill record dan rollback procedure |
| `B/L.3.2` | **Hardening Gate.** Audit integrasi dan security dengan status PASS/FAIL/NOT RUN, severity, ownership, blocker; STOP bila critical belum tertangani. | Security release readiness report |
### B/M — Staging, UAT & Campus Pilot (Deferred)

**Prioritas:** P3  
**Prasyarat:** B/L disetujui; persetujuan eksplisit kampus/pengguna  
**Definition of Done:** Lingkungan pilot terbatas dengan persetujuan, SOP, rollback, evaluasi.  
**Status:** PLANNED

| Task ID | Pekerjaan wajib | Bukti penerimaan minimum |
|---|---|---|
| `B/M.1.0` | **Persetujuan operasional.** Tentukan pengelola, petugas resmi, pemilik data, SOP verifikasi pemilik, data retention, privacy notice; tanpa menganggap kampus memberi izin. | Signed approval/UAT plan atau BLOCKED |
| `B/M.1.1` | **Staging environment.** Siapkan env terpisah dan domain/HTTPS sesuai izin; migration/seed uji; buka Swagger terbatas, tidak mengumbar debug. | Staging smoke test dan secret-safe config |
| `B/M.1.2` | **UAT alur nyata.** Uji penerimaan temuan, registrasi langsung, public catalog, laporan student, retur/penyaluran jika scope disetujui. | UAT matrix with named roles not PII |
| `B/M.2.0` | **Deployment guard.** Lakukan deploy hanya setelah approval eksplisit, migration preview, rollback dan backup checkpoint. Tidak menyentuh produksi tanpa izin. | Release signoff / rollback plan |
| `B/M.2.1` | **Pilot Pos Pengajaran.** Aktifkan hanya Pos Pengajaran, pos lainnya disiapkan secara skema tetapi tidak diaktifkan tanpa keputusan. | Pilot scope approval and measured outcomes |
| `B/M.2.2` | **Operasional & handoff.** Siapkan incident contact, credential rotation SOP, support FAQ, maintenance and bug backlog; bukti transfer pengetahuan. | Operator runbook locally, no secrets |
| `B/M.2.3` | **Pilot exit review.** Evaluasi usability, stability, privacy, defects, next backlog; jangan klaim production-ready otomatis. | UAT/lessons learned with go/no-go |
## 7. Standar acceptance, evidence, dan QA

**Bukti minimal setiap task:** (a) sumber canonical/path dan versi, (b) daftar file yang berubah, (c) command/HTTP request yang benar-benar dijalankan, (d) output dengan status PASS/FAIL/NOT RUN, (e) test negatif/security untuk affected routes, (f) risiko/limitasi, (g) link commit jika memang diizinkan.

**MVP Gate minimum:**

- Database: 8 tabel sesuai ERD, migration dari DB bersih, seed idempoten dua kali, constraint teruji pada Neon dev/test nyata.
- GET: `/items` benar-benar baca Neon, filter visibility **sebelum** count/sort/page; `/items/{id}` menangani public 200 dan hidden/non-STORED 404.
- POST: token OFFICER nyata dari Neon Auth, assignment pos dari DB, presigned PUT R2, finalize, `POST /officer/items` = 201 dan DB row + item photo valid.
- Keamanan: 401/403/404/409/422/429 diuji **jika berlaku per operasi di OpenAPI**; no secret/PII, cross-post dan upload replay ditolak.
- Build/testing: lint, typecheck, build, unit, integration, HTTP smoke punya bukti; tidak boleh menyulap NOT RUN menjadi PASS.

**Reporting template per checkpoint:**

`Milestone/Task | Status | Scope | File changed | Contract version | Actual commands/tests | PASS/FAIL/NOT RUN | DB/API evidence | Limitations/BLOCKER | Commit (jika ada) | Next approval needed`

## 8. Kontrol Git, dokumen AI, dan keamanan operasional

- Selalu baca aturan commit title/body/milestone yang **ada pada `.md` lokal**, jangan mengganti dengan format buatan dokumen ini. Jangan mengaku adanya aturan bila dokumen belum tersedia.
- Larangan pengguna untuk target repo: **jangan stage/commit/push `.md`, `.mdx`, AGENTS/CLAUDE/GEMINI, `.agent-internal/`, prompt, TODO, MILESTONES, log hasil AI, `.env`, secret, signed URL**. File ini disimpan lokal, bukan dipublikasikan. `.gitignore` tidak melindungi file yang sudah tracked: audit `git diff --cached --name-only` setiap kali.
- Gunakan identitas Git manusia sah untuk author/committer; AI assistant dapat membantu kode tetapi jangan membuat histori palsu untuk kontribusi teman. Bot boleh CI read-only `contents: read`, tetapi tidak membuat push/commit.
- Jangan gunakan `git add .`, `git add -A`, `git push --force`, rewrite history, atau perubahan production tanpa izin. Push/merge/deploy memerlukan izin terpisah sesuai `BACKEND_MVP.md` dan kebijakan lokal yang terverifikasi.
- Konektor Neon tersedia bukan bukti project, skema atau migrasi telah siap. Verifikasi status akun/project/branch pada B/A.2.2. Jangan menghapus atau mengubah produksi tanpa izin.

## 9. Open decisions / BLOCKED register (isi ketika diaudit)

| ID | Keputusan yang diverifikasi | Default aman |
|---|---|---|
| DEC-01 | Pemetaan ID resmi lokal terhadap usulan B/A–B/M | Jangan mengubah IDs legacy sampai approval |
| DEC-02 | Apakah `erd-v6.2.dbml` dan OpenAPI identik dengan snapshot yang tersedia? | BLOCKED jika tidak ditemukan/berbeda |
| DEC-03 | Foto token: `BACKEND_MVP.md` 1–5 vs OpenAPI yang diperiksa tepat 1 | Canonical OpenAPI + catat drift |
| DEC-04 | Status/visibilitas awal item langsung | Ikuti rule canonical; jangan auto-publish asumsi |
| DEC-05 | Neon dev/test, Neon Auth dev, R2 private (akses nyata) | BLOCKED jika credentials/provider belum siap |
| DEC-06 | Officer provisioning, assigned post, operator terotorisasi | Privileged operator only; no self-promote |
| DEC-07 | Persetujuan integrasi frontend atau staging/production | Jangan menyentuh apps/web/deploy tanpa approval |
| DEC-08 | Validasi final domain dan SOP kampus untuk pilot | Jangan klaim dukungan resmi kampus |

## 10. Cara menggunakan roadmap ini

1. Agent membaca seluruh Markdown lokal **read-only** dan dokumen contract canonical sebelum coding.
2. Audit ID yang mungkin sudah berlaku, lalu setujui apakah roadmap B/A–B/M boleh digunakan tanpa mengganti Frontend roadmap.
3. Kerjakan hanya task kecil yang aktif dan berurutan di `TODO_Backend.md`; status berubah berdasarkan bukti; task berikutnya tidak boleh diam-diam dianggap selesai.
4. Setelah exit criteria fase tercapai, laporkan dan STOP di checkpoint yang disyaratkan.
5. Jangan publish dokumen AI `.md` ke GitHub target; bagikan handoff melalui chat atau direktori lokal di luar staging Git.



## 11. Detail eksekusi per milestone

- [`B/A` — Preflight, Governance & Contract Baseline](milestones/B-A.md)
- [`B/B` — Foundation, Fastify & Neon Database](milestones/B-B.md)
- [`B/C` — Public Service Posts & Catalog APIs](milestones/B-C.md)
- [`B/D` — Neon Auth Identity, RBAC & Scoped Authorization](milestones/B-D.md)
- [`B/E` — Cloudflare R2 Secure Upload Pipeline](milestones/B-E.md)
- [`B/F` — Officer Direct Item Registration & Backend MVP Gate](milestones/B-F.md)
- [`B/G` — Officer Inventory & Visibility APIs](milestones/B-G.md)
- [`B/H` — Student Bootstrap & Found Submissions](milestones/B-H.md)
- [`B/I` — Officer Submission Review & Physical Receipt](milestones/B-I.md)
- [`B/J` — Physical Return, Distribution & Retention](milestones/B-J.md)
- [`B/K` — Frontend HTTP Integration Gate](milestones/B-K.md)
- [`B/L` — QA, Security Hardening & Operations](milestones/B-L.md)
- [`B/M` — Staging, UAT & Campus Pilot](milestones/B-M.md)

**Sumber code/kontrak:** referensi read-only dari ZIP proyek lokal, bukan hasil build service. Setiap task wajib dicek ulang terhadap kontrak sebelum implementasi.
