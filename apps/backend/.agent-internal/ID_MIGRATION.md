# ID_MIGRATION — Backend only

**Konflik ID lama:** frontend source `ROOT_TRACK_COMPATIBILITY.md` menyebut roadmap backend historis `B/A..B/G`, sedangkan roadmap aktif baru memiliki `B/A..B/M`. Nama `B/A` sama bukan bukti makna tugas identik. Jangan mengubah status historis atau menandai task selesai secara otomatis.

Paket ini menjaga 95 deskripsi tugas dan mengonversi ID dari draft `B/X.NN` menjadi format frontend role-first `B/X.n.m`, mulai `.0` per submilestone.

| ID draft 24 Okt 2026 | ID aktif bundle | Judul |
|---|---|---|
| `B/A.01` | `B/A.1.0` | Audit sumber lokal dan status Git |
| `B/A.02` | `B/A.1.1` | Tetapkan sumber kebenaran |
| `B/A.03` | `B/A.1.2` | Verifikasi Frontend MVP Gate |
| `B/A.04` | `B/A.1.3` | Petakan roadmap ID |
| `B/A.05` | `B/A.2.0` | Inventaris endpoint & DTO |
| `B/A.06` | `B/A.2.1` | Inventaris schema & constraint |
| `B/A.07` | `B/A.2.2` | Periksa dependensi layanan |
| `B/A.08` | `B/A.2.3` | Perencanaan perubahan dan izin coding |
| `B/B.01` | `B/B.1.0` | Inisialisasi backend modular |
| `B/B.02` | `B/B.1.1` | Konfigurasi environment aman |
| `B/B.03` | `B/B.1.2` | Bootstrap dan error envelope |
| `B/B.04` | `B/B.2.0` | Definisi Drizzle 8 tabel |
| `B/B.05` | `B/B.2.1` | Migration terkontrol |
| `B/B.06` | `B/B.2.2` | Ketentuan relasi dan status |
| `B/B.07` | `B/B.3.0` | Seed sintetis idempoten |
| `B/B.08` | `B/B.3.1` | DB integration harness |
| `B/B.09` | `B/B.3.2` | Bukti koneksi dan baseline |
| `B/C.01` | `B/C.1.0` | Kontrak public DTO |
| `B/C.02` | `B/C.1.1` | GET /posts |
| `B/C.03` | `B/C.1.2` | GET /posts/{post_id} |
| `B/C.04` | `B/C.2.0` | GET /items |
| `B/C.05` | `B/C.2.1` | GET /items/{item_id} |
| `B/C.06` | `B/C.2.2` | Performa/query defensif |
| `B/C.07` | `B/C.2.3` | Tes kontrak HTTP publik |
| `B/D.01` | `B/D.1.0` | Neon Auth JWT verifier |
| `B/D.02` | `B/D.1.1` | Mapping identity user |
| `B/D.03` | `B/D.1.2` | Role dan pos policy |
| `B/D.04` | `B/D.2.0` | GET /me |
| `B/D.05` | `B/D.2.1` | Officer provisioning trust boundary |
| `B/D.06` | `B/D.2.2` | Error/CORS/rate guard |
| `B/D.07` | `B/D.2.3` | Security test identity |
| `B/E.01` | `B/E.1.0` | R2 adapter & config |
| `B/E.02` | `B/E.1.1` | POST /uploads/intents |
| `B/E.03` | `B/E.1.2` | Signed PUT direct-to-R2 |
| `B/E.04` | `B/E.2.0` | POST /uploads/{upload_id}/finalize |
| `B/E.05` | `B/E.2.1` | Token replay & privacy |
| `B/E.06` | `B/E.2.2` | Signed image reads |
| `B/E.07` | `B/E.2.3` | R2 integration/security tests |
| `B/F.01` | `B/F.1.0` | POST /officer/items contract |
| `B/F.02` | `B/F.1.1` | Server-derived post & actor |
| `B/F.03` | `B/F.1.2` | Transaction item + photo |
| `B/F.04` | `B/F.2.0` | State and visibility rules |
| `B/F.05` | `B/F.2.1` | End-to-end real providers |
| `B/F.06` | `B/F.2.2` | Negative/concurrency cases |
| `B/F.07` | `B/F.2.3` | Backend MVP Gate review |
| `B/G.01` | `B/G.1.0` | GET /officer/inventory |
| `B/G.02` | `B/G.1.1` | GET /officer/items/{item_id} |
| `B/G.03` | `B/G.1.2` | PATCH /officer/items/{item_id}/visibility |
| `B/G.04` | `B/G.2.0` | GET /officer/inventory/overdue |
| `B/G.05` | `B/G.2.1` | Dashboard backend query mapping |
| `B/G.06` | `B/G.2.2` | Query/visibility regression |
| `B/H.01` | `B/H.1.0` | POST /me/bootstrap |
| `B/H.02` | `B/H.1.1` | POST /submissions |
| `B/H.03` | `B/H.1.2` | GET /submissions/me |
| `B/H.04` | `B/H.2.0` | GET /submissions/{submission_id} |
| `B/H.05` | `B/H.2.1` | POST /submissions/{submission_id}/cancel |
| `B/H.06` | `B/H.2.2` | State machine submission |
| `B/H.07` | `B/H.2.3` | Penyalahgunaan student auth |
| `B/I.01` | `B/I.1.0` | GET /officer/submissions |
| `B/I.02` | `B/I.1.1` | POST /officer/submissions/{submission_id}/receive |
| `B/I.03` | `B/I.1.2` | Receive atomicity |
| `B/I.04` | `B/I.2.0` | POST /officer/submissions/{submission_id}/reject |
| `B/I.05` | `B/I.2.1` | Foto report vs inventory |
| `B/I.06` | `B/I.2.2` | Review/status tests |
| `B/J.01` | `B/J.1.0` | POST /officer/items/{item_id}/return |
| `B/J.02` | `B/J.1.1` | Return ownership practice |
| `B/J.03` | `B/J.1.2` | POST /officer/items/{item_id}/distribute |
| `B/J.04` | `B/J.2.0` | Overdue policy & no automation |
| `B/J.05` | `B/J.2.1` | Race conditions & exactly once |
| `B/J.06` | `B/J.2.2` | History and data retention review |
| `B/K.01` | `B/K.1.0` | Integrasi scope dan izin |
| `B/K.02` | `B/K.1.1` | HTTP client/config |
| `B/K.03` | `B/K.1.2` | Guest list/detail |
| `B/K.04` | `B/K.2.0` | Officer register and upload |
| `B/K.05` | `B/K.2.1` | Officer inventory/detail |
| `B/K.06` | `B/K.2.2` | Visibility & state sync |
| `B/K.07` | `B/K.3.0` | Student & review integration |
| `B/K.08` | `B/K.3.1` | End-to-end full flow |
| `B/K.09` | `B/K.3.2` | Frontend regression & accessibility |
| `B/L.01` | `B/L.1.0` | Contract coverage |
| `B/L.02` | `B/L.1.1` | Security attack matrix |
| `B/L.03` | `B/L.1.2` | Race/transaction proof |
| `B/L.04` | `B/L.2.0` | Dependency & secret scanning |
| `B/L.05` | `B/L.2.1` | CI read-only human commits |
| `B/L.06` | `B/L.2.2` | Performance/limits |
| `B/L.07` | `B/L.3.0` | Logging/monitoring |
| `B/L.08` | `B/L.3.1` | Backup & recovery rehearsal |
| `B/L.09` | `B/L.3.2` | Hardening Gate |
| `B/M.01` | `B/M.1.0` | Persetujuan operasional |
| `B/M.02` | `B/M.1.1` | Staging environment |
| `B/M.03` | `B/M.1.2` | UAT alur nyata |
| `B/M.04` | `B/M.2.0` | Deployment guard |
| `B/M.05` | `B/M.2.1` | Pilot Pos Pengajaran |
| `B/M.06` | `B/M.2.2` | Operasional & handoff |
| `B/M.07` | `B/M.2.3` | Pilot exit review |

**Pemetaan checkpoint yang tidak identik:** `BACKEND_MVP.md` B0→B/A, B1→B/B, B2→B/C (GET subset), B3→B/D+B/E+B/F, B4→Gate B/F. Blueprint B1–B6 adalah fase *berbeda*, bukan task ID.

Jika root memiliki `B/A..B/G` lama, lakukan review kontrak & root task sebelum memasang pointer ke roadmap aktif; jangan menimpa dokumen atau menghapus progres.
