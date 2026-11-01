# Backend Agent Docs — UBL LostnFound / CampusFind

**Status:** dokumentasi siap dipakai; **95 task PLANNED**, **13 milestone B/A–B/M**, **22 operasi REST dalam OpenAPI 1.0**. Tidak mengklaim API/database/provider tersedia atau teruji.

**Perbandingan Frontend:** struktur mengikuti `apps/web/.agent-internal` dari ZIP pengguna: `AGENTS.md` (di `apps/api`), `SKILL.md` (di folder skill), `PRD`, `PHASES`, `MILESTONES`, `TODO`, `task-registry.json`, `milestones/B-X.md`, `GIT_POLICY`, `CLEAN_CODE`, `WORKFLOW`, `ARCHITECTURE`, kontrak, test matrix dan tools.

## Mulai

1. Baca `../AGENTS.md` dan dokumen ini.
2. Baca `PRD.md`, `MILESTONES_Backend.md`, `TODO_Backend.md`, `ID_MIGRATION.md`, `PHASES.md`.
3. Validasi kontrak: `python apps/api/.agent-internal/tools/verify_backend_contracts.py` dari root monorepo; cocokkan canonical root jika ada.
4. Baca `GIT_POLICY.md`, `CLEAN_CODE.md`, `WORKFLOW.md`, `PRECODING_CHECKLIST.md`.
5. Jalankan **B/A.1.0**, satu task aktif, jangan menulis kode sebelum Gate/izin.

## Referensi yang berwenang

1. `contracts/openapi-v1.0.yaml` untuk HTTP; `contracts/erd-v6.2.dbml` untuk DB; `contracts/api-contract-v1.0.md` untuk penjelasan.
2. Keputusan scope formal (hanya found items; Pos Pengajaran awal; STUDENT/OFFICER; no online claims).
3. `BACKEND_MVP.md` untuk checkpoint MVP **B0–B4**, tetapi jika berbeda dari OpenAPI maka kontrak menang.
4. `MILESTONES_Backend.md`, `TODO_Backend.md` dan per-milestone `milestones/B-X.md` untuk rincian tugas.

**Penting:** `B/A..B/M` adalah roadmap Backend paket baru, bukan penomoran frontend `F/A..F/G` atau roadmap root backend lawas. Lihat `ID_MIGRATION.md`. Jangan mengubah catatan progres historis.

## Daftar berkas operasional

- `PRD.md`, `PHASES.md`, `ARCHITECTURE.md`, `FOLDER_STRUCTURE.md`, `STACK_ENV.md`, `SERVICE_SETUP.md`
- `GIT_POLICY.md`, `CLEAN_CODE.md`, `WORKFLOW.md`, `PRECODING_CHECKLIST.md`, `DECISION_LOG.md`
- `API_ROUTE_MATRIX.md`, `HTTP_STATUS_MATRIX.md`, `SECURITY_THREAT_MODEL.md`, `DEPLOYMENT_SECURITY.md`, `INTEGRATION_TEST_PLAN.md`
- `MILESTONES.md` + `MILESTONES_Backend.md`, `TODO.md` + `TODO_Backend.md`, `milestones/B-A..B-M.md`, `task-registry.json`
- `contracts/openapi-v1.0.yaml`, `api-contract-v1.0.md`, `erd-v6.2.dbml`, `manifest.json`; `tools/verify_backend_contracts.py`

**Penggunaan file `.md`:** *hanya lokal untuk AI*, dilarang commit/push sesuai arahan pemilik. Dokumen backend skill ini tidak otomatis mengganti file root proyek.
