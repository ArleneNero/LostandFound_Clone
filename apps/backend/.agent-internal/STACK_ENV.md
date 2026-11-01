# STACK_ENV — Baseline & environment policy

- Runtime: Node.js + TypeScript; Fastify + Zod; Drizzle ORM + PostgreSQL Neon real dev/test; Neon Auth JWT; Cloudflare R2 S3-compatible SDK; package manager terdeteksi dari lockfile aktual.
- Application DB URL pooled untuk traffic; direct URL untuk migration. Simpan hanya di `.env` lokal/runtime secure store; jangan mencetak DSN.
- Neon Auth: verifikasi signing key/JWKS, audience/issuer sesuai provider; contoh nilai hanya placeholder, jangan hardcode user/role.
- R2: private bucket dan credentials minimal, region/endpoint sesuai konfigurasi user; signed URL expiry menurut OpenAPI; jangan simpan object public permanen.
- Env key contoh tanpa nilai: `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `Neon Auth_SECRET_KEY`, `Neon Auth_PUBLISHABLE_KEY`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `FRONTEND_ORIGIN` (verifikasi nama yang dipakai code existing sebelum membuat env.example).
- Error/readiness: jika kredensial Neon/Neon Auth/R2 tidak tersedia, `BLOCKED` sesuai task, bukan mengganti dengan SQLite/in-memory/auth bypass.
- No wildcard CORS + credentials, request-size limit, logs redacted, rate limit dan timeout per threat model.
