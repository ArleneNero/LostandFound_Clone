# F/F — Integrasi Mahasiswa dan Petugas dengan Neon Auth/R2

**Status:** `PLANNED` · **Dependensi:** B/F benar-benar tersedia + F/E lulus; B/C dan B/D lengkap · **Area:** `apps/web`.

**Syarat masuk:** baca `AGENTS.md`, `CLEAN_CODE.md`, `FIGMA_EXACT_RULES.md`, `ASSET_MANIFEST.md`, `FOLDER_STRUCTURE.md`, kontrak dan milestone saat ini sebelum perubahan.
**Syarat keluar:** lulus tes+visual relevant, laporan bukti, review pengguna, izin push/pindah fase. Seluruh checkpoint awal masih kosong.

## F/F.1 — Neon Auth login, onboarding dan role server

**Figma/sumber:** GET /me, POST /me/bootstrap

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/F.1.0` Integrasi Neon Auth frontend sesuai SDK | Login/register/recovery memakai Neon Auth yang nyata | Jangan menjalankan OTP buatan sendiri bila provider berbeda | `PLANNED` |
| `F/F.1.1` Implement bootstrap STUDENT | Verified email + full_name + student_number deklarasi | NIM tidak diklaim akademik terverifikasi | `PLANNED` |
| `F/F.1.2` Implement auth token transport aman | Access token sesuai Neon Auth backend; handle expiry/401 | Tidak menaruh secret/private token di repo/log | `PLANNED` |
| `F/F.1.3` Validasi OFFICER provisioned only | Tampilan login Officer dapat dipakai akun yang dibuat trusted backend | Tidak ada user switch ke OFFICER dari dropdown produksi | `PLANNED` |

**Quality gate `F/F.1`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## F/F.2 — R2 upload dan laporan Mahasiswa

**Figma/sumber:** POST /uploads/intents, finalize, /submissions

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/F.2.0` Implement intent PUT finalize tiga tahap | Intent -> presigned PUT required_headers -> finalize -> token | Tidak mengirim storage key atau foto base64 ke JSON | `PLANNED` |
| `F/F.2.1` Implement create submission dengan upload_token | report_photo_upload_token string tunggal sesuai OpenAPI | Backend memastikan satu foto disimpan | `PLANNED` |
| `F/F.2.2` Implement list/detail/cancel laporan nyata | /submissions/me, /submissions/{id}, /cancel | Data hanya milik user sesuai backend | `PLANNED` |
| `F/F.2.3` Uji upload failure/expiry dan invalid state | 5MiB, MIME, PUT reject, finalize gagal, cancel 409 | Tidak auto-retry POST ambigu | `PLANNED` |
| `F/F.2.4` Uji after refresh persistence | Data berasal Neon, bukan local store | Reload tidak reset data real | `PLANNED` |

**Quality gate `F/F.2`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## F/F.3 — Operasional Officer API lengkap

**Figma/sumber:** /officer/submissions, /officer/items dan inventory

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/F.3.0` Integrasi officer submissions queue | GET /officer/submissions dan detail sesuai assigned post | Tidak ada post_id arbitrary | `PLANNED` |
| `F/F.3.1` Integrasi direct item registration | POST /officer/items dengan item_photo_upload_tokens array length 1 | Tidak mengirim field received_at/post_id tak sesuai kontrak | `PLANNED` |
| `F/F.3.2` Integrasi receive report with physical confirmation | POST /officer/submissions/{id}/receive dan upload item_photo | History, inventory, response server authoritative | `PLANNED` |
| `F/F.3.3` Integrasi reject dengan alasan wajib | POST /officer/submissions/{id}/reject | Alasan trim, role dan state verified backend | `PLANNED` |
| `F/F.3.4` Uji officer denied dan konflik race | 403 cross-post, 409, 401, expired token, repeated receive | UI tak memalsukan sukses dan tidak mengulang POST | `PLANNED` |

**Quality gate `F/F.3`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## F/F.4 — Inventory visibilitas, return dan distribute

**Figma/sumber:** /officer/inventory, /overdue, /visibility, /return, /distribute

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/F.4.0` Integrasi inventory list/detail/overdue | List dari server; filter server sesuai spec | Warning keterlambatan tidak mengubah status | `PLANNED` |
| `F/F.4.1` Integrasi toggle visibility | PATCH /officer/items/{id}/visibility | Saat hidden, public GET detail 404 | `PLANNED` |
| `F/F.4.2` Integrasi return owner verified | POST /officer/items/{id}/return dengan recipient_name, verification_summary | No ID card photo; item status hidden | `PLANNED` |
| `F/F.4.3` Integrasi distribute terpisah | POST /officer/items/{id}/distribute | Status DISTRIBUTED dan bukan item_returns | `PLANNED` |
| `F/F.4.4` Uji cross-role persistence | Officer action => Guest catalog => Student report status dari API | Tidak ada memory store yang jadi sumber kebenaran produksi | `PLANNED` |

**Quality gate `F/F.4`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## F/F.5 — Cross-contract integration gate

**Figma/sumber:** 22 endpoints API v1.0

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/F.5.0` Verifikasi semua endpoint yang dikonsumsi | Matrix backend operation vs frontend service dan test | Tidak menambah endpoint baru diam-diam | `PLANNED` |
| `F/F.5.1` Audit auth/role per endpoint | Neon Auth token and backend RBAC; no public privileged information | Unauthorized/forbidden behavior benar | `PLANNED` |
| `F/F.5.2` Audit photo real and asset local | R2 image != branding static; no leaked token/path | No broken links; no Figma hotlinked temporary assets | `PLANNED` |
| `F/F.5.3` Tutup F/F dengan approval role-based E2E | Student->Officer->Guest use case nyata | Baru lanjut finalisasi F/G dengan izin | `PLANNED` |

**Quality gate `F/F.5`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## Persetujuan untuk pindah tahap

Selesaikan semua sub-milestone berdasarkan bukti dan review pengguna. **Tidak boleh mulai milestone berikutnya hanya karena task checklist dicentang sendiri.**
