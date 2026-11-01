# B/H — Student Bootstrap & Found Submissions

**Status awal:** `PLANNED` · **Prioritas:** `P1` · **Area:** `apps/api` (kecuali B/K dengan approval) · **Depends:** B/D + B/E + B/F review

**Crosswalk:** Student feature. Ini milestone package B/A..B/M; jangan menyamakan secara numerik dengan `B0..B4` (MVP checkpoint) atau `B1..B6` (blueprint).

**Preflight sebelum tugas:** baca `../README.md`, `../GIT_POLICY.md`, `../CLEAN_CODE.md`, kontrak canonical, `../PRECODING_CHECKLIST.md`, dan dokumentasi task relevan. Gunakan izin terpisah untuk coding/push/merge/deploy.

## B/H.1 — Student onboarding and report create/list

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/H.1.0` POST /me/bootstrap | Setelah Neon Auth verified email: create STUDENT profile dengan student_number self-declared, bukan verifikasi status akademik; jangan mengizinkan self-assign OFFICER. | 201 sesuai kontrak, conflict/missing email checks. | `PLANNED` |
| `B/H.1.1` POST /submissions | STUDENT create report dengan satu REPORT_PHOTO upload token, target_post_id yang sah dan field OpenAPI; status awal PENDING_RECEIPT + history awal transaksional. | 201 with DB+R2+history, wrong-purpose denied. | `PLANNED` |
| `B/H.1.2` GET /submissions/me | Daftar laporan milik akun yang login, filter/page dari kontrak, tanpa menampilkan laporan mahasiswa lain. | Owner-only list, pagination and empty. | `PLANNED` |

**Exit gate B/H.1:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## B/H.2 — Owner detail/cancel, state machine, abuse cases

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/H.2.0` GET /submissions/{submission_id} | Kembalikan detail/history hanya untuk owner atau petugas yang berwenang sesuai OpenAPI, konsisten concealment 403/404. | Owner/cross-user/assigned officer tests. | `PLANNED` |
| `B/H.2.1` POST /submissions/{submission_id}/cancel | Hanya pemilik yang boleh cancel status PENDING_RECEIPT; alasan nonblank, transisi dan history atomik. | 200 success, 409 invalid state, 403 cross-user. | `PLANNED` |
| `B/H.2.2` State machine submission | Jaga PENDING_RECEIPT -> RECEIVED/REJECTED/CANCELLED hanya lewat role-appropriate route; conflict/race ditolak. | Transition matrix tests + immutable history. | `PLANNED` |
| `B/H.2.3` Penyalahgunaan student auth | Uji email tidak diverifikasi, NIM duplikat sesuai ERD, rate abuse, request role spoof, tidak ada KTP/NIK/foto identitas. | Negative security and privacy evidence. | `PLANNED` |

**Exit gate B/H.2:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## Gate milestone

- Dependency terpenuhi: B/D + B/E + B/F review.
- Contract hash and DTO drift check `PASS` atau `BLOCKED` bila sumber tak tersedia.
- Negative tests role/ownership/status yang relevan; rollback/transaksi untuk mutasi.
- Evidence nyata: command, hasil HTTP status, DB query dengan data sintetis, output test, file berubah, risiko.
- Konfirmasi izin pengguna sebelum melakukan `git push`, merge/deploy, atau melanjutkan milestone berikutnya.
- `apps/api/.agent-internal` dan `AGENTS.md` adalah lokal only: jangan commit/push `.md`, `.mdx`, atau secret.
