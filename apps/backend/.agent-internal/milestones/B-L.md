# B/L — QA, Security Hardening & Operations

**Status awal:** `PLANNED` · **Prioritas:** `P2` · **Area:** `apps/api` (kecuali B/K dengan approval) · **Depends:** Relevant B/G–B/K scope ready + actual environment

**Crosswalk:** Hardening. Ini milestone package B/A..B/M; jangan menyamakan secara numerik dengan `B0..B4` (MVP checkpoint) atau `B1..B6` (blueprint).

**Preflight sebelum tugas:** baca `../README.md`, `../GIT_POLICY.md`, `../CLEAN_CODE.md`, kontrak canonical, `../PRECODING_CHECKLIST.md`, dan dokumentasi task relevan. Gunakan izin terpisah untuk coding/push/merge/deploy.

## B/L.1 — Contract and security coverage

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/L.1.0` Contract coverage | Setiap dari 22 operasi OpenAPI punya request/response validation dan skenario positive/negative; no undocumented public routes. | 22-endpoint coverage matrix with status. | `PLANNED` |
| `B/L.1.1` Security attack matrix | Uji BOLA/IDOR (owner/post), SQLi, privilege escalation, CORS, JSON/body limit, upload MIME spoof, replay, error disclosure. | S01-S22 blueprint review dan evidence. | `PLANNED` |
| `B/L.1.2` Race/transaction proof | Stress duplicate receive, return, distribute, upload token replay; hanya satu hasil domain yang sah. | Concurrent test logs dan invariant queries. | `PLANNED` |

**Exit gate B/L.1:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## B/L.2 — CI, performance and operations

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/L.2.0` Dependency & secret scanning | Audit dependency risk, secrets in staged files, package vulnerabilities; documented risk acceptance jika ada. | Audit output dan remediation list. | `PLANNED` |
| `B/L.2.1` CI read-only human commits | CI hanya lint/typecheck/test/build/scan, permission contents:read; jangan jalankan bot auto-commit/push, never stage .md/.mdx per kebijakan pengguna. | Workflow review + git log author/committer. | `PLANNED` |
| `B/L.2.2` Performance/limits | Ukur response katalog/sort pada data uji realistis, index usage, rate limits, startup/env failure; jangan klaim SLO tanpa pengukuran. | Bench measurement dan thresholds agreed. | `PLANNED` |

**Exit gate B/L.2:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## B/L.3 — Recovery drill and hardening approval

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/L.3.0` Logging/monitoring | Request ID dan sanitized logs, errors/5xx, auth failures, R2 upload errors, DB metrics; jangan log token/PII/presigned URL. | Sample sanitized logs/alerts. | `PLANNED` |
| `B/L.3.1` Backup & recovery rehearsal | Buktikan restore Neon dev/staging branch serta metadata/foto R2, cek referential consistency, tetapkan RPO/RTO bersama operator. | Restore drill record dan rollback procedure. | `PLANNED` |
| `B/L.3.2` Hardening Gate | Audit integrasi dan security dengan status PASS/FAIL/NOT RUN, severity, ownership, blocker; STOP bila critical belum tertangani. | Security release readiness report. | `PLANNED` |

**Exit gate B/L.3:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## Gate milestone

- Dependency terpenuhi: Relevant B/G–B/K scope ready + actual environment.
- Contract hash and DTO drift check `PASS` atau `BLOCKED` bila sumber tak tersedia.
- Negative tests role/ownership/status yang relevan; rollback/transaksi untuk mutasi.
- Evidence nyata: command, hasil HTTP status, DB query dengan data sintetis, output test, file berubah, risiko.
- Konfirmasi izin pengguna sebelum melakukan `git push`, merge/deploy, atau melanjutkan milestone berikutnya.
- `apps/api/.agent-internal` dan `AGENTS.md` adalah lokal only: jangan commit/push `.md`, `.mdx`, atau secret.
