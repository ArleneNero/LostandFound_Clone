# Standar Frontend — salinan sumber ERD v6.2

> Transkripsi tekstual dari dokumen sumber `CampusFind_Standar_Frontend_Final_ERD_v6_2(1).docx`; tabel dipertahankan. Dokumen ini mencerminkan fase frontend-only lama. Jika berbeda dengan snapshot OpenAPI/DBML backend terbaru, gunakan ketetapan pada `../BACKEND_SYNC.md` dan hentikan implementasi bagian yang belum diputuskan.

## KETENTUAN CLEAN CODE DAN STANDAR PENGEMBANGAN FRONTEND

### UBL LostnFound

Pedoman kerja dan quality gate anggota kelompok: apa yang tidak boleh dilakukan, penggantinya, dan cara memverifikasi hasilnya.

| Identitas dokumen | Ketetapan |
| --- | --- |
| Tujuan | Keseragaman implementasi UI, keterbacaan source code, kemudahan review, dan kesiapan integrasi backend di fase berikutnya. |
| Cakupan saat ini | MURNI FRONTEND: React + TypeScript + Vite + Tailwind CSS, routing, in-memory data, local asset, UX states. |
| Acuan desain | Figma Page 05 — Role-Based Views: 01 Petugas, 02 Guest, 03 Mahasiswa; mobile dan desktop. |
| Acuan perencanaan | UBL_LostnFound_Frontend_Blueprint_Page05_Pagination10.docx — dokumen arsitektur yang telah disusun sebelumnya. |
| Edisi | 18 Oktober 2026 \| Revisi 1.3 \| Sinkron ERD final v6.2; galeri 0..3 foto pos disetujui. |

Cara menggunakan: baca Ringkasan Wajib → cari kode ketentuan sesuai modul → periksa bukti lulus sebelum pull request. Ketentuan ini adalah aturan tim; ia bukan klaim bahwa seluruh ketentuan sudah tercapai dalam aplikasi.

Disusun berdasarkan materi Capstone Pertemuan 5–8 dan contoh SiLaporRT; adaptasi proyek frontend-only dinyatakan secara eksplisit pada Bagian 2 dan 11.

## 1. Cara membaca dan prioritas ketentuan

Pedoman ini bersifat operasional. “Jangan A” menunjukkan pola yang berisiko; “Lakukan B” menentukan pola yang disepakati; kolom bukti menjelaskan apa yang harus ditunjukkan anggota saat review. Nama file di contoh adalah rancangan arsitektur, bukan bukti file sudah dibuat.

| Tingkat | Makna | Contoh |
| --- | --- | --- |
| WAJIB | Harus terpenuhi sebelum pekerjaan dinyatakan selesai. | Tidak mengakses fixture langsung dari komponen; pagination 10 barang; tidak ada data rahasia. |
| DIANJURKAN | Dipakai bila kebutuhan relevan; penyimpangan harus dijelaskan. | Membatasi fungsi kira-kira 20 baris; memoization bila memang ada masalah render. |
| FASE NANTI | Tidak diimplementasikan dalam scope murni frontend sekarang. | REST API, database, JWT asli, password hashing server, SQL migration. |

## 2. Batas proyek: frontend-only bukan backend terselubung

| Kode | JANGAN LAKUKAN (A) | LAKUKAN (B) | Bukti / syarat lulus |
| --- | --- | --- | --- |
| S01 | Menambahkan Supabase/Firebase, Express, database, server dummy, atau endpoint sungguhan ke fase ini. | Gunakan fixture dan layanan in-memory di dalam aplikasi React. Tetapkan kontrak service untuk fase integrasi nanti. | Tidak ada koneksi network wajib untuk demonstrasi alur. |
| S02 | Menganggap login simulasi, route guard di browser, atau role selector sebagai keamanan akses produksi. | Tuliskan secara eksplisit: autentikasi dan pembatasan role masih simulasi UI. Backend harus memverifikasi hak akses saat dibangun. | README menyatakan “simulasi”; tidak ada klaim keamanan produksi. |
| S03 | Memakai localStorage/IndexedDB untuk menyimpan inventaris atau foto tanpa persetujuan scope. | State bersama di memori; reload mengembalikan fixture awal. Foto lokal hanya untuk preview selama sesi. | Refresh mengembalikan data awal; tidak ada penyimpanan permanen. |
| S04 | Menyebut checkpoint seluruh sistem “end-to-end frontend–backend–database” sudah lulus. | Laporkan capaian akurat sebagai alur end-to-end antarhalaman frontend dengan data in-memory. Kewajiban capstone lain dilacak terpisah. | Laporan progres membedakan frontend selesai vs backend belum dibangun. |

Sumber perbedaan scope: Materi P5–P8 hlm. 13–17, 23 mensyaratkan integrasi backend/database pada Milestone 1 secara keseluruhan; proyek ini sengaja membatasi deliverable yang sedang dikerjakan.

## 3. Ringkasan ketentuan paling penting

