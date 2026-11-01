# Referensi kontrak dan batas integrasi

## Prioritas

Canonical backend terbaru: root monorepo `.agent-internal/contracts/openapi-v1.0.yaml`, `api-contract-v1.0.md`, `erd-v6.2.dbml`. Snapshot mirror: `apps/web/.agent-internal/contracts/`. Salinan lama yang berbeda SHA-256 **tidak berlaku** untuk frontend ini. Jika canonical mismatch, `BLOCKED`.

## 22 operasi `/api/v1`

Public: GET `/posts`, `/posts/{post_id}`, `/items`, `/items/{item_id}`.

Identity: GET `/me`, POST `/me/bootstrap` (STUDENT verified email only).

Student: POST `/submissions`, GET `/submissions/me`, GET `/submissions/{submission_id}` (owner atau officer pos), POST `/submissions/{submission_id}/cancel` (alasan wajib).

Officer: GET `/officer/submissions`, POST `/officer/submissions/{submission_id}/receive`, POST `/officer/submissions/{submission_id}/reject`, GET `/officer/inventory`, GET `/officer/inventory/overdue`, POST `/officer/items`, GET `/officer/items/{item_id}`, PATCH `/officer/items/{item_id}/visibility`, POST `/officer/items/{item_id}/return`, POST `/officer/items/{item_id}/distribute`.

Uploads: POST `/uploads/intents`, POST `/uploads/{upload_id}/finalize`; PUT ke presigned R2 bukan path API Fastify tambahan.

## Contract pitfalls

- Foto inventory **tepat satu**; request field tetap `item_photo_upload_tokens:[token]`.
- Pagination GET list `data[] + meta`, limit<=10; `meta.total_pages` boleh 0, UI page control min 1. Sort katalog hanya `received_at_desc`, `received_at_asc`, `item_name_asc`.
- `received_at`, `inventory_code`, assigned officer post server generated; jangan kirim `received_at` maupun `post_id` pada body create item.
- R2 private: upload intent-PUT-finalize; max size 5MiB, purpose REPORT_PHOTO/ITEM_PHOTO, signed URL read TTL terbatas.
- Neon Auth sign-in/signup/reset flow tidak membuat endpoint API tambahan. NIM deklarasi diri, tidak diverifikasi akademik.
- Katalog visibility server + detail 404; 409 invalid state tidak auto-retry mutation. Return membuat `item_returns`; distribute tidak.


## Role-first migration
- F/B is Petugas mock, F/C Guest mock, F/D Student/login mock, F/E public API. Previous labels superseded.
- Verify assets with `tools/verify_assets.py`; always read `CLEAN_CODE.md` and exact Figma QA rules.
