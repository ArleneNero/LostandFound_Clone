# INTEGRATION_TEST_PLAN — Gate kontrak, fungsional, keamanan, responsif

**Tidak ada test yang dijalankan saat pembuatan dokumen**; daftar di bawah adalah acceptance untuk coding agent saat source dan provider tersedia. Jangan mencatat PASS hanya karena test tertulis. Acuan: snapshot YAML `contracts/openapi-v1.0.yaml`, 22 endpoint, Figma Page 00 & Page 05.

## Gate C0 — Kontrak statis sebelum `F/E`

- Verifier SHA `tools/verify_backend_sync.py` PASS untuk root backend yang sudah terpasang; jika root tidak terpasang `NOT_VERIFIABLE`, tidak boleh dilabeli PASS.
- Generate/bangun tipe TS dari **YAML canonical**, bukan versi lama bernama sama. Tests assertion pada endpoint GET `/items`, GET `/items/{item_id}`, POST `/officer/items` response wrappers, photo array maxItems1.
- Verifikasi API versi sama dan runtime response kompatibel dengan `data`, `meta`, error `request_id`; `snake_case`, UUID, nomor pos integer, tanggal `YYYY-MM-DD`, ISO `date-time`.
- GET `/items` menerima only `q`, `category`, `post_id`, `sort`, `page`, `limit`; `sort` resmi enum; `limit<=10`. Jangan menguji asumsi filter yang tidak ada.

## Gate P7 — `B/E` + `F/E` bersama

| Skenario | Setup | Bukti minimum |
|---|---|---|
| Guest katalog sukses | Backend Fastify + Neon seeded melalui alur sah | Browser Network GET `/api/v1/items?page=1&limit=10`, 200, item server terlihat |
| Detail publik sukses | UUID item visible/STORED | GET `/api/v1/items/{uuid}`, 200, field publik benar |
| Hidden / terminal | item `is_visible=false` / returned/distributed | List tidak memuat, detail 404 tanpa private data |
| Item create Petugas | Neon Auth OFFICER pos sah + 1 token R2 finalized | POST `/api/v1/officer/items` -> 201; GET katalog berubah setelah refetch jika visible |
| Unauthorized | Guest/Student mencoba POST officer | 401/403, data tidak berubah |
| Pagination | 0, 1, 10, 11, 20, 21 item sesuai fixture database test | meta dan UI: 0 empty; 11=10+1; 21=10+10+1; no >10 rendered |
| Filter, sort | q/category/post_id/sort diteruskan | Total dari meta server, reset halaman ke 1, tidak filter subset page |
| Error + timeout | API down / malformed mock/interceptor | UI error jelas dan retry **GET** tidak membuat blank state |
| Responsif | 390, 768, 1440 | screenshot dan no overflow, pagination keyboard |

**Kunci:** screenshot UI mock pada F/C bukan bukti P7; sertakan log Network + proses backend/Fastify+Neon yang benar (tanpa memperlihatkan rahasia).

## Gate Auth — `F/F` + `B/C` dan `B/F`

- Neon Auth JWT hilang, palsu, expired -> 401; session expiry UI tidak menampilkan data private lama.
- `GET /me` valid token belum bootstrap -> 404 `PROFILE_NOT_FOUND`, lalu bootstrap hanya STUDENT verified email dan NIM string self-declared; 403/409 pada conflict ditangani tanpa account hijack.
- OFFICER tidak dipilih dari form registrasi; backend provisioning, assigned post only; cross-post 404.
- STUDENT hanya daftar/detail sendiri; mencoba submission mahasiswa lain tidak mengungkap datanya.
- Guest/Student URL protected via router diarahkan ke login/forbidden, **tetapi server tetap memverifikasi**.
- Reset/OTP menggunakan Neon Auth/provider actual; UI cooldown tidak dianggap rate-limit server. Dilarang menambahkan API reset sandi lokal yang tidak ada pada 22 endpoint.

