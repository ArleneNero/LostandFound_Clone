# API_ROUTE_MATRIX — seluruh 22 operasi OpenAPI v1.0

> Tabel **dibangkitkan dari snapshot YAML backend terbaru**, sehingga nama method/path/query/body/output bukan tebakan. Prefix semua route `/api/v1`. Nama rute halaman frontend tidak sama dengan API route. Metadata total tetap dari respons server.

| Method | Endpoint (tanpa prefix) | View/fitur UI | Hak akses server | Request body schema | 2xx response schema |
|---|---|---|---|---|---|
| `GET` | `/posts` | Daftar pos (`FIT-001`) | Publik | `—` | `200:PostsResponse` |
| `GET` | `/posts/{post_id}` | Detail pos/galeri (`FIT-001`) | Publik | `—` | `200:PostResponse` |
| `GET` | `/items` | CatalogPage, Home latest (`FIT-002,009`) | Publik | `—` | `200:ItemsResponse` |
| `GET` | `/items/{item_id}` | ItemDetailPage (`FIT-002`) | Publik | `—` | `200:ItemResponse` |
| `GET` | `/me` | Auth bootstrap / Profil / RoleRoute (`FIT-003`) | Neon Auth JWT | `—` | `200:MeResponse` |
| `POST` | `/me/bootstrap` | Student onboarding (`FIT-003`) | Neon Auth verified email (STUDENT only) | `BootstrapRequest` | `201:MeResponse` |
| `POST` | `/submissions` | CreateReportPage (`FIT-005`) | STUDENT | `SubmissionCreateRequest` | `201:SubmissionResponse` |
| `GET` | `/submissions/me` | MyReportsPage (`FIT-005`) | STUDENT | `—` | `200:SubmissionsResponse` |
| `GET` | `/submissions/{submission_id}` | MyReportDetail / OfficerReportDetail (`FIT-005,006`) | STUDENT owner / OFFICER pos | `—` | `200:SubmissionDetailResponse` |
| `POST` | `/submissions/{submission_id}/cancel` | CancelReportPage (`FIT-005`) | STUDENT owner | `ReasonRequest` | `200:SubmissionResponse` |
| `GET` | `/officer/submissions` | OfficerReportsPage (`FIT-006`) | OFFICER pos | `—` | `200:SubmissionsResponse` |
| `POST` | `/officer/submissions/{submission_id}/receive` | ReceiveItemPage (`FIT-006`) | OFFICER pos | `ReceiveRequest` | `201:InventoryResponse` |
| `POST` | `/officer/submissions/{submission_id}/reject` | RejectReportPage (`FIT-006`) | OFFICER pos | `ReasonRequest` | `200:SubmissionResponse` |
| `GET` | `/officer/inventory` | InventoryPage, Dashboard (`FIT-007`) | OFFICER pos | `—` | `200:InventoryListResponse` |
| `GET` | `/officer/inventory/overdue` | Overdue warning (`FIT-007`) | OFFICER pos | `—` | `200:OverdueListResponse` |
| `POST` | `/officer/items` | ItemRegistrationPage (`FIT-007`) | OFFICER pos | `ItemCreateRequest` | `201:InventoryResponse` |
| `GET` | `/officer/items/{item_id}` | InventoryDetailPage (`FIT-007`) | OFFICER pos | `—` | `200:InventoryResponse` |
| `PATCH` | `/officer/items/{item_id}/visibility` | Inventory visibility toggle (`FIT-007`) | OFFICER pos | `VisibilityRequest` | `200:InventoryResponse` |
| `POST` | `/officer/items/{item_id}/return` | HandoverPage (`FIT-008`) | OFFICER pos | `ReturnRequest` | `201:ReturnResponse` |
| `POST` | `/officer/items/{item_id}/distribute` | Disposition action Petugas (`FIT-008`) | OFFICER pos | `—` | `200:InventoryResponse` |
| `POST` | `/uploads/intents` | PhotoPicker -> UploadService (`FIT-004`) | Neon Auth JWT + valid purpose | `UploadIntentRequest` | `201:UploadIntentResponse` |
| `POST` | `/uploads/{upload_id}/finalize` | UploadService finalize (`FIT-004`) | Neon Auth JWT + pemilik upload | `—` | `200:UploadFinalizedResponse` |

## Query/path parameter resmi

