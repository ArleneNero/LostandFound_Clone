# UBL LostnFound — Frontend Agent Docs · ROLE-FIRST UPDATE

**Isi paket:** Markdown pengendali frontend, 7 milestone rinci, 132 task `PLANNED`, skill AI frontend, snapshot backend OpenAPI/ERD/API Contract **tanpa modifikasi**, panduan Figma exact, **6 aset asli** `Aset_Image_LostnFound(3).zip` ditempatkan di `apps/web/public/`, dan verifikator aset/kontrak.

## Aturan utama yang berubah

**URUTAN WAJIB: F/A Foundation → F/B Petugas lengkap → F/C Guest lengkap → F/D Mahasiswa login/operasional lengkap → F/E API publik → F/F API operasional → F/G QA/deploy.** Selesaikan satu role dengan mock in-memory lalu dapatkan review/persetujuan sebelum ganti role. Keterdesakan demo Pertemuan 7 memerlukan keputusan **eksplisit** jika hendak mendahulukan integrasi API F/E.

**Exact-Figma policy:** tata letak, proporsi, konten, warna, tipografi, spacing, ikon, aset, komponen, state, interaksi, alur, responsive breakpoints harus berpatokan pada frame Figma dan bukti render; tidak boleh redesign otomatis. Baca `FIGMA_EXACT_RULES.md`, `FIGMA_MAPPING.md`, `DESIGN_SYSTEM.md`.

**Assets policy:** enam file byte-asli ada di `apps/web/public/`, jangan menebak file lain. Jalankan `python apps/web/.agent-internal/tools/verify_assets.py`. Lihat `ASSET_MANIFEST.md`.

**Clean Code gate:** wajib baca `apps/web/.agent-internal/CLEAN_CODE.md` dan `references/FRONTEND_STANDARDS_SOURCE.md` sebelum coding; pemeriksaan ambang LOC dan tes saat handoff.

## Cara memasang (tidak mengubah repo nyata dengan sendirinya)

1. Extract ZIP ke **root monorepo** yang sudah punya `apps/api/`, `apps/web/` jika ada. **JANGAN overwrite otomatis**: review diff jika berkas `apps/web/public/*` sudah ada atau source app berbeda.
2. Baca `apps/web/AGENTS.md` dan `apps/web/.agent-internal/README.md`. Pakai sumber `apps/web/.agent-internal/milestones/F-*.md` **versi role-first ini**.
3. Kontrak canonical backend tetap root `.agent-internal/contracts/`. Verifikasi `python apps/web/.agent-internal/tools/verify_backend_sync.py` (jika folder canonical telah dipasang) sebelum integrasi nyata.
4. **PENTING: penomoran F/B–F/E lama adalah versi sebelum role-first.** Lihat `ID_MIGRATION.md` dan `ROOT_TRACK_COMPATIBILITY.md`; root backend docs yang masih memakai ID F/* lama **wajib disinkronkan** sebelum AI kerja di dua track. Jangan jalankan dua rencana F/* yang berbeda.
5. Gabung `.gitignore` dari `GITIGNORE_TAMBAHAN.md` tanpa overwrite; `.agent-internal`, `AGENTS.md`, rahasia `.env` tidak untuk GitHub. Aset `apps/web/public` adalah source aplikasi normal dan boleh di-commit sesuai izin/source-control policy.
6. Mulai dari `F/A.1.0`, satu task pada satu waktu, commit lokal setelah quality gate submilestone dan user approval untuk pindah major, push, merge, deploy.

## Batas hasil

Paket ini dokumentasi, aset, dan verifier **saja**. Tidak ada React source selesai, tidak ada bukti visual pixel-perfect runtime, API live, login Neon Auth, atau deploy. Status task semua `PLANNED`.