| Kode | JANGAN LAKUKAN (A) | LAKUKAN (B) | Bukti / syarat lulus |
| --- | --- | --- | --- |
| R01 | Penamaan x, temp, data1, f(), nilai ajaib. | Nama deskriptif: reportStatus, visibleItems, handleCancelReport. | Nama menjelaskan tujuan tanpa menebak. |
| R02 | Satu komponen menampilkan UI, mengurus database, mengubah seed, dan mengatur navigasi sekaligus. | Pisahkan Page, Component, Hook, Service Contract, InMemory Service, Selector, dan Store sesuai fungsi. | Setiap file punya satu tanggung jawab dominan. |
| R03 | Copy-paste katalog untuk Guest dan Mahasiswa. | Gunakan discovery/catalog bersama dengan layout role yang berbeda. | Satu perubahan katalog berlaku pada keduanya. |
| R04 | Render semua foto/kartu barang dalam satu halaman. | Filter → sort → paginate 10 → render 10 kartu. Gunakan lazy loading gambar. | Pada page aktif, maksimal 10 kartu katalog. |
| R05 | Mengganti UI Figma tanpa kebutuhan disetujui. | Ikuti Figma Page 05, state 07.M dan 07.D; catat penyimpangan sebelum coding. | Perbandingan mobile + desktop lolos review. |
| R06 | Mengabaikan kondisi kosong, gagal validasi, atau loading. | Sediakan skeleton, empty, error, disabled, konfirmasi dan sukses sesuai desain yang ada. | Setiap kondisi diuji, bukan hanya happy path. |
| R07 | Commit pesan “update”, kirim kerja lewat chat tanpa repo. | Gunakan commit deskriptif dan PR kecil dengan screenshot, test, serta catatan Figma. | Riwayat Git menunjukkan kontribusi dan alasan perubahan. |
| R08 | Membuat feature yang belum siap terlihat aktif lalu error ketika diklik. | Sembunyikan fitur belum siap atau tandai “Segera hadir” dengan aksi dinonaktifkan. | Tidak ada dead end/404 saat demo. |

## 4. Clean code: penamaan, ukuran fungsi, komentar

| Kode | JANGAN LAKUKAN (A) | LAKUKAN (B) | Bukti / syarat lulus |
| --- | --- | --- | --- |
| C01 | Variabel: a, b, d, data123, result2 tanpa konteks. | Nama bermakna: filteredItems, statusHistory, currentRole, reportId. | Reviewer mengetahui isi dan maksud tanpa membaca seluruh fungsi. |
| C02 | Komponen React bernama Page1, Form2, Untitled, Comp. | Gunakan PascalCase berbasis fitur: InventoryPage, ReportStatusFilter, ItemPhotoField. | Nama file/komponen selaras dengan folder dan tugasnya. |
| C03 | Event handler onClick={() => doIt()} di mana-mana tanpa kejelasan. | Gunakan handleSubmitReport, handlePhotoSelected, handleClearFilters. | Nama event menjelaskan aksi dan dampaknya. |
| C04 | Fungsi 200–500 baris, nested if/callback dalam, banyak tanggung jawab. | Pisahkan fungsi berdasarkan satu tujuan; gunakan nama bermakna dan early return. Target sekitar 20 baris per fungsi menurut materi dosen; detail review ukuran pada Bagian 4.1. | Fungsi singkat, kohesif, dapat diuji; pengecualian terjelaskan, bukan disembunyikan. |
| C05 | Mengulang logika status/filter di tiga komponen. | Taruh status di constants; selector untuk transformasi data; komponen bersama untuk UI sama. | Satu sumber logika; perubahan dilakukan sekali. |
| C06 | Hardcode string role/status dan magic number seperti 10 atau 60 di banyak file. | Gunakan ROLES, REPORT_STATUSES, CATALOG_PAGE_SIZE=10, RESEND_DELAY_SECONDS. | Angka/label penting punya nama dan tempat tetap. |
| C07 | Komentar // tambah 1 atau mengomentari setiap baris sederhana. | Komentar menjelaskan MENGAPA, constraint Figma, atau keputusan yang tidak terlihat dari kode. | Komentar menambah konteks, bukan mengulang operasi. |
| C08 | Kode mati, console.log berlebihan, TODO tak terlacak, import tidak dipakai. | Hapus kode tidak terpakai; buat tugas untuk pekerjaan tertunda; lint harus bersih. | Tidak ada unused import/variable; log debug dibersihkan. |
| C09 | Campur tab/spasi, nama casing acak, 250 karakter satu baris. | Gunakan formatter bersama (mis. Prettier), ESLint, batas baris sasaran 80–120 karakter. | Hasil format deterministik di komputer semua anggota. |
| C10 | Menggunakan any untuk seluruh bentuk report, item, role. | Gunakan tipe domain TypeScript, union status, narrowing, input service yang jelas. | Typecheck lulus; any dibatasi dan punya alasan. |
| C11 | Menggunakan non-null assertion (!) pada data yang mungkin tidak ada. | Tangani nilai kosong dengan guard/empty/error state dan pesan yang masuk akal. | Item id tak ditemukan menampilkan state aman, bukan crash. |
| C12 | Abstraksi generik berlebihan untuk satu pemakaian sederhana. | Ekstrak hanya pola yang berulang/bermakna. Hindari overengineering dan komponen “god wrapper”. | Abstraksi memperjelas, bukan menambah langkah tak perlu. |
| C13 | AI membuat Page.tsx 300–600 baris yang mencampur form, filter, validasi, status, dan data. | Pisah UI composition di pages/, komponen kecil di components/, state interaksi di hooks/, transformasi di selectors/, dan operasi melalui services/. | Tidak ada file god-component; tanggung jawab dapat ditelusuri per file. |
| C14 | AI tetap menambah fungsi/file melampaui target tanpa mengecek atau melaporkan ukuran. | Sebelum menyatakan selesai, hitung baris setiap file berubah, evaluasi ambang pada Bagian 4.1, dan cantumkan alasan pengecualian. | Daftar path, jumlah baris, tindakan perbaikan, atau persetujuan tercatat. |
| C15 | Memecah semua fungsi menjadi file mikro hanya agar berada di bawah angka baris. | Pecah hanya jika ada tanggung jawab terpisah, pengulangan bermakna, kemudahan test, atau reuse; hindari abstraksi generik berlebihan. | Alur lebih mudah dibaca setelah pemecahan; tidak ada layer tanpa manfaat. |
| C16 | AI mengganti struktur arsitektur, membuat fitur/dep baru, atau menghapus kode anggota lain diam-diam. | Baca dua DOCX, tetapkan scope Figma/modul dan daftar file terdampak sebelum menulis; bila konflik, hentikan bagian terkait dan minta keputusan. | Perubahan sesuai tugas; setiap penyimpangan disetujui dan terdokumentasi. |

