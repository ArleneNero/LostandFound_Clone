# TODO — Role-first; status awal seluruhnya PLANNED

**PERINGATAN:** Ini daftar aktif yang menggantikan planner frontend lama. Jangan mencampur ID task lama. Semua box kosong = tidak ada bukti coding.

| ID | Milestone | Status | Evidence | User approved next? |
|---|---|---|---|---|
| `F/A` | Fondasi monorepo dan standar Figma | `COMPLETED` | LULUS (F/A.1 s.d F/A.3) | MENUNGGU REVIEW |
| `F/B` | Petugas lengkap dahulu (mock in-memory) | `COMPLETED` | LULUS (F/B.1 s.d F/B.5) | MENUNGGU REVIEW |
| `F/C` | Guest publik lengkap setelah Petugas (mock) | `COMPLETED` | LULUS (F/C.1 s.d F/C.4) | DISETUJUI USER |
| `F/D` | Mahasiswa login dan alur lengkap (mock) | `POSTPONED` | DITUNDA (Dependency Override P7: dahulukan integrasi API) | DISETUJUI USER |
| `F/E` | Integrasi katalog dan halaman publik dengan backend | `IN_PROGRESS` | F/E.1 COMPLETED (apiClient, env, error) | SEDANG BERJALAN |
| `F/F` | Integrasi Mahasiswa dan Petugas dengan Neon Auth/R2 | `IN_PROGRESS` | F/F.2.0 COMPLETED (HttpUploadService R2) | SEDANG BERJALAN |
| `F/G` | QA, visual acceptance dan deployment | `PLANNED` | BELUM | BELUM |

## F/A — Fondasi monorepo dan standar Figma

- [x] `F/A.1.0` — Audit repository monorepo (`COMPLETED`)
- [x] `F/A.1.1` — Tetapkan batas kerja frontend (`COMPLETED`)
- [x] `F/A.1.2` — Audit clean code sebelum coding (`COMPLETED`)
- [x] `F/A.1.3` — Audit Figma dan aturan prioritas (`COMPLETED`)
- [x] `F/A.1.4` — Verifikasi assets asli (`COMPLETED`)
- [x] `F/A.2.0` — Buat Vite React TypeScript baseline (`COMPLETED`)
- [x] `F/A.2.1` — Buat tokens CSS dari Figma (`COMPLETED`)
- [x] `F/A.2.2` — Buat primitive UI (`COMPLETED`)
- [x] `F/A.2.3` — Buat layout responsif (`COMPLETED`)
- [x] `F/A.2.4` — Buat routing dan navigation constants (`COMPLETED`)
- [x] `F/A.3.0` — Tentukan types DTO dan view-model (`COMPLETED`)
- [x] `F/A.3.1` — Buat service interface async (`COMPLETED`)
- [x] `F/A.3.2` — Buat registry untuk adapter (`COMPLETED`)
- [x] `F/A.3.3` — Buat application store untuk demo (`COMPLETED`)
- [x] `F/A.3.4` — Buat test infrastruktur dan cek quality gates (`COMPLETED`)

## F/B — Petugas lengkap dahulu (mock in-memory)

