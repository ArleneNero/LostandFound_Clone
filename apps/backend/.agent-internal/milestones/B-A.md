# B/A — Preflight, Governance & Contract Baseline

**Status awal:** `PLANNED` · **Prioritas:** `P0` · **Area:** `apps/api` (kecuali B/K dengan approval) · **Depends:** Frontend MVP Gate dan izin preflight; tidak mengubah code

**Crosswalk:** B0 preflight. Ini milestone package B/A..B/M; jangan menyamakan secara numerik dengan `B0..B4` (MVP checkpoint) atau `B1..B6` (blueprint).

**Preflight sebelum tugas:** baca `../README.md`, `../GIT_POLICY.md`, `../CLEAN_CODE.md`, kontrak canonical, `../PRECODING_CHECKLIST.md`, dan dokumentasi task relevan. Gunakan izin terpisah untuk coding/push/merge/deploy.

## B/A.1 — Baseline, governance, and checkpoint

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/A.1.0` Audit sumber lokal dan status Git | Inventarisasi root/monorepo, AGENTS dan semua .md lokal termasuk hidden folder; git status, branch, runtime, package manager, secrets exposure (tanpa membuka nilainya). Jangan memodifikasi file. | Daftar dokumen/path, git status, toolchain, risiko overwrite. | `PLANNED` |
| `B/A.1.1` Tetapkan sumber kebenaran | Validasi OpenAPI v1.0, API Contract v1.0, ERD v6.2, blueprint final, Frontend MVP, standar Clean Code/Git Policy. Gunakan urutan: OpenAPI untuk HTTP, ERD untuk DB, keputusan scope, blueprint untuk guidance. | Manifest versi/hash/asal, tabel konflik dan keputusan. | `PLANNED` |
| `B/A.1.2` Verifikasi Frontend MVP Gate | Periksa bukti persetujuan Frontend MVP Gate; jangan menganggap merge atau tes frontend otomatis berarti disetujui pengguna. | Approval tertulis atau status BLOCKED. | `PLANNED` |
| `B/A.1.3` Petakan roadmap ID | Bandingkan B0-B4 dari BACKEND_MVP, B1-B6 blueprint, dan ID Backend existing bila ada; jangan menimpa/menebak ID lama. Perlakukan ID B/A-B/M dokumen ini sebagai usulan sampai kompatibilitas disetujui. | Matriks crosswalk dan ID yang disahkan. | `PLANNED` |

**Exit gate B/A.1:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## B/A.2 — Contract, credentials, and coding authorization

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/A.2.0` Inventaris endpoint & DTO | Petakan seluruh 22 operasi HTTP OpenAPI menjadi owner modul, role, request/response, status code, schema, test; bedakan 3 inti MVP dari pendukung dan lanjutan. | API traceability matrix 22 operasi. | `PLANNED` |
| `B/A.2.1` Inventaris schema & constraint | Verifikasi 8 tabel ERD v6.2, kunci dan 12 FK, CHECK/UNIQUE, state transitions, card/data contracts, kebijakan foto. | DB traceability matrix dari sumber kanonis. | `PLANNED` |
| `B/A.2.2` Periksa dependensi layanan | Verifikasi Neon dev/test, Neon Auth dev, R2 private bucket, origin CORS, dan izin/akses tanpa menampilkan kredensial; cek kemampuan testing real env. | Matriks READY/BLOCKED/UNVERIFIED per provider. | `PLANNED` |
| `B/A.2.3` Perencanaan perubahan dan izin coding | Rinci target file, package scripts, dependency graph, urutan migration/seed, negatif test, sumber daya dev, risiko; minta persetujuan coding sebelum mulai. | Handoff B/A + approval eksplisit. | `PLANNED` |

**Exit gate B/A.2:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## Gate milestone

- Dependency terpenuhi: Frontend MVP Gate dan izin preflight; tidak mengubah code.
- Contract hash and DTO drift check `PASS` atau `BLOCKED` bila sumber tak tersedia.
- Negative tests role/ownership/status yang relevan; rollback/transaksi untuk mutasi.
- Evidence nyata: command, hasil HTTP status, DB query dengan data sintetis, output test, file berubah, risiko.
- Konfirmasi izin pengguna sebelum melakukan `git push`, merge/deploy, atau melanjutkan milestone berikutnya.
- `apps/api/.agent-internal` dan `AGENTS.md` adalah lokal only: jangan commit/push `.md`, `.mdx`, atau secret.
