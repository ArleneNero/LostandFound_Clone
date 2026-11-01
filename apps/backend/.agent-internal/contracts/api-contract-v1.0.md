# CAMPUSFIND — API CONTRACT FINAL v1.0

**Ditetapkan:** 18 Oktober 2026  
**Sumber data final:** `CampusFind_ERD_Final_v6_2.dbml` (8 tabel)  
**Spesifikasi mesin:** `CampusFind_OpenAPI_Final_v1_0.yaml` (OpenAPI 3.0.3)  
**Status:** Kontrak HTTP disepakati untuk implementasi; **belum** berarti backend, Neon Auth, Neon, atau R2 sudah dikonfigurasi maupun diuji.

## 1. Keputusan yang dikunci

1. **A — Identity mapping:** `users.user_id` UUID internal, `users.Neon Auth_user_id VARCHAR(255) NOT NULL UNIQUE`. Backend hanya mengambil subject Neon Auth dari token yang diverifikasi, tidak dari body.
2. **A — Role petugas:** `OFFICER` hanya melalui administrasi backend/SQL atau skrip provisioning dengan kredensial operator, **tidak ada pilihan role saat registrasi** dan **tidak ada role ADMIN** dalam domain.
3. **B — Registrasi mahasiswa:** verifikasi email lewat Neon Auth, kemudian `POST /me/bootstrap` dengan `full_name` dan `student_number`. Email berasal dari Neon Auth yang terverifikasi. NIM bersifat **self-declared / NOT_VERIFIED**, bukan verifikasi status mahasiswa aktif.
4. **Foto pos:** 0–3 foto per pos; `position` 1..3 kontigu, posisi 1 cover; pengelolaan awal melalui seed/operasional backend, **bukan endpoint publik**.
5. **Lingkup:** hanya barang ditemukan, bukan laporan kehilangan, klaim online, atau verifikasi pemilik secara daring. Tahap awal hanya Pos Pengajaran.

## 2. Arsitektur dan aturan identitas

React/TypeScript → Fastify/TypeScript → Neon PostgreSQL/Drizzle. Neon Auth memverifikasi login/OTP dan sesi; Cloudflare R2 menyimpan foto. Fastify harus memverifikasi token Neon Auth, email terverifikasi untuk bootstrap, mencari `users` melalui `Neon Auth_user_id`, lalu menentukan role dari DB. Untuk OFFICER, cari penugasan `service_posts.officer_user_id = users.user_id`. Jangan pernah mempercayai `role`, `user_id`, `post_id`, atau key R2 dari request sebagai sumber hak akses.

**Alur mahasiswa:** sign up di Neon Auth → verifikasi email → `POST /me/bootstrap` (hanya full_name + NIM) → backend membuat UUID internal, role STUDENT → `GET /me`. Duplicate bootstrap mengembalikan `409 PROFILE_EXISTS`. NIM duplikat mengembalikan `409 STUDENT_NUMBER_IN_USE`. Email yang bentrok dengan pengguna lain harus ditangani secara aman (409), bukan auto-link berdasar email. Pembaruan email akun Neon Auth harus melalui sinkronisasi tepercaya dan pemeriksaan konflik unik.

**Alur petugas:** admin sistem memverifikasi calon petugas → akun Neon Auth disiapkan → skrip/SQL berhak istimewa membuat user OFFICER dengan NIM NULL atau mempromosikan akun yang ada sambil mengosongkan NIM → penugasan `service_posts.officer_user_id` dalam prosedur terkontrol. Untuk promosi, lakukan dalam transaksi; petugas hanya mendapat akses setelah penugasan pos valid. Tidak ada endpoint publik untuk membuat petugas, mengganti role, atau mengedit pos.

**Guest:** hanya katalog, detail barang publik, dan pos. **Student:** laporan milik sendiri. **Officer:** hanya laporan dan inventaris pos penugasannya. Resource di luar hak akses dikembalikan `404` untuk mencegah enumerasi; role tidak cocok `403`; sesi tidak valid `401`.

## 3. Konvensi kontrak