Dasar materi dosen: Pertemuan 5 hlm. 6–10 (meaningful names, SRP, DRY, formatting, comments, error handling, SOLID). Angka ~20 baris dalam slide diperlakukan sebagai target keterbacaan, bukan syarat mekanis mutlak.

### 4.1 Batas panjang kode dan kebijakan evaluasi

Materi dosen menetapkan sekitar 20 baris sebagai pedoman ukuran fungsi. Target per jenis file di bawah adalah kebijakan internal kelompok, BUKAN batas resmi dalam PPT. Hitung baris fisik tidak kosong, termasuk JSX, komentar, dan impor. Angka memicu pemeriksaan, bukan pengganti penilaian Single Responsibility Principle (SRP).

| Jenis kode | Target panjang | Ketentuan bila terlampaui |
| --- | --- | --- |
| Fungsi/method | ±20 baris (PPT) | Jika jauh lebih panjang: periksa satu tujuan, nesting, early return dan peluang ekstraksi. |
| Komponen UI reusable | ≤80 baris / file (tim) | Jika melewati target: pisahkan subkomponen hanya bila kohesif/reusable. |
| Page.tsx | ≤150 baris / file (tim) | Page fokus layout, event orchestration singkat; pindahkan logika data, form, validasi. |
| Custom hook | ≤100 baris / file (tim) | Pisahkan state UI, operasi bisnis, dan transformasi data yang berbeda. |
| In-memory service | ≤200 baris / file (tim) | Pecah operasi per domain atau helper murni; kontrak service tetap konsisten. |
| Selector / validator | ≤100 baris / file (tim) | Pisah transformasi berbeda, pertahankan rule yang saling terkait. |
| Modul/fitur (folder) | Tidak ada batas total | Boleh banyak file dengan fungsi jelas; dilarang satu file menanggung seluruh modul. |
| Semua file >300 baris | Quality gate khusus | TIDAK BOLEH merge tanpa review ketua/reviewer, alasan tertulis dan persetujuan eksplisit. |

File yang melampaui target belum otomatis salah; file di bawah target belum otomatis bersih. Reviewer menilai pemisahan tanggung jawab, duplikasi, kejelasan dependensi, uji, serta biaya navigasi antarfile. Penyimpangan target memerlukan alasan tertulis. Sumber PPT: Pertemuan 5, halaman 8–9.

### 4.2 Kontrak kepatuhan AI coding terhadap kedua dokumen

Dua dokumen yang diberikan anggota kepada AI merupakan satu paket aturan: Blueprint menentukan scope, file dan alur; Ketentuan Clean Code menentukan mutu pelaksanaannya. AI tidak boleh menganggap jawaban “sudah selesai” sebagai bukti kepatuhan.

| Tahap | JANGAN LAKUKAN (A) | LAKUKAN (B) |
| --- | --- | --- |
| Sebelum coding | Jangan langsung generate seluruh modul dari satu kalimat. | Baca kedua DOCX; sebutkan Figma Page 05, fitur/role, file eksisting, rencana file dibuat/diubah, dan alasan tanggung jawabnya. |
| Saat coding | Jangan membuat satu Page besar atau service serbaguna. | Kerjakan hanya modul yang diminta; gunakan UI → hook/selector → contract → in-memory service/store sesuai kebutuhan. |
| Jika konflik | Jangan diam-diam mengubah naming, scope, role atau arsitektur. | Catat konflik antar dokumen/Figma/kode eksisting dan minta keputusan sebelum mengubah desain atau kontrak. |
| Sebelum menyerahkan | Jangan klaim “clean code” tanpa pemeriksaan. | Laporkan path dan jumlah baris file berubah; fungsi terlalu panjang; bukti format/lint/typecheck/build/test atau alasan test belum jalan. |
| Jika di atas 300 baris | Jangan mengakali batas dengan menekan satu baris JSX sangat panjang atau menonaktifkan lint. | Audit dan usulkan ekstraksi berbasis tanggung jawab; ajukan pengecualian tertulis pada reviewer/ketua sebelum merge. |
| Saat handoff | Jangan hanya mengirim screenshot UI atau satu file penuh. | Kirim ringkasan fungsi modul, file touched, alur data, uji keadaan normal/error/empty, Figma M/D, dan batasan yang tersisa. |

## 5. Arsitektur folder, data, dan tanggung jawab

