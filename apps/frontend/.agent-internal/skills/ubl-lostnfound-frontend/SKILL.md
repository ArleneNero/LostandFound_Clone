---
name: ubl-lostnfound-frontend
description: Implementasi dan audit frontend UBL LostnFound React TypeScript Vite Tailwind sesuai Figma secara ketat, menggunakan aset asli terverifikasi, mengikuti Clean Code, milestone role-first F/A fondasi lalu Petugas F/B, Guest F/C, Mahasiswa login F/D, integrasi Fastify Neon F/E, Neon Auth R2 F/F dan QA F/G. Gunakan saat mengerjakan atau melanjutkan task frontend UBL LostnFound dan memeriksa keselarasan API v1.0.
---

# UBL LostnFound — Frontend role-first procedure

## WAJIB READ sebelum setiap task

1. Baca root `AGENTS.md`, `apps/web/AGENTS.md`, lalu **`apps/web/.agent-internal/CLEAN_CODE.md` dan `references/FRONTEND_STANDARDS_SOURCE.md`** hingga paham file size gates.
2. Baca `PRD.md`, `FOLDER_STRUCTURE.md`, `FIGMA_EXACT_RULES.md`, `FIGMA_MAPPING.md`, `DESIGN_SYSTEM.md`, `ASSET_MANIFEST.md`, `WORKFLOW.md` dan satu detail milestone `milestones/F-X.md`.
3. Jalankan `python apps/web/.agent-internal/tools/verify_assets.py` sebelum gunakan image; jangan memalsukan filename/gambar. Enam aset asli dari user terdapat pada apps/web/public.
4. Periksa repo sebenarnya, `git status`, Figma frame/screenshot sebenarnya; list file akan berubah; `BLOCKED` jika ada konflik, jangan menebak.

## Urutan MUTLAK

`F/A` foundation → `F/B` **Petugas lengkap mock** → `F/C` **Guest lengkap mock** → `F/D` **Mahasiswa/login lengkap mock** → `F/E` public GET Fastify/Neon → `F/F` login Neon Auth/R2/ops Officer+Student nyata → `F/G` visual QA/UAT/deploy.

- Gate setiap role: semua layar/UX + test + screenshot visual 390/1440 dan user approval. Jangan mulai role berikutnya sebelum izin.
- P7 exception dipercepat F/E hanya dengan approval eksplisit. **F/B lama dalam root berarti katalog, sekarang F/B berarti Petugas.** Lihat `ID_MIGRATION.md`.
- Task `F/X.n.0` dimulai 0; suffix `(1)` hanya revisi setelah task sebelumnya diterima.

## EXACT Figma, Clean Code, asset

- Figma link user file `U1CiotvJOC2B3zQI417fF7` memuat Page 00 style; detail screens Page 05 ada pada `O7CTpA8dQPMdVi8ZQo2PWK` yang dirujuk DOCX. Jangan mengaku keduanya 1 file. Jika desain versi berbeda, pause/minta keputusan.
- Satu React app/one routing. Jangan redesign, improvisasi component palette, floating plus, gambar stok atau empty image path; render ulang ke viewport Figma dan bandingkan visual sebenarnya. State scroll/foto/reason tidak otomatis route baru.
- `pages` composition, `components` UI, `hooks` interaction, `services/contracts` async boundary, `services/in-memory` mock, `services/http` real, `types/api` DTO, `types/domain` view; katalog Guest/Student shared, fixtures tidak diimpor dari JSX.
- Function ~20 LOC; component ≤80, page ≤150, hook/selector ≤100, service ≤200, file >300 requires written review before merge.

## Backend contract safety

- Canonical backend 22 endpoint API `/api/v1`, JSON snake_case; ERD v6.2. `GET /items` server side paging 10; only STORED && is_visible true public; 404 hidden; Neon Auth token required protected; only STUDENT/OFFICER server roles; no online lost reports/claims.
- Exactly one report photo and one inventory photo; service post gallery 0–3. R2 presigned intent PUT finalize only at F/F. Don't invent API body field/endpoint; `409`/timeout mutation no auto retry.
- Before F/E/F/F, `python apps/web/.agent-internal/tools/verify_backend_sync.py`, compare root canonical (NOT older same-version contracts). No silent fallback to mock in mode http.

## QA and permissions

- Tests format/lint/typecheck/build/unit/e2e + screenshot Figma comparison + asset hash and status matrix. Record PASS/FAIL/NOT RUN, file LOC, actual effects.
- One local commit per coherent submilestone after tests; no auto-push/merge/deploy. Next role requires user approval. Treat undocumented change as BLOCKED.

See `references/referensi-kontrak.md` and `references/qa-gates.md` for details; root documents remain canonical for backend.
