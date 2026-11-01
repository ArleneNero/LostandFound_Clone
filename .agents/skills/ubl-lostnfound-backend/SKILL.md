---
name: ubl-lostnfound-backend
description: Membangun, memeriksa, dan mengelola Backend CampusFind / UBL LostnFound Fastify TypeScript Drizzle Neon PostgreSQL, Clerk, Cloudflare R2, dan kontrak OpenAPI v1.0 / ERD v6.2. Gunakan untuk tugas Backend B/A sampai B/M, REST API, database migration, auth, foto, inventaris, laporan mahasiswa, penerimaan/pengembalian, integrasi frontend, pengujian keamanan, atau review tugas AntiGravity dengan checklist TODO dan milestone.
---

# UBL LostnFound — Backend Agent Skill

## Cara memasang dan memuat aturan

1. Bundle ini berisi SKILL untuk agent, serta **template overlay lokal** di `assets/project-overlay/apps/api/` yang bentuknya setara dengan `apps/web/.agent-internal/` Frontend pada ZIP sumber.
2. Pada workspace *yang dipilih pengguna*, review potensi konflik sebelum menyalin overlay ke `apps/api/`; jangan overwrite berkas existing secara otomatis. **Tidak ada migrasi / deploy / Git action saat memasang skill.**
3. Baca `apps/api/AGENTS.md`, `.agent-internal/README.md`, `MILESTONES_Backend.md`, `TODO_Backend.md`, `task-registry.json`, `GIT_POLICY.md`, `CLEAN_CODE.md`, `WORKFLOW.md`, `ID_MIGRATION.md`, `BACKEND_MVP.md` dan milestone aktif `milestones/B-<X>.md` sebelum task pertama.
4. Baca `contracts/openapi-v1.0.yaml` dan `contracts/erd-v6.2.dbml` yang diambil byte-identik dari ZIP sumber. Jalankan `python apps/api/.agent-internal/tools/verify_backend_contracts.py` sebelum coding/commit untuk melacak drift.
5. Proyek hanya *barang ditemukan*, mulai Pos Pengajaran; tidak ada online lost-report, online claim, DB ADMIN, KTP/NIK/photo ID. Gunakan data sintetis dan rahasia env.

## Urutan tugas dan checkpoint

- Status awal **95 tugas `PLANNED`** di 13 milestone `B/A..B/M` (29 submilestone) — **belum dikerjakan**. Pilih satu task `B/X.n.m` pada satu waktu. Baca aturan prioritas `MILESTONES_Backend.md` dan `ID_MIGRATION.md`.
- **Backend MVP Gate**: B/A preflight → B/B Fastify/Neon/Drizzle → B/C publik GET → B/D Clerk/RBAC → B/E R2 → B/F petugas POST + Gate. Pemetaan ke `B0-B4` dalam `BACKEND_MVP.md` adalah checkpoint, **bukan ID tugas**.
- Setelah approval B/F: B/G petugas inventaris → B/H mahasiswa → B/I penerimaan fisik → B/J return/distribute → B/K integrasi frontend → B/L QA/hardening → B/M staging/pilot. Tahap lanjut dapat dimodifikasi hanya dengan persetujuan pengguna.
- **Preflight B/A dahulu, tanpa coding**: audit status Git, dokumentasi canonical, versi runtime, schema, env/provider readiness, kondisi main, blocker. Jangan mengklaim DB/Clerk/R2 live hanya karena dokumen tersedia.
- Satu milestone/submilestone tidak boleh dinyatakan selesai tanpa bukti tes nyata. Izin coding, commit, push, merge, deploy, dan perubahan kontrak adalah **izin terpisah** sesuai dokumentasi proyek.

## Sumber kebenaran & konflik yang sudah diketahui

- OpenAPI snapshot menentukan path/method/request/response/error (`snake_case`); ERD menentukan **8 tabel**; keputusan scope produk; blueprint; roadmap hanya mengatur urutan.
- **Jangan gunakan `GET /api/v1/officer/items`** untuk list. Kontrak menentukan `GET /api/v1/officer/inventory`; `POST /api/v1/officer/items` untuk tambah; `GET /api/v1/officer/items/{item_id}` untuk detail.
- Dalam OpenAPI snapshot yang disertakan, `item_photo_upload_tokens` pada `ItemCreateRequest` dan `ReceiveRequest` adalah **tepat 1** (`minItems=maxItems=1`). `BACKEND_MVP.md` lama menyebut 1–5; jika canonical lain berbeda, **BLOCKED/CONTRACT_DRIFT** sampai ada keputusan, jangan ubah tanpa izin.
- Hanya `STORED` + `is_visible=true` untuk katalog publik; detail hidden/non-STORED 404. Paginasi `limit` 1..10, default 10 sesuai OpenAPI.
- Auth Clerk JWT harus diverifikasi server-side, role `STUDENT` / `OFFICER` dan pos diputuskan dari DB. Jangan ambil role/post dari payload user. R2 private: upload intent → presigned PUT → finalize → signed single-use token.
- Tiga endpoint inti **tidak berarti tiga endpoint total**. Alur foto memerlukan dua endpoint Fastify tambahan dari kontrak. Tidak membuat endpoint baru dari asumsi.

## Disiplin pengerjaan

1. Baca `PRECODING_CHECKLIST.md`, `ARCHITECTURE.md`, `FOLDER_STRUCTURE.md`, `STACK_ENV.md`, `SERVICE_SETUP.md`, `API_ROUTE_MATRIX.md`, `HTTP_STATUS_MATRIX.md` dan `DEPLOYMENT_SECURITY.md` sesuai modul.
2. Buat rencana file terdampak, risiko, SQL transaction, negative tests dan request/response sesuai OpenAPI. Akses database *dev/test* nyata untuk setiap klaim integrasi.
3. Implementasikan lapis route/schema → controller → service → repository/policies → Drizzle, tanpa menggabungkan otorisasi dan SQL di handler besar.
4. Jalankan lint/typecheck/build, unit, contract, integration (Neon nyata), security (cross-role/IDOR/SQLi/forged MIME/replay) secara selektif. Semua hasil `PASS/FAIL/NOT RUN` dengan command dan bukti.
5. Saat test lolos, ikuti `GIT_POLICY.md` dari paket lokal untuk judul dan body commit. **Tidak stage/push file .md/.mdx, AGENTS, .agent-internal, secret, env**. Tidak boleh author bot atau automation auto-commit; gunakan kontributor manusia sah.
6. Handoff satu task: ID, status, file dan LOC, contract hash, test results, HTTP status, query DB (redacted), risiko, commit/push, izin berikutnya.

## Referensi untuk dibaca saat dibutuhkan

- `references/CONTRACT_NOTES.md` — konflik dan domain utama.
- `references/BACKEND_QA_GATES.md` — test matrix dan bukti.
- `references/INSTALLATION.md` — memasang overlay lokal dengan aman.
- `assets/project-overlay/apps/api/.agent-internal/` — dokumen detail, registry, 13 milestone, 22 route, canonical contracts, skrip verifier.

**Jangan klaim aplikasi Backend dibangun dengan menginstal skill ini.** Ini paket instruksi dan checklist lokal.