- Prefix `/api/v1`; JSON menggunakan **snake_case**. Frontend yang memakai camelCase melakukan mapping dalam adapter service, bukan di setiap komponen.
- Response sukses tunggal: `{ "data": { ... } }`; response list: `{ "data": [...], "meta": { "page": 1, "limit": 10, "total": 0, "total_pages": 0 } }`.
- Error: `{ "error": { "code": "...", "message": "...", "request_id": "..." } }`. Tidak boleh membocorkan SQL, stack trace, token, storage path, atau private notes.
- `page` mulai 1; `limit` default **10**, maksimum **10**. Filter → sort stabil → pagination. Sort publik hanya `received_at_desc`, `received_at_asc`, `item_name_asc`, dengan `item_id` sebagai tie-breaker.
- Status laporan: `PENDING_RECEIPT`, `RECEIVED`, `REJECTED`, `CANCELLED`. Status barang: `STORED`, `RETURNED_TO_OWNER`, `DISTRIBUTED`.
- Operasi status menggunakan transaksi database dan pemeriksaan kondisi saat update. Dua permintaan bersamaan untuk receive/return/distribute tidak boleh membuat efek ganda; permintaan kedua mendapat `409 INVALID_STATE`. **Tidak dijanjikan idempotent response replay** tanpa storage idempotency tambahan. Klien tidak boleh otomatis me-retry POST mutasi jika responsnya tidak diketahui.
- `404 PROFILE_NOT_FOUND` untuk token Neon Auth sah yang belum mempunyai baris `users` ketika memanggil `GET /me`. Bootstrap menjadi titik eksplisit pembuatan profil.

## 4. Endpoint final

| Metode | Endpoint | Akses | Fungsi |
|---|---|---|---|

| GET | `/posts` | Publik | List service posts |
| GET | `/posts/{post_id}` | Publik | Get service post detail |
| GET | `/items` | Publik | List public found items |
| GET | `/items/{item_id}` | Publik | Get public found item detail |
| GET | `/me` | Login / peran sesuai operasi | Get current CampusFind profile |
| POST | `/me/bootstrap` | Login / peran sesuai operasi | Create student profile after Neon Auth signup |
| POST | `/submissions` | Mahasiswa | Submit found item report |
| GET | `/submissions/me` | Mahasiswa | List own found item reports |
| GET | `/submissions/{submission_id}` | Login / peran sesuai operasi | Get authorized found report detail |
| POST | `/submissions/{submission_id}/cancel` | Mahasiswa | Cancel own pending report |
| GET | `/officer/submissions` | Petugas | List reports for assigned post |
| POST | `/officer/submissions/{submission_id}/receive` | Petugas | Receive found report and create inventory |
| POST | `/officer/submissions/{submission_id}/reject` | Petugas | Reject pending found report |
| GET | `/officer/inventory` | Petugas | List inventory for assigned post |
| GET | `/officer/inventory/overdue` | Petugas | List overdue stored inventory |
| POST | `/officer/items` | Petugas | Record found item directly |
| GET | `/officer/items/{item_id}` | Petugas | Get authorized inventory detail |
| PATCH | `/officer/items/{item_id}/visibility` | Petugas | Set stored item catalog visibility |
| POST | `/officer/items/{item_id}/return` | Petugas | Return item to verified owner |
| POST | `/officer/items/{item_id}/distribute` | Petugas | Distribute item under post policy |
| POST | `/uploads/intents` | Login / peran sesuai operasi | Request R2 image upload intent |
| POST | `/uploads/{upload_id}/finalize` | Login / peran sesuai operasi | Finalize verified R2 image upload |

## 5. Contoh request dan response

### 5.1 Onboarding mahasiswa

`POST /api/v1/me/bootstrap` — Neon Auth bearer token wajib dan email harus terverifikasi.

```json
{ "full_name": "Mahasiswa Contoh", "student_number": "2026000001" }
```

Server menetapkan `role=STUDENT`, `user_id` UUID, `Neon Auth_user_id` dari token, dan `email` dari identitas Neon Auth yang terverifikasi. Respons `201` berisi DTO `Me`, termasuk `nim_verification_status: "NOT_VERIFIED"`. Nilai ini merupakan status turunan kontrak, **bukan kolom baru di ERD**.

### 5.2 Laporan mahasiswa

`POST /api/v1/submissions` (STUDENT):

```json
{
  "target_post_id": 1,
  "item_name": "Dompet hitam",
  "category": "Aksesori",
  "public_description": "Dompet ditemukan di sekitar kampus",
  "found_location": "Area kampus",
  "found_on": "2026-10-17",
  "report_photo_upload_token": "TOKEN_REPORT_PHOTO"
}
```

Server membuat `found_submissions` status `PENDING_RECEIPT` dan satu `submission_status_history` (`from_status=NULL`) **dalam transaksi**. Foto laporan **tepat satu**, berasal dari upload yang diverifikasi, bukan path bebas dari browser.

