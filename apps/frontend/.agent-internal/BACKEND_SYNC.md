# BACKEND_SYNC — Kontrak canonical dan dependensi role-first

**Sumber satu-satunya untuk API/DB:** root backend `.agent-internal/contracts/{openapi-v1.0.yaml,api-contract-v1.0.md,erd-v6.2.dbml}` dari paket backend **terbaru**. Snapshot di frontend harus byte-identical. Dokumen ini tidak mengubah backend atau mengklaim runtime sudah jalan.

## Bukti fingerprint canonical pada saat pembuatan ZIP

| File | SHA-256 backend yang diikuti |
|---|---|
| `openapi-v1.0.yaml` | `52953e53e230c84ad9015771096838d6f3bfa233424b1715fef3504c30d5d084` |
| `api-contract-v1.0.md` | `527eeee1f8b0f6aa4d795c9a8005a20a67e662a12fd299291edadfc61930485f` |
| `erd-v6.2.dbml` | `892605fa3d8be4ed0631cfddd28bf60bd9e59f353dce44e9dd996d2877375ecf` |

Jalankan `python apps/web/.agent-internal/tools/verify_backend_sync.py` sebelum F/E/F/F pada repository aktual. Kalau tidak tersedia root canonical: `NOT_VERIFIABLE`; kalau beda hash: **BLOCKED**. Tidak boleh sekadar memakai versi label v1.0 lama dengan isi berbeda.

## Hubungan frontend ↔ backend

| Frontend role-first | Kesiapan backend | Batas output |
|---|---|---|
| `F/A` fondasi | `B/A` layout monorepo | No API live needed |
| `F/B` **PETUGAS mock** | Snapshot OpenAPI/ERD dibaca, `B/*` tidak perlu live | Semua UI dashboard/inventory/create/receive/reject/return/distribute melalui 1 in-memory store |
| `F/C` **GUEST mock** | Snapshot contract sama | Landing, katalog, detail, pos/guide; satu sumber mock yang diubah Petugas |
| `F/D` **MAHASISWA/login mock** | Snapshot contract sama | Login/OTP/recovery/report/history/cancel dalam simulasi UI |
| `F/E` **PUBLIC API** | `B/E` telah ada (dan prereq B/B Neon, B/C Neon Auth, B/D R2 sesuai backend) | GET katalog & item detail real dari Fastify/Neon, GET posts; buktikan tiga API P7 backend |
| `F/F` **FULL API** | `B/F`, Neon Auth dan R2 real siap | Protected Student/Officer workflows & persistence |
| `F/G` final QA/deploy | `B/G` env staging nyata | UI/UX a11y + quota/rate-limit handling + UAT |

**P7 exception:** jika dosen menuntut integrasi sebelum Mahasiswa UI selesai, user harus mengizinkan pekerjaan F/E mendahului F/D, tanpa menandai F/D COMPLETED. Jangan otomatis mengubah urutan.

## Invariants yang tidak dapat diubah frontend

- Domain barang ditemukan saja. Guest bukan database role; server `STUDENT`, `OFFICER` saja. OFFICER dibuat melalui backend/trusted provision, terikat satu pos aktif; fase awal Pengajaran.
- 22 endpoint OpenAPI v1.0, prefix `/api/v1`, JSON `snake_case`, `{data}` / `{data,meta}` / `{error:{code,message,request_id}}`, page 1-based, limit maks 10, `meta.total_pages=0` saat empty.
- Public `GET /items` dan detail hanya `STORED AND is_visible=true`, item tersembunyi atau status terminal detail 404. Server mengerjakan pagination/filter/sort; jangan paginasi dua kali ketika mode HTTP.
- Laporan `PENDING_RECEIPT,RECEIVED,REJECTED,CANCELLED`; inventaris `STORED,RETURNED_TO_OWNER,DISTRIBUTED`. Alasan wajib untuk reject/cancel; overdue hanya warning.
- **Tepat satu** foto laporan, **tepat satu** foto inventaris, **0–3** foto pos (cover posisi 1). `report_photo_upload_token`: string; `item_photo_upload_tokens`: array **persis satu** token. Upload melalui Neon Auth-authorized intent → PUT presigned R2 → finalize.
- `item_id/submission_id` UUID, `post_id` integer. Inventory code/report code dibuat server; UI tidak boleh inject post ID assigned atau received_at jika body schema tidak menyediakan field itu.
- Neon Auth verified email + student bootstrap NIM deklarasi; tidak ada self-register Officer, role ADMIN, public lost report, klaim online atau upload foto KTP.
- Mutation timeout/409: jangan auto retry POST/PATCH ambigu; refetch reconciliation, tampilkan error yang tidak membuat duplikasi.

## Konflik Figma/source vs backend

- DOCX UI v6.2 menyebut minimum satu foto inventaris, sedangkan **backend final** benar-benar max 1. Gunakan satu foto pada mock/real.
- Figma UI JPG/PNG; backend menerima JPEG/PNG/WebP. Jangan mengubah OpenAPI diam-diam jika UX memutuskan membatasi pilihan file.
- Figma WIB waktu terima editable; backend ItemCreateRequest hanya mendukung field timestamp tertentu (`found_on`) dan `received_at` bukan input. Jika UI butuh data backend lain: buat decision request, bukan POST field tak dikenal.
- Figma OTP/recovery cooldown adalah state UI; API 22 endpoint tidak menyediakan endpoint custom reset password. Gunakan alur Neon Auth/provider sesuai kemampuannya, server enforcement bukan timer browser.
- Tidak membuat API/DB baru demi memenuhi tombol Figma sebelum spec diubah bersama backend.

## Batas klaim

Kecocokan hash dokumen **bukan** bukti backend berjalan. F/E/F/F membutuhkan tests nyata Network Fastify-Neon/Neon Auth/R2 yang relevan. Baca `API_ROUTE_MATRIX.md`, `DTO_MAPPING.md`, `INTEGRATION_TEST_PLAN.md`.
