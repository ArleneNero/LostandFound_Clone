# Blueprint Frontend — salinan sumber ERD v6.2

> Transkripsi tekstual dari dokumen sumber `CampusFind_Blueprint_Frontend_Final_ERD_v6_2(1).docx`; tabel dipertahankan. Dokumen ini mencerminkan fase frontend-only lama. Jika berbeda dengan snapshot OpenAPI/DBML backend terbaru, gunakan ketetapan pada `../BACKEND_SYNC.md` dan hentikan implementasi bagian yang belum diputuskan.

SPESIFIKASI TEKNIS • FRONTEND ONLY

UBL LostnFound

Arsitektur folder, pemetaan Figma Page 05, inventaris aset, UX states, dan pagination katalog

| Batasan | Ketetapan proyek |
| --- | --- |
| Cakupan | Murni frontend; React, TypeScript, Vite, Tailwind CSS; seluruh alur menggunakan data in-memory. |
| Desain acuan | Figma Page 05 — Role-Based Views (Petugas, Guest, Mahasiswa; mobile/desktop serta 07.M dan 07.D). |
| Prioritas pengerjaan | Fondasi → Petugas dashboard/inventaris/catat barang → Guest → operasional Petugas → Mahasiswa. |
| Pagination katalog | 10 kartu barang/foto maksimum per halaman aktif, sesudah filter + sort; lazy-load gambar. |
| Bukan keluaran | Tidak berisi source code jadi, tidak membangun backend, database, API, atau storage permanen. |

Versi dokumen: 16 Oktober 2026 | Status: Blueprint implementasi untuk tim

## 1. Ruang Lingkup dan Aturan Arsitektur

| Aturan | Keputusan | Implikasi untuk tim |
| --- | --- | --- |
| Frontend-only | Tidak ada server, Supabase, SQL, REST API, penyimpanan permanen, maupun upload server. | Semua operasi data melalui service in-memory; reload mengembalikan fixture awal. |
| Satu basis React | Petugas, Guest, Mahasiswa berada dalam satu project Vite. | Jangan membangun tiga project frontend terpisah. |
| Responsive design | M \| dan D \| di Page 05 adalah keadaan mobile/desktop dari fungsi yang sama. | Satu page React dengan layout responsif; jangan menggandakan source mobile/desktop. |
| Reusability | Katalog, detail barang, pos dan panduan dipakai Guest dan Mahasiswa. | Fitur bersama dalam discovery/; role-specific cukup pada guest/, student/, officer/. |
| Backend-ready | UI berkomunikasi melalui kontrak layanan. | Nanti backend menambahkan adapter API dan pengujian; tidak menjanjikan integrasi tanpa perubahan sama sekali. |
| Perubahan data | Satu application store in-memory dengan subscription/render-reactive. | Inventaris Petugas dan katalog Guest melihat sumber data yang sama. |
| Aset | Jangan rename enam file dari ZIP; gunakan path persis; kosongkan nama file yang belum ada. | Semua kebutuhan ekspor Figma ditandai belum tersedia hingga file nyata diverifikasi. |
| Hak akses | Guest public; role Officer/Student hanya simulasi UI. | Guard frontend bukan autentikasi/otorisasi keamanan nyata. |
| Kepatuhan dua dokumen | AI wajib membaca Blueprint dan Ketentuan Clean Code sebelum mengerjakan modul; keduanya berlaku bersama. | Blueprint: apa/di mana. Clean Code: bagaimana/ukuran/quality gate. Konflik tidak diselesaikan diam-diam. |

## 2. Tech Stack Frontend dan Versi Baseline

Versi di bawah adalah baseline paket npm yang dipilih untuk dicatat dalam package-lock.json. Kunci versi saat tim mulai implementasi dan cek kompatibilitas dependency, terutama TypeScript 7 dan React Router 8.

| Teknologi | Versi baseline | Peran |
| --- | --- | --- |
| React | 19.3.1 | UI component dan state; dependencies |
| react-dom | 19.3.1 | Renderer DOM; harus selaras dengan React |
| TypeScript | 7.0.2 | Static typing dan pemeriksaan build; devDependency |
| Vite | 8.3.4 | Development server + build; devDependency |
| Tailwind CSS | 4.3.3 | Styling utility-first responsif; devDependency |
| @tailwindcss/vite | 4.3.3 | Integrasi Tailwind 4 ke Vite; devDependency |
| @vitejs/plugin-react | 6.1.2 | JSX + Fast Refresh; devDependency |
| React Router | 8.4.0 | Routing SPA; package react-router |
| Lucide React | 1.57.0 | Ikon vektor UI; tidak menggantikan aset branding asli |
| React Hook Form | 7.90.0 | Form/validasi interaktif; opsional namun direkomendasikan |
| @hookform/resolvers | 5.2.2 | Integrasi schema form; gunakan bersama validator |
| Vitest | 5.0.5 | Unit/integration test; devDependency |
| @testing-library/react | 16.3.3 | Test komponen React; perlu @testing-library/dom |
| @playwright/test | 1.64.1 | Uji end-to-end browser; devDependency |
| Node.js | 24.x LTS* | Hanya runtime pengembangan/build di komputer anggota; BUKAN backend |
| npm | Sesuai Node.js | Package manager; simpan package-lock.json agar reproducible |

* Rekomendasi Node.js 24.x LTS adalah kebijakan toolchain tim, bukan hasil pemeriksaan package yang terpasang. Uji ulang dukungan engine saat instalasi. Untuk validator schema seperti Zod, tentukan dan kunci patch version setelah uji kompatibilitas; jangan menebak versi hanya demi mengisi tabel.

## 3. Inventaris Aset Terverifikasi — ZIP yang Diupload

| Nama asli (tidak diubah) | Lokasi frontend | Ukuran ZIP dan kegunaan |
| --- | --- | --- |
| favicon.svg | public/favicon.svg | 2 KB. Favicon tab dan bookmark (vektor; bukan PNG tersisip). |
| Logo_LostnFound.png | public/assets/branding/Logo_LostnFound.png | 70 KB. Simbol/identitas aplikasi pada landing/header. |
| Icon_Mahasiswa.png | public/assets/illustrations/roles/Icon_Mahasiswa.png | 1,545 KB. Kartu role Mahasiswa pada Landing. |
| Icon_Petugas.png | public/assets/illustrations/roles/Icon_Petugas.png | 1,524 KB. Kartu role Petugas pada Landing. |
| Ikon Pesawat dan Gembok 3D.png | public/assets/illustrations/authentication/Ikon Pesawat dan Gembok 3D.png | 1,270 KB. Ilustrasi pendukung autentikasi/reset password. |
| Kotak Barang Hilang dan Ditemukan.png | public/assets/illustrations/landing/Kotak Barang Hilang dan Ditemukan.png | 1,452 KB. Artwork hero Landing; tidak diulang di beranda desktop. |

## 4. Aset yang Belum Tersedia sebagai File Eksternal

