# TODO_Backend.md — UBL LostnFound / CampusFind

**Versi:** 2.0 | **Tanggal:** 24 Oktober 2026 | **Status awal:** PLANNED | **Terkait:** `MILESTONES_Backend.md`  
**Scope:** Checklist eksekusi AntiGravity Backend; bukan bukti API/DB sudah terimplementasi.

## 0. Cara membaca dan memperbarui checklist

- Seluruh checkbox di bawah **belum dicentang** saat dokumen dibuat. Jangan beri centang berdasarkan perkiraan atau laporan lisan tanpa bukti.
- Task ID `B/A`–`B/M` adalah rancangan baru; **verifikasi kompatibilitas `MILESTONES.md` lokal dahulu** sebelum menjalankan/catat status. `B0–B4` dalam `BACKEND_MVP.md` adalah fase/checkpoint, bukan ID tugas yang dapat dianggap identik.
- Status valid: `PLANNED` / `IN_PROGRESS` / `BLOCKED` / `COMPLETED`. Tes: `PASS` / `FAIL` / `NOT RUN`. `BLOCKED` tidak dianggap `COMPLETED`.
- Perbedaan kontrak: OpenAPI v1.0 yang diperiksa menetapkan `item_photo_upload_tokens` **tepat 1** untuk ItemCreateRequest/ReceiveRequest, berbeda dengan penjelasan 1–5 pada `BACKEND_MVP.md`. Verifikasi canonical lokal dan laporkan jika berbeda.
- Endpoint inventaris benar: **GET `/api/v1/officer/inventory`**, bukan GET `/api/v1/officer/items`.
- Kode sumber utama `apps/api/`; jangan mengubah `apps/web/` sebelum **Integration Gate** diizinkan. Jangan merombak OpenAPI/ERD, tidak ada nested Git.
- Aturan pengguna: seluruh Markdown `.md`/`.mdx` dan dokumen agent **read-only lokal; jangan commit/push**. Laporan tugas diserahkan di chat atau tersimpan di luar staging Git. Commit mengikuti nama/body yang ditentukan **dokumentasi `.md` yang berlaku** dan menggunakan atribusi manusia yang sah, bukan bot.

**Template laporan satu task (isi saat eksekusi):**

```text
Task ID: B/X.n.m
Status: PLANNED | IN_PROGRESS | BLOCKED | COMPLETED
Sumber kontrak/versi: ...
Files changed: ...
Tests run: command/http case ...
Result: PASS | FAIL | NOT RUN
Evidence: ...
Risks / missing provider / unresolved decision: ...
Commit/push: only if explicitly approved, with SHA ...
Next approval needed: ...
```

## 1. Status ringkas per milestone (awal semuanya PLANNED)

| Milestone | Pekerjaan | Prioritas | Progres terverifikasi | Gate |
|---|---|---|---|---|
| `B/A` | Preflight, Governance & Contract Baseline | P0 | 0/8 PLANNED | B/A approval |
| `B/B` | Foundation, Fastify & Neon Database | P0 | 0/9 PLANNED | Phase Review |
| `B/C` | Public Service Posts & Catalog APIs | P0 | 0/7 PLANNED | Phase Review |
| `B/D` | Neon Auth Identity, RBAC & Scoped Authorization | P0 | 0/7 PLANNED | Phase Review |
| `B/E` | Cloudflare R2 Secure Upload Pipeline | P0 | 0/7 PLANNED | Phase Review |
| `B/F` | Officer Direct Item Registration & Backend MVP Gate | P0 | 0/7 PLANNED | MVP Gate |
| `B/G` | Officer Inventory & Visibility APIs | P1 | 0/6 PLANNED | Phase Review |
| `B/H` | Student Bootstrap & Found Submissions | P1 | 0/7 PLANNED | Phase Review |
| `B/I` | Officer Submission Review & Physical Receipt | P1 | 0/6 PLANNED | Phase Review |
| `B/J` | Physical Return, Distribution & Retention | P1 | 0/6 PLANNED | Phase Review |
| `B/K` | Frontend HTTP Integration Gate | P1 | 0/9 PLANNED | Integration Gate |
| `B/L` | QA, Security Hardening & Operations | P2 | 0/9 PLANNED | Phase Review |
| `B/M` | Staging, UAT & Campus Pilot (Deferred) | P3 | 0/7 PLANNED | Phase Review |

## 2. Daftar tugas granular dan bukti verifikasi

### B/A — Preflight, Governance & Contract Baseline

**Dependency:** Sebelum coding; Frontend MVP Gate dan izin eksplisit  
**Exit:** Dokumen sumber, matriks kontrak, baseline keamanan, dan rencana perubahan disepakati.  
**Gate:** jangan lanjut ke fase berikutnya tanpa review/checkpoint yang relevan.