### 5.3 Penerimaan fisik

`POST /api/v1/officer/submissions/{submission_id}/receive` (OFFICER):

```json
{
  "public_description": "Dompet hitam yang diterima petugas",
  "private_verification_notes": "Ciri rahasia untuk verifikasi langsung",
  "item_photo_upload_tokens": ["TOKEN_ITEM_PHOTO_1"]
}
```

Server menentukan pos dari penugasan petugas, bukan body. Membuat satu `found_items`, tepat satu `item_photos` (`is_primary=true`), mengubah status laporan `RECEIVED`, dan membuat history atomik. `source_submission_id` unik. Dua penerimaan tidak boleh menghasilkan dua inventaris.

### 5.4 Pengembalian barang

`POST /api/v1/officer/items/{item_id}/return`:

```json
{
  "recipient_name": "Penerima yang diverifikasi",
  "verification_summary": "Bukti kepemilikan dicocokkan secara langsung"
}
```

Server membuat satu `item_returns`, mengubah status `RETURNED_TO_OWNER`, dan menetapkan `is_visible=false` dalam satu transaksi. **Tidak meminta foto KTP/KTM**, tidak membuat klaim online. Untuk distribusi manual, `POST .../distribute` mengubah `DISTRIBUTED` dan `is_visible=false` **tanpa** membuat `item_returns`.

### 5.5 Visibility dan retensi

`PATCH /api/v1/officer/items/{item_id}/visibility` menerima `{ "is_visible": false }` atau `true` **hanya** ketika status `STORED`. Katalog publik selalu memakai `status=STORED AND is_visible=true`, baik list maupun detail. Peringatan `GET /officer/inventory/overdue` menghitung usia dari `received_at` dan `storage_limit_days`; **tidak** mengubah status atau visibility otomatis.

## 6. Foto dan R2 — aturan implementasi

| Jenis foto | Penyimpanan domain | Jumlah | Hak unggah |
|---|---|---|---|
| Laporan | `found_submissions.report_photo_path` | Tepat 1 | STUDENT pelapor |
| Inventaris | `item_photos` | Tepat 1 foto wajib (satu-satunya foto utama) | OFFICER pos terkait |
| Pos | `service_post_photos` | 0–3; posisi 1 cover, urutan kontigu | Seed / operasional backend tepercaya |

Foto inventaris hanya satu, sama seperti laporan. Untuk kompatibilitas kontrak, field `item_photo_upload_tokens` tetap berupa array tetapi wajib berisi **tepat satu token** (minItems=1, maxItems=1). Alur foto laporan/inventaris: `POST /uploads/intents` → backend memberikan presigned PUT URL R2 (berlaku 5 menit) → browser upload langsung ke R2 → `POST /uploads/{upload_id}/finalize` → backend memverifikasi metadata **dan isi** file → menghasilkan token upload yang ditandatangani (berlaku 15 menit) → token dipakai pada operasi laporan/inventaris. Token terikat pada user Neon Auth dan purpose. Validasi file: **JPEG, PNG, WebP**, maksimal **5 MiB per foto**. Token yang sama tidak boleh dipakai untuk dua record foto; database harus menerapkan keunikan storage path, bukan hanya pengecekan aplikasi. Upload sementara yang kedaluwarsa harus dibersihkan oleh proses housekeeping.

`POST_PHOTO` tidak dibuka melalui upload API publik; pengelolaan galeri pos melalui seed/operasional backend tepercaya. Response foto hanya URL baca sementara (`url`, `expires_at`), **bukan storage_path**. URL privat memiliki TTL default 5 menit dan hak akses laporan/inventaris harus diperiksa sebelum URL diterbitkan.

**Catatan teknis penting:** skema domain tidak memiliki tabel upload intent. Kontrak menggunakan intent bertanda tangan/stateless dan keunikan `storage_path` untuk konsumsi sekali; jangan mengklaim replay prevention kuat jika implementasi tidak benar-benar menerapkan constraint unik. Jika agent membutuhkan state persisten untuk upload, ajukan perubahan skema terpisah, jangan menambah tabel diam-diam.

## 7. Constraint database wajib dalam migration

