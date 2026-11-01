# PHASES — Urutan role-first yang DIKUNCI

| Urutan | Milestone | Deliverable | Kapan lanjut |
|---:|---|---|---|
| 1 | `F/A` | React/Router/UI tokens/Figma/assets/clean code/kontrak mock | Semua preflight lulus dan izin |
| 2 | `F/B` | **PETUGAS FULL** dashboard, inventory, create, receive, reject, return/distribute mock | Screenshot + tests + **review dan izin pengguna** |
| 3 | `F/C` | **GUEST FULL** landing, beranda, katalog, detail, pos, panduan mock | Screenshot + tests + **review dan izin pengguna** |
| 4 | `F/D` | **MAHASISWA + LOGIN FULL** register/OTP/reset, report, history/cancel, profile mock | Screenshot + tests + **review dan izin pengguna** |
| 5 | `F/E` | GET katalog/pos/detail nyata Fastify/Neon; P7 integration gate | Backend `B/E` siap dan bukti network |
| 6 | `F/F` | Neon Auth, R2, POST/PATCH operasional Student+Officer nyata | Backend `B/F` siap dan E2E role |
| 7 | `F/G` | Pixel-fidelity review, QA/load/anti-spam UX, UAT, deployment | Backend `B/G`, persetujuan khusus deploy |

**Jangan mengerjakan role di luar urutan** kecuali pengguna menyetujui exception secara eksplisit. Jika kebutuhan Pertemuan 7 lebih dahulu, ajukan jalur F/E priority yang disetujui, **jangan memalsukan status F/B–F/D**.

Format ID `F/A.1.0` (task granular mulai `.0`), `F/A.1.0(1)` (revisi setelah task selesai). `B/*` tetap backend sesuai plan semula; di monorepo 1 repository.
