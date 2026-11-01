# AGENTS — FRONTEND UBL LostnFound (ROLE-FIRST, PRIORITAS WAJIB)

> Berlaku di `apps/web` bersama root `AGENTS.md`. Dilarang mengubah backend/API/schema saat task F/*; jika source konflik, `BLOCKED` dan minta keputusan.

## 0. BACA SEBELUM CODING (WAJIB, BUKAN OPSIONAL)
1. Baca `apps/web/.agent-internal/README.md`, `PRD.md`, `ARCHITECTURE.md`, `FOLDER_STRUCTURE.md`.
2. **Baca seluruh `CLEAN_CODE.md` dan `references/FRONTEND_STANDARDS_SOURCE.md`**; konfirmasi standar pemisahan tanggung jawab dan batas file.
3. Baca `FIGMA_EXACT_RULES.md`, `FIGMA_MAPPING.md`, `DESIGN_SYSTEM.md`; inspect Figma node/frame yang tepat, dapatkan screenshot referensi dan ukur slot desain.
4. Baca `ASSET_MANIFEST.md`; jalankan `tools/verify_assets.py` sebelum memakai gambar, hanya gunakan 6 file asli atau aset Figma yang telah benar-benar diekspor dan diverifikasi.
5. Baca `PHASES.md`, `MILESTONES.md`, `milestones/F-*.md` yang sedang aktif, `TODO.md`, `WORKFLOW.md`, `GIT_POLICY.md`.
6. Sebelum mengerjakan fitur dengan API, baca `BACKEND_SYNC.md`, `API_ROUTE_MATRIX.md`, `DTO_MAPPING.md`, kontrak OpenAPI. Jalankan verifier hash canonical.

## 1. URUTAN KERJA DIKUNCI
`F/A Foundation → F/B Petugas (seluruh mock) → F/C Guest (seluruh mock) → F/D Mahasiswa login + laporan (seluruh mock) → F/E katalog/pos API nyata → F/F operasional API nyata → F/G QA/deploy`.
- **Selesaikan satu role dulu**, perlihatkan bukti tes dan visual untuk role tersebut, lalu **tunggu persetujuan pengguna** sebelum berpindah. Dilarang mengerjakan Guest saat Petugas belum direview, atau Mahasiswa saat Guest belum direview.
- F/E didahulukan hanya bila pemilik menyetujui pengecualian tenggat Pertemuan 7 secara eksplisit.
- Uji integrasi nyata tetap wajib; mock `COMPLETED` bukan bukti sistem selesai.
- ID task `F/X.n.0` pertama dalam submilestone; revisi `F/X.n.0(1)` hanya setelah hasil sebelumnya diterima. Jangan gunakan ID task versi lama tanpa melihat `ID_MIGRATION.md`.

## 2. Figma EXACT TANPA REDESIGN
- Setiap layar **wajib sesuai Figma** untuk urutan elemen, layout, ukuran, spacing, warna, font, radius, ikon, copy, navigasi, states, dan perilaku. Jangan bikin UI generik/AI-slop, mengubah palette, atau menambah gambar random.
- Bandingkan screenshot hasil render 390 dan 1440, tambahan 768; periksa M/D bukan dua source code berbeda. Perubahan yang sengaja beda dari Figma harus disetujui sebelum implementasi dan dicatat.
- Jika tidak bisa memperoleh screenshot node atau aset sebenarnya, beri status `BLOCKED` pada tugas fidelity yang bersangkutan; jangan klaim pixel-perfect.
- Aturan Figma: Petugas nav Dashboard/Inventaris/Laporan/Akun, Laporan punya 2 jalur, tidak ada floating plus; foto 1 di atas nama, fisik diterima hanya dengan konfirmasi, default waktu WIB editable tanpa field request buatan, banner besar hanya landing desktop.

## 3. ASSET DAN FOLDER
- Ikuti `FOLDER_STRUCTURE.md`; hanya `apps/web/src/` untuk frontend dan `apps/web/public/` untuk gambar. Fitur terpisah `officer/`, `discovery/`, `guest/`, `student/`, `auth/`; shared abstractions saat memang dipakai.
- 6 aset dari ZIP pengguna berada di lokasi nyata; **jangan menebak nama/file path**, rename, mengedit, hotlink asset sementara Figma, atau membuat alternatif. Asset lain `MISSING` sampai bytes diverifikasi.
- UI tidak import fixture langsung; `page → hook → service interface → mock/http adapter`, data view-model via mapper untuk HTTP.

## 4. DOMAIN DAN KEAMANAN
- Hanya barang ditemukan, awal Pos Pengajaran. Guest tidak login/role DB; role server hanya STUDENT/OFFICER, tanpa registrasi Officer mandiri/ADMIN.
- Status laporan PENDING_RECEIPT/RECEIVED/REJECTED/CANCELLED; item STORED/RETURNED_TO_OWNER/DISTRIBUTED; katalog publik STORED && is_visible. Foto laporan 1, foto inventaris 1; galeri pos 0–3.
- Batas API `/api/v1` 22 endpoints, envelopes snake_case. Clerk JWT, R2 intent→PUT→finalize, status HTTP sesuai OpenAPI. **Tidak boleh mengarang endpoint/field** untuk memenuhi UI; catat mismatch dan tunda fitur terkait.
- Tampilkan error 429/403/404/409/5xx secara benar, jangan auto retry mutasi ambigu, jangan kirim secret di browser/public.

## 5. QUALITY GATE / GIT
- Clean Code: fungsi sekitar 20 baris, component reusable ≤80, Page ≤150, hook/selector ≤100, service ≤200, file >300 butuh review/izin tertulis; SRP lebih penting dari memecah file asal kecil.
- Setiap task: tunjukkan path changed, jumlah baris, tes PASS/FAIL/NOT RUN, acuan frame Figma, screenshot sebelum/sesudah, asset verification, risk, status. Jangan mengklaim tes yang belum dijalankan.
- Submilestone: satu commit lokal koheren setelah gates; major push hanya setelah persetujuan. **Jangan auto-push, merge, deploy, atau lanjut role.** `.agent-internal`/`AGENTS.md` jangan ditambahkan Git.
