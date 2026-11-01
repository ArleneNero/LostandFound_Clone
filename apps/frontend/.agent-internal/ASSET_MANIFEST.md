# ASSET_MANIFEST — HANYA 6 BERKAS DARI ZIP TERBARU

**SUMBER FISIK DIVERIFIKASI:** `Aset_Image_LostnFound(3).zip` (diserahkan pengguna). Enam file di bawah **benar-benar disertakan bytes-nya** di `apps/web/public/` paket ini. Nama/kapitalisasi/spasi **dipertahankan persis**. Jangan hapus, rename, resize, convert, edit, atau menambah aset pengganti tanpa izin.

| Nama asli di ZIP | Path wajib relatif `apps/web/public/` | Bytes | Tipe / dimensi | SHA-256 |
|---|---|---:|---|---|
| `favicon.svg` | `favicon.svg` | 1,745 | SVG vector | `000cc9c6e1256ee146d261f6732e37a032d487c86783e8dd1327f5e28ea39968` |
| `Logo_LostnFound.png` | `assets/branding/Logo_LostnFound.png` | 71,953 | PNG 1024x1024 | `03001a3f8cc6e8b539033aa370ab5654016fc3ffdec8a062d77eddcf7e33eaa0` |
| `Icon_Mahasiswa.png` | `assets/illustrations/roles/Icon_Mahasiswa.png` | 1,581,923 | PNG 1254x1254 | `aee7a237aa6653908fbdd2cb30a9f9f62976114b2b1ea51449bf9a0ba2e4502c` |
| `Icon_Petugas.png` | `assets/illustrations/roles/Icon_Petugas.png` | 1,560,245 | PNG 1254x1254 | `14aca5b0baec4c7cf3e0f230fa30b09484e55c6429326ed2104068bc536b4d1f` |
| `Ikon Pesawat dan Gembok 3D.png` | `assets/illustrations/authentication/Ikon Pesawat dan Gembok 3D.png` | 1,300,868 | PNG 1254x1254 | `d16ed1f3a207d27fb1d82e3087b250846c2cb5f8d0f051e9e7ebc35669a89241` |
| `Kotak Barang Hilang dan Ditemukan.png` | `assets/illustrations/landing/Kotak Barang Hilang dan Ditemukan.png` | 1,486,559 | PNG 1713x918 | `f027f5436830786a924d0ff8e47536eebfe575176ee5e5925f1af8d4aba90f90` |

## Aturan wajib untuk AI coding

- Gunakan path **tepat** seperti tabel; casing path sensitif ketika deployment Linux. Uji asset existence, 200 status, dan visual slot/crop di browser.
- Aset ZIP adalah **aset identitas/ilustrasi lokal**, bukan konten data inventaris. Penggunaan pada layar disesuaikan referensi Figma; jangan memaksa ikon yang bukan bagian layar.
- Figma memuat foto contoh barang/galeri pos dan artwork lain yang **tidak ada di ZIP ini**. Jangan menciptakan `airpods.png`, `foto-pos.jpg`, `ubl-logo.png` atau sejenisnya. Minta export resmi dan verifikasi nama/byte; bila belum tersedia, tampilkan empty state eksplisit tanpa broken image.
- Gunakan Figma `get_design_context` untuk slot/layer, bukan mengandalkan asumsi desain. Jangan hotlink URL sementara `figma.com/api/mcp/asset/` di source produksi.
- Satu foto pada form laporan, satu foto inventaris pada API; galeri layanan post 0–3 dari API. Foto upload R2 **bukan** aset statis ini.
- Dilarang menebak warna aset, mengganti identitas brand dengan Lucide, stok gambar, emoji/AI image, atau membuat ilustrasi lain jika tidak disetujui.

## Verifikasi tersedia

`python apps/web/.agent-internal/tools/verify_assets.py` dari root monorepo. Script memverifikasi SHA-256 enam file dan aman dijalankan tanpa npm.
