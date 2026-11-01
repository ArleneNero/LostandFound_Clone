# WORKFLOW — Agent Backend per task/submilestone

## Preflight setiap task

1. Baca AGENTS root+api, README, CLEAN_CODE, GIT_POLICY, task-registry, MILESTONES, TODO, `milestones/B-X.md`, kontrak dan blueprint terkait.
2. `git status`, branch/remotes, provider env readiness (tanpa print). Jalankan `tools/verify_backend_contracts.py` dan cek canonical root jika ada.
3. Pilih **satu** task aktif. Rencanakan file, dependensi DB, operasi HTTP, authz, negative tests. Bedakan `PLANNED`, `IN_PROGRESS`, `BLOCKED`, `COMPLETED`.
4. Jangan coding sebelum B/A preflight dan approval coding. Jika konflik kontrak atau migrasi destructive: minta keputusan.

## Eksekusi

- Gunakan arsitektur modular di ARCHITECTURE; implementasi kecil dan tidak menyentuh frontend sebelum B/K Integration Gate.
- Query ke Neon dev/test wajib untuk klaim persisten; Neon Auth/R2 real dev untuk 201 officer full E2E; no bypass/SQLite substitute.
- Uji dan catat: format/lint/typecheck/build/unit/contract/integration/security/performance sesuai scope, PASS/FAIL/NOT RUN dengan alasan.
- Tinjau Git staging, commit subject/body sesuai GIT_POLICY setelah gate submilestone; push/merge/deploy hanya dengan izin.

## Handoff

```text
Task: B/X.n.m | Milestone: B/X.n | Status: PLANNED/IN_PROGRESS/BLOCKED/COMPLETED
Canonical OpenAPI/ERD SHA and drift: PASS/FAIL/BLOCKED
Files changed + LOC: ...
Environment: MOCK / DEV_DB / STAGING (actual)
Tests: lint=?, typecheck=?, build=?, unit=?, contract=?, integration=?, security=?
HTTP evidence: method/path/status + sanitized response
DB/provider evidence: masked, synthetic only
Auth negative tests: 401/403/404/409/422 (where applicable)
Commit: SHA/BELUM | Push: URL/BELUM | Approval: ...
Blockers / risks / next task after approval: ...
```