| Kode | JANGAN LAKUKAN (A) | LAKUKAN (B) | Bukti / syarat lulus |
| --- | --- | --- | --- |
| A01 | Membuat 3 project React terpisah untuk Petugas, Guest, dan Mahasiswa. | Satu folder Frontend/ dan satu router, dengan fitur dipisah berdasarkan role sesuai Figma Page 05. | Perpindahan role dapat dicoba dalam satu sesi aplikasi. |
| A02 | Membuat mobile dan desktop menjadi dua source code halaman. | Satu page responsif; breakpoints mengubah susunan, bukan menggandakan bisnis logic. | Page utama diuji di lebar mobile dan desktop. |
| A03 | Menaruh semua code di App.tsx atau pages/ tunggal. | app/ untuk route/provider; features/ untuk fungsi; components/ui/ untuk reusable; services/ untuk akses data. | Komponen halaman fokus komposisi dan interaksi. |
| A04 | Komponen impor langsung users.ts / foundItems.ts lalu mengedit array fixture. | Gunakan service contract → in-memory adapter → application store dengan subscriber/react state. | Petugas update item; Guest membaca perubahan yang sama. |
| A05 | Menyalin item seed ke katalog Guest sendiri. | Satu sumber inventaris; visiblePublicItems hanya memuat status STORED dan is_visible = true. Barang RETURNED_TO_OWNER/DISTRIBUTED atau is_visible = false tidak tampil. | Katalog Guest/Mahasiswa tidak memuat barang tersembunyi, sudah dikembalikan, atau disalurkan. |
| A06 | Mendefinisikan tipe status yang berbeda-beda di tiap module. | types/ dan constants/ digunakan bersama; state transition tunggal di service/domain handler. | Seluruh role menampilkan label/status konsisten. |
| A07 | Menyimpan route string literal tersebar di button, menu, card. | Gunakan routePaths.ts dan navigasi melalui router, bukan window.location acak. | Back/forward browser dan deep-link bekerja. |
| A08 | Menyimpan file gambar ke folder fitur masing-masing berkali-kali. | Gunakan public/assets/ bersama. Referensi file sesuai nama asli dari ZIP; jangan menebak nama ekspor Figma. | Tidak ada nama file gambar fiktif/duplikat. |
| A09 | Menaruh data presentasi/API/database layer dalam form React. | Form punya schema/UI; simpan lewat service. Backend adapter dibuat di masa depan tanpa mencampur komponen. | Tidak ada fetch/SQL/server dalam komponen sekarang. |
| A10 | Menggunakan useMemo/useCallback untuk semua hal tanpa pengukuran. | Utamakan kode sederhana; optimasi bila ada perhitungan mahal atau profiling render. | Memoization punya alasan konkret dan tidak merusak output. |

## 6. Ketentuan Figma dan responsivitas

| Kode | JANGAN LAKUKAN (A) | LAKUKAN (B) | Bukti / syarat lulus |
| --- | --- | --- | --- |
| F01 | Menggunakan desain dari halaman Figma lama yang sudah dikoreksi. | Page 05 Role-Based Views menjadi acuan final saat implementasi; sumber 03/04 hanya untuk penelusuran. | PR menyebut section/node Figma yang dipakai. |
| F02 | Menampilkan banner “Barangmu hilang?” berulang di beranda setelah masuk. | Banner hanya untuk desktop 00.01 Landing; beranda Guest/Mahasiswa desktop dimulai “Sedang mencari barangmu?”. | Screenshot desktop sesuai penyesuaian Page 05. |
| F03 | Mengimplementasikan frame Lanjutan / Bagian Bawah sebagai route baru. | Jadikan kelanjutan scroll dari halaman yang sama dengan frame sebelumnya. | Tidak ada route baru tanpa alasan fungsional. |
| F04 | Membuat frame Foto Terunggah atau Alasan Terisi sebagai page terpisah. | Jadikan state dari form yang sama: foto none/selected; reason empty/valid. | Alur state berjalan tanpa mengganti route tak perlu. |
| F05 | Mengubah warna, font, spacing, radius di setiap komponen dengan nilai bebas. | Gunakan styles/tokens.css yang diambil dari desain Page 05; komponen memakai token. | Audit visual menemukan token konsisten. |
| F06 | Hanya menguji viewport laptop; mobile overflow atau tombol tertutup navigasi. | Uji mobile, tablet, desktop; form bisa scroll; bottom nav tidak menutupi aksi. | Screenshot semua ukuran prioritas dan cek overflow. |
| F07 | Mengambil ikon/random stock image yang mengganti brand tanpa izin. | Gunakan aset ZIP asli; ikon UI bisa Lucide; aset lain diekspor dari Figma setelah nama/fail terverifikasi. | Semua path yang dirujuk dapat ditemukan di public/assets/. |
| F08 | Membuat ikon/gambar bermuatan informasi tanpa teks alternatif. | Tambahkan alt yang bermakna, label, focus state, dan semantik tombol/input. | Navigasi keyboard dasar & screen reader diuji. |

## 7. Pagination dan performa katalog (ketentuan khusus proyek)

| Kode | JANGAN LAKUKAN (A) | LAKUKAN (B) | Bukti / syarat lulus |
| --- | --- | --- | --- |
| P01 | Menampilkan 40–500 kartu/foto katalog sekaligus. | Konstanta CATALOG_PAGE_SIZE = 10; render maksimal 10 kartu pada page aktif. | DOM berisi <=10 kartu katalog per halaman. |
| P02 | Paginate sebelum filter/sort sehingga hasil kosong tidak konsisten. | Urutan: inventaris -> hanya STORED dan is_visible true -> filter query/kategori/pos -> sort -> paginate 10. | Jumlah total halaman dan 10 kartu dihitung dari hasil terfilter. |
| P03 | Tetap di halaman 8 sesudah filter membuat hasil tinggal 1 halaman. | Reset currentPage ke 1 saat keyword, kategori, pos, atau sort berubah; clamp saat data berubah. | Tidak ada halaman kosong karena indeks usang. |
| P04 | Menampilkan tombol Next pada halaman terakhir atau Prev pada halaman pertama. | Nonaktifkan kontrol tak valid; hitung pageCount = max(1, ceil(total/10)) untuk UI. | Prev/Next disabled sesuai posisi; total 0 punya empty state. |
| P05 | Memuat seluruh gambar original besar di atas fold tanpa kontrol. | Tambahkan img loading="lazy" pada kartu bawah; atur dimensi/aspect ratio agar layout tidak lompat. | Tidak ada layout shift besar; gambar visible dimuat proporsional. |
| P06 | Memasukkan gambar Base64 ke fixture/source .ts yang berat. | Gunakan berkas asset path atau URL sementara hasil file picker dengan object URL; revoke ketika selesai. | Bundle JS tidak berisi asset foto Base64 panjang. |
| P07 | Menjalankan filter pada tiap keystroke sambil render ulang tanpa kebutuhan. | Gunakan filter ringan; debounce saat data banyak/berat; profil sebelum optimasi rumit. | Pencarian tetap responsif; hasil akurat. |
| P08 | Mengklaim pagination client-side sama dengan efisiensi API server. | Tuliskan bahwa 10 per halaman membatasi render UI; fixture mungkin tetap berada di memori. Nanti backend menggunakan page/limit. | Dokumen performa jujur terhadap scope frontend. |
| P09 | Mengubah status inventaris tanpa memperbarui katalog/halaman. | Gunakan selector bersama dan koreksi currentPage setelah perubahan data. | Barang baru/serah-terima tercermin pada halaman yang tepat. |

