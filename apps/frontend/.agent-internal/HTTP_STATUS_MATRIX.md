# HTTP_STATUS_MATRIX — status code yang benar-benar tertera di OpenAPI canonical

> **Dibaca langsung** dari `contracts/openapi-v1.0.yaml` yang byte-identical dengan backend terbaru; status di luar tabel ini jangan dijanjikan sudah menjadi bagian kontrak. Tambahkan hanya lewat persetujuan perubahan versi kontrak.

| Method | API path tanpa `/api/v1` | Status responses yang dideklarasikan | Token/role gate |
|---|---|---|---|
| `GET` | `/posts` | `200`, `400`, `404`, `422`, `500` | Publik |
| `GET` | `/posts/{post_id}` | `200`, `400`, `404`, `422`, `500` | Publik |
| `GET` | `/items` | `200`, `400`, `404`, `422`, `500` | Publik |
| `GET` | `/items/{item_id}` | `200`, `400`, `404`, `422`, `500` | Publik |
| `GET` | `/me` | `200`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500` | Neon Auth / protected |
| `POST` | `/me/bootstrap` | `201`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500` | Neon Auth / protected |
| `POST` | `/submissions` | `201`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500` | Neon Auth / protected |
| `GET` | `/submissions/me` | `200`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500` | Neon Auth / protected |
| `GET` | `/submissions/{submission_id}` | `200`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500` | Neon Auth / protected |
| `POST` | `/submissions/{submission_id}/cancel` | `200`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500` | Neon Auth / protected |
| `GET` | `/officer/submissions` | `200`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500` | Neon Auth / protected |
| `POST` | `/officer/submissions/{submission_id}/receive` | `201`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500` | Neon Auth / protected |
| `POST` | `/officer/submissions/{submission_id}/reject` | `200`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500` | Neon Auth / protected |
| `GET` | `/officer/inventory` | `200`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500` | Neon Auth / protected |
| `GET` | `/officer/inventory/overdue` | `200`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500` | Neon Auth / protected |
| `POST` | `/officer/items` | `201`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500` | Neon Auth / protected |
| `GET` | `/officer/items/{item_id}` | `200`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500` | Neon Auth / protected |
| `PATCH` | `/officer/items/{item_id}/visibility` | `200`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500` | Neon Auth / protected |
| `POST` | `/officer/items/{item_id}/return` | `201`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500` | Neon Auth / protected |
| `POST` | `/officer/items/{item_id}/distribute` | `200`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500` | Neon Auth / protected |
| `POST` | `/uploads/intents` | `201`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500` | Neon Auth / protected |
| `POST` | `/uploads/{upload_id}/finalize` | `200`, `400`, `401`, `403`, `404`, `409`, `422`, `429`, `500` | Neon Auth / protected |

## Penanganan UI

- 2xx: tampilkan hasil setelah respons dan state konsisten; jangan menampilkan sukses sebelum server menerima.
- 400/422: validasi request dan tampilkan field error ramah; jangan dump error raw.
- 401: sesi tidak valid / token expired -> minta sign-in lagi untuk layar privat.
- 403: akses role terlarang -> jangan membeberkan resource; 404: hilang atau resource disamarkan karena bukan milik pengguna/pos.
- 409 `INVALID_STATE`: server menolak mutasi status ganda; refetch state authorized, jangan otomatis mengulang mutation POST.
- 429 hanya ketika **endpoint tersebut memang mendeklarasikan** response ini di YAML; jika desain membutuhkan rate limit lain, minta perubahan kontrak.
- 5xx/network: minta pengguna coba lagi untuk safe read GET; POST/PATCH ambiguous memerlukan rekonsiliasi sebelum retry.

## Data kontrak

- OpenAPI version: `1.0.0`.
- Operasi: `22`.
- Role yang terlihat UI bukan bukti RBAC; otoritas server wajib memeriksa JWT dan post penugasan.


> **Role-first note (2026-10-20):** Id integrasi publik yang dulu `F/D` sekarang `F/E`; operasi produksi masih `F/F`. Baca `ID_MIGRATION.md`. Isi kontrak API di tabel ini tetap authoritative dari snapshot backend.
