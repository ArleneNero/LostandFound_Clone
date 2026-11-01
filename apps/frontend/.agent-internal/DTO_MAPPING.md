# DTO_MAPPING — Field-level Contract & UI view models

**Referensi:** `contracts/openapi-v1.0.yaml` (API v1.0) dari snapshot backend terbaru. Semua properti di bawah diekstrak dari schema, bukan dibuat manual. `required` berarti wajib di wire response/request schema; `nullable` beda dari optional.

## Prinsip pemetaan

1. API property **snake_case**; simpan raw DTO pada layer HTTP, mapping `item_name`→`itemName`, `received_at`→`receivedAt` di satu mapper typed; jangan mengulang pemetaan per card.
2. UI model hanya mengambil field yang relevan; jangan mengimpor table Drizzle. ID item/submission UUID (string), `post_id` integer (number); NIM string (nol di depan tidak boleh hilang).
3. `meta.total_pages=0` valid untuk empty; UI control pageCount boleh `Math.max(1, totalPages)` terpisah.
4. `received_at` server-generated; `inventory_code` dan `report_code` server-generated; `found_on` adalah date `YYYY-MM-DD`, bukan timestamp.
5. `photos[].url`, `report_photo_url`, dan `service_post_photos[].url` signed URL dengan expires_at; dilarang menyimpan `storage_path` yang tidak ada di public DTO.
6. `private_verification_notes` hanya `InventoryOfficer` (OFFICER), tidak boleh bocor ke Guest/Student. `verification_summary` hanya return record yang aman bagi petugas, bukan katalog.

## Field schema inti

### `PaginationMeta`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `page` | integer | Ya | minimum=1 |
| `limit` | integer | Ya | minimum=1 |
| `total` | integer | Ya | minimum=0 |
| `total_pages` | integer | Ya | minimum=0 |

### `ServicePostPhoto`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `photo_id` | string (uuid) | Ya | — |
| `position` | integer | Ya | minimum=1; maximum=3 |
| `is_cover` | boolean | Ya | — |
| `url` | string (uri) | Ya | — |
| `expires_at` | string (date-time) | Ya | — |

### `ServicePostPublic`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `post_id` | integer | Ya | — |
| `name` | string | Ya | — |
| `location_description` | string nullable | Ya | — |
| `opening_hours` | string nullable | Ya | — |
| `directions` | string nullable | Ya | — |
| `photos` | array[ServicePostPhoto] | Ya | maxItems=3 |

### `ItemPhoto`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `photo_id` | string (uuid) | Ya | — |
| `url` | string (uri) | Ya | — |
| `expires_at` | string (date-time) | Ya | — |
| `is_primary` | boolean | Ya | — |

### `FoundItemPublic`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `item_id` | string (uuid) | Ya | — |
| `inventory_code` | string | Ya | — |
| `item_name` | string | Ya | — |
| `category` | string | Ya | — |
| `public_description` | string | Ya | — |
| `found_location` | string nullable | Ya | — |
| `found_on` | string (date) nullable | Ya | — |
| `received_at` | string (date-time) | Ya | — |
| `post` | ServicePostShort | Ya | — |
| `photos` | array[ItemPhoto] | Ya | minItems=1; maxItems=1 |

### `FoundSubmission`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `submission_id` | string (uuid) | Ya | — |
| `report_code` | string | Ya | — |
| `target_post_id` | integer | Ya | — |
| `item_name` | string | Ya | — |
| `category` | string | Ya | — |
| `public_description` | string | Ya | — |
| `found_location` | string | Ya | — |
| `found_on` | string (date) | Ya | — |
| `status` | ReportStatus | Ya | — |
| `submitted_at` | string (date-time) | Ya | — |
| `report_photo_url` | string (uri) | Ya | — |
| `report_photo_expires_at` | string (date-time) | Ya | — |

### `ReportWithHistory`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `submission_id` | string (uuid) | Ya | — |
| `report_code` | string | Ya | — |
| `target_post_id` | integer | Ya | — |
| `item_name` | string | Ya | — |
| `category` | string | Ya | — |
| `public_description` | string | Ya | — |
| `found_location` | string | Ya | — |
| `found_on` | string (date) | Ya | — |
| `status` | ReportStatus | Ya | — |
| `submitted_at` | string (date-time) | Ya | — |
| `report_photo_url` | string (uri) | Ya | — |
| `report_photo_expires_at` | string (date-time) | Ya | — |
| `history` | array[StatusHistory] | Ya | — |

### `StatusHistory`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `history_id` | string (uuid) | Ya | — |
| `from_status` | ReportStatus nullable | Ya | — |
| `to_status` | ReportStatus | Ya | — |
| `reason` | string nullable | Ya | — |
| `changed_at` | string (date-time) | Ya | — |

### `InventoryOfficer`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `item_id` | string (uuid) | Ya | — |
| `inventory_code` | string | Ya | — |
| `item_name` | string | Ya | — |
| `category` | string | Ya | — |
| `public_description` | string | Ya | — |
| `found_location` | string nullable | Ya | — |
| `found_on` | string (date) nullable | Ya | — |
| `received_at` | string (date-time) | Ya | — |
| `post` | ServicePostShort | Ya | — |
| `photos` | array[ItemPhoto] | Ya | minItems=1; maxItems=1 |
| `status` | ItemStatus | Ya | — |
| `is_visible` | boolean | Ya | — |
| `storage_post_id` | integer | Ya | — |
| `source_submission_id` | string (uuid) nullable | Ya | — |
| `private_verification_notes` | string nullable | Ya | — |

