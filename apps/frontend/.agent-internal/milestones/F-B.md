# F/B — Petugas lengkap dahulu (mock in-memory)

**Status:** `COMPLETED` · **Dependensi:** F/A, bukan B/E untuk mock UI · **Area:** `apps/web`.

**Syarat masuk:** baca `AGENTS.md`, `CLEAN_CODE.md`, `FIGMA_EXACT_RULES.md`, `ASSET_MANIFEST.md`, `FOLDER_STRUCTURE.md`, kontrak dan milestone saat ini sebelum perubahan.
**Syarat keluar:** lulus tes+visual relevant, laporan bukti, review pengguna, izin push/pindah fase. Seluruh checkpoint awal masih kosong.

## F/B.1 — Dashboard dan navigasi Petugas

**Figma/sumber:** 02.01/02.01a M/D; 324:138 & 324:141

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/B.1.0` Buat navigasi Petugas sesuai Figma | Dashboard, Inventaris, Laporan, Akun; tidak ada floating (+) | Semua nav benar pada viewport mobile/desktop | `COMPLETED` |
| `F/B.1.1` Bangun dashboard sebagai komposisi kecil | Kartu ringkasan, aktivitas terbaru, quick actions | Jangan monolitik dan angka hardcode per halaman | `COMPLETED` |
| `F/B.1.2` Tulis selector dashboard yang reaktif | Hitung tersedia/diserahkan/menunggu dari store same source | Metrik berubah setelah aksi mutasi mock | `COMPLETED` |
| `F/B.1.3` Buat state loading, kosong, gagal pada dashboard | Mengikuti variasi Figma dan kebutuhan recovery | Tidak ada CTA menembus halaman kosong | `COMPLETED` |
| `F/B.1.4` QA visual frame dashboard | Perbandingan screenshot 390/1440 dan interaksi | Hanya lolos setelah user review dashboard | `COMPLETED` |

**Quality gate `F/B.1`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## F/B.2 — Inventaris Petugas

**Figma/sumber:** 06.01/06.01a/06.02/06.02a

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/B.2.0` Daftar inventaris milik pos aktif | List, search, filter, sort, ringkasan dengan service | Officer tidak dapat memilih pos berbeda pada mode produksi | `COMPLETED` |
| `F/B.2.1` Detail inventaris internal | Tampilkan informasi pos, status, satu foto, riwayat bila tersedia | Tidak membocorkan field privat ke katalog publik | `COMPLETED` |
| `F/B.2.2` Toggle visibilitas katalog | Mock service ubah is_visible tanpa mengubah status STORED | Guest catalog selaras; hidden tidak muncul | `COMPLETED` |
| `F/B.2.3` Peringatan overdue tanpa auto-status | Hitung storage_limit_days per pos hanya sebagai peringatan | Tidak otomatis DISTRIBUTED/RETURNED | `COMPLETED` |
| `F/B.2.4` QA inventaris mobile/desktop | Cek filter 0/1/10/11, error dan akses denied | Bukti screenshot dan test skenario | `COMPLETED` |

**Quality gate `F/B.2`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## F/B.3 — Catat barang langsung oleh Petugas

**Figma/sumber:** 02.M01, 02.02/a/b/c, 02.03; rule foto 324:144 dan WIB 324:150

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/B.3.0` Bangun pemilihan alur pencatatan | Masuk dari menu Laporan: Catat Barang vs Laporan Mahasiswa | Tidak membuat floating plus; route dari navigasi valid | `COMPLETED` |
| `F/B.3.1` Form catat barang persis desain | Urutan foto di atas nama, kategori/lokasi/keterangan/waktu | State foto dipilih/belum adalah 1 halaman, bukan route baru | `COMPLETED` |
| `F/B.3.2` Pakai asset nyata untuk kontrol foto | File browser satu foto; JPG/PNG; 5MiB backend; WebP perlu kebijakan display | Preview/ganti/hapus/revoke URL; tidak buat nama aset | `COMPLETED` |
| `F/B.3.3` Tetapkan default waktu WIB tanpa field API palsu | Tampilkan default lokal, bisa edit sesuai Figma, inventaris code generated | Jangan kirim received_at atau post_id bila tidak ada di OpenAPI | `COMPLETED` |
| `F/B.3.4` Create item in-memory atomik | Service membuat item dan mengubah inventaris + katalog sesuai status | Tidak membuat found_submission palsu | `COMPLETED` |
| `F/B.3.5` QA form dan keberhasilan | Test foto kosong/ukuran berlebih, submit ganda, navigation | Belum ada upload backend pada tahap mock | `COMPLETED` |

**Quality gate `F/B.3`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## F/B.4 — Laporan mahasiswa masuk dan penerimaan fisik

**Figma/sumber:** 05.01–05.06, 324:147

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/B.4.0` Buat menu dua pilihan Laporan Petugas | Catat Barang dan Laporan dari Mahasiswa di satu menu | Sesuai aturan Figma section 324:141 | `COMPLETED` |
| `F/B.4.1` Bangun daftar/detail laporan untuk pos Petugas | Filter 4 status; detail timeline/riwayat | Pending report hanya data relevan assigned post | `COMPLETED` |
| `F/B.4.2` Buat penerimaan fisik | Centang barang fisik hadir, foto inventaris tepat satu, verifikasi | Tidak auto-receive sebelum konfirmasi | `COMPLETED` |
| `F/B.4.3` Buat reject dengan alasan wajib | Trim reason, disabled submit invalid, state berhasil | Riwayat status diperbarui bersama status | `COMPLETED` |
| `F/B.4.4` Uji race/invalid state mock | Double receive/reject, pembatalan sebelumnya, missing photo | Tidak ada 2 item tercipta untuk 1 submission | `COMPLETED` |
| `F/B.4.5` QA visual 05.* responsive | Cek seluruh state figma + success/rejected | Bukti before/after dan user approval | `COMPLETED` |

**Quality gate `F/B.4`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## F/B.5 — Serah terima, distribusi dan gate role Petugas

**Figma/sumber:** 06.03/06.03a, 07.M/D

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/B.5.0` Bangun form pengembalian terverifikasi | Recipient name + verification summary; konfirmasi | Tidak menyimpan KTP, NIK, KTM atau foto identitas | `COMPLETED` |
| `F/B.5.1` Bangun penyaluran sebagai aksi terpisah | Aksi distribute; bukan entitas item_returns | Status DISTRIBUTED dan is_visible=false | `COMPLETED` |
| `F/B.5.2` Cegah duplikasi proses fisik | Return sekali per item; reject invalid transition | Status+return record atomik dalam mock store | `COMPLETED` |
| `F/B.5.3` Uji Petugas end-to-end in-memory | Catat -> inventaris -> visibilitas -> laporan receive/reject -> return | Semua respons nyata dari mock, bukan klaim backend | `COMPLETED` |
| `F/B.5.4` Gate role Petugas menunggu user | Screenshot 390/1440, tes, audit Clean Code, review | JANGAN mulai Guest sebelum user izinkan F/C | `COMPLETED` |

**Quality gate `F/B.5`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## Persetujuan untuk pindah tahap

Selesaikan semua sub-milestone berdasarkan bukti dan review pengguna. **Tidak boleh mulai milestone berikutnya hanya karena task checklist dicentang sendiri.**
