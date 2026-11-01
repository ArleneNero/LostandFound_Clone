# PRD — UBL LostnFound Frontend role-first

**Produk:** situs publik barang **ditemukan** (bukan pendaftaran barang hilang dan bukan klaim online). Lokasi operasional awal Pos Pengajaran UBL, struktur backend bisa multi-pos. **Role:** Guest sebagai view publik (tanpa role DB), STUDENT, OFFICER.

## Tujuan phase delivery

1. `F/B`: selesaikan layar Petugas dan interaksi **in-memory mock**: dashboard, inventaris/detail, create item 1 foto, daftar/detil laporan mahasiswa, terima fisik/tolak, perubahan visibility, overdue warning, return/distribute.
2. `F/C`: selesaikan seluruh Guest (landing, home, katalog/detail, pos, panduan) dengan shared data mock; pagination 10, publik hanya STORED&&visible.
3. `F/D`: selesaikan Student (login/register/OTP/recovery, home, found report+photo, riwayat/cancel, profile), katalog shared Guest. Semua masih simulasi sampai API ready.
4. `F/E/F/F`: sambungkan data persist dari backend canonical Neon via Fastify; Neon Auth, R2; 22 endpoint; Figma UI tidak dirombak.
5. `F/G`: validasi pixel fidelity, aksesibilitas, security UX, load protections dan deployment setelah izin.

## Exclusions yang tidak boleh disisipkan

- Tidak ada laporan barang hilang, klaim online, booking pengambilan, pengumpulan KTP/NIK/foto identitas.
- Tidak ada role ADMIN, atau pendaftaran Officer mandiri, pilihan pos kerja Officer di UI produksi.
- Tidak ada backend fiktif di frontend, tidak ada endpoint/field baru tanpa perubahan canonical approved.

## UX/Acceptance

- Exact-Figma: use `FIGMA_EXACT_RULES.md`. Kecocokan visual untuk semua role diuji screenshot 390/1440 dan tablet 768.
- Aset 6 file asli dari ZIP pengguna disertakan dan diverifikasi SHA; aset luar belum dianggap ada.
- Laporan Student PENDING_RECEIPT sampai diverifikasi Petugas; status/history konsisten. Foto report 1 dan inventory 1; foto pos 0-3.
- Guest catalog/detail only visible STORED, 10/page; 404 bila bukan publik.
- Provider auth dan rate-limit anti-spam bukan tanggung jawab browser timer; server-role, upload security dan persistence tested F/F.