- [ ] **`B/A.1.0` — Audit sumber lokal dan status Git**
  - **Pekerjaan:** Inventarisasi root/monorepo, AGENTS dan semua .md lokal termasuk hidden folder; git status, branch, runtime, package manager, secrets exposure (tanpa membuka nilainya). Jangan memodifikasi file.
  - **Bukti wajib:** Daftar dokumen/path, git status, toolchain, risiko overwrite.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/A.1.1` — Tetapkan sumber kebenaran**
  - **Pekerjaan:** Validasi OpenAPI v1.0, API Contract v1.0, ERD v6.2, blueprint final, Frontend MVP, standar Clean Code/Git Policy. Gunakan urutan: OpenAPI untuk HTTP, ERD untuk DB, keputusan scope, blueprint untuk guidance.
  - **Bukti wajib:** Manifest versi/hash/asal, tabel konflik dan keputusan.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/A.1.2` — Verifikasi Frontend MVP Gate**
  - **Pekerjaan:** Periksa bukti persetujuan Frontend MVP Gate; jangan menganggap merge atau tes frontend otomatis berarti disetujui pengguna.
  - **Bukti wajib:** Approval tertulis atau status BLOCKED.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/A.1.3` — Petakan roadmap ID**
  - **Pekerjaan:** Bandingkan B0-B4 dari BACKEND_MVP, B1-B6 blueprint, dan ID Backend existing bila ada; jangan menimpa/menebak ID lama. Perlakukan ID B/A-B/M dokumen ini sebagai usulan sampai kompatibilitas disetujui.
  - **Bukti wajib:** Matriks crosswalk dan ID yang disahkan.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/A.2.0` — Inventaris endpoint & DTO**
  - **Pekerjaan:** Petakan seluruh 22 operasi HTTP OpenAPI menjadi owner modul, role, request/response, status code, schema, test; bedakan 3 inti MVP dari pendukung dan lanjutan.
  - **Bukti wajib:** API traceability matrix 22 operasi.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/A.2.1` — Inventaris schema & constraint**
  - **Pekerjaan:** Verifikasi 8 tabel ERD v6.2, kunci dan 12 FK, CHECK/UNIQUE, state transitions, card/data contracts, kebijakan foto.
  - **Bukti wajib:** DB traceability matrix dari sumber kanonis.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/A.2.2` — Periksa dependensi layanan**
  - **Pekerjaan:** Verifikasi Neon dev/test, Neon Auth dev, R2 private bucket, origin CORS, dan izin/akses tanpa menampilkan kredensial; cek kemampuan testing real env.
  - **Bukti wajib:** Matriks READY/BLOCKED/UNVERIFIED per provider.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/A.2.3` — Perencanaan perubahan dan izin coding**
  - **Pekerjaan:** Rinci target file, package scripts, dependency graph, urutan migration/seed, negatif test, sumber daya dev, risiko; minta persetujuan coding sebelum mulai.
  - **Bukti wajib:** Handoff B/A + approval eksplisit.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

**B/A Gate:** audit dan izin coding eksplisit. Jika milestone/canonical docs tidak tersedia, STOP dengan status BLOCKED.

### B/B — Foundation, Fastify & Neon Database

**Dependency:** B/A disetujui; akses DB dev/test tersedia  
**Exit:** Service dapat boot, migration aman, 8 tabel cocok ERD, seed sintetis idempoten.  
**Gate:** jangan lanjut ke fase berikutnya tanpa review/checkpoint yang relevan.

- [ ] **`B/B.1.0` — Inisialisasi backend modular**
  - **Pekerjaan:** Siapkan apps/api pada monorepo yang ada; TypeScript, Fastify, Zod, Drizzle, scripts, lint/test/build; hindari nested Git dan lockfile ganda.
  - **Bukti wajib:** Build/typecheck/lint PASS; struktur modular terverifikasi.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/B.1.1` — Konfigurasi environment aman**
  - **Pekerjaan:** Validasi env saat startup, pemisahan dev/test, fail-fast, log redaction dan .env.example berisi nama variabel saja. Gunakan koneksi DB pooled untuk runtime dan direct untuk migration.
  - **Bukti wajib:** Tes missing/invalid env, secret scan PASS.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/B.1.2` — Bootstrap dan error envelope**
  - **Pekerjaan:** Registrasi plugin/router, request_id, uniform {error:{code,message,request_id}}, response serialization berdasar OpenAPI; health check hanya bila dikonfirmasi internal/nonpublik.
  - **Bukti wajib:** Fastify inject tests dan schema error.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/B.2.0` — Definisi Drizzle 8 tabel**
  - **Pekerjaan:** Model users, service_posts, service_post_photos, found_submissions, submission_status_history, found_items, item_photos, item_returns sesuai ERD v6.2; jangan menambah tabel sesuka hati.
  - **Bukti wajib:** Schema review field, type, constraint, indeks dan FKs.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/B.2.1` — Migration terkontrol**
  - **Pekerjaan:** Generate migration Drizzle dari schema; jalankan terhadap DB dev/test via direct connection; catat versi, rollback/restore plan dan uji lintasan migrasi dari DB bersih.
  - **Bukti wajib:** Migration log tanpa DSN, tabel/constraint query bukti.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/B.2.2` — Ketentuan relasi dan status**
  - **Pekerjaan:** Implementasi FK, NOT NULL, UNIQUE, CHECK, model foto, fixed role STUDENT/OFFICER, penyimpanan status; jangan menyamakan status laporan dengan inventaris.
  - **Bukti wajib:** Negative constraint tests dan review ERD parity.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/B.3.0` — Seed sintetis idempoten**
  - **Pekerjaan:** Buat data pengujian deterministik: pos, referensi user dengan ID dev yang sah, STORED visible/hidden, RETURNED_TO_OWNER/DISTRIBUTED, foto yang tidak berpura-pura tersedia; >10 publik jika layak menguji paginasi.
  - **Bukti wajib:** Seed dua kali tanpa duplikasi; count dan FK valid.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/B.3.1` — DB integration harness**
  - **Pekerjaan:** Siapkan test DB/isolated branch, fixtures cleanup transaksi, fake time bila perlu, koneksi ditutup bersih; hindari data pribadi nyata.
  - **Bukti wajib:** Repeatable DB tests di lingkungan nyata.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/B.3.2` — Bukti koneksi dan baseline**
  - **Pekerjaan:** Jalankan build/lint/typecheck/unit/migration/seed/read query; semua hasil dinyatakan PASS/FAIL/NOT RUN.
  - **Bukti wajib:** Gate B/B dengan output dan risk list.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

### B/C — Public Service Posts & Catalog APIs

**Dependency:** B/B; canonical OpenAPI tervalidasi  
**Exit:** Public endpoints benar-benar baca Neon, filter publikasi aman, DTO tanpa PII.  
**Gate:** jangan lanjut ke fase berikutnya tanpa review/checkpoint yang relevan.

- [x] **`B/C.1.0` — Kontrak public DTO**
  - **Pekerjaan:** Bentuk serializer/schema Post dan FoundItemPublic sesuai OpenAPI; hanya field allowlist; jangan expose private notes, email, NIM, atau R2 storage_path.
  - **Bukti wajib:** Response schema tests dan PII leak regression.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

- [x] **`B/C.1.1` — GET /posts**
  - **Pekerjaan:** Implementasi listing service posts yang didefinisikan OpenAPI, pagination/default sesuai parameter kanonis, dan metadata publik yang sah.
  - **Bukti wajib:** HTTP 200 + schema/empty/pagination dari Neon.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

- [x] **`B/C.1.2` — GET /posts/{post_id}**
  - **Pekerjaan:** Implementasi detail pos termasuk galeri 0..3 foto melalui mekanisme URL baca sesuai kebijakan; foto pos bukan foto item.
  - **Bukti wajib:** 200/404, cover order 1, no raw object key.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

- [x] **`B/C.2.0` — GET /items**
  - **Pekerjaan:** Enforce status=STORED AND is_visible=true sebelum sort/pagination/count; filter q/category/post_id dan sort allowlist; limit <=10 mengikuti OpenAPI.
  - **Bukti wajib:** 200 empty/filter/sort/page/tie-break + hidden exclusion.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

- [x] **`B/C.2.1` — GET /items/{item_id}**
  - **Pekerjaan:** Validasi UUID/path; hidden/non-STORED/tidak ada hasil 404; DTO publik konsisten dan URL foto aman.
  - **Bukti wajib:** 200 public, 404 x3, no private columns.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

- [x] **`B/C.2.2` — Performa/query defensif**
  - **Pekerjaan:** Query terparameterisasi, indeks berdasarkan pola filter/sort yang nyata, tie breaker item_id, reasonable limits; cek page overflow dan SQLi search.
  - **Bukti wajib:** EXPLAIN bila perlu, SQLi case, index review.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

- [x] **`B/C.2.3` — Tes kontrak HTTP publik**
  - **Pekerjaan:** Gunakan Fastify inject + HTTP server nyata dengan DB dev/test; uji invalid query, error envelope, unknown paths, negative privacy.
  - **Bukti wajib:** Bukti PASS sesuai OpenAPI v1.0.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

### B/D — Neon Auth Identity, RBAC & Scoped Authorization

**Dependency:** B/B; Neon Auth dev siap  
**Exit:** Verified JWT server-side, role/pos dari DB, semua akses privat dibatasi.  
**Gate:** jangan lanjut ke fase berikutnya tanpa review/checkpoint yang relevan.

- [x] **`B/D.1.0` — Neon Auth JWT verifier**
  - **Pekerjaan:** Gunakan verifikasi JWT/JWKS yang didukung SDK official; cek issuer, audience bila dibutuhkan, expiration, tampered/missing token. Jangan gunakan bypass auth di test E2E nyata.
  - **Bukti wajib:** 401 untuk token salah/kedaluwarsa/tanpa token.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

- [x] **`B/D.1.1` — Mapping identity user**
  - **Pekerjaan:** Gunakan users.Neon Auth_user_id VARCHAR(255) NOT NULL UNIQUE, user_id UUID; jangan mengambil role dari token/body tanpa cek DB.
  - **Bukti wajib:** User mapping tests, missing profile 404 sesuai kontrak.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

- [x] **`B/D.1.2` — Role dan pos policy**
  - **Pekerjaan:** Implementasikan requireRole STUDENT/OFFICER dan resolved assigned post dari service_posts.officer_user_id; scope query ke post yang benar.
  - **Bukti wajib:** 403 role salah, 403/404 cross-post, direct param spoof ditolak.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

- [x] **`B/D.2.0` — GET /me**
  - **Pekerjaan:** Kembalikan Me DTO terverifikasi; jangan otomatis create profile; profile belum ada -> 404 PROFILE_NOT_FOUND sesuai OpenAPI.
  - **Bukti wajib:** 200 profile, 401 unauthenticated, 404 not-onboarded.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

- [x] **`B/D.2.1` — Officer provisioning trust boundary**
  - **Pekerjaan:** Dokumentasikan onboarding petugas oleh operator tepercaya; tidak ada public officer signup atau role ADMIN DB. Hak offboarding/provisioning tidak ditambahkan sebagai API publik.
  - **Bukti wajib:** Negative privilege escalation tests.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

- [x] **`B/D.2.2` — Error/CORS/rate guard**
  - **Pekerjaan:** Konfigurasi origin allowlist, headers, per-route limiter sesuai kebijakan, request logging dengan token/email/NIM redacted.
  - **Bukti wajib:** CORS preflight, 429 abuse, sanitized errors.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

- [x] **`B/D.2.3` — Security test identity**
  - **Pekerjaan:** Test missing/forged/expired JWT, POST role spoof, status spoof, IDOR dan boundary unauthenticated; gunakan accounts dev nyata hanya untuk E2E bila tersedia.
  - **Bukti wajib:** Matriks 401/403/404 + evidence.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

### B/E — Cloudflare R2 Secure Upload Pipeline

**Dependency:** B/D; private R2 dev bucket siap  
**Exit:** Upload intent, signed PUT, finalize, token purpose-bound, private object store.  
**Gate:** jangan lanjut ke fase berikutnya tanpa review/checkpoint yang relevan.

- [x] **`B/E.1.0` — R2 adapter & config**
  - **Pekerjaan:** Konfigurasi akses privat S3-compatible, bucket CORS exact, no public permanent URL, storage path random, validasi env; jangan log presigned URL.
  - **Bukti wajib:** Konfigurasi redacted dan bucket private check.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

- [x] **`B/E.1.1` — POST /uploads/intents**
  - **Pekerjaan:** Autorisasi hanya STUDENT REPORT_PHOTO atau OFFICER ITEM_PHOTO; allowlist JPEG/PNG/WebP <=5 MiB, 5-menit signed PUT sesuai OpenAPI.
  - **Bukti wajib:** 201 success; 401/403/422 dan abuse tests.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

- [x] **`B/E.1.2` — Signed PUT direct-to-R2**
  - **Pekerjaan:** Uji browser/HTTP PUT terhadap URL sementara, header wajib; tanpa mengirim data biner melalui JSON Fastify.
  - **Bukti wajib:** Object exists in private R2 dev bucket.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

- [x] **`B/E.2.0` — POST /uploads/{upload_id}/finalize**
  - **Pekerjaan:** Verifikasi intent ownership/purpose/TTL dan object existence, byte size, MIME dan actual signature/content; token upload signed 15 menit.
  - **Bukti wajib:** 200 finalize sah; spoof/expired/missing object gagal.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

- [x] **`B/E.2.1` — Token replay & privacy**
  - **Pekerjaan:** Ikatan user+purpose+object; single-use melalui constraint storage_path unik dan transaksi saat consume; revoke/cleanup orphan sesuai desain yang disetujui.
  - **Bukti wajib:** Cross-user token, wrong-purpose, double-consume ditolak.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

- [x] **`B/E.2.2` — Signed image reads**
  - **Pekerjaan:** Sediakan URL baca singkat hanya pada DTO/route yang telah ditentukan kontrak; jangan buat public read endpoint baru tanpa izin.
  - **Bukti wajib:** Unauth private access denied; public eligible photo accessible via timed URL.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

- [x] **`B/E.2.3` — R2 integration/security tests**
  - **Pekerjaan:** Uji MIME spoof, oversized, duplicate finalize, wrong role, expired URL/token, orphan cleanup (terjadwal jika dirancang).
  - **Bukti wajib:** Test logs + bukti private bucket; not mock-only.
  - **Status:** COMPLETED | **Tes:** PASS | **Penanggung jawab:** Arlene Nero.

### B/F — Officer Direct Item Registration & Backend MVP Gate

**Dependency:** B/B, B/C, B/D, B/E  
**Exit:** OFFICER membuat satu barang beserta foto nyata; DB & R2 konsisten.  
**Gate:** jangan lanjut ke fase berikutnya tanpa review/checkpoint yang relevan.

- [ ] **`B/F.1.0` — POST /officer/items contract**
  - **Pekerjaan:** Implementasikan request ItemCreateRequest snake_case: item_name, category, public_description, opsi valid, item_photo_upload_tokens tepat 1 menurut OpenAPI final yang tersedia.
  - **Bukti wajib:** Contract validation + 422 untuk 0/>1 token.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/F.1.1` — Server-derived post & actor**
  - **Pekerjaan:** Officer wajib memiliki assignment pada DB; jangan menerima post_id client untuk override pos; public/private fields dibedakan.
  - **Bukti wajib:** Cross-post escalation tests.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/F.1.2` — Transaction item + photo**
  - **Pekerjaan:** Konsumsi token ITEM_PHOTO sah; insert found_items dan item_photos dengan satu primary, inventory code yang aman/unik; transaksi rollback jika gagal.
  - **Bukti wajib:** 201 response; unique, partial failure rollback.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/F.2.0` — State and visibility rules**
  - **Pekerjaan:** Status awal dan is_visible mengikuti kontrak/ERD dan keputusan yang telah diverifikasi; tidak auto-publish dengan asumsi.
  - **Bukti wajib:** State assertion dan visibility regression.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/F.2.1` — End-to-end real providers**
  - **Pekerjaan:** Dengan token Neon Auth OFFICER dev dan file R2 nyata: intent → PUT → finalize → POST; cek persisted row dan API yang sah.
  - **Bukti wajib:** 201 HTTP + DB rows + referenced R2 object.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/F.2.2` — Negative/concurrency cases**
  - **Pekerjaan:** No token, STUDENT, no assigned post, wrong image token, replay, invalid data, simultaneous POST; status code tepat menurut kontrak.
  - **Bukti wajib:** 401/403/409/422 sesuai test yang relevan.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/F.2.3` — Backend MVP Gate review**
  - **Pekerjaan:** Kompilasi bukti B/B-B/F: migration+seed, GET catalog/detail, 201 officer post + R2/Neon Auth, security, lint/build/test. STOP untuk persetujuan; tidak mengklaim selesai bila provider BLOCKED.
  - **Bukti wajib:** Approval eksplisit sebelum integrasi; status PASS/FAIL/NOT RUN.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

**BACKEND MVP GATE — STOP:** laporan 3 endpoint inti + 2 upload endpoint pendukung, migration, Neon Auth/R2 nyata, test negatif. Tunggu persetujuan sebelum UI integration.

### B/G — Officer Inventory & Visibility APIs

**Dependency:** B/F; dapat dikerjakan sebelum/bersama integrasi hanya setelah izin  
**Exit:** Inventaris privat per pos tanpa kebocoran, detail/visibility dan overdue sesuai kontrak.  
**Gate:** jangan lanjut ke fase berikutnya tanpa review/checkpoint yang relevan.

- [ ] **`B/G.1.0` — GET /officer/inventory**
  - **Pekerjaan:** Query assigned post, filter status/page/limit dari OpenAPI, private DTO officer; jangan gunakan GET /officer/items (tidak ada dalam kontrak).
  - **Bukti wajib:** 200 assigned-post scoped, 401/403 cross-role.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/G.1.1` — GET /officer/items/{item_id}**
  - **Pekerjaan:** Kembalikan detail inventaris lengkap termasuk private_verification_notes hanya petugas pos berhak.
  - **Bukti wajib:** 200 valid, 403/404 pos lain, response allowlist.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/G.1.2` — PATCH /officer/items/{item_id}/visibility**
  - **Pekerjaan:** Ubah is_visible hanya STORED sesuai rules; jangan mengubah status fisik; transaksi dan guard post.
  - **Bukti wajib:** 200, 409 invalid-state, public listing reflects change.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/G.2.0` — GET /officer/inventory/overdue**
  - **Pekerjaan:** Hitung overdue dinamis dari received_at dan storage_limit_days >0, only STORED; bukan auto-status. NULL limit berarti tak berbatas.
  - **Bukti wajib:** 200 exact boundary, no auto mutation.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/G.2.1` — Dashboard backend query mapping**
  - **Pekerjaan:** Petakan ringkasan Dashboard dari operasi OpenAPI yang ada; jika metrik khusus belum ada endpoint, dokumentasikan gap dan minta izin sebelum menambah endpoint.
  - **Bukti wajib:** No invented analytics endpoint; DB-backed display truthful.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/G.2.2` — Query/visibility regression**
  - **Pekerjaan:** Uji pagination authorized, invalid status, cross-post resource ID, is_visible toggle, data race and privacy.
  - **Bukti wajib:** HTTP integration + DB evidence.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