Dasar materi dosen: Pertemuan 8 hlm. 20–21 memuat pagination, compress/lazy-load gambar, code splitting, debounce, serta target Lighthouse >80. Batas “10 per halaman” berasal dari keputusan proyek UBL LostnFound, bukan angka wajib dosen.

### 8.0 Sinkronisasi domain ERD v6 (ketentuan lintas layar)

Status laporan harus PENDING_RECEIPT, RECEIVED, REJECTED, CANCELLED. Status inventaris harus STORED, RETURNED_TO_OWNER, DISTRIBUTED; is_visible mengontrol tampil atau tidaknya barang STORED di katalog. Simulasi frontend mengikuti status ini walaupun backend belum terhubung.

Laporan mahasiswa memiliki tepat satu foto wajib (preview lokal selama fase frontend-only). Foto inventaris minimal satu, dengan tepat satu foto utama. ERD v6.2 resmi menambahkan service_post_photos untuk galeri 0..3 foto per pos; posisi 1 adalah cover. Galeri pos tidak sama dengan foto barang atau foto laporan. Fixture dan komponen harus membatasi jumlah foto dan menjaga urutan tanpa posisi berlubang.

Kebijakan storage_limit_days bersifat per pos; bila lewat batas waktu, petugas melihat peringatan, tanpa perubahan status maupun visibilitas otomatis. Menarik item dari katalog hanya mengubah is_visible=false; penyaluran fisik menetapkan DISTRIBUTED dan is_visible=false; pengembalian ke pemilik dicatat di item_returns.

Perubahan sumber data harus tetap lewat services/store in-memory. Jangan membuat tabel atau API asli dalam ruang kerja frontend saat ini. Kontrak HTTP final tersedia dalam CampusFind_OpenAPI_Final_v1_0.yaml; fase frontend-only tetap memakai mock service yang kompatibel.

## 8. UX states: loading, error, validasi, empty, success

| Kode | JANGAN LAKUKAN (A) | LAKUKAN (B) | Bukti / syarat lulus |
| --- | --- | --- | --- |
| U01 | Hanya membangun tampilan normal dan lupa keadaan lain. | Petakan 07.M dan 07.D Figma Page 05: skeleton, empty, error, disabled, photo, confirmation, success. | Checklist mencakup semua state relevan untuk fitur. |
| U02 | Mengganti layar blank selama data simulasi “memuat”. | Gunakan skeleton katalog sesuai Figma, hanya ketika memang ada proses async/simulasi. | Loading dapat dicoba dan berhenti dengan aman. |
| U03 | Menampilkan tabel kosong tanpa penjelasan atau tombol bantuan. | Tampilkan pesan hasil kosong, clear filters, dan akses kembali katalog. | Pengguna bisa pulih dari empty state. |
| U04 | Mengabaikan input kosong, kategori belum dipilih, atau foto wajib. | Validasi field dan tunjukkan lokasi error; pesan spesifik; fokus ke field bermasalah. | Form tidak submit saat invalid; alasan terlihat jelas. |
| U05 | Menampilkan error mentah, stack trace, atau menutup aplikasi setelah handler gagal. | Tangkap kegagalan aksi, tampilkan pesan ramah; ErrorBoundary untuk error render React. | Tidak ada crash seluruh halaman untuk kegagalan biasa. |
| U06 | Menyamakan error validasi dengan error jaringan meski backend belum ada. | Gunakan error validasi/aksi in-memory yang nyata; tempatkan network error/retry sebagai kebutuhan fase API. | Tidak mengklaim fitur timeout server sudah diuji. |
| U07 | Memberi konfirmasi sukses sebelum data/store diubah. | Tunjukkan success setelah service selesai dan state terbarui; cegah double-submit. | Status dan data konsisten setelah notifikasi sukses. |
| U08 | Tombol reject/cancel aktif walau alasan kosong atau spasi saja. | Trim alasan, validasi, disabled saat invalid; alasan tampil pada detail setelah aksi. | Tidak ada REJECTED/CANCELLED tanpa alasan. |
| U09 | Tidak ada preview atau validasi ekstensi/ukuran foto. | Batasi tipe/ukuran sesuai spesifikasi; tampilkan preview, ganti, hapus; release object URL. | Foto wajib tampak sebelum konfirmasi penerimaan. |
| U10 | Mengubah status laporan di sisi tampilan tanpa mencatat riwayat. | Satu operasi in-memory memperbarui status beserta statusHistory secara konsisten. | Mahasiswa/Petugas membaca riwayat yang sama. |
| U11 | Tombol navigasi kelihatan aktif padahal menuju halaman kosong. | Rute yang belum selesai dinonaktifkan/coming soon; link yang sudah ada harus teruji. | Tidak ada dead-end selama demo. |

## 9. Keamanan dan penanganan data khusus frontend