| Kebutuhan Figma | Status | Instruksi |
| --- | --- | --- |
| Logo resmi Universitas Budi Luhur | Tidak ditemukan dalam ZIP ini | Jangan tulis ubl-logo.png dalam tree seolah file tersedia; ekspor/unggah resmi dulu. |
| Foto barang: AirPods, dompet, kunci, tas | Terlihat pada katalog/detail desain Figma | Ekspor image fill dari Figma atau masukkan data foto yang benar-benar tersedia; verifikasi nama/file baru. |
| Foto pos pelayanan dan galeri | Ada area visual terkait pada Figma | Ekspor aset terpisah sebelum menggantungkan kode pada path tertentu. |
| Ikon kecil lain | Ada yang berupa vector/icon komponen Figma | Utamakan Lucide untuk ikon generik; ekspor hanya icon khas desain yang tidak tersedia sebagai komponen. |

## 5. Blueprint Struktur Folder: Fondasi dan UI Bersama

### 5.1 Root, konfigurasi, dan entry HTML

| File / folder (relatif ke Frontend/) | Tanggung jawab teknis | Relasi Figma / catatan |
| --- | --- | --- |
| index.html | Dokumen HTML root untuk Vite, lang=id, title, favicon, meta viewport. | Memanggil /favicon.svg; bukan komponen React. |
| package.json | Dependencies, devDependencies dan skrip dev/build/test/lint. | Versi baseline di tabel 2. |
| package-lock.json | Lock dependensi yang dihasilkan npm dan dikomit. | Jangan diisi manual. |
| vite.config.ts | Konfigurasi Vite React plugin dan Tailwind v4. | Frontend dev + build; tanpa proxy/backend. |
| tsconfig.json, tsconfig.app.json, tsconfig.node.json | Konfigurasi TS 7 ketat untuk app/tooling. | Alias path konsisten; uji TypeScript 7. |
| eslint.config.js; .editorconfig; .gitignore | Standar lint, editor, dan pengecualian file sensitif/build. | Lint sederhana sebelum merge. |
| README.md | Cara install, menjalankan, role demo, urutan fase. | Untuk semua anggota; tidak mencantumkan credential asli. |
| public/ | Aset statis yang diakses melalui URL publik. | Hanya enam berkas yang sudah diverifikasi tersedia. |
| src/main.tsx | Bootstrap React dan AppProviders. | Entry aplikasi SPA. |
| src/styles/globals.css | Reset/base, impor Tailwind 4 dan gaya umum. | Tidak duplikasi CSS per screen. |
| src/styles/tokens.css | Design tokens dari Figma: tipografi, warna, radius, spacing. | Tetapkan berdasarkan pengukuran Figma. |
| .prettierrc.json; CHANGELOG.md | Aturan formatter dan log perubahan per milestone/fitur. | Perkuat konsistensi antaranggota dan jejak audit revisi. |

### 5.2 App shell, route, providers

| File / folder (relatif ke Frontend/) | Tanggung jawab teknis | Relasi Figma / catatan |
| --- | --- | --- |
| src/app/App.tsx | Root aplikasi: rendering Router dan layout global. | Tidak berisi logika bisnis. |
| src/app/mainRouter.tsx | Konfigurasi route public, officer, student. | Rute dideskripsikan di Bab 9. |
| src/app/routePaths.ts | Konstanta URL agar tidak hardcode per tombol. | Tautan konsisten. |
| src/app/AppProviders.tsx | Registrasi data/session providers satu kali. | Satu sumber data antar-role. |
| src/app/guards/RoleRoute.tsx | Proteksi tampilan berdasarkan role in-memory. | Hanya simulasi; bukan security. |
| src/app/guards/PublicRoute.tsx | Menentukan akses landing dan halaman publik. | Guest tidak perlu login. |
| src/state/ApplicationDataProvider.tsx | Menyediakan perubahan store secara reaktif. | Subscriber/rerender UI ketika item diubah. |
| src/state/SessionProvider.tsx | Sesi simulasi dan pergantian role. | Reset pada reload; bukan auth sesungguhnya. |
| src/state/useApplicationData.ts; useSession.ts | Hooks akses context yang aman. | Dipanggil layer pages/hooks. |

### 5.3 Reusable UI primitives

| File / folder (relatif ke Frontend/) | Tanggung jawab teknis | Relasi Figma / catatan |
| --- | --- | --- |
| src/components/ui/Button.tsx | Tombol: primary, secondary, disabled, busy. | UX 07.M/07.D; keyboard accessible. |
| src/components/ui/Input.tsx | Input teks dengan label, error dan aria-invalid. | Form Petugas/Mahasiswa. |
| src/components/ui/Textarea.tsx; Select.tsx | Kolom alasan/keterangan dan selector kategori/pos. | Validasi wajib. |
| src/components/ui/SearchField.tsx | Input pencarian reusable + clear. | Guest/Student katalog, Petugas inventaris. |
| src/components/ui/StatusBadge.tsx; StatusFilter.tsx | Badge status; empat filter Menunggu/Diterima/Ditolak/Dibatalkan. | Filter di semua laporan mengikuti Figma. |
| src/components/ui/Modal.tsx; ConfirmDialog.tsx | Dialog dan focus management untuk konfirmasi berisiko. | Batal, tolak, serah terima. |
| src/components/ui/PhotoPicker.tsx; PhotoPreview.tsx | Pilih file lokal dan tampilkan/ganti/hapus preview tanpa upload. | P3, M laporan, penerimaan fisik. |
| src/components/ui/Skeleton.tsx; LoadingIndicator.tsx | Loading visual/focus handling; placeholder konsisten. | 07.M dan 07.D loading. |
| src/components/ui/EmptyState.tsx; ErrorMessage.tsx | Tidak ada hasil dan validasi form. | 07.M dan 07.D empty/error. |
| src/components/ui/Tabs.tsx; Toast.tsx | Pengalih tab dan pemberitahuan singkat. | Jangan jadi data store. |
| src/components/ui/PageHeading.tsx; Pagination.tsx | Judul konsisten dan kontrol pagination keyboard-accessible. | Pagination katalog 10 item. |
| src/components/ui/Icon.tsx | Wrapper ikon Lucide untuk ukuran/warna. | Logo aplikasi tetap dari ZIP. |

### 5.4 Layout responsif

| File / folder (relatif ke Frontend/) | Tanggung jawab teknis | Relasi Figma / catatan |
| --- | --- | --- |
| src/components/layout/LandingLayout.tsx | Layout 00.01, hero + kartu role. | Banner besar hanya di Landing. |
| src/components/layout/GuestLayout.tsx | Nav Guest, footer, konten publik. | Home langsung Sedang mencari barangmu?. |
| src/components/layout/StudentLayout.tsx | Nav dan akun Mahasiswa. | Public discovery dipakai ulang. |
| src/components/layout/OfficerLayout.tsx | Nav/dashboard Petugas dan sidebar desktop. | Role-specific management. |
| src/components/layout/AppHeader.tsx | Logo dan area header lintas-role. | Logo_LostnFound.png. |
| src/components/layout/DesktopNavigation.tsx | Menu horizontal Desktop: beranda, katalog, lapor, pos. | D \| Page 05. |
| src/components/layout/DesktopSidebar.tsx | Sidebar Petugas layar lebar. | D \| Petugas. |
| src/components/layout/MobileBottomNavigation.tsx | Bottom nav mobile Guest/Student; variant bila relevan. | M \| Page 05. |
| src/components/layout/PageContainer.tsx | Max width, gap, safe area scroll. | M/D satu codebase. |

