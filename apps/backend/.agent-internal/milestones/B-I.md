# B/I — Officer Submission Review & Physical Receipt

**Status awal:** `PLANNED` · **Prioritas:** `P1` · **Area:** `apps/api` (kecuali B/K dengan approval) · **Depends:** B/G + B/H

**Crosswalk:** Report processing. Ini milestone package B/A..B/M; jangan menyamakan secara numerik dengan `B0..B4` (MVP checkpoint) atau `B1..B6` (blueprint).

**Preflight sebelum tugas:** baca `../README.md`, `../GIT_POLICY.md`, `../CLEAN_CODE.md`, kontrak canonical, `../PRECODING_CHECKLIST.md`, dan dokumentasi task relevan. Gunakan izin terpisah untuk coding/push/merge/deploy.

## B/I.1 — Officer report list/receive transaction

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/I.1.0` GET /officer/submissions | List laporan menuju assigned post saja; status/page/filter sesuai OpenAPI; tidak bocor ke petugas pos lain. | 200 scoped, role and cross-post tests. | `PLANNED` |
| `B/I.1.1` POST /officer/submissions/{submission_id}/receive | Verifikasi status pending, kepemilikan post dan penyerahan fisik, konsumsi tepat satu ITEM_PHOTO token (beda foto laporan), buat found_items + item_photos. | 201 sesuai schema, one inventory per source_submission_id. | `PLANNED` |
| `B/I.1.2` Receive atomicity | Transaksi ubah submission.status=RECEIVED, append history, insert item+photo dan uniqueness; request simultan tidak menggandakan barang. | Race tests, DB unchanged on failure. | `PLANNED` |

**Exit gate B/I.1:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## B/I.2 — Reject, photo handling and concurrency tests

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/I.2.0` POST /officer/submissions/{submission_id}/reject | Tolak laporan PENDING_RECEIPT dengan reason nonblank; event history disimpan, scoped by post. | 200/409/403, reason-history evidence. | `PLANNED` |
| `B/I.2.1` Foto report vs inventory | Pisahkan report_photo_path dengan item_photos; galeri foto pos service_post_photos tidak boleh tercampur. | Data path/DTO tests. | `PLANNED` |
| `B/I.2.2` Review/status tests | Jalankan cross-post, duplicate receive, cancel-then-receive, reject-then-receive, forged status. | Integration race + invariant test matrix. | `PLANNED` |

**Exit gate B/I.2:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## Gate milestone

- Dependency terpenuhi: B/G + B/H.
- Contract hash and DTO drift check `PASS` atau `BLOCKED` bila sumber tak tersedia.
- Negative tests role/ownership/status yang relevan; rollback/transaksi untuk mutasi.
- Evidence nyata: command, hasil HTTP status, DB query dengan data sintetis, output test, file berubah, risiko.
- Konfirmasi izin pengguna sebelum melakukan `git push`, merge/deploy, atau melanjutkan milestone berikutnya.
- `apps/api/.agent-internal` dan `AGENTS.md` adalah lokal only: jangan commit/push `.md`, `.mdx`, atau secret.