| Kode | JANGAN LAKUKAN (A) | LAKUKAN (B) | Bukti / syarat lulus |
| --- | --- | --- | --- |
| K01 | Memakai dangerouslySetInnerHTML dari deskripsi laporan/teks pengguna. | Render teks biasa lewat React; jika suatu saat HTML diperlukan, sanitasi dengan kebijakan eksplisit. | Tidak ada injeksi HTML dari input bebas. |
| K02 | Hardcode password, secret, token, key di source, fixture, atau commit. | Jangan buat credential nyata; pakai identitas uji nonrahasia. Rahasia backend disimpan pada backend di fase berikutnya. | Pemeriksaan repo tidak menemukan secret. |
| K03 | Menganggap disabled button atau guard frontend sebagai otorisasi produksi. | Jelaskan batas: UI simulation only; backend nanti memverifikasi role/action per endpoint. | Dokumentasi tidak menjanjikan keamanan yang belum ada. |
| K04 | Mengunggah foto ke layanan publik yang tidak ditentukan. | File browser dipakai untuk preview lokal; tidak ada upload network/storage sekarang. | DevTools Network tidak menunjukkan request upload. |
| K05 | Membiarkan URL preview object URL terus hidup setelah file diganti/unmount. | Panggil URL.revokeObjectURL ketika preview sudah tidak digunakan. | Memori tidak tumbuh berulang saat mengganti foto. |
| K06 | Menggunakan data personal riil untuk seed demo. | Gunakan data fiktif; hindari alamat/identitas asli pada screenshot dan fixture. | Data dummy aman dibagikan ke anggota/pengajar. |
| K07 | Membiarkan dependensi tak terkelola dan security warning diabaikan. | Simpan package-lock, review npm audit, update terencana dan tes regresi. | Lockfile dan hasil pemeriksaan dependensi tersedia. |

Dasar materi dosen: Pertemuan 8 hlm. 18–19 (XSS, data sensitif, dependency, auth). SQL injection, CSRF server, password hashing, dan middleware backend dicatat sebagai pekerjaan fase backend; bukan implementasi frontend-only.

## 10. Dokumentasi, Git, pengujian, dan review

| Kode | JANGAN LAKUKAN (A) | LAKUKAN (B) | Bukti / syarat lulus |
| --- | --- | --- | --- |
| G01 | README hanya berisi judul atau cara jalankan tidak lengkap. | Tuliskan kebutuhan Node/npm, langkah install, start/build/test, struktur, tim, scope in-memory, aset dan screenshot. | Anggota baru bisa menjalankan tanpa bantuan personal. |
| G02 | Mengubah alur atau folder diam-diam tanpa catatan keputusan. | Update docs/architecture.md, figma-screen-mapping.md, data-contracts.md sesuai perubahan. | PR dan dokumentasi selaras dengan source. |
| G03 | Commit “fix”, “update lagi”, “final bgt” tanpa konteks. | Gunakan feat(officer): add inventory filters; fix(catalog): reset page after search. | Riwayat Git dapat dipahami anggota/dosen. |
| G04 | Membuat satu commit besar berisi semua role. | Kerjakan branch/PR kecil satu fitur; sertakan apa diubah, referensi Figma, test, screenshot. | Reviewer bisa menguji perubahan secara terisolasi. |
| G05 | Cuma satu orang melakukan semua commit walau anggota banyak. | Distribusikan task jelas; kontribusi tiap orang terbaca di Git sesuai kapasitas. | Log commit dan task board menggambarkan kerja tim. |
| G06 | Merge sebelum code format, lint, typecheck, build, test selesai. | Jalankan quality gate: format, lint, tsc, build, unit/integration, lalu smoke test. | Checklist PR terisi dengan bukti. |
| G07 | Menganggap screenshot tampilan sama = semua fitur berfungsi. | Uji alur klik, form, state, filter, pagination, dan sinkronisasi antar-role. | Skenario berhasil/gagal diuji. |
| G08 | Mengubah fitur dan tidak menguji yang terdampak. | Tambahkan regression checklist: Guest katalog, Petugas inventaris, Mahasiswa laporan dan status. | Fitur lama masih berjalan setelah merge. |
| G09 | Menunggu semua modul selesai baru demo. | Lakukan milestone per fase: F0 → P1–P3 → G1–G5 → P4–P7 → M1–M6. | Setiap fase menghasilkan demo yang dapat dicoba. |
| G10 | Menyalin hasil pengujian dari contoh SiLaporRT sebagai pencapaian LostnFound. | Gunakan contoh sebagai inspirasi format QA; angka UAT, Lighthouse, test count dicatat dari hasil pengujian sendiri. | Tidak ada klaim angka tanpa bukti. |

Dasar materi dosen: Pertemuan 5 hlm. 11–12 (README, changelog, commit), Pertemuan 8 hlm. 23–25 (repo aktif, milestone, kolaborasi). Sample SiLaporRT hlm. 8–10 menunjukkan bentuk checkpoint, pengujian, dan iterasi—bukan hasil aktual LostnFound.

## 11. Contoh konkret A vs B pada kasus proyek

Cuplikan berikut bersifat ilustrasi untuk memandu review. Ini bukan perintah membuat source code saat ini dan bukan bukti aplikasi sudah diimplementasikan.

#### 11.1 Magic number dan pagination

| Contoh yang DILARANG | Contoh yang DIREKOMENDASIKAN |
| --- | --- |
| const visible = items.slice((p-1)*10,p*10); // 10 tersebar di banyak komponen | const CATALOG_PAGE_SIZE = 10; const start = (currentPage - 1) * CATALOG_PAGE_SIZE; const visibleItems = sortedItems.slice( start, start + CATALOG_PAGE_SIZE ); |