### 5.5 Batas kepemilikan kode dan ukuran file (wajib untuk AI)

AI coding wajib membaca dua dokumen sebelum implementasi. Target ukuran sesuai Ketentuan Clean Code §4.1: fungsi ±20 baris (materi dosen), UI ≤80, Page ≤150, hook/selector/validator ≤100, service ≤200 (kebijakan tim). File >300 baris memerlukan review dan persetujuan tertulis sebelum merge. Tidak ada pembatasan total baris per modul; kualitas ditentukan oleh pemisahan tanggung jawab, bukan jumlah file semata.

| Area modul | Tanggung jawab kode / penempatan | Yang harus dihindari |
| --- | --- | --- |
| App/route | App.tsx + mainRouter.tsx hanya shell, routes, provider. | Jangan menaruh seluruh UI atau mutasi data di App.tsx. |
| Dashboard Petugas | OfficerDashboardPage.tsx komposisi; kartu/aksi/aktivitas di components; useDashboardData untuk koneksi state; dashboardSelectors untuk agregasi. | Jangan menghitung angka dummy berbeda di Page atau membuat hook ratusan baris. |
| Inventaris | InventoryPage.tsx komposisi; InventoryFilters.tsx untuk kontrol; useInventoryFilters.ts untuk input state; inventorySelectors.ts untuk filtering data. | Jangan mengubah fixture/barang langsung dalam event handler tombol. |
| Pencatatan barang | ItemRegistrationPage.tsx komposisi; ItemRegistrationForm.tsx + bidang foto/kategori/pos; validation schema; hook operasi ItemService. | Jangan menggabung parsing foto, validasi, JSX panjang, dan mutasi store di satu file. |
| Laporan & penerimaan | OfficerReportsPage.tsx daftar; form reject/receipt terpisah; reportSelectors.ts dan FoundReportService untuk status/riwayat. | Jangan duplikasi status transisi antara Petugas dan Mahasiswa. |
| Guest & Mahasiswa | GuestHomePage.tsx/StudentHomePage.tsx khusus role; discovery/catalog/ bersama untuk katalog/detail, pos, panduan. | Jangan copy-paste halaman CatalogPage.tsx untuk setiap role. |
| Katalog & pagination | CatalogPage.tsx layout; useCatalogFilters.ts state filter; catalogSelectors.ts pipeline filter–sort–slice; Pagination.tsx kontrol; constants/pagination.ts berisi 10. | Jangan render semua item lalu sembunyikan CSS, dan jangan hardcode angka 10 berulang. |
| Auth & pemulihan | Pages untuk state berbeda; form input/UI di components; useAuthentication.ts orkestrasi sesi; InMemoryAuthService untuk simulasi. | Jangan menjalankan seluruh OTP/timer/validasi/login dalam satu page. |

Aturan pengecualian: ketika target terlampaui, AI wajib memeriksa kohesi, menampilkan daftar file beserta jumlah baris, menyebutkan alternatif ekstraksi dan pengujian, lalu meminta persetujuan untuk file >300 baris. Jangan membuat file kosong/abstraksi tambahan tanpa kebutuhan. Folder/file dibuat bertahap mengikuti fase, bukan serentak.

## 6. Blueprint Struktur Folder: Fitur sesuai Role di Page 05

### 6.1 Petugas: dashboard dan inventaris

| File / folder (relatif ke Frontend/) | Tanggung jawab teknis | Relasi Figma / catatan |
| --- | --- | --- |
| src/features/officer/dashboard/pages/OfficerDashboardPage.tsx | Dashboard kartu statistik, aktivitas, aksi cepat. | 02.01 + 02.01a M/D. |
| .../dashboard/components/DashboardStatCard.tsx | Kartu jumlah barang/laporan berbasis selector. | Bukan angka dummy terpisah. |
| .../dashboard/components/DashboardQuickAction.tsx | Menu menuju inventaris, catat, laporan. | D/M 02.01. |
| .../dashboard/components/RecentActivityList.tsx | Ringkasan perubahan data pada store. | Riwayat status. |
| .../dashboard/hooks/useDashboardData.ts | Menggabung state dan selector statistik. | In-memory subscription. |
| src/features/officer/inventory/pages/InventoryPage.tsx | Daftar inventaris, search, filter, pagination opsional. | 06.01 + 06.01a. |
| .../inventory/pages/InventoryDetailPage.tsx | Detail barang dan status internal. | 06.02 + 06.02a. |
| .../inventory/components/InventoryCard.tsx | Kartu inventaris pos. | Gunakan foto di store (file/blob preview). |
| .../inventory/components/InventoryFilters.tsx | Filter pos, kategori, status, pencarian. | Cermin 06.01. |
| .../inventory/components/InventoryDetailPanel.tsx | Atribut barang dan tindakan. | 06.02. |
| .../inventory/hooks/useInventoryFilters.ts | State UI filter tanpa akses fixture langsung. | Reset pagination saat filter berubah. |

### 6.2 Petugas: pencatatan barang

| File / folder (relatif ke Frontend/) | Tanggung jawab teknis | Relasi Figma / catatan |
| --- | --- | --- |
| src/features/officer/item-registration/pages/ItemTypeSelectionPage.tsx | Pilih alur pencatatan. | 02.M01. |
| .../item-registration/pages/ItemRegistrationPage.tsx | Form baru, scroll, keadaan foto belum/sudah dipilih. | 02.02 / a / b / c = satu page. |
| .../item-registration/pages/RegistrationSuccessPage.tsx | Konfirmasi hasil pencatatan. | 02.03. |
| .../item-registration/components/ItemRegistrationForm.tsx | Nama/kategori/lokasi/keterangan/waktu. | Form sesuai Figma. |
| .../item-registration/components/ItemCategoryField.tsx | Kategori valid dan state terpilih. | Photo/Category specimens. |
| .../item-registration/components/ItemPhotoField.tsx | Pilih satu foto wajib; preview/ganti/hapus. | 07.M/07.D Foto wajib Petugas. |
| .../item-registration/components/ServicePostField.tsx | Menentukan pos pemegang barang. | servicePosts fixture. |
| .../item-registration/hooks/useItemRegistration.ts | Validasi lalu kirim perintah ke ItemService. | P3: barang muncul di inventaris/katalog. |

### 6.3 Petugas: laporan dan serah terima

