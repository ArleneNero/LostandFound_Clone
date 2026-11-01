# B/D — Neon Auth Identity, RBAC & Scoped Authorization

**Status awal:** `PLANNED` · **Prioritas:** `P0` · **Area:** `apps/api` (kecuali B/K dengan approval) · **Depends:** B/B + Neon Auth dev ready

**Crosswalk:** B3 auth. Ini milestone package B/A..B/M; jangan menyamakan secara numerik dengan `B0..B4` (MVP checkpoint) atau `B1..B6` (blueprint).

**Preflight sebelum tugas:** baca `../README.md`, `../GIT_POLICY.md`, `../CLEAN_CODE.md`, kontrak canonical, `../PRECODING_CHECKLIST.md`, dan dokumentasi task relevan. Gunakan izin terpisah untuk coding/push/merge/deploy.

## B/D.1 — Server-side JWT, identity, RBAC

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/D.1.0` Neon Auth JWT verifier | Gunakan verifikasi JWT/JWKS yang didukung SDK official; cek issuer, audience bila dibutuhkan, expiration, tampered/missing token. Jangan gunakan bypass auth di test E2E nyata. | 401 untuk token salah/kedaluwarsa/tanpa token. | `COMPLETED` |
| `B/D.1.1` Mapping identity user | Gunakan users.Neon Auth_user_id VARCHAR(255) NOT NULL UNIQUE, user_id UUID; jangan mengambil role dari token/body tanpa cek DB. | User mapping tests, missing profile 404 sesuai kontrak. | `COMPLETED` |
| `B/D.1.2` Role dan pos policy | Implementasikan requireRole STUDENT/OFFICER dan resolved assigned post dari service_posts.officer_user_id; scope query ke post yang benar. | 403 role salah, 403/404 cross-post, direct param spoof ditolak. | `COMPLETED` |

**Exit gate B/D.1:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## B/D.2 — Protected API and abuse controls

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/D.2.0` GET /me | Kembalikan Me DTO terverifikasi; jangan otomatis create profile; profile belum ada -> 404 PROFILE_NOT_FOUND sesuai OpenAPI. | 200 profile, 401 unauthenticated, 404 not-onboarded. | `COMPLETED` |
| `B/D.2.1` Officer provisioning trust boundary | Dokumentasikan onboarding petugas oleh operator tepercaya; tidak ada public officer signup atau role ADMIN DB. Hak offboarding/provisioning tidak ditambahkan sebagai API publik. | Negative privilege escalation tests. | `COMPLETED` |
| `B/D.2.2` Error/CORS/rate guard | Konfigurasi origin allowlist, headers, per-route limiter sesuai kebijakan, request logging dengan token/email/NIM redacted. | CORS preflight, 429 abuse, sanitized errors. | `COMPLETED` |
| `B/D.2.3` Security test identity | Test missing/forged/expired JWT, POST role spoof, status spoof, IDOR dan boundary unauthenticated; gunakan accounts dev nyata hanya untuk E2E bila tersedia. | Matriks 401/403/404 + evidence. | `COMPLETED` |

**Exit gate B/D.2:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## Gate milestone

- Dependency terpenuhi: B/B + Neon Auth dev ready.
- Contract hash and DTO drift check `PASS` atau `BLOCKED` bila sumber tak tersedia.
- Negative tests role/ownership/status yang relevan; rollback/transaksi untuk mutasi.
- Evidence nyata: command, hasil HTTP status, DB query dengan data sintetis, output test, file berubah, risiko.
- Konfirmasi izin pengguna sebelum melakukan `git push`, merge/deploy, atau melanjutkan milestone berikutnya.
- `apps/api/.agent-internal` dan `AGENTS.md` adalah lokal only: jangan commit/push `.md`, `.mdx`, atau secret.