Kenapa: Satu konstanta menjelaskan keputusan 10 kartu/page. Lakukan filter dan sort SEBELUM mengambil slice.

#### 11.2 Duplikasi katalog lintas role

| Contoh yang DILARANG | Contoh yang DIREKOMENDASIKAN |
| --- | --- |
| guest/CatalogPage.tsx // versi A student/CatalogPage.tsx // copy paste A | discovery/catalog/pages/CatalogPage.tsx // Dipakai router Guest dan Mahasiswa. // Layout/akses disesuaikan berdasarkan sesi. |

Kenapa: DRY diterapkan pada logika dan UI bersama, tidak mengorbankan kebutuhan role.

#### 11.3 Fixture langsung di komponen

| Contoh yang DILARANG | Contoh yang DIREKOMENDASIKAN |
| --- | --- |
| import { foundItems } from '../../data/fixtures'; foundItems.push(newItem); // mutasi diam-diam | const itemService = services.items; await itemService.createItem(newItem); // service mengubah store reaktif bersama |

Kenapa: Memisahkan UI dan akses data menjamin katalog dan inventaris konsisten.

#### 11.4 Validasi alasan penolakan

| Contoh yang DILARANG | Contoh yang DIREKOMENDASIKAN |
| --- | --- |
| if (reason) setStatus('REJECTED'); // spasi dianggap valid, riwayat terlupakan | const cleanReason = reason.trim(); if (!cleanReason) return showFieldError(); await reportService.reject(reportId, cleanReason); |

Kenapa: Alasan wajib dipenuhi dan state plus riwayat diproses atomik secara logis di service in-memory.

#### 11.5 Penanganan kesalahan UX

| Contoh yang DILARANG | Contoh yang DIREKOMENDASIKAN |
| --- | --- |
| try { await service.save(data); } catch (e) {} // error hilang, user tidak tahu | try { await service.save(data); showToast('Data berhasil disimpan'); } catch { showToast('Gagal menyimpan. Coba lagi.'); } |

Kenapa: Jangan menelan error secara diam-diam. Pesan ramah tidak membocorkan detail internal.

#### 11.6 Aset dan path file

| Contoh yang DILARANG | Contoh yang DIREKOMENDASIKAN |
| --- | --- |
| <img src='/images/logo.svg' /> // nama file tidak ada di ZIP | <img src='/assets/branding/Logo_LostnFound.png' alt='Logo LostnFound' /> |

Kenapa: Gunakan nama asli terverifikasi; path ini sesuai inventaris enam aset ZIP.

## 12. Checklist quality gate sebelum PR dan demo

| Aspek | Verifikasi minimum | Lulus apabila |
| --- | --- | --- |
| Keterbacaan | Nama jelas, fungsi tidak menanggung banyak tugas, tidak ada kode mati atau duplikasi signifikan. | Reviewer dapat memahami alur tanpa penjelasan lisan panjang. |
| Format dan tipe | Formatter, ESLint, TypeScript strict/typecheck, build Vite. | Tidak ada error kompilasi/lint material. |
| Arsitektur | Komponen tidak mengakses fixture langsung; service contract dan store bersama. | Satu operasi memutakhirkan semua tampilan yang terkait. |
| Figma dan responsif | Bandingkan Page 05 mobile + desktop; periksa scroll, topbar, bottom nav, state. | UI mirip rujukan dan tidak terpotong. |
| Pagination | Filter/sort→10/page; reset page saat perubahan; batas halaman; total nol. | Pengujian dataset 0, 1, 10, 11, 21 berhasil. |
| UX states | Skeleton, empty, form invalid, upload/preview, disabled, sukses/gagal sesuai modul. | Pengguna memahami apa yang terjadi dan tindakan pemulihan. |
| Keamanan frontend | Tidak ada credential, dangerous HTML, upload jaringan yang tak disetujui. | Tidak ada risiko jelas pada seed dan render input. |
| Dokumentasi/Git | README update, screenshot, PR deskriptif, checklist pengujian; semua anggota berkontribusi. | Repo dapat diaudit dan diulang di laptop lain. |
| Kesiapan demo | Hanya fitur selesai yang bisa diakses; fitur belum siap ditandai. | Demo tanpa error fatal atau tombol menuju halaman kosong. |
| Ukuran & kohesi | Periksa fungsi ±20 baris; Page ≤150, UI ≤80, hook/selector/validator ≤100, service ≤200; >300 file wajib persetujuan. | Ada daftar baris, alasan pengecualian, dan pemisahan tanggung jawab; tidak ada god-component. |

## 13. Checklist pengujian berbasis peran

| Role/modul | Langkah uji wajib | Hasil yang diharapkan |
| --- | --- | --- |
| Petugas / Dashboard | Buka dashboard, ubah inventaris melalui modul pencatatan lalu kembali. | Statistik mengikuti data bersama, bukan angka statis terpisah. |
| Petugas / Inventaris | Cari, filter status/pos, buka detail, catat item dengan foto. | Item baru muncul, detail cocok, foto preview berjalan. |
| Petugas / Laporan | Terima barang dengan foto wajib; tolak tanpa alasan dan dengan alasan. | Tanpa foto/alasan tidak valid; status serta riwayat berubah sesuai aturan. |
| Petugas / Serah terima | Klik serah terima, batalkan dialog, lalu konfirmasi. | Tidak berubah saat batal; setelah konfirmasi item tak lagi ditawarkan di katalog. |
| Guest / Katalog | Uji 0, 10, 11, 21 item; search, kategori, pos, sort, next/prev. | Maksimal 10 kartu terlihat, page count dan empty benar. |
| Guest / Aset | Akses landing dan pos; buka 6 aset jika dipakai; cek broken link. | Nama aset sesuai ZIP, tidak ada image rusak. |
| Mahasiswa / Pelaporan | Submit form kosong, isi valid, pilih foto, kirim, buka riwayat. | Validasi terlihat; laporan muncul di riwayat dan daftar Petugas. |
| Mahasiswa / Status | Batalkan dengan alasan; buka laporan ditolak oleh Petugas. | Riwayat/status/reason konsisten antar dua role. |
| Global / Responsif | Uji viewport ~390, 768, 1440; keyboard; scroll; refresh. | UI tidak meluber; navigasi jelas; refresh reset data in-memory. |

