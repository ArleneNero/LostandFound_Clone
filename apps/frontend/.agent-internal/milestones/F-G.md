# F/G — QA, visual acceptance dan deployment

**Status:** `PLANNED` · **Dependensi:** F/B C D E F selesai; backend B/G staging dan izin · **Area:** `apps/web`.

**Syarat masuk:** baca `AGENTS.md`, `CLEAN_CODE.md`, `FIGMA_EXACT_RULES.md`, `ASSET_MANIFEST.md`, `FOLDER_STRUCTURE.md`, kontrak dan milestone saat ini sebelum perubahan.
**Syarat keluar:** lulus tes+visual relevant, laporan bukti, review pengguna, izin push/pindah fase. Seluruh checkpoint awal masih kosong.

## F/G.1 — Visual regression & a11y

**Figma/sumber:** Figma 00 style + Page05 M/D

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/G.1.0` Bandingkan semua screen Petugas | Frame-by-frame 390 dan 1440; catat deviasi | Tanpa klaim pixel-perfect tanpa hasil perbandingan | `PLANNED` |
| `F/G.1.1` Bandingkan semua screen Guest | Landing/home/catalog/detail/post/guide | Cek 390/768/1440 dan touch targets | `PLANNED` |
| `F/G.1.2` Bandingkan semua screen Mahasiswa | Login/OTP/recovery/profile/report/status | Jangan menghilangkan state yang ada di Figma | `PLANNED` |
| `F/G.1.3` Audit asset SHA dan URL 404 | 6 file asli + seluruh aset Figma tambahan yang telah diekspor legal | Tidak ada nama file rekaan/hotlink asset sementara | `PLANNED` |
| `F/G.1.4` Audit accessibility dan clean code | Keyboard/focus/aria/lint; semua files >300 reviewed | Setiap deviasi approved | `PLANNED` |

**Quality gate `F/G.1`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## F/G.2 — Security, availability dan load tests

**Figma/sumber:** Cloudflare Pages/Workers kandidat

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/G.2.0` Verifikasi target hosting Cloudflare Pages | SPA fallback dan env backend endpoint | Tidak klaim backend Workers support tanpa uji Fastify | `PLANNED` |
| `F/G.2.1` Uji 429/503/network downtime UX | Backoff GET, no retry POST, Turnstile pada form sensitif jika disetujui | Tidak spam request dari client | `PLANNED` |
| `F/G.2.2` Uji staging 22 endpoint dan role boundaries | Neon/Neon Auth/R2 dev/staging, post scope | Tidak pernah pakai real data PII di public screenshots | `PLANNED` |
| `F/G.2.3` Uji bundle perf & quotas | Lazy imgs, code split, build assets, console, budget | Laporkan metrik nyata, bukan estimasi PASS | `PLANNED` |

**Quality gate `F/G.2`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## F/G.3 — User acceptance and deployment approval

**Figma/sumber:** Semua role + integrasi

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/G.3.0` Jalankan UAT walkthrough Petugas | Dashboard->Inventory->Submit->Receive->Return | Simpan hasil beserta bug/blocked | `PLANNED` |
| `F/G.3.1` Jalankan UAT walkthrough Guest | Catalog->Detail->Post->Guide | Simpan hasil normal/empty/404 | `PLANNED` |
| `F/G.3.2` Jalankan UAT walkthrough Mahasiswa | Signup->Report->Status->Cancel | Simpan bukti login/provider benar | `PLANNED` |
| `F/G.3.3` Audit Git dan dokumentasi | Task IDs, revision, changelog, status, secret scan | No auto push/merge/deploy | `PLANNED` |
| `F/G.3.4` Minta approval deployment publik | Host readiness, origin, DNS, rate limits dan contingency | Deploy hanya setelah izin user eksplisit | `PLANNED` |

**Quality gate `F/G.3`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## Persetujuan untuk pindah tahap

Selesaikan semua sub-milestone berdasarkan bukti dan review pengguna. **Tidak boleh mulai milestone berikutnya hanya karena task checklist dicentang sendiri.**