### B/H — Student Bootstrap & Found Submissions

**Dependency:** B/D, B/E; setelah MVP approval  
**Exit:** Mahasiswa terverifikasi Neon Auth membuat/melihat/membatalkan laporan barang ditemukan.  
**Gate:** jangan lanjut ke fase berikutnya tanpa review/checkpoint yang relevan.

- [ ] **`B/H.1.0` — POST /me/bootstrap**
  - **Pekerjaan:** Setelah Neon Auth verified email: create STUDENT profile dengan student_number self-declared, bukan verifikasi status akademik; jangan mengizinkan self-assign OFFICER.
  - **Bukti wajib:** 201 sesuai kontrak, conflict/missing email checks.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/H.1.1` — POST /submissions**
  - **Pekerjaan:** STUDENT create report dengan satu REPORT_PHOTO upload token, target_post_id yang sah dan field OpenAPI; status awal PENDING_RECEIPT + history awal transaksional.
  - **Bukti wajib:** 201 with DB+R2+history, wrong-purpose denied.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/H.1.2` — GET /submissions/me**
  - **Pekerjaan:** Daftar laporan milik akun yang login, filter/page dari kontrak, tanpa menampilkan laporan mahasiswa lain.
  - **Bukti wajib:** Owner-only list, pagination and empty.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/H.2.0` — GET /submissions/{submission_id}**
  - **Pekerjaan:** Kembalikan detail/history hanya untuk owner atau petugas yang berwenang sesuai OpenAPI, konsisten concealment 403/404.
  - **Bukti wajib:** Owner/cross-user/assigned officer tests.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/H.2.1` — POST /submissions/{submission_id}/cancel**
  - **Pekerjaan:** Hanya pemilik yang boleh cancel status PENDING_RECEIPT; alasan nonblank, transisi dan history atomik.
  - **Bukti wajib:** 200 success, 409 invalid state, 403 cross-user.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/H.2.2` — State machine submission**
  - **Pekerjaan:** Jaga PENDING_RECEIPT -> RECEIVED/REJECTED/CANCELLED hanya lewat role-appropriate route; conflict/race ditolak.
  - **Bukti wajib:** Transition matrix tests + immutable history.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/H.2.3` — Penyalahgunaan student auth**
  - **Pekerjaan:** Uji email tidak diverifikasi, NIM duplikat sesuai ERD, rate abuse, request role spoof, tidak ada KTP/NIK/foto identitas.
  - **Bukti wajib:** Negative security and privacy evidence.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

