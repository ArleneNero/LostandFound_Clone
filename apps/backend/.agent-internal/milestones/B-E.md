# B/E — Cloudflare R2 Secure Upload Pipeline

**Status awal:** `PLANNED` · **Prioritas:** `P0` · **Area:** `apps/api` (kecuali B/K dengan approval) · **Depends:** B/D + R2 dev bucket/private config

**Crosswalk:** B3 upload. Ini milestone package B/A..B/M; jangan menyamakan secara numerik dengan `B0..B4` (MVP checkpoint) atau `B1..B6` (blueprint).

**Preflight sebelum tugas:** baca `../README.md`, `../GIT_POLICY.md`, `../CLEAN_CODE.md`, kontrak canonical, `../PRECODING_CHECKLIST.md`, dan dokumentasi task relevan. Gunakan izin terpisah untuk coding/push/merge/deploy.

## B/E.1 — Private R2 adapter, intent, PUT

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/E.1.0` R2 adapter & config | Konfigurasi akses privat S3-compatible, bucket CORS exact, no public permanent URL, storage path random, validasi env; jangan log presigned URL. | Konfigurasi redacted dan bucket private check. | `COMPLETED` |
| `B/E.1.1` POST /uploads/intents | Autorisasi hanya STUDENT REPORT_PHOTO atau OFFICER ITEM_PHOTO; allowlist JPEG/PNG/WebP <=5 MiB, 5-menit signed PUT sesuai OpenAPI. | 201 success; 401/403/422 dan abuse tests. | `COMPLETED` |
| `B/E.1.2` Signed PUT direct-to-R2 | Uji browser/HTTP PUT terhadap URL sementara, header wajib; tanpa mengirim data biner melalui JSON Fastify. | Object exists in private R2 dev bucket. | `COMPLETED` |

**Exit gate B/E.1:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## B/E.2 — Finalize, privacy, replay and tests

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/E.2.0` POST /uploads/{upload_id}/finalize | Verifikasi intent ownership/purpose/TTL dan object existence, byte size, MIME dan actual signature/content; token upload signed 15 menit. | 200 finalize sah; spoof/expired/missing object gagal. | `COMPLETED` |
| `B/E.2.1` Token replay & privacy | Ikatan user+purpose+object; single-use melalui constraint storage_path unik dan transaksi saat consume; revoke/cleanup orphan sesuai desain yang disetujui. | Cross-user token, wrong-purpose, double-consume ditolak. | `COMPLETED` |
| `B/E.2.2` Signed image reads | Sediakan URL baca singkat hanya pada DTO/route yang telah ditentukan kontrak; jangan buat public read endpoint baru tanpa izin. | Unauth private access denied; public eligible photo accessible via timed URL. | `COMPLETED` |
| `B/E.2.3` R2 integration/security tests | Uji MIME spoof, oversized, duplicate finalize, wrong role, expired URL/token, orphan cleanup (terjadwal jika dirancang). | Test logs + bukti private bucket; not mock-only. | `COMPLETED` |

**Exit gate B/E.2:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## Gate milestone

- Dependency terpenuhi: B/D + R2 dev bucket/private config.
- Contract hash and DTO drift check `PASS` atau `BLOCKED` bila sumber tak tersedia.
- Negative tests role/ownership/status yang relevan; rollback/transaksi untuk mutasi.
- Evidence nyata: command, hasil HTTP status, DB query dengan data sintetis, output test, file berubah, risiko.
- Konfirmasi izin pengguna sebelum melakukan `git push`, merge/deploy, atau melanjutkan milestone berikutnya.
- `apps/api/.agent-internal` dan `AGENTS.md` adalah lokal only: jangan commit/push `.md`, `.mdx`, atau secret.
