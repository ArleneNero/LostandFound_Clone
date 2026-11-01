# Cloudflare R2 Free Tier Guard

## Context

Proyek ini menggunakan Cloudflare R2 Object Storage pada **free tier** dengan batas berikut:

| Resource | Batas Gratis | Overage Rate |
|---|---|---|
| R2 Storage | **10 GB / bulan** | $0.015 / GB-bulan |
| Class A Operations (write, list, delete) | **1 juta / bulan** | $4.50 / juta |
| Class B Operations (read/get) | **10 juta / bulan** | $0.36 / juta |
| Egress (data keluar) | **Gratis (unlimited)** | $0 |

> **Class A** = `PUT`, `POST`, `COPY`, `LIST`, `DELETE`
> **Class B** = `GET`, `HEAD`, `SELECT`

---

## Rules Wajib untuk AI Agents

### 1. Upload Strategy — Minimalkan Class A Operations

- **SELALU** gunakan teknik **single upload** per satu file foto. Dilarang membuat multiple upload request untuk satu foto.
- Jika perlu resize/compress, lakukan **sebelum upload** di sisi server (Fastify worker), bukan dengan upload dua kali.
- **Jangan** menggunakan Multipart Upload untuk file di bawah **100 MB** — gunakan single PUT request saja karena multipart menghabiskan banyak Class A ops.
- Untuk **seed data / testing**, gunakan maksimal **5–10 foto dummy** dan upload sekali saja, **jangan diulang** setiap kali menjalankan seed script.
- Seed script **HARUS memiliki pengecekan** apakah objek sudah ada di bucket sebelum melakukan PUT. Jika sudah ada, skip upload.

### 2. Read Strategy — Minimalkan Class B Operations

- **JANGAN** melakukan `GET` objek R2 langsung dari backend untuk setiap request API. Gunakan **public URL** (R2.dev subdomain atau custom domain) yang di-cache oleh CDN Cloudflare.
- `photo_url` di database **HARUS berisi URL publik lengkap** yang bisa langsung diakses browser tanpa perlu presigned URL baru setiap request.
- Presigned URL boleh digunakan **hanya untuk upload** dari client, bukan untuk akses baca (read) rutin.
- **Jangan** membuat health check atau polling yang memanggil `GET` / `HEAD` ke objek R2 secara berulang.

### 3. List Operations — Batasi LIST Calls

- **Jangan** memanggil `ListObjectsV2` / `list()` untuk tujuan display di UI. URL foto sudah tersimpan di database — gunakan database, bukan R2 API.
- `list()` hanya boleh digunakan untuk: seed validation (cek apakah file sudah ada), maintenance script, atau debugging satu kali.
- Setiap LIST request pada bucket besar mengembalikan hingga 1000 objek per panggilan — hati-hati dengan recursive atau loop listing.

### 4. Storage Size — Kontrol Ukuran File

- Setiap foto yang diupload Officer **HARUS divalidasi** di backend sebelum PUT ke R2:
  - Maksimal ukuran: **5 MB per file**
  - Format yang diizinkan: `image/jpeg`, `image/png`, `image/webp`
  - Jika melewati batas, tolak dengan HTTP `413 Payload Too Large`
- Jangan menyimpan duplikat foto — jika Officer mengupdate foto, **DELETE objek lama** sebelum PUT objek baru.

### 5. Delete — Cegah Orphan Objects

- Setiap kali record `item_photos` dihapus dari database, **HARUS ada** delete job ke R2 untuk menghapus objek yang bersangkutan.
- Gunakan transaksi DB + delete R2 dalam satu handler: jika R2 delete gagal, rollback DB.
- Orphan objects membuang storage quota. Buat utility script `scripts/r2-cleanup-orphans.ts` jika diperlukan.

### 6. Development & Testing

- Gunakan **bucket terpisah** per environment:
  - `ubl-lostnfound-dev` → development & testing
  - `ubl-lostnfound-prod` → production
- Di environment `development`, limit jumlah upload dalam test ke **maksimal 20 objek total**.
- **Jangan jalankan load test atau stress test** yang melibatkan upload ke R2 — gunakan mock/stub untuk R2 di unit test.
- Jangan commit file `.env` yang berisi `R2_ACCESS_KEY_ID` dan `R2_SECRET_ACCESS_KEY`.

### 7. Monitoring & Logging

- Di setiap handler upload, **log ukuran file**: `logger.info({ key, sizeBytes }, 'R2 upload success')`.
- Buat endpoint `GET /admin/storage-stats` (officer-only) yang merangkum total foto dari DB (bukan memanggil R2 LIST).
- Jika membangun fitur baru yang melibatkan file/foto, **kalkulasi terlebih dahulu** estimasi Class A + Class B ops per bulan sebelum implementasi.

---

## Estimasi Budget Aman (Free Tier)

Asumsi penggunaan normal proyek kampus:

| Aktivitas | Estimasi Ops/bulan |
|---|---|
| Officer upload 5 foto/hari | ~150 Class A ops |
| Guest lihat 50 item/hari via CDN URL | ~0 Class B ops (via cache) |
| Seed script (sekali setup) | ~10 Class A ops |
| Maintenance / listing | ~10 Class A ops |
| **Total Estimasi** | **~170 Class A / bulan** |

Dengan rules ini, proyek **sangat aman** di bawah batas 1 juta Class A dan 10 juta Class B, bahkan dengan trafik 10x lipat sekalipun.

---

## Checklist Sebelum Merge Fitur Baru yang Melibatkan R2

- [ ] Tidak ada upload duplikat / upload berulang dalam satu flow
- [ ] Seed script punya pengecekan "skip if exists"
- [ ] Foto di-serve via public URL / CDN, bukan via backend proxy
- [ ] Ada validasi ukuran dan tipe file di backend
- [ ] Ada delete R2 saat record DB dihapus
- [ ] Tidak ada `list()` yang dipanggil untuk keperluan display UI
- [ ] Tidak ada unit test yang melakukan PUT ke R2 nyata (gunakan mock)
