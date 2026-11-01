# CLEAN_CODE — Backend (adaptasi standar Frontend lokal)

- **Source-derived:** standar Frontend memakai SRP, DRY, fungsi sekitar 20 LOC sebagai target review dan file >300 LOC perlu review tertulis; Backend mengadopsi prinsip, **bukan** menyalin batas jumlah baris page/UI secara mentah.
- Route harus tipis: deklarasi method/path, Zod request/response, hook guard; Controller HTTP orchestration; Service domain invariants/transaction; Repository Drizzle parameterized; Policy authz/ownership/post; Integration provider adapter.
- Validasi runtime semua input, hindari `any` tanpa justifikasi, raw interpolated SQL, dynamic sort tanpa allowlist, no `catch {}` diam-diam, no service instantiation dalam route bila dependency injection tersedia.
- Struktur modul cohesive; jangan satu file >300 baris tanpa code review dan alasan; jangan memecah berlebihan hanya demi line count; fungsi besar ditinjau dengan SRP.
- Request/response mengikuti OpenAPI v1.0 22 operasi, type DTO snake_case, error envelope seragam; jangan ubah enum status atau role.
- Non-idempotent POST/PATCH jangan auto-retry tanpa idempotency guard. Beri negative tests 401/403/404/409/422/429 jika relevan.
- Public DTO allowlist, private R2, log redaction, no hardcoded credentials/token/PII, safe migrations with rollback strategy. Test transaction concurrency pada receive/return.
- Bukti task: lint/typecheck/build, contract tests, unit/integration, row/query real DB pada tugas real, security tests, status test jujur.
