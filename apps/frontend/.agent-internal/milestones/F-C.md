# F/C — Guest publik lengkap setelah Petugas (mock)

**Status:** `COMPLETED` · **Dependensi:** F/B COMPLETED + izin pemilik untuk lanjut · **Area:** `apps/web`.

**Syarat masuk:** baca `AGENTS.md`, `CLEAN_CODE.md`, `FIGMA_EXACT_RULES.md`, `ASSET_MANIFEST.md`, `FOLDER_STRUCTURE.md`, kontrak dan milestone saat ini sebelum perubahan.
**Syarat keluar:** lulus tes+visual relevant, laporan bukti, review pengguna, izin push/pindah fase. Seluruh checkpoint awal masih kosong.

## F/C.1 — Landing dan home Guest

**Figma/sumber:** 00.01; 03.P01/a

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/C.1.0` Bangun landing tiga pilihan akses | Guest/Mahasiswa/Petugas sesuai frame; gunakan file aset tersedia | Tidak buat role Guest di DB | `COMPLETED` |
| `F/C.1.1` Pasang ilustrasi landing dari ZIP asli | Gunakan Kotak Barang Hilang dan Ditemukan.png ketika sesuai slot | Path dan crop cocok, tanpa gambar stok | `COMPLETED` |
| `F/C.1.2` Bangun home Guest | Bagian Sedang mencari barangmu? dan item terbaru | Hero besar hanya di Landing desktop, tidak di guest home | `COMPLETED` |
| `F/C.1.3` Bangun shared layout publik | Nav mobile/desktop Guest Student yang nanti dipakai ulang | Tidak duplicate feature logic untuk Student | `COMPLETED` |
| `F/C.1.4` QA landing/home responsif | 390/768/1440 dan asset network | Bukan klaim exact tanpa screenshot comparison | `COMPLETED` |

**Quality gate `F/C.1`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## F/C.2 — Katalog publik dan pagination

**Figma/sumber:** 03.01/a, 07.M/D

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/C.2.0` Bangun CatalogPage bersama | Item cards dan service mock untuk Guest/Student | Satu CatalogPage, tidak copy role student | `COMPLETED` |
| `F/C.2.1` Implement filter-sort-paginate pada mock | Hanya STORED && is_visible; search/category/post/sort; slice 10 | Uji dataset 0/1/10/11/21, reset/clamp page | `COMPLETED` |
| `F/C.2.2` Bangun filter UI sesuai Figma | Search, kategori, lokasi/pos, sort, clear filters | Control dapat diakses keyboard dan mobile | `COMPLETED` |
| `F/C.2.3` Terapkan lazy-load thumbnail | Satu foto item, ukuran terjaga dan loading lazy | DOM maksimal 10 cards/page, no layout shift material | `COMPLETED` |
| `F/C.2.4` QA perubahan lintas role | Item dicatat Petugas tampak atau hidden sesuai is_visible | Guest tak dapat melihat private status | `COMPLETED` |

**Quality gate `F/C.2`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## F/C.3 — Detail barang dan 404

**Figma/sumber:** 03.02/03.02a

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/C.3.0` Bangun shared ItemDetailPage | Detail foto barang, lokasi pos, deskripsi publik | Tidak tampilkan private notes atau pelapor | `COMPLETED` |
| `F/C.3.1` Implement 404 untuk hidden/non-STORED | Mock service menyamakan perilaku API public GET | Tidak fallback ke officer inventory | `COMPLETED` |
| `F/C.3.2` Bangun empty/loading/not-found/error states | Skeleton, placeholder foto hanya jika sah, CTA kembali | Tidak invent asset untuk gambar hilang | `COMPLETED` |
| `F/C.3.3` Uji back/forward dan deep-links | Refresh dan direct navigation ke detail | SPA fallback dipersiapkan deployment | `COMPLETED` |

**Quality gate `F/C.3`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## F/C.4 — Info pos, panduan dan gate Guest

**Figma/sumber:** 03.P03–03.P05

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/C.4.0` Bangun halaman daftar dan detail pos | Alamat, jam pelayanan dari service/data bukan tebakan | Tidak mengarang jam/lokasi riil | `COMPLETED` |
| `F/C.4.1` Bangun galeri foto pos | 0–3 foto posisi 1 cover; tidak sama item photos | Jika bytes galeri tidak tersedia, empty state jujur | `COMPLETED` |
| `F/C.4.2` Bangun pickup guide | Instruksi datang fisik, tanpa form klaim online | Tidak menambahkan booking/online claim | `COMPLETED` |
| `F/C.4.3` Uji Guest end-to-end mock | Landing -> katalog -> detail -> pos -> panduan | Test visual M/D dan tidak ada dead-end | `COMPLETED` |
| `F/C.4.4` Gate role Guest menunggu user | Bandingkan Figma, audit clean code, bukti uji | JANGAN mulai Mahasiswa sebelum user izinkan F/D | `COMPLETED` |

**Quality gate `F/C.4`:** Clean Code source wajib sudah dibaca; tes sesuai scope PASS/FAIL/NOT RUN dengan alasan; cek 390/1440; asset manifest; count LOC; satu local commit (bila ada kode), **tanpa auto-push**.

## Persetujuan untuk pindah tahap

Selesaikan semua sub-milestone berdasarkan bukti dan review pengguna. **Tidak boleh mulai milestone berikutnya hanya karena task checklist dicentang sendiri.**