| File / folder (relatif ke Frontend/) | Tanggung jawab teknis | Relasi Figma / catatan |
| --- | --- | --- |
| src/features/officer/report-management/pages/OfficerReportsPage.tsx | Daftar, pencarian, status filter empat kategori. | 05.01. |
| .../report-management/pages/OfficerReportDetailPage.tsx | Rincian laporan dan history. | 05.02. |
| .../report-management/pages/ReceiveItemPage.tsx | Konfirmasi penerimaan fisik + foto wajib. | 05.03/a/b. |
| .../report-management/pages/ReceiveItemSuccessPage.tsx | Hasil barang diterima dari mahasiswa. | 05.04. |
| .../report-management/pages/RejectReportPage.tsx | Form alasan wajib; sebelum/sesudah terisi. | 05.05 + 05.05b. |
| .../report-management/pages/ReportRejectedPage.tsx | Hasil status laporan REJECTED. | 05.06. |
| .../report-management/components/OfficerReportCard.tsx | Kartu data laporan dalam antrian. | 05.01. |
| .../report-management/components/ReportStatusFilter.tsx | Empat status satu baris sesuai lebar layar. | Menunggu/Diterima/Ditolak/Dibatalkan. |
| .../report-management/components/PhysicalReceiptForm.tsx | Validasi foto, hasil penerimaan, metadata pos. | 05.03b. |
| .../report-management/components/RejectReasonForm.tsx | Textarea alasan wajib dan disabled state. | 05.05. |
| .../report-management/hooks/useReportManagement.ts | Aksi receive/reject/cancel melalui kontrak. | Mutasi atomik store + history. |
| src/features/officer/handover/pages/HandoverPage.tsx | Penyerahan barang yang sudah dicatat. | 06.03 + 06.03a. |
| .../handover/components/HandoverForm.tsx | Identitas penerima dan pemeriksaan klaim. | Aturan serah terima. |
| .../handover/components/HandoverConfirmation.tsx | Dialog konfirmasi sebelum penyerahan. | 07.M/07.D konfirmasi. |
| .../handover/hooks/useHandover.ts | Mencatat serah terima dalam store. | Item -> RETURNED_TO_OWNER. |

### 6.4 Guest dan fitur publik bersama

| File / folder (relatif ke Frontend/) | Tanggung jawab teknis | Relasi Figma / catatan |
| --- | --- | --- |
| src/features/landing/pages/LandingPage.tsx | Pilihan akses Mahasiswa/Petugas/Guest. | 00.01 M/D. |
| .../landing/components/LandingHero.tsx | Teks Barangmu hilang? + gambar box resmi. | Hero Desktop hanya di Landing. |
| .../landing/components/RoleSelection.tsx; RoleSelectionCard.tsx | Tiga pilihan role berdasarkan gambar dari ZIP. | Icon_Mahasiswa.png, Icon_Petugas.png. |
| src/features/guest/home/pages/GuestHomePage.tsx | Halaman Guest setelah masuk. | 03.P01 + lanjutan. |
| .../guest/home/components/GuestSearchSection.tsx | Sedang mencari barangmu?, input pencarian. | Tanpa banner di beranda Desktop. |
| .../guest/home/components/LatestFoundItems.tsx | Item terbaru yang terpublikasi. | Baca ItemService; tidak fixture langsung. |
| src/features/discovery/catalog/pages/CatalogPage.tsx | Katalog publik, filters, pagination 10. | 03.01 + lanjutan; Guest & Student. |
| .../discovery/catalog/pages/ItemDetailPage.tsx | Detail item dari katalog. | 03.02 + lanjutan. |
| .../catalog/components/CatalogItemCard.tsx | Kartu gambar, nama, pos, tanggal. | Lazy-load gambar per kartu aktif. |
| .../catalog/components/CatalogSearchBar.tsx | Pencarian item publik. | Jika diubah, reset page 1. |
| .../catalog/components/CatalogCategoryFilter.tsx | Filter kategori. | 07.M/07.D filter. |
| .../catalog/components/CatalogPostFilter.tsx | Filter pos pelayanan. | 07.M/07.D filter. |
| .../catalog/components/CatalogSortControl.tsx | Pilihan terbaru/terlama. | 07.M/07.D urutan. |
| .../catalog/components/CatalogSkeleton.tsx | 10 placeholder maksimum saat memuat halaman. | 07.M/07.D skeleton. |
| .../catalog/components/CatalogEmptyState.tsx | Zero results, clear filter. | 07.M/07.D empty. |
| .../catalog/hooks/useCatalogFilters.ts | Pipeline filter + sort + page state, bukan fetch. | PAGINATION: 10/baris data halaman. |
| src/features/discovery/service-posts/pages/ServicePostsPage.tsx | Daftar pos pelayanan. | 03.P03 + lanjutan. |
| .../service-posts/pages/ServicePostDetailPage.tsx | Detail pos pelayanan. | 03.P04 + lanjutan. |
| .../service-posts/components/ServicePostCard.tsx | Kartu pos dan lokasi. | Butuh foto ekspor bila di Figma. |
| .../service-posts/components/ServicePostGallery.tsx | Galeri foto pos. | Tampilkan 0–3 foto berdasarkan position; posisi 1 sebagai cover. Gunakan fixture service_post_photos yang terhubung ke pos. Foto asli dari Figma hanya dipakai jika aset telah tersedia. |
| src/features/discovery/pickup-guide/pages/PickupGuidePage.tsx | Panduan pengambilan untuk publik. | 03.P05 + lanjutan. |

### 6.5 Mahasiswa dan autentikasi