| Endpoint | Parameter | Keterangan |
|---|---|---|
| `GET /posts` | `page`, `limit` | Parameter sesuai definisi `components.parameters` OpenAPI |
| `GET /posts/{post_id}` | `post_id` | Parameter sesuai definisi `components.parameters` OpenAPI |
| `GET /items` | `page`, `limit`, `q`, `category`, `post_id`, `sort` | Parameter sesuai definisi `components.parameters` OpenAPI |
| `GET /items/{item_id}` | `item_id` | Parameter sesuai definisi `components.parameters` OpenAPI |
| `GET /submissions/me` | `page`, `limit`, `status` | Parameter sesuai definisi `components.parameters` OpenAPI |
| `GET /submissions/{submission_id}` | `submission_id` | Parameter sesuai definisi `components.parameters` OpenAPI |
| `POST /submissions/{submission_id}/cancel` | `submission_id` | Parameter sesuai definisi `components.parameters` OpenAPI |
| `GET /officer/submissions` | `page`, `limit`, `status` | Parameter sesuai definisi `components.parameters` OpenAPI |
| `POST /officer/submissions/{submission_id}/receive` | `submission_id` | Parameter sesuai definisi `components.parameters` OpenAPI |
| `POST /officer/submissions/{submission_id}/reject` | `submission_id` | Parameter sesuai definisi `components.parameters` OpenAPI |
| `GET /officer/inventory` | `page`, `limit`, `status`, `q` | Parameter sesuai definisi `components.parameters` OpenAPI |
| `GET /officer/inventory/overdue` | `page`, `limit` | Parameter sesuai definisi `components.parameters` OpenAPI |
| `GET /officer/items/{item_id}` | `item_id` | Parameter sesuai definisi `components.parameters` OpenAPI |
| `PATCH /officer/items/{item_id}/visibility` | `item_id` | Parameter sesuai definisi `components.parameters` OpenAPI |
| `POST /officer/items/{item_id}/return` | `item_id` | Parameter sesuai definisi `components.parameters` OpenAPI |
| `POST /officer/items/{item_id}/distribute` | `item_id` | Parameter sesuai definisi `components.parameters` OpenAPI |
| `POST /uploads/{upload_id}/finalize` | `upload_id` | Parameter sesuai definisi `components.parameters` OpenAPI |

## Aturan wajib sesuai server

- `page` 1-based, `limit` default 10 dan maksimum 10 (cek spec), `meta.total_pages` 0 ketika total 0. UI boleh memakai page 1 ketika 0 agar kontrol stabil, tetapi jangan menimpa meta API.
- GET `/items` menerima `q`, `category`, `post_id`, `sort`. Pilihan `sort` hanya `received_at_desc`, `received_at_asc`, `item_name_asc`. Server melakukan filter/sort/paginate; UI jangan memotong ulang hasil.
- GET `/officer/inventory` menerima `page`, `limit`, `status`, `q` sesuai schema; **tidak ada `post_id` untuk memilih pos lain**. Assigned post berasal dari token/database.
- Respon list memiliki `data[]` dan `meta` berupa `page`, `limit`, `total`, `total_pages`; detail `{data:{...}}`; error `{error:{code,message,request_id}}`.
- `POST /officer/items` dan `POST /officer/submissions/{id}/receive` menggunakan `item_photo_upload_tokens` **array tepat 1 elemen**. Report create menggunakan string tunggal `report_photo_upload_token`.
- Tidak tersedia API khusus reset sandi/OTP: gunakan integrasi Neon Auth SDK (dengan kebijakan rate limit server/provider, bukan timer client semata). Tidak ada API edit foto pos publik atau pembuatan role OFFICER.
- Mutasi `409 INVALID_STATE` tidak pernah di-*retry* otomatis. Tampilkan state konflik dan refetch, hindari duplikasi;
- Untuk detail hanya publik, backend mengembalikan 404 bagi item non-STORED atau tidak visible; jangan fallback ke endpoint inventaris yang private.
- Baca `DTO_MAPPING.md` untuk properti response yang akurat dan `BACKEND_SYNC.md` sebelum memasang HTTP adapter.


> **Role-first note (2026-10-20):** Id integrasi publik yang dulu `F/D` sekarang `F/E`; operasi produksi masih `F/F`. Baca `ID_MIGRATION.md`. Isi kontrak API di tabel ini tetap authoritative dari snapshot backend.
