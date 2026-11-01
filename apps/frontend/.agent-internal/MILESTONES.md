# MILESTONES — FINAL ROLE-FIRST FRONTEND

Semua status awal `PLANNED`. Rangkaian wajib `F/A → F/B PETUGAS → F/C GUEST → F/D MAHASISWA LOGIN → F/E PUBLIC API → F/F FULL API → F/G QA`.

| Major | Fokus | Dependensi/gate | Sub | Task | Dokumen |
|---|---|---|---:|---:|---|
| `F/A` | Fondasi monorepo dan standar Figma | B/A (workspace); tidak mensyaratkan API berjalan | 3 | 15 | [Detail](milestones/F-A.md) |
| `F/B` | Petugas lengkap dahulu (mock in-memory) | F/A, bukan B/E untuk mock UI | 5 | 27 | [Detail](milestones/F-B.md) |
| `F/C` | Guest publik lengkap setelah Petugas (mock) | F/B COMPLETED + izin pemilik untuk lanjut | 4 | 19 | [Detail](milestones/F-C.md) |
| `F/D` | Mahasiswa login dan alur lengkap (mock) | F/C COMPLETED + izin pemilik untuk lanjut | 5 | 22 | [Detail](milestones/F-D.md) |
| `F/E` | Integrasi katalog dan halaman publik dengan backend | F/C + backend B/E nyata; ideal setelah F/D kecuali tenggat P7 disetujui | 3 | 12 | [Detail](milestones/F-E.md) |
| `F/F` | Integrasi Mahasiswa dan Petugas dengan Neon Auth/R2 | B/F benar-benar tersedia + F/E lulus; B/C dan B/D lengkap | 5 | 23 | [Detail](milestones/F-F.md) |
| `F/G` | QA, visual acceptance dan deployment | F/B C D E F selesai; backend B/G staging dan izin | 3 | 14 | [Detail](milestones/F-G.md) |

**Total: 28 submilestones, 132 task.**

## Perjanjian pengerjaan

1. Setiap role wajib menyelesaikan **semua** layarnya, UX states, data mock lintas layar, test, dan visual review sebelum pindah role.
2. Jangan mengklaim screenshot tepat hanya karena komponen terlihat mirip. Periksa Figma node yang sama, pada viewport yang sama.
3. F/E dan F/F menggunakan 22 endpoint canonical (tidak menambah endpoint). B/E/B/F dependencies dibaca dari backend actual.
4. F/E tidak boleh dimulai sebelum F/D selesai **kecuali** ada approval exception P7; catat hasil perubahan urutan sebagai dependency override.
5. ID lama dari paket sebelum revisi berbeda semantik. Lihat `ID_MIGRATION.md`, bukan menebak arti ID dari nomor yang identik.

## Next active task

Milestone **`F/B`** (Petugas lengkap dahulu — mock in-memory, F/B.1 s.d. F/B.5) telah **COMPLETED** (100%). Menunggu persetujuan pengguna (Gate F/B.5.4) sebelum memulai Milestone **`F/C`** (Guest publik).