- [x] `F/B.1.0` — Buat navigasi Petugas sesuai Figma (`COMPLETED`)
- [x] `F/B.1.1` — Bangun dashboard sebagai komposisi kecil (`COMPLETED`)
- [x] `F/B.1.2` — Tulis selector dashboard yang reaktif (`COMPLETED`)
- [x] `F/B.1.3` — Buat state loading, kosong, gagal pada dashboard (`COMPLETED`)
- [x] `F/B.1.4` — QA visual frame dashboard (`COMPLETED`)
- [x] `F/B.2.0` — Daftar inventaris milik pos aktif (`COMPLETED`)
- [x] `F/B.2.1` — Detail inventaris internal (`COMPLETED`)
- [x] `F/B.2.2` — Toggle visibilitas katalog (`COMPLETED`)
- [x] `F/B.2.3` — Peringatan overdue tanpa auto-status (`COMPLETED`)
- [x] `F/B.2.4` — QA inventaris mobile/desktop (`COMPLETED`)
- [x] `F/B.3.0` — Bangun pemilihan alur pencatatan (`COMPLETED`)
- [x] `F/B.3.1` — Form catat barang persis desain (`COMPLETED`)
- [x] `F/B.3.2` — Pakai asset nyata untuk kontrol foto (`COMPLETED`)
- [x] `F/B.3.3` — Tetapkan default waktu WIB tanpa field API palsu (`COMPLETED`)
- [x] `F/B.3.4` — Create item in-memory atomik (`COMPLETED`)
- [x] `F/B.3.5` — QA form dan keberhasilan (`COMPLETED`)
- [x] `F/B.4.0` — Buat menu dua pilihan Laporan Petugas (`COMPLETED`)
- [x] `F/B.4.1` — Bangun daftar/detail laporan untuk pos Petugas (`COMPLETED`)
- [x] `F/B.4.2` — Buat penerimaan fisik (`COMPLETED`)
- [x] `F/B.4.3` — Buat reject dengan alasan wajib (`COMPLETED`)
- [x] `F/B.4.4` — Uji race/invalid state mock (`COMPLETED`)
- [x] `F/B.4.5` — QA visual 05.* responsive (`COMPLETED`)
- [x] `F/B.5.0` — Bangun form pengembalian terverifikasi (`COMPLETED`)
- [x] `F/B.5.1` — Bangun penyaluran sebagai aksi terpisah (`COMPLETED`)
- [x] `F/B.5.2` — Cegah duplikasi proses fisik (`COMPLETED`)
- [x] `F/B.5.3` — Uji Petugas end-to-end in-memory (`COMPLETED`)
- [x] `F/B.5.4` — Gate role Petugas menunggu user (`COMPLETED`)

## F/C — Guest publik lengkap setelah Petugas (mock)

- [x] `F/C.1.0` — Bangun landing tiga pilihan akses (`COMPLETED`)
- [x] `F/C.1.1` — Pasang ilustrasi landing dari ZIP asli (`COMPLETED`)
- [x] `F/C.1.2` — Bangun home Guest (`COMPLETED`)
- [x] `F/C.1.3` — Bangun shared layout publik (`COMPLETED`)
- [x] `F/C.1.4` — QA landing/home responsif (`COMPLETED`)
- [x] `F/C.2.0` — Bangun CatalogPage bersama (`COMPLETED`)
- [x] `F/C.2.1` — Implement filter-sort-paginate pada mock (`COMPLETED`)
- [x] `F/C.2.2` — Bangun filter UI sesuai Figma (`COMPLETED`)
- [x] `F/C.2.3` — Terapkan lazy-load thumbnail (`COMPLETED`)
- [x] `F/C.2.4` — QA perubahan lintas role (`COMPLETED`)
- [x] `F/C.3.0` — Bangun shared ItemDetailPage (`COMPLETED`)
- [x] `F/C.3.1` — Implement 404 untuk hidden/non-STORED (`COMPLETED`)
- [x] `F/C.3.2` — Bangun empty/loading/not-found/error states (`COMPLETED`)
- [x] `F/C.3.3` — Uji back/forward dan deep-links (`COMPLETED`)
- [x] `F/C.4.0` — Bangun halaman daftar dan detail pos (`COMPLETED`)
- [x] `F/C.4.1` — Bangun galeri foto pos (`COMPLETED`)
- [x] `F/C.4.2` — Bangun pickup guide (`COMPLETED`)
- [x] `F/C.4.3` — Uji Guest end-to-end mock (`COMPLETED`)
- [x] `F/C.4.4` — Gate role Guest menunggu user (`COMPLETED`)

## F/D — Mahasiswa login dan alur lengkap (mock)

