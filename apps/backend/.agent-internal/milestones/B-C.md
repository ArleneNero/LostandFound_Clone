# B/C — Public Service Posts & Catalog APIs

**Status awal:** `PLANNED` · **Prioritas:** `P0` · **Area:** `apps/api` (kecuali B/K dengan approval) · **Depends:** B/B + canonical OpenAPI/ERD

**Crosswalk:** B2 public GET. Ini milestone package B/A..B/M; jangan menyamakan secara numerik dengan `B0..B4` (MVP checkpoint) atau `B1..B6` (blueprint).

**Preflight sebelum tugas:** baca `../README.md`, `../GIT_POLICY.md`, `../CLEAN_CODE.md`, kontrak canonical, `../PRECODING_CHECKLIST.md`, dan dokumentasi task relevan. Gunakan izin terpisah untuk coding/push/merge/deploy.

## B/C.1 — Public DTO and service post reads

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/C.1.0` Kontrak public DTO | Bentuk serializer/schema Post dan FoundItemPublic sesuai OpenAPI; hanya field allowlist; jangan expose private notes, email, NIM, atau R2 storage_path. | Response schema tests dan PII leak regression. | `COMPLETED` |
| `B/C.1.1` GET /posts | Implementasi listing service posts yang didefinisikan OpenAPI, pagination/default sesuai parameter kanonis, dan metadata publik yang sah. | HTTP 200 + schema/empty/pagination dari Neon. | `COMPLETED` |
| `B/C.1.2` GET /posts/{post_id} | Implementasi detail pos termasuk galeri 0..3 foto melalui mekanisme URL baca sesuai kebijakan; foto pos bukan foto item. | 200/404, cover order 1, no raw object key. | `COMPLETED` |

**Exit gate B/C.1:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## B/C.2 — Catalog/detail queries and contract verification

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/C.2.0` GET /items | Enforce status=STORED AND is_visible=true sebelum sort/pagination/count; filter q/category/post_id dan sort allowlist; limit <=10 mengikuti OpenAPI. | 200 empty/filter/sort/page/tie-break + hidden exclusion. | `COMPLETED` |
| `B/C.2.1` GET /items/{item_id} | Validasi UUID/path; hidden/non-STORED/tidak ada hasil 404; DTO publik konsisten dan URL foto aman. | 200 public, 404 x3, no private columns. | `COMPLETED` |
| `B/C.2.2` Performa/query defensif | Query terparameterisasi, indeks berdasarkan pola filter/sort yang nyata, tie breaker item_id, reasonable limits; cek page overflow dan SQLi search. | EXPLAIN bila perlu, SQLi case, index review. | `COMPLETED` |
| `B/C.2.3` Tes kontrak HTTP publik | Gunakan Fastify inject + HTTP server nyata dengan DB dev/test; uji invalid query, error envelope, unknown paths, negative privacy. | Bukti PASS sesuai OpenAPI v1.0. | `COMPLETED` |

**Exit gate B/C.2:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## Gate milestone

- Dependency terpenuhi: B/B + canonical OpenAPI/ERD.
- Contract hash and DTO drift check `PASS` atau `BLOCKED` bila sumber tak tersedia.
- Negative tests role/ownership/status yang relevan; rollback/transaksi untuk mutasi.
- Evidence nyata: command, hasil HTTP status, DB query dengan data sintetis, output test, file berubah, risiko.
- Konfirmasi izin pengguna sebelum melakukan `git push`, merge/deploy, atau melanjutkan milestone berikutnya.
- `apps/api/.agent-internal` dan `AGENTS.md` adalah lokal only: jangan commit/push `.md`, `.mdx`, atau secret.