### B/I — Officer Submission Review & Physical Receipt

**Dependency:** B/G, B/H  
**Exit:** Petugas memproses laporan masuk secara atomik dan membuat inventaris fisik.  
**Gate:** jangan lanjut ke fase berikutnya tanpa review/checkpoint yang relevan.

- [ ] **`B/I.1.0` — GET /officer/submissions**
  - **Pekerjaan:** List laporan menuju assigned post saja; status/page/filter sesuai OpenAPI; tidak bocor ke petugas pos lain.
  - **Bukti wajib:** 200 scoped, role and cross-post tests.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/I.1.1` — POST /officer/submissions/{submission_id}/receive**
  - **Pekerjaan:** Verifikasi status pending, kepemilikan post dan penyerahan fisik, konsumsi tepat satu ITEM_PHOTO token (beda foto laporan), buat found_items + item_photos.
  - **Bukti wajib:** 201 sesuai schema, one inventory per source_submission_id.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/I.1.2` — Receive atomicity**
  - **Pekerjaan:** Transaksi ubah submission.status=RECEIVED, append history, insert item+photo dan uniqueness; request simultan tidak menggandakan barang.
  - **Bukti wajib:** Race tests, DB unchanged on failure.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/I.2.0` — POST /officer/submissions/{submission_id}/reject**
  - **Pekerjaan:** Tolak laporan PENDING_RECEIPT dengan reason nonblank; event history disimpan, scoped by post.
  - **Bukti wajib:** 200/409/403, reason-history evidence.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/I.2.1` — Foto report vs inventory**
  - **Pekerjaan:** Pisahkan report_photo_path dengan item_photos; galeri foto pos service_post_photos tidak boleh tercampur.
  - **Bukti wajib:** Data path/DTO tests.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/I.2.2` — Review/status tests**
  - **Pekerjaan:** Jalankan cross-post, duplicate receive, cancel-then-receive, reject-then-receive, forged status.
  - **Bukti wajib:** Integration race + invariant test matrix.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

### B/J — Physical Return, Distribution & Retention

**Dependency:** B/G, B/I  
**Exit:** Siklus fisik item selesai dengan status/visibilitas konsisten dan audit.  
**Gate:** jangan lanjut ke fase berikutnya tanpa review/checkpoint yang relevan.

- [ ] **`B/J.1.0` — POST /officer/items/{item_id}/return**
  - **Pekerjaan:** Hanya STORED pada pos berwenang, recipient_name dan verification_summary nonblank; verification_confirmed_at, create 1 item_returns, status RETURNED_TO_OWNER, is_visible=false.
  - **Bukti wajib:** 201 with DB transaction, 409 duplicate/concurrent.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/J.1.1` — Return ownership practice**
  - **Pekerjaan:** Verifikasi kepemilikan dilakukan langsung oleh petugas secara offline; jangan simpan KTP/NIK/foto identitas dan jangan buat klaim online.
  - **Bukti wajib:** Privacy check, SOP placeholder requiring campus approval.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/J.1.2` — POST /officer/items/{item_id}/distribute**
  - **Pekerjaan:** Hanya STORED; penyaluran manual -> DISTRIBUTED dan is_visible=false tanpa membuat item_returns.
  - **Bukti wajib:** 200 success, invalid state 409, public disappears.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/J.2.0` — Overdue policy & no automation**
  - **Pekerjaan:** Perhatikan storage_limit_days: NULL berarti tak terbatas, >0 dihitung; barang overdue tetap STORED sampai keputusan petugas.
  - **Bukti wajib:** Boundary tests dan tidak ada cron auto-distribute.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/J.2.1` — Race conditions & exactly once**
  - **Pekerjaan:** Parallel return/distribute, repeated request, wrong assigned post, invalid visibility/state; transaksi/index UNIQUE untuk anti-duplikasi.
  - **Bukti wajib:** Concurrent integration test and uniqueness evidence.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/J.2.2` — History and data retention review**
  - **Pekerjaan:** Catat audit yang diizinkan skema, jangan tambah tabel tanpa approval, review kebijakan retensi/koreksi data bersama pengelola.
  - **Bukti wajib:** Decision register dan test untuk data integrity.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

