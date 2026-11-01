# B/J — Physical Return, Distribution & Retention

**Status awal:** `PLANNED` · **Prioritas:** `P1` · **Area:** `apps/api` (kecuali B/K dengan approval) · **Depends:** B/G + B/I

**Crosswalk:** Physical disposition. Ini milestone package B/A..B/M; jangan menyamakan secara numerik dengan `B0..B4` (MVP checkpoint) atau `B1..B6` (blueprint).

**Preflight sebelum tugas:** baca `../README.md`, `../GIT_POLICY.md`, `../CLEAN_CODE.md`, kontrak canonical, `../PRECODING_CHECKLIST.md`, dan dokumentasi task relevan. Gunakan izin terpisah untuk coding/push/merge/deploy.

## B/J.1 — Return and verification

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/J.1.0` POST /officer/items/{item_id}/return | Hanya STORED pada pos berwenang, recipient_name dan verification_summary nonblank; verification_confirmed_at, create 1 item_returns, status RETURNED_TO_OWNER, is_visible=false. | 201 with DB transaction, 409 duplicate/concurrent. | `PLANNED` |
| `B/J.1.1` Return ownership practice | Verifikasi kepemilikan dilakukan langsung oleh petugas secara offline; jangan simpan KTP/NIK/foto identitas dan jangan buat klaim online. | Privacy check, SOP placeholder requiring campus approval. | `PLANNED` |
| `B/J.1.2` POST /officer/items/{item_id}/distribute | Hanya STORED; penyaluran manual -> DISTRIBUTED dan is_visible=false tanpa membuat item_returns. | 200 success, invalid state 409, public disappears. | `PLANNED` |

**Exit gate B/J.1:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## B/J.2 — Distribution, retention, race and audit

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/J.2.0` Overdue policy & no automation | Perhatikan storage_limit_days: NULL berarti tak terbatas, >0 dihitung; barang overdue tetap STORED sampai keputusan petugas. | Boundary tests dan tidak ada cron auto-distribute. | `PLANNED` |
| `B/J.2.1` Race conditions & exactly once | Parallel return/distribute, repeated request, wrong assigned post, invalid visibility/state; transaksi/index UNIQUE untuk anti-duplikasi. | Concurrent integration test and uniqueness evidence. | `PLANNED` |
| `B/J.2.2` History and data retention review | Catat audit yang diizinkan skema, jangan tambah tabel tanpa approval, review kebijakan retensi/koreksi data bersama pengelola. | Decision register dan test untuk data integrity. | `PLANNED` |

**Exit gate B/J.2:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## Gate milestone

- Dependency terpenuhi: B/G + B/I.
- Contract hash and DTO drift check `PASS` atau `BLOCKED` bila sumber tak tersedia.
- Negative tests role/ownership/status yang relevan; rollback/transaksi untuk mutasi.
- Evidence nyata: command, hasil HTTP status, DB query dengan data sintetis, output test, file berubah, risiko.
- Konfirmasi izin pengguna sebelum melakukan `git push`, merge/deploy, atau melanjutkan milestone berikutnya.
- `apps/api/.agent-internal` dan `AGENTS.md` adalah lokal only: jangan commit/push `.md`, `.mdx`, atau secret.