- `users.Neon Auth_user_id NOT NULL UNIQUE`, `users.user_id UUID PK`; email unik case-insensitive melalui normalisasi atau index sesuai implementasi.
- CHECK berbasis role: STUDENT harus mempunyai `student_number` nonblank; OFFICER harus `student_number IS NULL`. Neon Auth subject tidak boleh berasal dari browser.
- `service_posts.officer_user_id UNIQUE NOT NULL` mengacu ke user OFFICER; satu petugas maksimal satu pos. Penugasan dan promosi role dilakukan lewat transaksi/prosedur tepercaya.
- `service_post_photos.position BETWEEN 1 AND 3`, `UNIQUE(post_id,position)`; posisi harus kontigu bila ada foto (validasi transaksi).
- `found_submissions.report_photo_path NOT NULL`, **UNIQUE** untuk mencegah token upload dipakai ulang; foto laporan wajib satu.
- `item_photos.item_id UNIQUE`, `item_photos.storage_path UNIQUE`, `service_post_photos.storage_path UNIQUE` dan validasi keunikan global key objek di namespace R2 per purpose; item_photos.item_id UNIQUE; tepat satu foto wajib per item dan is_primary TRUE. Pembuatan item+foto dalam satu transaksi.
- `found_items.source_submission_id UNIQUE NULLABLE`, `item_returns.item_id UNIQUE`, transaksi status/history/return, pembatasan status valid.
- `storage_limit_days > 0` jika tidak NULL; tidak ada otomatis mengubah status saat lewat batas.
- Constraint antar tabel dan role yang tidak dapat ditegakkan CHECK biasa harus ditegakkan dalam transaksi/service dan diuji.

## 8. Acceptance test minimum

1. Guest dapat membaca katalog dan galeri pos; barang hidden/non-STORED tidak muncul pada list maupun detail.
2. Token Neon Auth palsu/expired ditolak; `GET /me` tanpa profil 404; bootstrap tanpa email terverifikasi ditolak.
3. Bootstrap hanya membuat STUDENT; body yang mencoba `role=OFFICER`/`Neon Auth_user_id`/`email` ditolak, tidak diabaikan diam-diam.
4. NIM self-declared tidak pernah ditampilkan sebagai status 'terverifikasi akademik'. NIM/email duplikat ditolak tanpa mengambil alih akun.
5. Mahasiswa tidak dapat melihat laporan mahasiswa lain. Petugas tidak dapat mengakses pos lain. Guest tidak dapat memanggil endpoint mutasi.
6. Foto laporan nol/dua ditolak; upload purpose salah, token palsu/kedaluwarsa, MIME tidak valid, ukuran >5MiB, atau path digunakan ulang ditolak.
7. Receive/reject/cancel hanya saat PENDING_RECEIPT, dan status/history selalu konsisten setelah kegagalan transaksi.
8. Dua receive/return/distribute bersamaan tidak membuat inventaris atau return ganda; permintaan kedua mendapat 409.
9. Penarikan katalog tidak mengubah status STORED; overdue hanya peringatan tanpa mutasi otomatis.
10. Return mencatat tepat satu item_returns; distribute tidak membuat item_returns.
11. Foto pos keempat, posisi duplikat/berlubang ditolak; posisi 1 menjadi cover.
12. Response publik tidak mengekspos key R2, private notes, email pelapor, atau ringkasan verifikasi.
13. Semua endpoint list menggunakan pagination limit 10 dan sort stabil; seluruh error sesuai envelope.
14. Pengujian E2E menggunakan Neon test DB + R2 test bucket + Neon Auth test instance, bukan hanya mock.

## 9. Parameter deployment yang bukan perubahan API

Kontrak ini final untuk bentuk endpoint dan domain. Nilai aktual **domain/CORS, URL hosting Fastify, nama bucket, secret, kuota rate limit, backup, dan jadwal housekeeping** ditetapkan saat konfigurasi deployment, bukan dengan mengubah request/response. Tidak ada janji sistem siap produksi sebelum pengujian keamanan, UAT, dan pemulihan data selesai.

## 10. Urutan handoff ke Agentic AI

1. Gunakan **DBML v6.2** sebagai sumber skema; buat Drizzle schema + migration SQL termasuk constraint yang disebutkan di atas.
2. Gunakan **OpenAPI v1.0** sebagai sumber kontrak HTTP; hasilkan TS client/types untuk frontend dan test kontrak.
3. Implementasikan Neon Auth verification + `POST /me/bootstrap` + admin-only provisioning petugas.
4. Implementasikan katalog, pos, upload R2, laporan, inventaris, dan transaksi status secara bertahap.
5. Jalankan test, simpan bukti, dan audit oleh reviewer terpisah. Jangan menyatakan fitur selesai hanya karena kode sudah ditulis.
