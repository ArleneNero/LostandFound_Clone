# ID_MIGRATION — PERUBAHAN MAKNA ID FRONTEND (BREAKING)

**PENTING:** Pengguna memilih urutan wajib *Petugas → Guest → Mahasiswa login*. Ini mengubah **arti milestone `F/B..F/E`** dibanding paket sebelumnya. Jangan menjalankan dua daftar task dengan nomor sama sekaligus.

| Milestone lama | Isi lama | Lokasi kerja baru (semantic, **bukan** ID 1:1) |
|---|---|---|
| `F/A` | Foundation React | `F/A` masih fondasi, tetapi rincian task **direvisi** untuk Clean Code/Figma/assets gate |
| `F/B` | Katalog publik mock | `F/C.2` (Guest katalog mock) |
| `F/C` | Detail publik + pos mock | `F/C.3` (detail) dan `F/C.4` (pos/panduan) |
| `F/D` | Integrasi katalog Fastify/Neon P7 | `F/E` (GET publik real + P7 gate) |
| `F/E` | Auth Student + laporan + operasi Officer mock | `F/B` (Petugas mock), `F/D` (Mahasiswa mock) |
| `F/F` | Integrasi Neon Auth/R2/full operation | `F/F` (integrasi nyata; task dirapikan) |
| `F/G` | QA/deploy | `F/G` (visual exact + anti-spam + UAT) |

**Task lama** tersimpan untuk audit pada `references/LEGACY_MILESTONE_TASKS.md`. ID task lama yang kebetulan sama ID baru **belum tentu pekerjaannya sama**. Jika task lama sudah pernah dikode/committed pada repo, lakukan *reconciliation* manual; jangan hapus progres dan jangan re-label commit lama secara diam-diam.

**ROOT backend paket lama belum otomatis diperbarui.** Sebelum menjalankan coding agent pada root monorepo, revisi bagian `F/*` di root `.agent-internal/MILESTONES.md`, `.agent-internal/TODO.md`, dan root `AGENTS.md` sebagai pointer baru ke `apps/web/.agent-internal/`. Simpan B/* unchanged. Jangan overwrite root hanya dengan frontend ZIP. Lihat `ROOT_TRACK_COMPATIBILITY.md`.
