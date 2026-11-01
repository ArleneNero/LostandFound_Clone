# F/E — Integrasi katalog dan halaman publik dengan backend

**Status:** `PLANNED` · **Dependensi:** F/C + backend B/E nyata; ideal setelah F/D kecuali tenggat P7 disetujui · **Area:** `apps/web`.

**Syarat masuk:** baca `AGENTS.md`, `CLEAN_CODE.md`, `FIGMA_EXACT_RULES.md`, `ASSET_MANIFEST.md`, `FOLDER_STRUCTURE.md`, kontrak dan milestone saat ini sebelum perubahan.
**Syarat keluar:** lulus tes+visual relevant, laporan bukti, review pengguna, izin push/pindah fase. Seluruh checkpoint awal masih kosong.

## F/E.1 — Audit kontrak dan setup HTTP

**Figma/sumber:** B/E dan OpenAPI snapshot canonical

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/E.1.0` Verifikasi SHA kontrak backend | Jalankan verifier frontend terhadap root canonical YAML/MD/DBML | MISMATCH -> BLOCKED bukan isi sendiri | `PLANNED` |
| `F/E.1.1` Buat HTTP client dan DTO mapper tunggal | Envelope data/meta/error snake_case, timeouts dan abort | Tidak fetch inline di JSX | `PLANNED` |
| `F/E.1.2` Konfigurasi environment mode explicit | Mock vs http dipilih eksplisit dengan VITE_API_BASE_URL | HTTP gagal tidak fallback silent ke mock | `PLANNED` |
| `F/E.1.3` Uji error normalization | 401/403/404/409/429/5xx jaringan dipetakan UX | Request ID dapat ditampilkan aman tanpa token | `PLANNED` |

**Quality gate `F/E.1`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## F/E.2 — GET katalog dan detail nyata

**Figma/sumber:** GET /api/v1/items, GET /api/v1/items/{item_id}

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/E.2.0` Hubungkan CatalogPage ke Fastify GET | Server query page/limit=10/q/category/post_id/sort | Frontend TIDAK slice/filter ulang satu page response | `PLANNED` |
| `F/E.2.1` Hubungkan detail ke GET API | 404 item hidden/non-stored dipertahankan | Tidak fallback ke officer endpoint | `PLANNED` |
| `F/E.2.2` Hubungkan pos GET ke API | GET /posts dan GET /posts/{post_id} | 0–3 foto ditampilkan hanya bila URL benar ada | `PLANNED` |
| `F/E.2.3` Uji empty/server pagination dan sort | 0/1/10/11/21 serta total_pages=0 dari server | Prev/next disabled benar dan meta tidak dimanipulasi | `PLANNED` |

**Quality gate `F/E.2`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## F/E.3 — P7 integration gate

**Figma/sumber:** Backend B/E + frontend F/E

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/E.3.0` Buktikan tiga endpoint Backend P7 | GET items, GET item_id, POST officer/items diverifikasi integrasi | Jangan klaim POST backend jika belum auth/R2 siap | `PLANNED` |
| `F/E.3.1` Buktikan React benar melakukan GET API | Network screenshot dan data dari Neon seed | Tidak diperbolehkan menggunakan mock lalu mengklaim nyata | `PLANNED` |
| `F/E.3.2` Verifikasi CSP/CORS, retry GET dan 429 | Fetch reads boleh retry terbatas, mutation tidak | Tidak bocorkan endpoint private di public | `PLANNED` |
| `F/E.3.3` Tutup F/E dengan evidensi dan izin | UI Figma tetap cocok setelah source beralih | User approval sebelum F/F | `PLANNED` |

**Quality gate `F/E.3`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## Persetujuan untuk pindah tahap

Selesaikan semua sub-milestone berdasarkan bukti dan review pengguna. **Tidak boleh mulai milestone berikutnya hanya karena task checklist dicentang sendiri.**