## Gate Upload — `F/F` + `B/D`

- File tanpa foto tidak dapat submit; jenis yang tak didukung, >5MiB, 0 bytes, token beda purpose/user, expired, sudah digunakan -> ditolak server.
- Upload intent POST -> presigned R2 PUT dengan `required_headers` persis -> finalize -> signed upload token; foto laporan string token, inventaris array **satu** token; post gallery hanya via read-only GET pos.
- Gunakan fake file kecil dari fixture test; jangan gunakan foto/NIK/KTP asli.
- Abort/unmount cleanup preview object URLs; foto read signed URL expired perlu refresh sumber yang authorized, bukan storage key request langsung.
- Upload PUT dapat gagal karena CORS; tampilkan pesan, jangan klaim finalize bila PUT gagal.
- Network failure POST yang hasilnya tidak pasti: tidak blind retry. Query status/list untuk rekonsiliasi/manual retry setelah dipastikan aman.

## Gate Operasional — `F/F` + `B/F`

| Alur | Syarat | Result yang harus terlihat |
|---|---|---|
| Student submit | 1 report photo, target_post_id valid | 201 status `PENDING_RECEIPT`, report belum muncul katalog |
| Student list/detail | current owner sah | Status/history tepat, list paginated 10 |
| Student cancel | pending + reason.trim nonempty | 200 `CANCELLED`, history+reason konsisten |
| Officer reject | pending + reason.trim nonempty | 200 `REJECTED`, history konsisten |
| Officer receive | pending + fisik checked + 1 item photo | 201 `RECEIVED`, satu item `STORED` dibuat atomik |
| Officer inventory | assigned post | Hanya pos sendiri, private notes tidak keluar ke Guest |
| Visibility | item STORED | hidden tidak ada pada public list **dan detail**; status tetap STORED |
| Overdue | storage_limit_days terlampaui | Peringatan read-only, tidak auto-distribute/hidden |
| Return | verify fisik + recipient_name + verification_summary | 201 item_returns 1, RETURNED_TO_OWNER, hidden |
| Distribute | STORED + kebijakan pos | 200 DISTRIBUTED, hidden, tanpa item_returns |
| Double submit/race | 2 receive/return/distribute bersamaan | satu sukses, lain 409, tanpa rekaman ganda |

**Error yang diuji per modul:** 400/422 validation, 401 token, 403 role, 404 unknown/cross post, 409 invalid state, 429 hanya bila didefinisikan pada response OpenAPI endpoint yang sedang diuji, 5xx terkontrol. Jangan menambah 429 dalam kontrak API yang tidak mengizinkan tanpa approval.

## Gate UI/UX dan quality

- Figma 00 token Style Guide dan Figma Page 05 frame M/D; banner hanya Landing Desktop; bottom nav tidak menumpuk form panjang; navbar sesuai role; no floating plus.
- Skeleton (maks 10), empty+clear filter, error+retry GET, form invalid and field focus, photo preview replace/delete, konfirmasi receive/return, success only after promise fulfilled.
- `npm ci` berdasarkan lockfile yang benar, `format:check`, `lint`, `typecheck`, `test`, `build`, Playwright E2E (jika script ada); browser console tidak ada warning material.
- Photo alt, aria-label, label, role, keyboard pagination, focus trap modal, Tab order.
- Audit bundle/asset 404; tidak ada secrets, private identifiers, presigned URLs, dan Figma temporary links di source/log.

## Dokumen bukti untuk handoff

```text
Scenario: [misal INT-P7-01]
Frontend task: F/E.3.1 | Backend task: B/E.1.1
Environment: local/test/staging (sebut server dan DB test, tanpa credential)
HTTP request: GET /api/v1/items?page=1&limit=10
Observed status+envelope: [faktual]
UI screenshot/network HAR: [path actual]
Test command: [command] — PASS/FAIL/NOT RUN
Keterbatasan: [tercatat]
```