| File / folder (relatif ke Frontend/) | Tanggung jawab teknis | Relasi Figma / catatan |
| --- | --- | --- |
| src/features/student/home/pages/StudentHomePage.tsx | Beranda logged-in; discovery reused. | 03.P02 + lanjutan. |
| src/features/student/found-reports/pages/CreateReportPage.tsx | Form pelaporan barang ditemukan. | 04.01 + lanjutan. |
| .../found-reports/pages/ReportConfirmationPage.tsx | Konfirmasi pengiriman laporan. | 04.02. |
| .../found-reports/pages/MyReportsPage.tsx | Riwayat laporan mahasiswa dan status filter. | 04.03. |
| .../found-reports/pages/MyReportDetailPage.tsx | Detail/status; menangani batal/ditolak. | 04.04/a, 04.06, 04.07. |
| .../found-reports/pages/CancelReportPage.tsx | Alasan wajib sebelum batalkan. | 04.05 + 04.05b. |
| .../found-reports/components/FoundReportForm.tsx | Keterangan, kategori, lokasi, dan tepat 1 foto wajib untuk laporan barang ditemukan. | Error — Validasi Form. |
| .../found-reports/components/MyReportCard.tsx | Ringkasan laporan dalam riwayat. | 04.03. |
| .../found-reports/components/CancellationReasonForm.tsx | Textarea alasan dan disabled submit. | 04.05. |
| .../found-reports/components/ReportStatusTimeline.tsx | Status history/reasons. | 04.04/06/07. |
| .../found-reports/hooks/useCreateReport.ts; useMyReports.ts | Submit, cancel, filter by current user. | Service kontrak bersama Petugas. |
| src/features/student/profile/pages/StudentProfilePage.tsx | Akun Mahasiswa, navigasi, data simulasi. | 04.P01. |
| src/features/auth/pages/StudentLoginPage.tsx | Login simulasi mahasiswa. | 01.01. |
| .../auth/pages/OfficerLoginPage.tsx | Login simulasi Petugas. | 01.04. |
| .../auth/pages/StudentRegisterPage.tsx | Registrasi simulasi mahasiswa. | 01.02. |
| .../auth/pages/VerifyOtpPage.tsx | OTP dan pesan validasi. | 01.03. |
| .../auth/pages/ForgotPasswordPage.tsx | Mulai pemulihan akun student/officer. | 01.05 / 01.P01. |
| .../auth/pages/CheckEmailPage.tsx | Jeda 60 detik, 1 jam, 24 jam; siap kirim ulang. | 01.06A/B/C dan 01.P02/P05-08. |
| .../auth/pages/ResetPasswordPage.tsx | Kata sandi baru dan validasi. | 01.07 / 01.P03. |
| .../auth/pages/PasswordChangedPage.tsx | Keadaan selesai pemulihan. | 01.08 / 01.P04. |
| .../auth/components/LoginForm.tsx; RegisterForm.tsx | Form reusable per-role. | OTP/login hanya simulasi. |
| .../auth/components/OtpInput.tsx; ResendCountdown.tsx | Input OTP dan timer/state kirim ulang. | M/D sesuai state. |
| .../auth/components/PasswordField.tsx | Show/hide password dan validasi. | Bentuk sesuai Figma. |
| .../auth/hooks/useAuthentication.ts | Login/logout, pemulihan, role in-memory. | Tidak menyimpan password nyata. |

## 7. Data, Kontrak, Validation, Utility, dan Testing

### 7.1 Data dan kontrak layanan

| File / folder (relatif ke Frontend/) | Tanggung jawab teknis | Relasi Figma / catatan |
| --- | --- | --- |
| src/services/contracts/AuthService.ts | Kontrak login simulasi dan identitas role. | Nanti adapter Auth API. |
| src/services/contracts/ItemService.ts | List/detail/create/updateVisibility/distribute item; publik hanya STORED & is_visible. | Petugas dan discovery memakai satu kontrak. |
| src/services/contracts/FoundReportService.ts | Submit/list/detail/cancel/reject/receive + history. | Student ↔ Officer. |
| src/services/contracts/ServicePostService.ts | List/detail pos. | Dipakai Guest/Student/Officer. |
| src/services/contracts/ItemReturnService.ts | Kontrak proses pengembalian barang kepada pemilik; catatan domain item_returns. | Status item RETURNED_TO_OWNER. |
| src/services/in-memory/InMemory*Service.ts (5 file) | Implementasi satu file untuk tiap contract di atas. | Tanpa server/API; operasi terhadap store. |
| src/services/serviceRegistry.ts | Pemilihan implementasi service (sekarang in-memory). | Nanti registrasi adapter HTTP. |
| src/data/fixtures/users.ts; servicePosts.ts | Akun demo dan pos layanan awal. | Tidak berisi kredensial sensitif. |
| src/data/fixtures/foundItems.ts; foundSubmissions.ts | Inventaris dan laporan penemuan awal. | Fakta domain dari 3NF; bukan tabel SQL. |
| src/data/fixtures/statusHistory.ts; itemReturns.ts | Riwayat laporan serta itemReturns (pengembalian ke pemilik). | Status/aktor/alasan konsisten. |
| src/data/store/applicationStore.ts | Sumber kebenaran data runtime, listener perubahan. | Bukan localStorage. |
| src/data/store/initialState.ts | Hydration dari fixtures pada mount. | Reset saat reload. |
| src/data/selectors/catalogSelectors.ts | Filter STORED dan is_visible=true -> pencarian -> filter -> urut -> pagination 10. | Membatasi kartu/foto yang dirender. |
| src/data/selectors/inventorySelectors.ts | Inventaris internal, filter, status. | Jangan mengekspos data internal ke Guest. |
| src/data/selectors/reportSelectors.ts | Laporan sesuai actor/status/role. | Menghitung status riwayat. |
| src/data/selectors/dashboardSelectors.ts | Agregasi metrik Petugas dari item/report. | Statistik tidak hardcode. |

### 7.2 Types, validation, helpers, tests