### `OverdueInventory`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `item_id` | string (uuid) | Ya | — |
| `inventory_code` | string | Ya | — |
| `item_name` | string | Ya | — |
| `category` | string | Ya | — |
| `public_description` | string | Ya | — |
| `found_location` | string nullable | Ya | — |
| `found_on` | string (date) nullable | Ya | — |
| `received_at` | string (date-time) | Ya | — |
| `post` | ServicePostShort | Ya | — |
| `photos` | array[ItemPhoto] | Ya | minItems=1; maxItems=1 |
| `status` | ItemStatus | Ya | — |
| `is_visible` | boolean | Ya | — |
| `storage_post_id` | integer | Ya | — |
| `source_submission_id` | string (uuid) nullable | Ya | — |
| `private_verification_notes` | string nullable | Ya | — |
| `storage_limit_days` | integer | Ya | minimum=1 |
| `storage_age_days` | integer | Ya | minimum=0 |
| `overdue_days` | integer | Ya | minimum=1 |

### `Me`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `user_id` | string (uuid) | Ya | — |
| `full_name` | string | Ya | — |
| `email` | string (email) | Ya | — |
| `student_number` | string nullable | Ya | — |
| `role` | UserRole | Ya | — |
| `assigned_post_id` | integer nullable | Ya | — |
| `nim_verification_status` | string | Ya | enum=NOT_VERIFIED |

### `UploadIntent`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `upload_id` | string (uuid) | Ya | — |
| `put_url` | string (uri) | Ya | — |
| `expires_at` | string (date-time) | Ya | — |
| `required_headers` | object | Ya | — |

### `UploadFinalized`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `upload_token` | string | Ya | — |
| `purpose` | string | Ya | enum=REPORT_PHOTO,ITEM_PHOTO |
| `expires_at` | string (date-time) | Ya | — |

### `BootstrapRequest`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `full_name` | string | Ya | minLength=1; maxLength=120 |
| `student_number` | string | Ya | minLength=1; maxLength=30 |

### `SubmissionCreateRequest`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `target_post_id` | integer | Ya | — |
| `item_name` | string | Ya | minLength=1; maxLength=150 |
| `category` | string | Ya | minLength=1; maxLength=80 |
| `public_description` | string | Ya | minLength=1 |
| `found_location` | string | Ya | minLength=1 |
| `found_on` | string (date) | Ya | — |
| `report_photo_upload_token` | string | Ya | minLength=1 |

### `ReasonRequest`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `reason` | string | Ya | minLength=1; maxLength=2000 |

### `ItemCreateRequest`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `item_name` | string | Ya | minLength=1; maxLength=150 |
| `category` | string | Ya | minLength=1; maxLength=80 |
| `public_description` | string | Ya | minLength=1 |
| `private_verification_notes` | string nullable | Tidak | — |
| `found_location` | string nullable | Tidak | — |
| `found_on` | string (date) nullable | Tidak | — |
| `item_photo_upload_tokens` | array[string] | Ya | minItems=1; maxItems=1 |

### `ReceiveRequest`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `public_description` | string | Ya | minLength=1 |
| `private_verification_notes` | string nullable | Tidak | — |
| `item_photo_upload_tokens` | array[string] | Ya | minItems=1; maxItems=1 |

### `VisibilityRequest`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `is_visible` | boolean | Ya | — |

### `ReturnRequest`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `recipient_name` | string | Ya | minLength=1; maxLength=120 |
| `verification_summary` | string | Ya | minLength=1; maxLength=5000 |

### `UploadIntentRequest`

| Properti | Jenis / $ref | Wajib | Constraints penting |
|---|---|---|---|
| `purpose` | string | Ya | enum=REPORT_PHOTO,ITEM_PHOTO |
| `content_type` | string | Ya | enum=image/jpeg,image/png,image/webp |
| `size_bytes` | integer | Ya | minimum=1; maximum=5242880 |

## Contoh adapter dan format (tanpa menyatakan kode sudah ada)

```ts
type ApiList<T> = { data: T[]; meta: { page: number; limit: number; total: number; total_pages: number } };
type ApiSuccess<T> = { data: T };
type ApiError = { error: { code: string; message: string; request_id: string } };
// Semua bentuk lengkap harus diambil dari OpenAPI, bukan hanya contoh ringkas ini.
```

**Fokus P7:** GET `/items` -> `ItemsResponse` (`FoundItemPublic[]`) dan GET `/items/{item_id}` -> `ItemResponse` (`FoundItemPublic`). POST `/officer/items` body `ItemCreateRequest` (1 token foto) -> 201 `InventoryResponse`. Browser cukup memakai data publik tetapi POST test harus dilakukan sebagai OFFICER authorized.


> **Role-first note (2026-10-20):** Id integrasi publik yang dulu `F/D` sekarang `F/E`; operasi produksi masih `F/F`. Baca `ID_MIGRATION.md`. Isi kontrak API di tabel ini tetap authoritative dari snapshot backend.