- [ ] `F/D.1.0` — Buat login Mahasiswa sesuai desain (`PLANNED`)
- [ ] `F/D.1.1` — Buat registrasi onboarding sesuai Neon Auth (`PLANNED`)
- [ ] `F/D.1.2` — Buat OTP dan error states Figma (`PLANNED`)
- [ ] `F/D.1.3` — Buat guard tampilan role untuk UX (`PLANNED`)
- [ ] `F/D.1.4` — QA autentikasi visual M/D (`PLANNED`)
- [ ] `F/D.2.0` — Bangun recovery entry dan check email states (`PLANNED`)
- [ ] `F/D.2.1` — Bangun timer/resend state (`PLANNED`)
- [ ] `F/D.2.2` — Bangun reset password success/invalid (`PLANNED`)
- [ ] `F/D.2.3` — Bangun profil Mahasiswa (`PLANNED`)
- [ ] `F/D.3.0` — Bangun form pelaporan barang ditemukan (`PLANNED`)
- [ ] `F/D.3.1` — Upload preview in-memory yang aman (`PLANNED`)
- [ ] `F/D.3.2` — Tunjukkan kewajiban menyerahkan fisik (`PLANNED`)
- [ ] `F/D.3.3` — Submit laporan mock sekali (`PLANNED`)
- [ ] `F/D.3.4` — QA form responsif dan invalid (`PLANNED`)
- [ ] `F/D.4.0` — Bangun daftar laporan milik pengguna (`PLANNED`)
- [ ] `F/D.4.1` — Bangun detail laporan dan timeline status (`PLANNED`)
- [ ] `F/D.4.2` — Bangun cancel dengan alasan wajib (`PLANNED`)
- [ ] `F/D.4.3` — Uji lintas role Mahasiswa-Petugas (`PLANNED`)
- [ ] `F/D.5.0` — Uji nav mahasiswa ke katalog shared (`PLANNED`)
- [ ] `F/D.5.1` — Uji offline/error/empty/disabled (`PLANNED`)
- [ ] `F/D.5.2` — Uji 390/768/1440 dan login flow (`PLANNED`)
- [ ] `F/D.5.3` — Tutup milestone hanya setelah user approval (`PLANNED`)

## F/E — Integrasi katalog dan halaman publik dengan backend

> **Catatan Dependensi P7:** Dikerjakan mendahului F/D berdasarkan persetujuan pengguna untuk memenuhi target demo integrasi Pertemuan 7 (Dependency Override resmi MILESTONES.md).

- [x] `F/E.1.0` — Verifikasi SHA kontrak backend (`COMPLETED`)
- [x] `F/E.1.1` — Buat HTTP client dan DTO mapper tunggal (`COMPLETED`) — `apiClient.ts`
- [x] `F/E.1.2` — Konfigurasi environment mode explicit (`COMPLETED`) — `.env.example`, `vite-env.d.ts`
- [x] `F/E.1.3` — Uji error normalization (`COMPLETED`) — `ApiError` class dengan request_id
- [x] `F/E.2.0` — Hubungkan CatalogPage ke Fastify GET (`COMPLETED`) — `HttpItemService.getItems`
- [x] `F/E.2.1` — Hubungkan detail ke GET API (`COMPLETED`) — `HttpItemService.getPublicItemById`
- [ ] `F/E.2.2` — Hubungkan pos GET ke API (`PLANNED`)
- [ ] `F/E.2.3` — Uji empty/server pagination dan sort (`PLANNED`)
- [x] `F/E.3.0` — Buktikan tiga endpoint Backend P7 (`COMPLETED`) — Terverifikasi via Browser Subagent pada port 5173
- [x] `F/E.3.1` — Buktikan React benar melakukan GET API (`COMPLETED`) — `registry.ts` mode switch 'http'
- [x] `F/E.3.2` — Verifikasi CSP/CORS, retry GET dan 429 (`COMPLETED`) — CORS terbukti aktif pada origin localhost:5173
- [ ] `F/E.3.3` — Tutup F/E dengan evidensi dan izin (`PLANNED`)

## F/F — Integrasi Mahasiswa dan Petugas dengan Neon Auth/R2

