# PHASES — Backend

| Paket aktif | Makna | Cakupan | Exit |
|---|---|---|---|
| B/A | B0 preflight | audit/izin/sumber | persetujuan coding |
| B/B | B1 foundation | Fastify, Drizzle, 8 tabel, Neon, seed | migration & DB query lulus |
| B/C | B2 public API | GET posts, katalog & detail | HTTP/contract/404 lulus |
| B/D | B3 auth | Neon Auth JWT, DB roles, cross-post guard | 401/403 tests lulus |
| B/E | B3 R2 | intent, signed PUT, finalize | real R2 file checks lulus |
| B/F | B3 POST + B4 Gate | atomic officer POST | 201 real provider + MVP approval |
| B/G | pasca-MVP | officer inventory/visibility/overdue | protected GET/patch tests |
| B/H | pasca-MVP | student me/bootstrap/submissions | ownership/status tests |
| B/I | pasca-MVP | officer receive/reject reports | atomic/history tests |
| B/J | pasca-MVP | return/distribute | race/uniqueness tests |
| B/K | integration | apps/web ↔ Fastify ↔ Neon/Neon Auth/R2 | E2E persistence + approval |
| B/L | hardening | QA/security/ops/restore | reproducible regression |
| B/M | pilot | staging/UAT/operational approval | campus review; no auto-deploy |

**Konflik numerasi:** Blueprint Backend sebelumnya memakai B1–B6, BACKEND_MVP memakai B0–B4; ini bukan satu-satu task ID. Periksa ID_MIGRATION dan file per milestone.