### B/K — Frontend HTTP Integration Gate

**Dependency:** B/F Gate disetujui + izin terpisah mengubah apps/web  
**Exit:** Frontend HTTP adapter mengganti mock pada alur yang benar-benar tersedia.  
**Gate:** jangan lanjut ke fase berikutnya tanpa review/checkpoint yang relevan.

- [ ] **`B/K.1.0` — Integrasi scope dan izin**
  - **Pekerjaan:** Konfirmasi approval khusus sebelum menyentuh apps/web. Audit adapter mock/interface dan UI F/A-F/C; semua route hasil integrasi harus ada di OpenAPI.
  - **Bukti wajib:** Frontend diff plan dan approval record.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/K.1.1` — HTTP client/config**
  - **Pekerjaan:** Gunakan runtime API base URL dari env, typed DTO snake_case, error envelope, timeouts/retry konservatif, token injection aman dari Neon Auth.
  - **Bukti wajib:** No hardcoded prod URL or leaked JWT.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/K.1.2` — Guest list/detail**
  - **Pekerjaan:** Hubungkan katalog/detail ke GET /items dan /items/{id} hanya; validasi limit10, hidden 404, loading/error/empty responsif.
  - **Bukti wajib:** Browser E2E against real Neon-backed API.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/K.2.0` — Officer register and upload**
  - **Pekerjaan:** UI satu foto: POST intent -> presigned PUT -> finalize -> POST /officer/items; error/retry aman, status tidak auto-publish palsu.
  - **Bukti wajib:** End-to-end photo+DB persisted evidence.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/K.2.1` — Officer inventory/detail**
  - **Pekerjaan:** Hubungkan ke GET /officer/inventory dan GET /officer/items/{id}; dashboard hanya metrik yang didukung kontrak.
  - **Bukti wajib:** Private record access via officer, no public DTO misuse.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/K.2.2` — Visibility & state sync**
  - **Pekerjaan:** PATCH visibility sesuai konfirmasi UI dan server; re-fetch/invalidate cache; mock features yang tidak terintegrasi diberi label jujur.
  - **Bukti wajib:** UI state persists across refresh, 403/409 UX.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/K.3.0` — Student & review integration**
  - **Pekerjaan:** Setelah B/H-B/J dan izin role scope, hubungkan Student report dan Officer receive/return/distribute secara bertahap; jangan klaim ini termasuk MVP Gate.
  - **Bukti wajib:** Separate E2E per role, no scope creep.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/K.3.1` — End-to-end full flow**
  - **Pekerjaan:** Uji petugas create → row + R2 → assigned inventory → Guest jika visible STORED; siswa report → receive → return/distribute hanya setelah semua milestone terkait completed.
  - **Bukti wajib:** Screenshot/test logs/DB row checks.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/K.3.2` — Frontend regression & accessibility**
  - **Pekerjaan:** Lint/typecheck/build/test aplikasi web/API, browser mobile/desktop, focus/empty/error, no mock leakage.
  - **Bukti wajib:** Integration Gate report PASS/FAIL/NOT RUN.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

