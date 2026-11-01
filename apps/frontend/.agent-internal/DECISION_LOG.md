# DECISION_LOG — perubahan disetujui vs proposal

- **Ditetapkan pengguna:** pengerjaan frontend bertahap **Petugas dahulu, Guest kedua, Mahasiswa/login ketiga**. Harus tuntaskan satu role dan tunggu review sebelum pindah.
- **Ditetapkan pengguna:** UI harus **exact sesuai Figma**, bukan sekadar inspirasi; tidak redesign sendiri.
- **Ditetapkan pengguna:** pakai hanya file aset yang dikirim pada `Aset_Image_LostnFound(3).zip`; nama/path harus diverifikasi, struktur folder rapi.
- **Ditetapkan pengguna:** AI coding wajib baca ketentuan Clean Code.
- **Kontrak backend existing:** snapshot API v1.0 22 endpoints/ERD v6.2, F/* role-first berbeda dari backend root planner lama. Integrasi tidak boleh menebak field.
- **Penyesuaian dokumentasi ini:** mengganti makna mayor F/B F/C F/D F/E; membutuhkan rekonsiliasi root planner (lihat ID_MIGRATION.md). Status `PLANNED` semua.
- **Target deployment:** Cloudflare Pages frontend, Workers backend kandidat setelah uji kompatibilitas; bukan keputusan sudah deployed.
- **Belum diverifikasi:** semua frame Page05 vs Figma yang diberikan (beda file), pixel-perfect live, asset tambahan di Figma yang tidak ada ZIP, runtime backend/provider.
