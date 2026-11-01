# FIGMA_EXACT_RULES — WAJIB cocok dengan desain, tanpa improvisasi

## Hierarki sumber

1. **Figma aktual yang diakses:** link pengguna `https://www.figma.com/design/U1CiotvJOC2B3zQI417fF7/Mockup-UI-UBL-Lost-and-Found--Copy-?node-id=0-1`, halaman `00 — Style Guide & Components`; untuk token/style dan section aturan final `324:135` (aturan role/nav/foto/fisik/WIB/recovery).
2. **Frame detail role:** dua DOCX frontend v6.2 mengacu ke Figma Page 05 `https://www.figma.com/design/O7CTpA8dQPMdVi8ZQo2PWK/Mockup-UI-UBL-Lost-and-Found?node-id=373-2904` (`05 — Role-Based Views`), berbeda file dari link utama. Periksa apakah Page05 merupakan acuan terbaru; jika perbedaan dengan file pengguna, **STOP & tanya** sebelum desain diganti.
3. **Source-of-truth perilaku/data:** kontrak API backend v1.0/ERD v6.2 untuk fields dan keamanan. Bila Figma punya kontrol yang belum ada di backend (misal reset/OTP yang dikelola Neon Auth), integrasikan provider/adapter yang sah; **jangan mengarang API**.
4. Dua DOCX sumber yang dikonversi ke `references/` memandu file/routing/clean code. Aturan project baru (role-first) tidak mengubah facts API/ERD.

## Wajib exact pada tiap screen

- Warna, font, ukuran heading/body, padding, spacing, radius, bayangan, ikon, ukuran image, cropping, hierarchy, grid, navigasi, label/copy, microstate, urutan dan posisi field, disabled/loading/success/error/empty harus cocok.
- Tidak redesign, reinterpretasi menjadi UI generik, ubah palette, tambah badge/kartu tanpa Figma, atau menambah floating CTA; tidak menukar asset brand dengan ikon/random stock/AI generated.
- Satu halaman responsif untuk Mobile `390x844` dan Desktop `1440x900`; pengujian tablet 768 lebar untuk kualitas adaptif. Frame bertanda `a`, `b`, `Lanjutan`, foto terpilih/alasan terisi dapat merepresentasikan state/scroll page yang **sama**, bukan route baru. Baca Figma sebelum memutuskan.
- **Petugas:** Dashboard, Inventaris, Laporan, Akun. Menu Laporan dua jalur: Catat Barang oleh Petugas (02.02) dan Laporan dari Mahasiswa (05.01). Tidak ada tombol plus melayang.
- **Foto:** tepat satu pada form Petugas dan laporan, posisi **di atas Nama Barang**; thumbnail + Ganti Foto/Hapus Foto; Simpan disabled tanpa foto. Asset statis dari ZIP tidak boleh dipakai sebagai bukti foto laporan real.
- **Penerimaan fisik:** laporan mahasiswa PENDING_RECEIPT sebelum barang diserahkan dan diverifikasi Petugas; wajib centang konfirmasi, tidak auto receive.
- **Waktu:** default WIB ketika form dibuka, editable untuk barang lama, tanpa tombol “Gunakan Waktu Saat Ini”; server menentukan inventory code, jangan inject received_at jika schema tidak ada.
- **Guest/Mahasiswa:** shared catalog/detail tanpa duplikasi, guest hanya melihat; hero besar “Barangmu hilang?” hanya Landing desktop, bukan home setelah masuk.
- **Auth/recovery:** desain boleh menampilkan resend cooldown; enforcement anti-spam oleh Neon Auth/backend, jangan menjadikan timer UI sebagai limit keamanan.

## Metode verifikasi tiap layar (bukti, bukan klaim)

1. Tentukan page file, frame/node Figma yang **benar**, viewport target, aset yang muncul. Dapatkan screenshot frame aktual; *screenshot target visual, bukan asset untuk dirender*.
2. Inventaris style tokens dengan `DESIGN_SYSTEM.md` dan layer/slot; jangan copy code generator mentah tanpa memeriksa hierarchy/aset.
3. Implement exact di React dan render screenshot lokal pada **viewport identik**; catat navigasi aktif, hover/disabled/loading, mobile keyboard/safe area.
4. Bandingkan *side-by-side* dan/atau diff visual: alignment, wrapping, ukuran, crop, spacing, font, icon, state. Perbaiki mismatch sebelum gate.
5. Gunakan `VISUAL_REVIEW_TEMPLATE.md`, lalu buat catatan bukti per task (Figma file,node,viewport, screenshot lokal, mismatch, tindakan, reviewer, approval).
6. **Pixel-perfect bukan label otomatis.** Rendering browser/font bisa beda minor; nilai kesesuaian harus berdasarkan pemeriksaan manusia dan sumber Figma aktual. Jika tidak tersedia akses screenshot/font/aset wajib, tandai `BLOCKED`, jangan klaim cocok.

## Prosedur penyimpangan

Bila keputusan desain dan kontrak backend berbenturan, catat: `Figma node`, `perilaku desain`, `API schema`, `dampak`, `opsi tanpa perubahan`, `keputusan pengguna`. Tidak ada keputusan otomatis agent pada konflik.