| File / folder (relatif ke Frontend/) | Tanggung jawab teknis | Relasi Figma / catatan |
| --- | --- | --- |
| src/types/common.types.ts; auth.types.ts; user.types.ts | ID, pagination result, sesi, actor, role. | Jangan meniru seluruh tabel SQL mentah. |
| src/types/item.types.ts; servicePost.types.ts | Model item dan pos. | Hanya item publik yang visible. |
| src/types/foundReport.types.ts; statusHistory.types.ts | Model laporan dan status history. | Alasan wajib untuk cancel/reject. |
| src/types/itemReturn.types.ts | Model serah terima dan penerima. | Status item. |
| src/validation/itemRegistration.schema.ts | Syarat catat barang, foto wajib sesuai Figma. | P3. |
| src/validation/foundReport.schema.ts | Kebutuhan isi laporan penemuan. | M2; error form. |
| src/validation/reportCancellation.schema.ts | Alasan pembatalan wajib. | M4. |
| src/validation/reportRejection.schema.ts | Alasan penolakan wajib. | P5. |
| src/validation/physicalReceipt.schema.ts | Foto penerimaan wajib. | P5. |
| src/validation/handover.schema.ts | Persetujuan dan data penerima sebelum handover. | P6. |
| src/constants/roles.ts; itemStatuses.ts; reportStatuses.ts | Role, STORED/RETURNED_TO_OWNER, PENDING_RECEIPT/RECEIVED/CANCELLED/REJECTED. | Nilai dibakukan. |
| src/constants/itemCategories.ts; navigation.ts | Kategori dan referensi menu untuk role. | Figma Page 05. |
| src/constants/pagination.ts | Mendefinisikan CATALOG_PAGE_SIZE = 10 dalam satu tempat. | Katalog Guest/Mahasiswa; juga digunakan unit test. |
| src/hooks/useDebounce.ts; usePhotoPreview.ts; useDisclosure.ts | Search delay, object URL lifecycle, modal open/close. | Cegah memory leak foto. |
| src/utils/formatDate.ts; formatReportCode.ts; formatInventoryCode.ts | Formatting display; jangan aturan domain dalam UI. | Bentuk kode sesuai kebutuhan desain. |
| src/utils/validateImageFile.ts | Validasi tipe/ukuran berkas foto di browser. | Tidak mengunggah server. |
| tests/unit/*.test.ts | Selectors, statuses, pagination dan validators. | Menguji 0/10/11/21 hasil. |
| tests/integration/*.test.tsx | Alur P3→Guest; M→Officer; cancel/reject. | Store bersama. |
| tests/e2e/*.spec.ts | Navigasi role dan alur responsif. | Playwright browser. |

## 8. Pemetaan Screen Figma Page 05 ke Halaman Frontend

Kode di bawah sesuai frame pada Page 05; tanda M/D berarti satu halaman responsif. File utama ditampilkan untuk memudahkan penugasan; komponen rinci ada pada Bab 6.

## 8.1 PETUGAS — screen ke file

| Kode frame Figma Page 05 | File frontend utama | Perilaku/state yang wajib |
| --- | --- | --- |
| 02.01, 02.01a | OfficerDashboardPage.tsx | Dashboard Petugas; satu scroll page. |
| 06.01, 06.01a | InventoryPage.tsx | Daftar, filter pos/kategori/status, search. |
| 06.02, 06.02a | InventoryDetailPage.tsx | Detail barang internal. |
| 02.M01 | ItemTypeSelectionPage.tsx | Jenis input barang. |
| 02.02, 02.02a, 02.02b, 02.02c | ItemRegistrationPage.tsx | Form sama; sebelum/sesudah foto, bagian bawah. |
| 02.03 | RegistrationSuccessPage.tsx | Pencatatan berhasil. |
| 05.01 | OfficerReportsPage.tsx | 4 filter status sejajar. |
| 05.02 | OfficerReportDetailPage.tsx | Detail laporan masuk. |
| 05.03, 05.03a, 05.03b | ReceiveItemPage.tsx | Terima fisik; foto wajib. |
| 05.04 | ReceiveItemSuccessPage.tsx | Hasil diterima. |
| 05.05, 05.05b | RejectReportPage.tsx | Alasan wajib; submit aktif setelah valid. |
| 05.06 | ReportRejectedPage.tsx | Status/hasil penolakan. |
| 06.03, 06.03a | HandoverPage.tsx | Serah terima barang. |
| 01.04, 01.P01–P08 | auth/ pages dan states | Login Petugas dan kondisi pemulihan akun. |

## 8.2 GUEST — screen ke file

| Kode frame Figma Page 05 | File frontend utama | Perilaku/state yang wajib |
| --- | --- | --- |
| 00.01 | LandingPage.tsx | Hero pilihan akses, ilustrasi PNG ZIP. Hanya Landing menggunakan banner. |
| 03.P01, 03.P01a | GuestHomePage.tsx | Header -> Sedang mencari barangmu?; tanpa hero besar di beranda. |
| 03.01, 03.01a | CatalogPage.tsx | Pagination 10, filter/sort dan lazy images. |
| 03.02, 03.02a | ItemDetailPage.tsx | Detail hanya barang publik. |
| 03.P03, 03.P03a | ServicePostsPage.tsx | Daftar pos. |
| 03.P04, 03.P04a | ServicePostDetailPage.tsx | Galeri pos. |
| 03.P05, 03.P05a | PickupGuidePage.tsx | Panduan barang. |

## 8.3 MAHASISWA — screen ke file

| Kode frame Figma Page 05 | File frontend utama | Perilaku/state yang wajib |
| --- | --- | --- |
| 01.01, 01.02, 01.03 | StudentLoginPage, StudentRegisterPage, VerifyOtpPage | Auth simulasi. |
| 03.P02, 03.P02a | StudentHomePage.tsx | Beranda mahasiswa tanpa banner besar desktop. |
| 03.01–03.P05a | discovery/ catalog/service-posts/pickup-guide | Reuse sama dengan Guest; bukan clone komponen. |
| 04.01, 04.01a | CreateReportPage.tsx | Form temuan scroll + foto. |
| 04.02 | ReportConfirmationPage.tsx | Konfirmasi laporan. |
| 04.03 | MyReportsPage.tsx | List + status filter. |
| 04.04, 04.04a, 04.06, 04.07 | MyReportDetailPage.tsx | Detail dan state CANCELLED/REJECTED. |
| 04.05, 04.05b | CancelReportPage.tsx | Alasan pembatalan wajib. |
| 04.P01 | StudentProfilePage.tsx | Profil dan menu. |
| 01.05–01.08, varian 01.06A/B/C | Forgot/CheckEmail/ResetPassword/PasswordChanged pages | State jeda/kirim ulang/batas akun. |

### Ketentuan domain ERD v6.2 final dan galeri foto Pos Pelayanan

Baseline frontend adalah ERD final v6.2 dengan 8 tabel domain: users, service_posts, service_post_photos, found_submissions, submission_status_history, found_items, item_photos, item_returns. Fase frontend-only memakai fixture in-memory yang mengikuti model data; tidak membuat tabel SQL.

Perbedaan penting: laporan barang ditemukan = found_submissions dengan tepat 1 report_photo_path wajib; inventaris = found_items dengan minimal satu item_photos dan satu foto utama. Status laporan PENDING_RECEIPT/RECEIVED/REJECTED/CANCELLED; status barang STORED/RETURNED_TO_OWNER/DISTRIBUTED.

Catalog selector harus selalu memeriksa status === STORED && is_visible === true sebelum search, filter, sort, pagination 10. Peringatan storage_limit_days tidak otomatis menutup katalog, mengubah status, ataupun menyalurkan barang.

Galeri foto pos RESMI di ERD v6.2: service_post_photos menghubungkan 1 service_posts ke 0..3 foto dengan position 1..3. Posisi 1 menjadi foto utama/cover, posisi unik per pos, dan tidak boleh ada posisi berlubang saat penyimpanan. Target konten 2–3 foto bila aset tersedia. Selama frontend-only, ServicePostGallery memakai fixture yang meniru relasi ini; jangan mengasumsikan aset yang belum diekspor dari Figma sudah tersedia.

Pengembalian kepada pemilik: catat recipient_name dan verification_summary, tanpa unggah foto identitas; pengembalian memicu RETURNED_TO_OWNER dan is_visible=false. Penyaluran ke pihak lain hanya DISTRIBUTED dan is_visible=false, tidak membuat item_returns.

## 9. Routing URL dan Hak Akses Simulasi

| Route yang disarankan | Role (UI saja) | Halaman |
| --- | --- | --- |
| / | Publik | LandingPage |
| /guest | Publik | GuestHomePage |
| /catalog | Publik, Mahasiswa | CatalogPage |
| /catalog/:itemId | Publik, Mahasiswa | ItemDetailPage |
| /service-posts | Publik, Mahasiswa | ServicePostsPage |
| /service-posts/:postId | Publik, Mahasiswa | ServicePostDetailPage |
| /pickup-guide | Publik, Mahasiswa | PickupGuidePage |
| /officer/dashboard | Petugas | OfficerDashboardPage |
| /officer/inventory | Petugas | InventoryPage |
| /officer/inventory/:itemId | Petugas | InventoryDetailPage |
| /officer/items/new | Petugas | ItemRegistrationPage |
| /officer/reports | Petugas | OfficerReportsPage |
| /officer/reports/:reportId | Petugas | OfficerReportDetailPage |
| /officer/reports/:reportId/receive | Petugas | ReceiveItemPage |
| /officer/reports/:reportId/reject | Petugas | RejectReportPage |
| /officer/items/:itemId/handover | Petugas | HandoverPage |
| /student | Mahasiswa | StudentHomePage |
| /student/reports/new | Mahasiswa | CreateReportPage |
| /student/reports | Mahasiswa | MyReportsPage |
| /student/reports/:reportId | Mahasiswa | MyReportDetailPage |
| /student/reports/:reportId/cancel | Mahasiswa | CancelReportPage |
| /student/profile | Mahasiswa | StudentProfilePage |
| /auth/officer/login | Publik | OfficerLoginPage |
| /auth/student/login | Publik | StudentLoginPage |
| /auth/student/register | Publik | StudentRegisterPage |
| /auth/recovery | Publik | Forgot/CheckEmail/ResetPassword pages |

Route adalah kontrak navigasi tim yang direncanakan, bukan URL produksi atau klaim navigasi prototype Figma telah diperbaiki seluruhnya. Guards di frontend tidak menggantikan otorisasi backend.

## 10. Pagination Katalog — Kebijakan Wajib 10 Item

| Parameter | Aturan implementasi | Contoh/acceptance criteria |
| --- | --- | --- |
| Cakupan | CatalogPage bersama Guest + Mahasiswa; bukan 10 gambar terpisah. | 1 barang katalog = 1 kartu dengan 1 thumbnail utama; maksimum 10 kartu/page. |
| PAGE_SIZE | Konstanta bernilai 10; hindari angka 10 berulang. | src/constants/pagination.ts / CATALOG_PAGE_SIZE=10. |
| Sumber data | Hanya item dengan status STORED dan is_visible=true sebelum filter/sort/pagination. | RETURNED_TO_OWNER, DISTRIBUTED, atau item ditarik manual (is_visible=false) tidak tampil. |
| Urutan pipeline | Visibility → search → category/post filters → sort → paginate. | Pagination tidak boleh dilakukan sebelum filter/sort. |
| Pagination count | totalPages = max(1, ceil(filteredCount / 10)) untuk kontrol; halaman 1 bila 0. | 0 -> empty state; 10 -> 1 page; 11 -> 2 pages; 21 -> 3 pages. |
| Halaman aktif | Clamp page ke 1..totalPages; saat filter/search/sort berubah reset ke 1. | Tidak terjadi halaman kosong akibat page lama. |
| Render | Hanya render item hasil slice(activePage). | Di React DOM maksimal 10 kartu katalog; bukan hide 90 kartu via CSS. |
| Image loading | Set loading=lazy dan decoding=async untuk thumbnails; bukan eager seluruh data. | Hindari preloading seluruh foto inventory. |
| Foto perangkat Petugas | Preview pakai temporary object URL (revoke bila tak dipakai). | Item baru tampil selama sesi in-memory; refresh reset. |
| Navigation | Previous, next, nomor page, informasi X–Y dari N. | Prev disabled pada page 1; next disabled pada last page. |
| State loading | Tampilkan maksimal 10 skeleton untuk page aktif. | Konten stabil, tidak lompat jauh saat loaded. |
| Empty / error | 0 hasil -> empty state; invalid form -> pesan dekat input. | Tombol Hapus Filter sesuai Figma. |
| A11y | Aria-label navigasi halaman; aria-current=page; focus terlihat; keyboard. | Tombol terjangkau di mobile dan desktop. |
| Kinerja | Memoization filter/sort seperlunya, throttle/debounce pencarian, image optimization setelah aset diekspor. | 10 kartu mengurangi node DOM dan gambar aktif, tetapi ukuran gambar asli tetap perlu optimasi. |

Contoh skenario untuk pengujian pagination

| Dataset cocok | Jumlah halaman | Isi page / tampilan |
| --- | --- | --- |
| 0 item | Empty | Empty — Katalog, tidak menampilkan kartu; halaman tidak melewati 1. |
| 1–10 item | 1 | Semua item pada halaman pertama. |
| 11 item | 2 | Page 1 = 10 kartu, Page 2 = 1 kartu. |
| 20 item | 2 | Page 1 = 10, Page 2 = 10. |
| 21 item | 3 | Page 1 = 10, Page 2 = 10, Page 3 = 1. |
| 21 item lalu filter ke 4 | 1 | Page otomatis reset 1; hanya 4 kartu tampil. |
| Page 3 dari 21 lalu satu item dihapus | 2 | Current page clamp ke 2; tidak blank. |

## 11. UX States / Mitigasi sesuai Section 07.M dan 07.D

| Role / cakupan | State Figma | File penanggung jawab | Hasil yang diharapkan |
| --- | --- | --- | --- |
| Guest & Mahasiswa | Skeleton Loading — Katalog | src/features/discovery/catalog/components/CatalogSkeleton.tsx | Loading simulasi, maksimum 10 placeholder. |
| Guest & Mahasiswa | Empty — Katalog | CatalogEmptyState.tsx | Tidak ditemukan, bersihkan filter; image list tidak kosong secara keliru. |
| Guest & Mahasiswa | Filter pos, kategori, urutan, pencarian | CatalogPostFilter, CatalogCategoryFilter, CatalogSortControl, CatalogSearchBar | Kontrol valid, reset page 1 saat berubah. |
| Mahasiswa | Error — Validasi Form | src/validation/foundReport.schema.ts + ErrorMessage.tsx | Jangan submit tanpa field wajib; tunjukkan pesan field. |
| Mahasiswa | Foto Preview / Pilih Foto | PhotoPicker.tsx + PhotoPreview.tsx | Wajib pilih tepat 1 foto laporan sebelum submit; preview/ganti/hapus sementara, MIME dan ukuran divalidasi; tidak ada upload pada fase in-memory. |
| Mahasiswa | Input disabled/error | Button.tsx + Input.tsx | Tombol batal disabled sampai alasan terisi. |
| Petugas | Foto wajib | itemRegistration.schema.ts / physicalReceipt.schema.ts | Pencatatan sesuai form; penerimaan fisik wajib foto. |
| Petugas | Konfirmasi serah terima | HandoverConfirmation.tsx | Tahan perubahan hingga konfirmasi. |
| Petugas | Sukses barang diserahkan | HandoverPage.tsx + store | Status inventaris RETURNED_TO_OWNER; hilang dari katalog publik. |
| Petugas & Mahasiswa | Akun / pesan tindakan | SessionProvider.tsx + Modal.tsx | Simulasi login/role dan feedback, tidak menyimpan session. |
| Belum ada screen spesifik di master | Network timeout/API retry | Dokumentasi future-backend only | Jangan mengklaim state API sudah ada; desain khusus belum divalidasi. |

## 12. Model Data dan Interaksi Antar-Role

| Entitas fixture (bukan tabel SQL) | State konseptual | Alur yang wajib sinkron |
| --- | --- | --- |
| users.ts | Mahasiswa / Petugas / akun dummy | Login simulasi; owner report diambil dari active user. |
| servicePosts.ts | Pos layanan, storage_limit_days, dan galeri foto dari service_post_photos (maks. 3 foto/pos; posisi 1 cover), disimulasikan dalam fixture. | Pos yang muncul di Guest sama referensi Petugas. |
| foundItems.ts | STORED / RETURNED_TO_OWNER / DISTRIBUTED + is_visible | Katalog publik hanya STORED & is_visible=true; penarikan manual tanpa mengubah status, distribusi dan pengembalian menghilangkan item dari publik. |
| foundSubmissions.ts | PENDING_RECEIPT / RECEIVED / REJECTED / CANCELLED | Submit Mahasiswa wajib tepat 1 foto -> PENDING_RECEIPT; petugas terima fisik/tolak, mahasiswa boleh batal sesuai kebijakan. |
| statusHistory.ts | Riwayat actor, status, alasan | Cancel/reject harus menambah history dengan reason. |
| itemReturns.ts | Catatan pengembalian ke pemilik terverifikasi (item_returns) | Maksimal sekali per item; recipient_name dan verification_summary wajib; update status item ke RETURNED_TO_OWNER secara atomik dalam simulasi store. |

Komponen tidak boleh mengimpor fixtures lalu memodifikasinya langsung. Gunakan contract service dan store supaya semua role melihat state yang sama. Foto preview lokal harus dibersihkan ketika sudah tidak dipakai.

## 13. Tahapan Implementasi dan Hasil yang Harus Lulus

| Fase | Cakupan Figma/Page 05 | Acceptance criteria |
| --- | --- | --- |
| F0 | Setup frontend, token, layouts, base UI, route, service contract & store. | Tidak ada code backend; landing dan semua layout mobile/desktop tampil. |
| P1 | 02.01 Dashboard Petugas. | Statistik mengikuti fixture dan update in-memory. |
| P2 | 06.01/06.02 inventaris dan detail. | Filter dan data internal benar; foto terhubung. |
| P3 | 02.M01 / 02.02 / 02.03 pencatatan + 1 foto. | Tambah barang -> inventaris berubah, foto bisa dipreview. |
| G1–G5 | Landing, home, katalog, item detail, pos, guide. | Guest dapat mencari item hasil P3, katalog 10 item/page; 0/11/21 diuji. |
| P4–P7 | Laporan Mahasiswa, terima fisik, tolak, handover, auth simulasi. | Receive/reject/handover sinkron dengan store dan statusHistory. |
| M1–M6 | Auth simulasi, laporan, riwayat, cancel, profile, reset. | Laporan muncul ke Petugas dan status dari Petugas tampak di Mahasiswa. |

## 14. Checklist QA dan Aturan Handoff Tim

| Area | Kriteria minimal sebelum merge |
| --- | --- |
| Visual | Mobile 390 px dan Desktop 1440 px sesuai Figma; tidak ada overflow horizontal. |
| Banner | Banner "Barangmu hilang?" hanya di 00.01 Landing Desktop, tidak muncul setelah masuk ke beranda Guest/Mahasiswa. |
| Pagination | 10 katalog item per page; filter/sort/search sebelum slice; reset/clamp page; 0/10/11/21 lulus. |
| Foto | Laporan tepat 1 foto wajib; inventaris minimal 1 foto/1 utama; pos maksimal 3 foto, dengan posisi 1 cover jika terisi. Preview file lokal, ganti/hapus, revoke object URL; tidak upload. |
| Loading/empty/error | Komponen sesuai 07.M/07.D, validasi form dan tombol disabled. |
| Status | PENDING_RECEIPT, RECEIVED, REJECTED, CANCELLED; STORED, RETURNED_TO_OWNER, DISTRIBUTED; is_visible. Pembatalan/penolakan butuh alasan pada riwayat. |
| Role | Guest tanpa login; Petugas/Mahasiswa akses role hanya simulasi UI. |
| Aset | Tidak ada 404 path aset ZIP; favicon.svg dan logo benar, file non-ZIP dicatat missing. |
| Data lintas role | P3 item muncul di katalog Guest; aksi Petugas terlihat dari Riwayat Mahasiswa. |
| Accessibility | Alt foto, label input, tombol focusable, aria-live feedback, pagination keyboard. |
| Kualitas | TypeScript no errors, ESLint lulus, unit/integration/e2e critical lulus. |
| Kohesi kode | Page fokus komposisi UI; hooks mengelola state interaksi; selectors transformasi; services operasi domain. Tidak ada komponen/server-god file atau import langsung fixtures dari UI. |
| Ukuran kode | Periksa fungsi ±20 baris; target UI 80, Page 150, hook/selector/validator 100, service 200 baris. Lebih panjang => review tertulis; file >300 => persetujuan sebelum merge. |
| Handoff AI coding | AI menyebut modul dan frame Figma, daftar file created/changed dan ukurannya, pemetaan tanggung jawab, hasil formatter/lint/typecheck/build/test serta exception. |

## 15. Sumber Referensi dan Versi

| Referensi | Tautan atau sumber |
| --- | --- |
| Figma Page 05 | https://www.figma.com/design/O7CTpA8dQPMdVi8ZQo2PWK/Mockup-UI-UBL-Lost-and-Found?node-id=373-2904 |
| Aset utama | Aset_Image_LostnFound(2).zip — enam berkas yang diinspeksi. |
| React / react-dom | https://www.npmjs.com/package/react ; https://www.npmjs.com/package/react-dom |
| TypeScript / Vite | https://www.npmjs.com/package/typescript ; https://www.npmjs.com/package/vite |
| Tailwind / plugin | https://www.npmjs.com/package/tailwindcss ; https://www.npmjs.com/package/@tailwindcss/vite |
| React Router / plugin React | https://www.npmjs.com/package/react-router ; https://www.npmjs.com/package/@vitejs/plugin-react |
| Icons / forms | https://www.npmjs.com/package/lucide-react ; https://www.npmjs.com/package/react-hook-form |
| Test tools | https://www.npmjs.com/package/vitest ; https://www.npmjs.com/package/@playwright/test |

### Keputusan autentikasi dan kontrak integrasi — ERD v6.2

users.user_id tetap UUID internal; users.Neon Auth_user_id VARCHAR(255) NOT NULL UNIQUE mengikat satu akun Neon Auth terverifikasi ke satu user CampusFind.

Pendaftaran STUDENT: email diverifikasi oleh Neon Auth, kemudian onboarding dengan nama lengkap dan NIM yang diisi sendiri. NIM tidak dinyatakan terverifikasi akademik.

OFFICER hanya ditetapkan oleh administrator sistem melalui backend/SQL terkontrol; tidak ada role ADMIN dan tidak ada pemilihan role OFFICER di frontend.

Kontrak API final: CampusFind_OpenAPI_Final_v1_0.yaml dan CampusFind_API_Contract_Final_v1_0.md. Frontend-only tetap menggunakan mock service; jangan memanggil API nyata sebelum fase integrasi.
