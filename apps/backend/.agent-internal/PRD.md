# PRD — Backend CampusFind

## Masalah dan cakupan

Aplikasi internal kampus untuk mencatat dan memublikasikan **barang yang ditemukan**. Tiga pos dalam data (Pengajaran, Perpustakaan, Lab Komputer), tetapi operasional awal hanya Pos Pengajaran. Guest melihat barang publik tanpa login, Mahasiswa dapat melapor temuan, Petugas menerima/menolak laporan dan mengelola inventaris. Pengembalian kepemilikan hanya melalui verifikasi **tatap muka**, bukan klaim online.

## Role dan aturan

- Guest: bukan role database, tidak login untuk katalog/pos publik.
- STUDENT: akun Neon Auth email terverifikasi + NIM diisi sendiri tanpa klaim verifikasi akademik; boleh membuat dan mengelola laporan miliknya.
- OFFICER: dibuat/ditetapkan secara administratif; akses dibatasi `assigned_post_id` dari DB, tidak dapat self-register sebagai officer.
- Tidak ada role ADMIN DB, laporan barang hilang, KTP/NIK, foto identitas saat pengembalian.

## Core business flow

1. Officer langsung mencatat barang + satu foto terverifikasi → found_items dan item_photos di Neon.
2. Barang STORED terlihat publik hanya jika `is_visible=true`; barang hidden/returned/distributed tidak tampil.
3. Student melaporkan barang ditemukan + satu foto → `PENDING_RECEIPT` dan audit history; officer bisa receive/reject, student bisa cancel selama sah.
4. Officer receive: validasi kepemilikan laporan, penerimaan fisik, foto inventaris + transaksi, status history dan found_item dibuat atomik.
5. Officer return in person: penerima dan ringkasan verifikasi wajib, item_returns tepat satu per barang; item berstatus RETURNED_TO_OWNER, hidden. Distribution manual: DISTRIBUTED, hidden, tanpa item_returns.
6. Pos dengan `storage_limit_days` hanya menghitung overdue; tidak auto-remove/auto-distribute.

## MVP vs roadmap lanjutan

P0 Backend MVP: 3 endpoint inti + 2 endpoint upload, DB real, role security, tests. P1 API inventaris Officer, student reports, receipt, return, frontend integration. P2 security/hardening/observability. P3 pilot setelah approval kampus. Lihat MILESTONES dan BACKEND_MVP.

## Non-goals

Tidak ada produksi, real users, go-live, fallback mock yang disembunyikan, perubahan OpenAPI/ERD tanpa approval, atau jaminan sistem aman tanpa uji.
