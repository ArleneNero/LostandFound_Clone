# ARCHITECTURE — Backend module boundaries

Frontend React/Vite (`apps/web`) → HTTPS JSON REST Fastify (`apps/api`) → Drizzle/PostgreSQL Neon; Neon Auth memvalidasi identitas server-side; Cloudflare R2 menyimpan berkas privat. Upload browser: request intent → presigned PUT R2 → finalize server → signed token → insert database transaction.

**Pemisahan tanggung jawab:** `app/` Fastify bootstrap/registry/error; `config/` env; `plugins/` Neon Auth/CORS/rate-limit; `modules/<domain>/` routes+schema/controller/service/repository; `policies/` DB actor/role/pos/ownership; `db/` schema/transactions/migrations/seed; `integrations/` Neon Auth/Neon/R2 adapters; `shared/` DTO/errors/request-id; `tests/` unit/integration/contract/security.

- Endpoint publik menggunakan DTO allowlist, tidak pernah mengembalikan catatan privat, user email/NIM, signed PUT atau R2 storage key.
- Route protected memverifikasi Neon Auth kemudian membaca user dan role dari DB. Post scope DB, bukan client.
- Mutasi status/histori, item+photo, return, receive dibuat atomik. Guard race & unique DB constraints diperlukan.
- Kontrak `snake_case` dengan envelope sesuai OpenAPI final; `GET /officer/inventory`, bukan `GET /officer/items`.
- Foto item dan laporan tepat 1 sesuai OpenAPI/ERD snapshot; post gallery max 3; object key private.
