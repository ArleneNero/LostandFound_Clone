# API_ROUTE_MATRIX — Kontrak OpenAPI 1.0 (22 operasi)

## Sumber kebenaran

`contracts/openapi-v1.0.yaml` adalah canonical snapshot dari ZIP lokal, SHA-256 lihat `contracts/manifest.json`. Path dengan prefix `/api/v1`. Jangan membuat `GET /officer/items`: inventaris adalah `GET /officer/inventory`. Request dan response **wajib** mengikuti schema aktual.

| Method | Path | Auth | Implementasi Backend | OperationId | Expected status (kontrak) |
|---|---|---|---|---|---|
| `GET` | `/api/v1/posts` | Public | `B/C` | `ListServicePosts` | `200,400,404,422,500` |
| `GET` | `/api/v1/posts/{post_id}` | Public | `B/C` | `GetServicePostDetail` | `200,400,404,422,500` |
| `GET` | `/api/v1/items` | Public | `B/C` | `ListPublicFoundItems` | `200,400,404,422,500` |
| `GET` | `/api/v1/items/{item_id}` | Public | `B/C` | `GetPublicFoundItemDetail` | `200,400,404,422,500` |
| `GET` | `/api/v1/me` | Neon Auth | `B/D` | `GetCurrentCampusfindProfile` | `200,400,401,403,404,409,422,429,500` |
| `POST` | `/api/v1/me/bootstrap` | Neon Auth | `B/H` | `CreateStudentProfileAfterNeon AuthSignup` | `201,400,401,403,404,409,422,429,500` |
| `POST` | `/api/v1/submissions` | Neon Auth | `B/H` | `SubmitFoundItemReport` | `201,400,401,403,404,409,422,429,500` |
| `GET` | `/api/v1/submissions/me` | Neon Auth | `B/H` | `ListOwnFoundItemReports` | `200,400,401,403,404,409,422,429,500` |
| `GET` | `/api/v1/submissions/{submission_id}` | Neon Auth | `B/H` | `GetAuthorizedFoundReportDetail` | `200,400,401,403,404,409,422,429,500` |
| `POST` | `/api/v1/submissions/{submission_id}/cancel` | Neon Auth | `B/H` | `CancelOwnPendingReport` | `200,400,401,403,404,409,422,429,500` |
| `GET` | `/api/v1/officer/submissions` | Neon Auth | `B/I` | `ListReportsForAssignedPost` | `200,400,401,403,404,409,422,429,500` |
| `POST` | `/api/v1/officer/submissions/{submission_id}/receive` | Neon Auth | `B/I` | `ReceiveFoundReportAndCreateInventory` | `201,400,401,403,404,409,422,429,500` |
| `POST` | `/api/v1/officer/submissions/{submission_id}/reject` | Neon Auth | `B/I` | `RejectPendingFoundReport` | `200,400,401,403,404,409,422,429,500` |
| `GET` | `/api/v1/officer/inventory` | Neon Auth | `B/G` | `ListInventoryForAssignedPost` | `200,400,401,403,404,409,422,429,500` |
| `GET` | `/api/v1/officer/inventory/overdue` | Neon Auth | `B/G` | `ListOverdueStoredInventory` | `200,400,401,403,404,409,422,429,500` |
| `POST` | `/api/v1/officer/items` | Neon Auth | `B/F` | `RecordFoundItemDirectly` | `201,400,401,403,404,409,422,429,500` |
| `GET` | `/api/v1/officer/items/{item_id}` | Neon Auth | `B/G` | `GetAuthorizedInventoryDetail` | `200,400,401,403,404,409,422,429,500` |
| `PATCH` | `/api/v1/officer/items/{item_id}/visibility` | Neon Auth | `B/G` | `SetStoredItemCatalogVisibility` | `200,400,401,403,404,409,422,429,500` |
| `POST` | `/api/v1/officer/items/{item_id}/return` | Neon Auth | `B/J` | `ReturnItemToVerifiedOwner` | `201,400,401,403,404,409,422,429,500` |
| `POST` | `/api/v1/officer/items/{item_id}/distribute` | Neon Auth | `B/J` | `DistributeItemUnderPostPolicy` | `200,400,401,403,404,409,422,429,500` |
| `POST` | `/api/v1/uploads/intents` | Neon Auth | `B/E` | `RequestR2ImageUploadIntent` | `201,400,401,403,404,409,422,429,500` |
| `POST` | `/api/v1/uploads/{upload_id}/finalize` | Neon Auth | `B/E` | `FinalizeVerifiedR2ImageUpload` | `200,400,401,403,404,409,422,429,500` |

## Aturan implementasi

- Public GET `/items`: `status=STORED` dan `is_visible=true`; filter sebelum pagination, detail tersembunyi harus 404.
- Halaman limit API 1..10, default 10; response memakai `{data,meta}` bila tercantum dalam OpenAPI.
- Route private harus verifikasi JWT Neon Auth server-side, role dan assigned post dari DB; 401 berbeda dari 403.
- R2 upload `POST intents` → PUT R2 presigned → `POST finalize`; PUT bukan endpoint Fastify.
- `POST /officer/items` hanya token foto `ITEM_PHOTO` sah tepat satu; transaksi simpan inventory + item_photos.
- Semua error balas `{error:{code,message,request_id}}`; gunakan status sesuai definisi operasi, bukan daftar status generik.
- Tidak ada route register/login password custom: Neon Auth menangani flow autentikasi; `/me/bootstrap` khusus profile STUDENT.