**INTEGRATION GATE — STOP:** tuntaskan hanya alur yang memang hidup di HTTP; catat mock tersisa dan tunggu persetujuan.

### B/L — QA, Security Hardening & Operations

**Dependency:** Setelah milestone fitur yang relevan; sebelum staging  
**Exit:** Negative regression, observability, backup restore terbukti di test/staging.  
**Gate:** jangan lanjut ke fase berikutnya tanpa review/checkpoint yang relevan.

- [ ] **`B/L.1.0` — Contract coverage**
  - **Pekerjaan:** Setiap dari 22 operasi OpenAPI punya request/response validation dan skenario positive/negative; no undocumented public routes.
  - **Bukti wajib:** 22-endpoint coverage matrix with status.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/L.1.1` — Security attack matrix**
  - **Pekerjaan:** Uji BOLA/IDOR (owner/post), SQLi, privilege escalation, CORS, JSON/body limit, upload MIME spoof, replay, error disclosure.
  - **Bukti wajib:** S01-S22 blueprint review dan evidence.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/L.1.2` — Race/transaction proof**
  - **Pekerjaan:** Stress duplicate receive, return, distribute, upload token replay; hanya satu hasil domain yang sah.
  - **Bukti wajib:** Concurrent test logs dan invariant queries.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/L.2.0` — Dependency & secret scanning**
  - **Pekerjaan:** Audit dependency risk, secrets in staged files, package vulnerabilities; documented risk acceptance jika ada.
  - **Bukti wajib:** Audit output dan remediation list.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/L.2.1` — CI read-only human commits**
  - **Pekerjaan:** CI hanya lint/typecheck/test/build/scan, permission contents:read; jangan jalankan bot auto-commit/push, never stage .md/.mdx per kebijakan pengguna.
  - **Bukti wajib:** Workflow review + git log author/committer.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/L.2.2` — Performance/limits**
  - **Pekerjaan:** Ukur response katalog/sort pada data uji realistis, index usage, rate limits, startup/env failure; jangan klaim SLO tanpa pengukuran.
  - **Bukti wajib:** Bench measurement dan thresholds agreed.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/L.3.0` — Logging/monitoring**
  - **Pekerjaan:** Request ID dan sanitized logs, errors/5xx, auth failures, R2 upload errors, DB metrics; jangan log token/PII/presigned URL.
  - **Bukti wajib:** Sample sanitized logs/alerts.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/L.3.1` — Backup & recovery rehearsal**
  - **Pekerjaan:** Buktikan restore Neon dev/staging branch serta metadata/foto R2, cek referential consistency, tetapkan RPO/RTO bersama operator.
  - **Bukti wajib:** Restore drill record dan rollback procedure.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/L.3.2` — Hardening Gate**
  - **Pekerjaan:** Audit integrasi dan security dengan status PASS/FAIL/NOT RUN, severity, ownership, blocker; STOP bila critical belum tertangani.
  - **Bukti wajib:** Security release readiness report.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

