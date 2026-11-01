# B/K — Frontend HTTP Integration Gate

**Status awal:** `PLANNED` · **Prioritas:** `P1` · **Area:** `apps/api` (kecuali B/K dengan approval) · **Depends:** B/F MVP Gate accepted + permission to modify apps/web

**Crosswalk:** Frontend integration. Ini milestone package B/A..B/M; jangan menyamakan secara numerik dengan `B0..B4` (MVP checkpoint) atau `B1..B6` (blueprint).

**Preflight sebelum tugas:** baca `../README.md`, `../GIT_POLICY.md`, `../CLEAN_CODE.md`, kontrak canonical, `../PRECODING_CHECKLIST.md`, dan dokumentasi task relevan. Gunakan izin terpisah untuk coding/push/merge/deploy.

## B/K.1 — Integration authorization and public/officer HTTP

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/K.1.0` Integrasi scope dan izin | Konfirmasi approval khusus sebelum menyentuh apps/web. Audit adapter mock/interface dan UI F/A-F/C; semua route hasil integrasi harus ada di OpenAPI. | Frontend diff plan dan approval record. | `PLANNED` |
| `B/K.1.1` HTTP client/config | Gunakan runtime API base URL dari env, typed DTO snake_case, error envelope, timeouts/retry konservatif, token injection aman dari Neon Auth. | No hardcoded prod URL or leaked JWT. | `PLANNED` |
| `B/K.1.2` Guest list/detail | Hubungkan katalog/detail ke GET /items dan /items/{id} hanya; validasi limit10, hidden 404, loading/error/empty responsif. | Browser E2E against real Neon-backed API. | `PLANNED` |

**Exit gate B/K.1:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## B/K.2 — State sync and student workflows

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/K.2.0` Officer register and upload | UI satu foto: POST intent -> presigned PUT -> finalize -> POST /officer/items; error/retry aman, status tidak auto-publish palsu. | End-to-end photo+DB persisted evidence. | `PLANNED` |
| `B/K.2.1` Officer inventory/detail | Hubungkan ke GET /officer/inventory dan GET /officer/items/{id}; dashboard hanya metrik yang didukung kontrak. | Private record access via officer, no public DTO misuse. | `PLANNED` |
| `B/K.2.2` Visibility & state sync | PATCH visibility sesuai konfirmasi UI dan server; re-fetch/invalidate cache; mock features yang tidak terintegrasi diberi label jujur. | UI state persists across refresh, 403/409 UX. | `PLANNED` |

**Exit gate B/K.2:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## B/K.3 — End-to-end browser and regression

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/K.3.0` Student & review integration | Setelah B/H-B/J dan izin role scope, hubungkan Student report dan Officer receive/return/distribute secara bertahap; jangan klaim ini termasuk MVP Gate. | Separate E2E per role, no scope creep. | `PLANNED` |
| `B/K.3.1` End-to-end full flow | Uji petugas create → row + R2 → assigned inventory → Guest jika visible STORED; siswa report → receive → return/distribute hanya setelah semua milestone terkait completed. | Screenshot/test logs/DB row checks. | `PLANNED` |
| `B/K.3.2` Frontend regression & accessibility | Lint/typecheck/build/test aplikasi web/API, browser mobile/desktop, focus/empty/error, no mock leakage. | Integration Gate report PASS/FAIL/NOT RUN. | `PLANNED` |

**Exit gate B/K.3:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## Gate milestone

- Dependency terpenuhi: B/F MVP Gate accepted + permission to modify apps/web.
- Contract hash and DTO drift check `PASS` atau `BLOCKED` bila sumber tak tersedia.
- Negative tests role/ownership/status yang relevan; rollback/transaksi untuk mutasi.
- Evidence nyata: command, hasil HTTP status, DB query dengan data sintetis, output test, file berubah, risiko.
- Konfirmasi izin pengguna sebelum melakukan `git push`, merge/deploy, atau melanjutkan milestone berikutnya.
- `apps/api/.agent-internal` dan `AGENTS.md` adalah lokal only: jangan commit/push `.md`, `.mdx`, atau secret.

**KHUSUS INTEGRASI:** baru boleh mengubah `apps/web` setelah approval terpisah; tanpa silent fallback mock dan tanpa menyatakan persistence bila hanya in-memory.
