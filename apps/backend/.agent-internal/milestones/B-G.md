# B/G — Officer Inventory & Visibility APIs

**Status awal:** `PLANNED` · **Prioritas:** `P1` · **Area:** `apps/api` (kecuali B/K dengan approval) · **Depends:** B/F gate accepted + izin perluasan scope

**Crosswalk:** Operational extension. Ini milestone package B/A..B/M; jangan menyamakan secara numerik dengan `B0..B4` (MVP checkpoint) atau `B1..B6` (blueprint).

**Preflight sebelum tugas:** baca `../README.md`, `../GIT_POLICY.md`, `../CLEAN_CODE.md`, kontrak canonical, `../PRECODING_CHECKLIST.md`, dan dokumentasi task relevan. Gunakan izin terpisah untuk coding/push/merge/deploy.

## B/G.1 — Officer inventory and detail

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/G.1.0` GET /officer/inventory | Query assigned post, filter status/page/limit dari OpenAPI, private DTO officer; jangan gunakan GET /officer/items (tidak ada dalam kontrak). | 200 assigned-post scoped, 401/403 cross-role. | `PLANNED` |
| `B/G.1.1` GET /officer/items/{item_id} | Kembalikan detail inventaris lengkap termasuk private_verification_notes hanya petugas pos berhak. | 200 valid, 403/404 pos lain, response allowlist. | `PLANNED` |
| `B/G.1.2` PATCH /officer/items/{item_id}/visibility | Ubah is_visible hanya STORED sesuai rules; jangan mengubah status fisik; transaksi dan guard post. | 200, 409 invalid-state, public listing reflects change. | `PLANNED` |

**Exit gate B/G.1:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## B/G.2 — Visibility, overdue, and regressions

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/G.2.0` GET /officer/inventory/overdue | Hitung overdue dinamis dari received_at dan storage_limit_days >0, only STORED; bukan auto-status. NULL limit berarti tak berbatas. | 200 exact boundary, no auto mutation. | `PLANNED` |
| `B/G.2.1` Dashboard backend query mapping | Petakan ringkasan Dashboard dari operasi OpenAPI yang ada; jika metrik khusus belum ada endpoint, dokumentasikan gap dan minta izin sebelum menambah endpoint. | No invented analytics endpoint; DB-backed display truthful. | `PLANNED` |
| `B/G.2.2` Query/visibility regression | Uji pagination authorized, invalid status, cross-post resource ID, is_visible toggle, data race and privacy. | HTTP integration + DB evidence. | `PLANNED` |

**Exit gate B/G.2:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## Gate milestone

- Dependency terpenuhi: B/F gate accepted + izin perluasan scope.
- Contract hash and DTO drift check `PASS` atau `BLOCKED` bila sumber tak tersedia.
- Negative tests role/ownership/status yang relevan; rollback/transaksi untuk mutasi.
- Evidence nyata: command, hasil HTTP status, DB query dengan data sintetis, output test, file berubah, risiko.
- Konfirmasi izin pengguna sebelum melakukan `git push`, merge/deploy, atau melanjutkan milestone berikutnya.
- `apps/api/.agent-internal` dan `AGENTS.md` adalah lokal only: jangan commit/push `.md`, `.mdx`, atau secret.