### B/M — Staging, UAT & Campus Pilot (Deferred)

**Dependency:** B/L disetujui; persetujuan eksplisit kampus/pengguna  
**Exit:** Lingkungan pilot terbatas dengan persetujuan, SOP, rollback, evaluasi.  
**Gate:** jangan lanjut ke fase berikutnya tanpa review/checkpoint yang relevan.

- [ ] **`B/M.1.0` — Persetujuan operasional**
  - **Pekerjaan:** Tentukan pengelola, petugas resmi, pemilik data, SOP verifikasi pemilik, data retention, privacy notice; tanpa menganggap kampus memberi izin.
  - **Bukti wajib:** Signed approval/UAT plan atau BLOCKED.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/M.1.1` — Staging environment**
  - **Pekerjaan:** Siapkan env terpisah dan domain/HTTPS sesuai izin; migration/seed uji; buka Swagger terbatas, tidak mengumbar debug.
  - **Bukti wajib:** Staging smoke test dan secret-safe config.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/M.1.2` — UAT alur nyata**
  - **Pekerjaan:** Uji penerimaan temuan, registrasi langsung, public catalog, laporan student, retur/penyaluran jika scope disetujui.
  - **Bukti wajib:** UAT matrix with named roles not PII.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/M.2.0` — Deployment guard**
  - **Pekerjaan:** Lakukan deploy hanya setelah approval eksplisit, migration preview, rollback dan backup checkpoint. Tidak menyentuh produksi tanpa izin.
  - **Bukti wajib:** Release signoff / rollback plan.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/M.2.1` — Pilot Pos Pengajaran**
  - **Pekerjaan:** Aktifkan hanya Pos Pengajaran, pos lainnya disiapkan secara skema tetapi tidak diaktifkan tanpa keputusan.
  - **Bukti wajib:** Pilot scope approval and measured outcomes.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/M.2.2` — Operasional & handoff**
  - **Pekerjaan:** Siapkan incident contact, credential rotation SOP, support FAQ, maintenance and bug backlog; bukti transfer pengetahuan.
  - **Bukti wajib:** Operator runbook locally, no secrets.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

- [ ] **`B/M.2.3` — Pilot exit review**
  - **Pekerjaan:** Evaluasi usability, stability, privacy, defects, next backlog; jangan klaim production-ready otomatis.
  - **Bukti wajib:** UAT/lessons learned with go/no-go.
  - **Status:** PLANNED | **Tes:** NOT RUN | **Penanggung jawab:** belum ditetapkan.

**PILOT GATE — STOP:** tidak deploy tanpa persetujuan pengguna dan otoritas kampus yang relevan.

## 3. Checklist terpisah — API contract coverage (22 operasi)

**Pakai untuk QA, bukan implementasi ulang:** tiap operasi wajib request/response schema test, positive case, auth/ownership negative case yang relevan, observability, dan evidence HTTP nyata pada Neon dev/test.

| Test ID | HTTP endpoint | Owner | Test contract | Test auth/negative | E2E HTTP/DB |
|---|---|---|---|---|---|

| API-01 | `GET /api/v1/posts` | `B/C` | ☑ | ☑ | ☑ |
| API-02 | `GET /api/v1/posts/{post_id}` | `B/C` | ☑ | ☑ | ☑ |
| API-03 | `GET /api/v1/items` | `B/C` | ☑ | ☑ | ☑ |
| API-04 | `GET /api/v1/items/{item_id}` | `B/C` | ☑ | ☑ | ☑ |
| API-05 | `GET /api/v1/me` | `B/D` | ☑ | ☑ | ☑ |
| API-06 | `POST /api/v1/me/bootstrap` | `B/H` | ☐ | ☐ | ☐ |
| API-07 | `POST /api/v1/submissions` | `B/H` | ☐ | ☐ | ☐ |
| API-08 | `GET /api/v1/submissions/me` | `B/H` | ☐ | ☐ | ☐ |
| API-09 | `GET /api/v1/submissions/{submission_id}` | `B/H` | ☐ | ☐ | ☐ |
| API-10 | `POST /api/v1/submissions/{submission_id}/cancel` | `B/H` | ☐ | ☐ | ☐ |
| API-11 | `GET /api/v1/officer/submissions` | `B/I` | ☐ | ☐ | ☐ |
| API-12 | `POST /api/v1/officer/submissions/{submission_id}/receive` | `B/I` | ☐ | ☐ | ☐ |
| API-13 | `POST /api/v1/officer/submissions/{submission_id}/reject` | `B/I` | ☐ | ☐ | ☐ |
| API-14 | `GET /api/v1/officer/inventory` | `B/G` | ☐ | ☐ | ☐ |
| API-15 | `GET /api/v1/officer/inventory/overdue` | `B/G` | ☐ | ☐ | ☐ |
| API-16 | `POST /api/v1/officer/items` | `B/F` | ☐ | ☐ | ☐ |
| API-17 | `GET /api/v1/officer/items/{item_id}` | `B/G` | ☐ | ☐ | ☐ |
| API-18 | `PATCH /api/v1/officer/items/{item_id}/visibility` | `B/G` | ☐ | ☐ | ☐ |
| API-19 | `POST /api/v1/officer/items/{item_id}/return` | `B/J` | ☐ | ☐ | ☐ |
| API-20 | `POST /api/v1/officer/items/{item_id}/distribute` | `B/J` | ☐ | ☐ | ☐ |
| API-21 | `POST /api/v1/uploads/intents` | `B/E` | ☑ | ☑ | ☑ |
| API-22 | `POST /api/v1/uploads/{upload_id}/finalize` | `B/E` | ☑ | ☑ | ☑ |

**Catatan:** `☐` bukan hasil uji. Tandai tiap sel hanya setelah evidence PASS; jika tidak bisa dijalankan, catat NOT RUN dan alasan. Tidak semua status HTTP berlaku untuk seluruh operasi; lihat OpenAPI per route.

## 4. Checklist invariant lintas modul

- [ ] **DB-01**: Verifikasi persis 8 tabel ERD v6.2, semua FK dan constraints sebelum migrasi; jangan ambil struktur dari roadmap ringkas saja.
- [ ] **DB-02**: Users mapping Neon Auth `Neon Auth_user_id` unique & nonnull, role STUDENT/OFFICER saja; assignment petugas via DB.
- [ ] **DB-03**: Report statuses dan item statuses tidak tertukar; transition dan audit history atomik.
- [ ] **DB-04**: Foto mahasiswa tepat satu report_photo_path; item tepat satu utama; service_post_photos 0..3 dengan cover 1.
- [ ] **DB-05**: RETURNED_TO_OWNER menciptakan satu item_returns dan menyembunyikan item; DISTRIBUTED tidak menciptakan item_returns.
- [ ] **API-SEC-01**: Semua public DTO allowlist tanpa email/NIM, private notes, upload token, raw R2 key.
- [ ] **API-SEC-02**: Guest bukan role DB; public visible filter dilakukan sebelum pagination/sort.
- [ ] **API-SEC-03**: Role/status/post/body/client params tidak pernah menjadi sumber izin akses.
- [ ] **API-SEC-04**: SQL search/sort terparameterisasi dan allowlist; error sanitized.
- [ ] **API-SEC-05**: R2 private, MIME+magic-byte+size, TTL, ownership, purpose, replay, signed read.
- [ ] **API-SEC-06**: Pagination `limit` <=10 mengikuti OpenAPI; metadata `page`, `limit`, `total`, `total_pages`.
- [ ] **OPS-01**: Test truthfulness PASS/FAIL/NOT RUN, tidak ada klaim provider jika hanya mock.
- [ ] **OPS-02**: Tidak ada repo AI `.md`, `.mdx`, `.env`, credentials, tokens dalam staged diff/remote; jangan pakai GitHub bot auto-commit.

## 5. Checkpoint approval dan stop conditions

| Gate | Syarat | Hasil awal |
|---|---|---|
| B/A Preflight | Dokumen canonical lengkap, scope disepakati, Frontend MVP Gate diterima, izin coding | NOT RUN |
| B/B Database | DB real, migration 8 tabel, seed idempotent, tests | NOT RUN |
| B/C Public GET | Public GET dari DB, privacy/404/pagination sesuai OpenAPI | NOT RUN |
| B/F Backend MVP | Neon Auth/R2/POST 201 nyata + GET, contract/negative tests | NOT RUN |
| B/K Integration | Izin khusus mengubah frontend, E2E HTTP+DB nyata | NOT RUN |
| B/L Security | Threat matrix, backup/restore, no critical unresolved | NOT RUN |
| B/M Pilot | Kampus/UAT/pemilik sistem menyetujui operasional | NOT RUN |

**Aturan gagal:** Bila gate belum PASS atau belum ada approval, STOP. Boleh melaporkan subtask yang telah lulus secara parsial, tetapi dilarang melabeli milestone penuh COMPLETED.

## 6. Matriks risiko dan keputusan terbuka

- [ ] **R-01** Audit mismatch foto BACKEND_MVP 1–5 vs OpenAPI final tepat 1.
- [ ] **R-02** Pastikan sumber DBML canonical lengkap (detail constraint 8 tabel).
- [ ] **R-03** Pastikan original Frontend milestones tidak memiliki penomoran backend yang bentrok.
- [ ] **R-04** Pastikan instance Neon dev/test, Neon Auth dev dan R2 private nyata sudah disiapkan.
- [ ] **R-05** Pastikan officer provisioning dan SOP identitas disetujui pengelola.
- [ ] **R-06** Pastikan mekanisme post-gallery signed read sesuai kontrak tanpa memperkenalkan upload CRUD publik baru.
- [ ] **R-07** Pastikan status awal/visibility direct create konsisten OpenAPI/ERD.
- [ ] **R-08** Pastikan retensi foto dan kebijakan privasi diuji sebelum pilot.
- [ ] **R-09** Pastikan source project lokal tetap tidak berubah oleh rekonstruksi frontend repo lain.
- [ ] **R-10** Jangan otomatis menganggap merge GitHub atau CI PASS sebagai persetujuan setiap gate.

## 7. Handoff / penutupan sesi kerja

Pada akhir sesi, kirim: ID task terakhir, status dan bukti; file kode yang diubah; sumber kontrak/versi; perintah uji dan hasil; daftar negatif test; risiko/BUG; screenshot atau ringkasan HTTP (tanpa rahasia); commit SHA/URL hanya bila memang diizinkan; gate berikutnya dan persetujuan yang dibutuhkan. **Tidak melakukan coding backend secara otomatis hanya karena dokumen ini dibuat.**



## Peta detail per milestone

- [`B/A`](milestones/B-A.md): 8 task — seluruhnya `PLANNED`.
- [`B/B`](milestones/B-B.md): 9 task — seluruhnya `PLANNED`.
- [`B/C`](milestones/B-C.md): 7 task — seluruhnya `PLANNED`.
- [`B/D`](milestones/B-D.md): 7 task — seluruhnya `PLANNED`.
- [`B/E`](milestones/B-E.md): 7 task — seluruhnya `PLANNED`.
- [`B/F`](milestones/B-F.md): 7 task — seluruhnya `PLANNED`.
- [`B/G`](milestones/B-G.md): 6 task — seluruhnya `PLANNED`.
- [`B/H`](milestones/B-H.md): 7 task — seluruhnya `PLANNED`.
- [`B/I`](milestones/B-I.md): 6 task — seluruhnya `PLANNED`.
- [`B/J`](milestones/B-J.md): 6 task — seluruhnya `PLANNED`.
- [`B/K`](milestones/B-K.md): 9 task — seluruhnya `PLANNED`.
- [`B/L`](milestones/B-L.md): 9 task — seluruhnya `PLANNED`.
- [`B/M`](milestones/B-M.md): 7 task — seluruhnya `PLANNED`.
