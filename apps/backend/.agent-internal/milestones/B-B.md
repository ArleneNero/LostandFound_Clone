# B/B — Foundation, Fastify & Neon Database

**Status awal:** `PLANNED` · **Prioritas:** `P0` · **Area:** `apps/api` (kecuali B/K dengan approval) · **Depends:** B/A accepted + Neon dev/test verified

**Crosswalk:** B1 foundation. Ini milestone package B/A..B/M; jangan menyamakan secara numerik dengan `B0..B4` (MVP checkpoint) atau `B1..B6` (blueprint).

**Preflight sebelum tugas:** baca `../README.md`, `../GIT_POLICY.md`, `../CLEAN_CODE.md`, kontrak canonical, `../PRECODING_CHECKLIST.md`, dan dokumentasi task relevan. Gunakan izin terpisah untuk coding/push/merge/deploy.

## B/B.1 — Runtime scaffolding and configuration

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/B.1.0` Inisialisasi backend modular | Siapkan apps/api pada monorepo yang ada; TypeScript, Fastify, Zod, Drizzle, scripts, lint/test/build; hindari nested Git dan lockfile ganda. | Build/typecheck/lint PASS; struktur modular terverifikasi. | `PLANNED` |
| `B/B.1.1` Konfigurasi environment aman | Validasi env saat startup, pemisahan dev/test, fail-fast, log redaction dan .env.example berisi nama variabel saja. Gunakan koneksi DB pooled untuk runtime dan direct untuk migration. | Tes missing/invalid env, secret scan PASS. | `PLANNED` |
| `B/B.1.2` Bootstrap dan error envelope | Registrasi plugin/router, request_id, uniform {error:{code,message,request_id}}, response serialization berdasar OpenAPI; health check hanya bila dikonfirmasi internal/nonpublik. | Fastify inject tests dan schema error. | `PLANNED` |

**Exit gate B/B.1:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## B/B.2 — Schema and migrations

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/B.2.0` Definisi Drizzle 8 tabel | Model users, service_posts, service_post_photos, found_submissions, submission_status_history, found_items, item_photos, item_returns sesuai ERD v6.2; jangan menambah tabel sesuka hati. | Schema review field, type, constraint, indeks dan FKs. | `PLANNED` |
| `B/B.2.1` Migration terkontrol | Generate migration Drizzle dari schema; jalankan terhadap DB dev/test via direct connection; catat versi, rollback/restore plan dan uji lintasan migrasi dari DB bersih. | Migration log tanpa DSN, tabel/constraint query bukti. | `PLANNED` |
| `B/B.2.2` Ketentuan relasi dan status | Implementasi FK, NOT NULL, UNIQUE, CHECK, model foto, fixed role STUDENT/OFFICER, penyimpanan status; jangan menyamakan status laporan dengan inventaris. | Negative constraint tests dan review ERD parity. | `PLANNED` |

**Exit gate B/B.2:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## B/B.3 — Seed, live database integration, and evidence

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/B.3.0` Seed sintetis idempoten | Buat data pengujian deterministik: pos, referensi user dengan ID dev yang sah, STORED visible/hidden, RETURNED_TO_OWNER/DISTRIBUTED, foto yang tidak berpura-pura tersedia; >10 publik jika layak menguji paginasi. | Seed dua kali tanpa duplikasi; count dan FK valid. | `PLANNED` |
| `B/B.3.1` DB integration harness | Siapkan test DB/isolated branch, fixtures cleanup transaksi, fake time bila perlu, koneksi ditutup bersih; hindari data pribadi nyata. | Repeatable DB tests di lingkungan nyata. | `PLANNED` |
| `B/B.3.2` Bukti koneksi dan baseline | Jalankan build/lint/typecheck/unit/migration/seed/read query; semua hasil dinyatakan PASS/FAIL/NOT RUN. | Gate B/B dengan output dan risk list. | `PLANNED` |

**Exit gate B/B.3:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## Gate milestone

- Dependency terpenuhi: B/A accepted + Neon dev/test verified.
- Contract hash and DTO drift check `PASS` atau `BLOCKED` bila sumber tak tersedia.
- Negative tests role/ownership/status yang relevan; rollback/transaksi untuk mutasi.
- Evidence nyata: command, hasil HTTP status, DB query dengan data sintetis, output test, file berubah, risiko.
- Konfirmasi izin pengguna sebelum melakukan `git push`, merge/deploy, atau melanjutkan milestone berikutnya.
- `apps/api/.agent-internal` dan `AGENTS.md` adalah lokal only: jangan commit/push `.md`, `.mdx`, atau secret.