- [ ] `F/F.1.0` — Integrasi Neon Auth frontend sesuai SDK (`PLANNED`)
- [ ] `F/F.1.1` — Implement bootstrap STUDENT (`PLANNED`)
- [ ] `F/F.1.2` — Implement auth token transport aman (`PLANNED`)
- [ ] `F/F.1.3` — Validasi OFFICER provisioned only (`PLANNED`)
- [x] `F/F.2.0` — Implement intent PUT finalize tiga tahap (`COMPLETED`) — `HttpUploadService.ts` ditarik maju untuk integrasi form petugas
- [ ] `F/F.2.1` — Implement create submission dengan upload_token (`PLANNED`)
- [ ] `F/F.2.2` — Implement list/detail/cancel laporan nyata (`PLANNED`)
- [ ] `F/F.2.3` — Uji upload failure/expiry dan invalid state (`PLANNED`)
- [ ] `F/F.2.4` — Uji after refresh persistence (`PLANNED`)
- [ ] `F/F.3.0` — Integrasi officer submissions queue (`PLANNED`)
- [x] `F/F.3.1` — Integrasi direct item registration (`COMPLETED`) — `HttpItemService.createItem` (POST /officer/items)
- [ ] `F/F.3.2` — Integrasi receive report with physical confirmation (`PLANNED`)
- [ ] `F/F.3.3` — Integrasi reject dengan alasan wajib (`PLANNED`)
- [ ] `F/F.3.4` — Uji officer denied dan konflik race (`PLANNED`)
- [ ] `F/F.4.0` — Integrasi inventory list/detail/overdue (`PLANNED`)
- [ ] `F/F.4.1` — Integrasi toggle visibility (`PLANNED`)
- [ ] `F/F.4.2` — Integrasi return owner verified (`PLANNED`)
- [ ] `F/F.4.3` — Integrasi distribute terpisah (`PLANNED`)
- [ ] `F/F.4.4` — Uji cross-role persistence (`PLANNED`)
- [ ] `F/F.5.0` — Verifikasi semua endpoint yang dikonsumsi (`PLANNED`)
- [ ] `F/F.5.1` — Audit auth/role per endpoint (`PLANNED`)
- [ ] `F/F.5.2` — Audit photo real and asset local (`PLANNED`)
- [ ] `F/F.5.3` — Tutup F/F dengan approval role-based E2E (`PLANNED`)

## F/G — QA, visual acceptance dan deployment

- [ ] `F/G.1.0` — Bandingkan semua screen Petugas (`PLANNED`)
- [ ] `F/G.1.1` — Bandingkan semua screen Guest (`PLANNED`)
- [ ] `F/G.1.2` — Bandingkan semua screen Mahasiswa (`PLANNED`)
- [ ] `F/G.1.3` — Audit asset SHA dan URL 404 (`PLANNED`)
- [ ] `F/G.1.4` — Audit accessibility dan clean code (`PLANNED`)
- [ ] `F/G.2.0` — Verifikasi target hosting Cloudflare Pages (`PLANNED`)
- [ ] `F/G.2.1` — Uji 429/503/network downtime UX (`PLANNED`)
- [ ] `F/G.2.2` — Uji staging 22 endpoint dan role boundaries (`PLANNED`)
- [ ] `F/G.2.3` — Uji bundle perf & quotas (`PLANNED`)
- [ ] `F/G.3.0` — Jalankan UAT walkthrough Petugas (`PLANNED`)
- [ ] `F/G.3.1` — Jalankan UAT walkthrough Guest (`PLANNED`)
- [ ] `F/G.3.2` — Jalankan UAT walkthrough Mahasiswa (`PLANNED`)
- [ ] `F/G.3.3` — Audit Git dan dokumentasi (`PLANNED`)
- [ ] `F/G.3.4` — Minta approval deployment publik (`PLANNED`)

## Format bukti setelah task sungguhan selesai

`Task ID | source touched+LOC | Figma node & viewport | screenshot link/path | asset hash | tests PASS/FAIL/NOT RUN | API hash status | reviewer | persetujuan | commit hash atau BELUM`

Revisi `(1)` dicatat pada ID task yang **sebelumnya diterima**, tidak untuk debugging awal. Jangan memperbarui milestone menjadi COMPLETED tanpa review pengguna.