## 14. Tata kelola tugas anggota

| Saat | Yang wajib dilakukan | Contoh bukti |
| --- | --- | --- |
| Sebelum coding | Tentukan kode Figma Page 05, file yang akan diubah, role, kondisi UX, risiko perubahan data. | Issue/task: “P3 – Catat Barang, 02.02/02.03”. |
| Saat coding | Bekerja sesuai kontrak service, gunakan komponen bersama, dokumentasikan keputusan non-obvious. | Commits bertahap; kode bertipe; acuan Figma tercantum. |
| Sebelum review | Uji 1 happy path + 1 validation/error + 1 state kosong bila relevan; jalankan lint/typecheck/build. | Screenshot mobile/desktop + test log. |
| Saat review | Reviewer periksa ketentuan C, A, F, P, U, K, G sesuai fitur. | Komentar PR menyebut kode aturan, contoh: P03 tidak terpenuhi. |
| Sebelum merge | Perbaiki feedback kritis, konfirmasi tidak merusak fitur tetangga, update README dan mapping. | Checklist lulus, approval, commit terakhir jelas. |
| Saat demo | Hanya modul yang selesai ditampilkan sebagai aktif; jelaskan bahwa auth/data masih simulasi. | Rehearsal alur Petugas → Guest → Mahasiswa. |
| Saat AI coding | AI telah membaca dua DOCX, mengidentifikasi modul dan daftar file tersentuh, kemudian memeriksa ukuran dan lint/test sebelum handoff. | Ringkasan AI dan bukti pengujian menyertakan file per tanggung jawab. |

## 15. Yang secara sengaja BELUM masuk implementasi saat ini

| Topik dari materi Capstone | Status dan penanganan |
| --- | --- |
| REST endpoint; API documentation; HTTP status codes | Fase backend berikutnya. Sekarang cukup interface layanan + data contracts frontend. |
| SQL DDL, migration, index, backup, database constraint | Fase backend/database berikutnya; jangan dibuat di project frontend. |
| JWT produksi, role endpoint, password bcrypt | Fase sistem autentikasi produksi. Simulasi auth sekarang bukan keamanan yang dapat dipercaya. |
| CSRF server, CORS, middleware, HTTP cookie | Fase integrasi backend. Browser-only demo tidak mempunyai server untuk diuji. |
| Upload objek ke storage publik/cloud, file URL persisten | Tidak digunakan. Foto hanya pratinjau lokal sementara. |
| Lighthouse >80, skor UAT, jumlah test lulus | Target/hasil baru boleh dicantumkan setelah ada pengukuran aktual. Angka di contoh SiLaporRT bukan hasil UBL LostnFound. |

## 16. Jejak sumber dan batas adaptasi

Dokumen ini menggabungkan pedoman akademik dan keputusan internal frontend UBL LostnFound. Ketentuan dosen dicatat menurut halaman PDF; aturan pagination 10 barang, penamaan folder, Figma Page 05, dan larangan storage permanen berasal dari keputusan proyek.

| Sumber | Bagian relevan | Status penggunaan |
| --- | --- | --- |
| Capstone-Pertemuan-5-8-Gabungan_2_261012_172409(2).pdf | hlm. 6–10 clean code; 11–12 dokumentasi; 17 frontend; 18–21 keamanan/performa; 23–25 milestone/teamwork. | Acuan utama kaidah; konteks backend dipisahkan. |
| IT_Capstone_Project_Sample_SiLaporRT_261012_172443(2).pdf | hlm. 3 WBS; 6 contoh validasi; 7 keamanan; 8–10 milestone, QA dan iterasi; 12–14 handoff. | Contoh format dan mekanisme kerja, bukan standar angka/fitur LostnFound. |
| UBL_LostnFound_Frontend_Blueprint_Page05_Pagination10.docx | Arsitektur Page 05, enam aset terverifikasi, folder roles, 10-item pagination, UX states. | Keputusan proyek yang dilanjutkan dalam pedoman ini. |
| Figma — 05 Role-Based Views | 01 Petugas / 02 Guest / 03 Mahasiswa, termasuk 07.M dan 07.D. | Sumber desain visual; catat node ID saat implementasi. |

### Keputusan autentikasi dan kontrak integrasi — ERD v6.2

users.user_id tetap UUID internal; users.Neon Auth_user_id VARCHAR(255) NOT NULL UNIQUE mengikat satu akun Neon Auth terverifikasi ke satu user CampusFind.

Pendaftaran STUDENT: email diverifikasi oleh Neon Auth, kemudian onboarding dengan nama lengkap dan NIM yang diisi sendiri. NIM tidak dinyatakan terverifikasi akademik.

OFFICER hanya ditetapkan oleh administrator sistem melalui backend/SQL terkontrol; tidak ada role ADMIN dan tidak ada pemilihan role OFFICER di frontend.

Kontrak API final: CampusFind_OpenAPI_Final_v1_0.yaml dan CampusFind_API_Contract_Final_v1_0.md. Frontend-only tetap menggunakan mock service; jangan memanggil API nyata sebelum fase integrasi.
