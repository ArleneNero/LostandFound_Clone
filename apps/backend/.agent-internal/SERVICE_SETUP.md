# SERVICE_SETUP — Dev provider readiness (no secrets)

## Neon PostgreSQL

1. Pilih project/branch dev-test milik user; jangan membuat project kedua jika koneksi sudah ada.
2. Cek schema & table yang ada, buat branch isolasi untuk eksperimen; jangan melakukan migrasi destructive atau reset tanpa izin.
3. Gunakan direct connection untuk Drizzle migration, pooled untuk traffic Fastify; simpan DSN di env terproteksi.
4. Migrasikan delapan tabel persis ERD v6.2; jalankan seed sintetis idempotent dan cek constraint/rollback.

## Neon Auth

1. Konfigurasi dev application yang sah; pastikan JWT dapat diverifikasi server-side.
2. Mapping `users.Neon Auth_user_id` terverifikasi; role dibaca dari `users.role`, penanggung jawab per pos dari `service_posts.officer_user_id`.
3. Officer ditetapkan melalui operasi administratif tepercaya, bukan UI student signup.

## R2

1. Bucket private, scoped API key dan konfigurasi CORS frontend sesuai origin yang sebenarnya.
2. Intent POST (auth, purpose, type, size) → presigned PUT singkat → finalize cek object, type/magic bytes, size, ownership → one-use token.
3. Foto report/item 1 wajib; galeri pos non-MVP/administrasi, 0..3.
4. Orphan cleanup/retensi hanya setelah kebijakan dan izin.

**Kriteria siap:** env terdeteksi tanpa menampilkan nilai, koneksi provider sungguhan + endpoint negatif diuji. Tanpa provider: cantumkan `BLOCKED`.
