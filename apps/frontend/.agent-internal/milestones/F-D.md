# F/D — Mahasiswa login dan alur lengkap (mock)

**Status:** `PLANNED` · **Dependensi:** F/C COMPLETED + izin pemilik untuk lanjut · **Area:** `apps/web`.

**Syarat masuk:** baca `AGENTS.md`, `CLEAN_CODE.md`, `FIGMA_EXACT_RULES.md`, `ASSET_MANIFEST.md`, `FOLDER_STRUCTURE.md`, kontrak dan milestone saat ini sebelum perubahan.
**Syarat keluar:** lulus tes+visual relevant, laporan bukti, review pengguna, izin push/pindah fase. Seluruh checkpoint awal masih kosong.

## F/D.1 — Login/registrasi Mahasiswa dan otorisasi UI simulasi

**Figma/sumber:** 01.01–01.04; 324:153

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/D.1.0` Buat login Mahasiswa sesuai desain | Masuk memakai UI simulasi, data fiktif | Tidak menyebut mock sebagai keamanan produksi | `PLANNED` |
| `F/D.1.1` Buat registrasi onboarding sesuai Neon Auth v6.2 | Email terverifikasi nanti oleh Neon Auth; nama lengkap dan NIM self-declared | Tidak ada pemilihan role OFFICER | `PLANNED` |
| `F/D.1.2` Buat OTP dan error states Figma | Kode OTP, loading, invalid, resend; hanya state mock | Tidak membuat email/OTP sungguhan sendiri | `PLANNED` |
| `F/D.1.3` Buat guard tampilan role untuk UX | Guest tidak diblokir dari katalog; Student route mock | Akses data sebenarnya tetap server-authoritative | `PLANNED` |
| `F/D.1.4` QA autentikasi visual M/D | Input, focus, aria, keyboard, disabled/error | Bukti 390/1440 dan persetujuan | `PLANNED` |

**Quality gate `F/D.1`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## F/D.2 — Pemulihan sandi dan profil

**Figma/sumber:** 01.05–01.08; 01.P01–P08; 04.P01

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/D.2.0` Bangun recovery entry dan check email states | Halaman sesuai desain dengan tidak mengirim email nyata | UI jujur sebagai simulasi | `PLANNED` |
| `F/D.2.1` Bangun timer/resend state | 60 detik; sesudah permintaan ketiga/keempat 1 jam, maksimum 5/24 jam (desain) | Kebijakan final ditegakkan oleh provider/backend bukan timer frontend | `PLANNED` |
| `F/D.2.2` Bangun reset password success/invalid | Show/hide password, validation, selesai dan kembali login | Jangan simpan password dummy persisten | `PLANNED` |
| `F/D.2.3` Bangun profil Mahasiswa | Tampilkan current profile dari session mock | NIM self-declared dan tidak dibuktikan kampus | `PLANNED` |

**Quality gate `F/D.2`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## F/D.3 — Form laporan barang ditemukan

**Figma/sumber:** 04.01/04.01a/04.02

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/D.3.0` Bangun form pelaporan barang ditemukan | Data persis SubmissionCreateRequest; satu foto | Tidak ada fitur melapor barang hilang | `PLANNED` |
| `F/D.3.1` Upload preview in-memory yang aman | Validasi JPG/PNG UI, ukuran <=5MiB sesuai backend | Revoke object URL dan ganti/hapus foto | `PLANNED` |
| `F/D.3.2` Tunjukkan kewajiban menyerahkan fisik | Status baru PENDING_RECEIPT, bukan RECEIVED | Tidak membuat booking atau klaim online | `PLANNED` |
| `F/D.3.3` Submit laporan mock sekali | Store+history atomik dan success hanya setelah resolve | Tidak ada duplikasi pada double-click | `PLANNED` |
| `F/D.3.4` QA form responsif dan invalid | Kosong, invalid, foto wajib, not-ready | Foto di posisi seperti Figma | `PLANNED` |

**Quality gate `F/D.3`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## F/D.4 — Riwayat, detail dan pembatalan

**Figma/sumber:** 04.03–04.07

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/D.4.0` Bangun daftar laporan milik pengguna | Filter 4 status, pagination, dynamic data | Tidak pernah memperlihatkan laporan user lain | `PLANNED` |
| `F/D.4.1` Bangun detail laporan dan timeline status | PENDING, RECEIVED, REJECTED, CANCELLED dari same store | Alasan penolakan/batal dan state terlihat | `PLANNED` |
| `F/D.4.2` Bangun cancel dengan alasan wajib | Hanya status PENDING_RECEIPT dapat cancel | 409 invalid transition dimodelkan, bukan sukses palsu | `PLANNED` |
| `F/D.4.3` Uji lintas role Mahasiswa-Petugas | Report Student muncul di mock Officer dan status update terbaca di Student | History konsisten, reload reset | `PLANNED` |

**Quality gate `F/D.4`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## F/D.5 — Review keseluruhan Mahasiswa dan gate

**Figma/sumber:** 01.*,04.*,03 shared catalog

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/D.5.0` Uji nav mahasiswa ke katalog shared | Tidak clone katalog atau detail Guest | Guest public tidak perlu login | `PLANNED` |
| `F/D.5.1` Uji offline/error/empty/disabled | Simulasi kesalahan tanpa menyamar jadi HTTP sukses | Error feedback aksesibel | `PLANNED` |
| `F/D.5.2` Uji 390/768/1440 dan login flow | Screenshots dan interaction review | Tidak memakai random gambar pengganti | `PLANNED` |
| `F/D.5.3` Tutup milestone hanya setelah user approval | Laporkan bukti F/B F/C F/D mock roles | Integrasi API berikutnya perlu izin F/E sendiri | `PLANNED` |

**Quality gate `F/D.5`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## Persetujuan untuk pindah tahap

Selesaikan semua sub-milestone berdasarkan bukti dan review pengguna. **Tidak boleh mulai milestone berikutnya hanya karena task checklist dicentang sendiri.**
