# B/M — Staging, UAT & Campus Pilot

**Status awal:** `PLANNED` · **Prioritas:** `P3` · **Area:** `apps/api` (kecuali B/K dengan approval) · **Depends:** B/L accepted + formal campus/operator approvals

**Crosswalk:** Pilot / deferred. Ini milestone package B/A..B/M; jangan menyamakan secara numerik dengan `B0..B4` (MVP checkpoint) atau `B1..B6` (blueprint).

**Preflight sebelum tugas:** baca `../README.md`, `../GIT_POLICY.md`, `../CLEAN_CODE.md`, kontrak canonical, `../PRECODING_CHECKLIST.md`, dan dokumentasi task relevan. Gunakan izin terpisah untuk coding/push/merge/deploy.

## B/M.1 — Operational approval, staging and UAT

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/M.1.0` Persetujuan operasional | Tentukan pengelola, petugas resmi, pemilik data, SOP verifikasi pemilik, data retention, privacy notice; tanpa menganggap kampus memberi izin. | Signed approval/UAT plan atau BLOCKED. | `PLANNED` |
| `B/M.1.1` Staging environment | Siapkan env terpisah dan domain/HTTPS sesuai izin; migration/seed uji; buka Swagger terbatas, tidak mengumbar debug. | Staging smoke test dan secret-safe config. | `PLANNED` |
| `B/M.1.2` UAT alur nyata | Uji penerimaan temuan, registrasi langsung, public catalog, laporan student, retur/penyaluran jika scope disetujui. | UAT matrix with named roles not PII. | `PLANNED` |

**Exit gate B/M.1:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## B/M.2 — Deployment, pilot and handoff

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/M.2.0` Deployment guard | Lakukan deploy hanya setelah approval eksplisit, migration preview, rollback dan backup checkpoint. Tidak menyentuh produksi tanpa izin. | Release signoff / rollback plan. | `PLANNED` |
| `B/M.2.1` Pilot Pos Pengajaran | Aktifkan hanya Pos Pengajaran, pos lainnya disiapkan secara skema tetapi tidak diaktifkan tanpa keputusan. | Pilot scope approval and measured outcomes. | `PLANNED` |
| `B/M.2.2` Operasional & handoff | Siapkan incident contact, credential rotation SOP, support FAQ, maintenance and bug backlog; bukti transfer pengetahuan. | Operator runbook locally, no secrets. | `PLANNED` |
| `B/M.2.3` Pilot exit review | Evaluasi usability, stability, privacy, defects, next backlog; jangan klaim production-ready otomatis. | UAT/lessons learned with go/no-go. | `PLANNED` |

**Exit gate B/M.2:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## Gate milestone

- Dependency terpenuhi: B/L accepted + formal campus/operator approvals.
- Contract hash and DTO drift check `PASS` atau `BLOCKED` bila sumber tak tersedia.
- Negative tests role/ownership/status yang relevan; rollback/transaksi untuk mutasi.
- Evidence nyata: command, hasil HTTP status, DB query dengan data sintetis, output test, file berubah, risiko.
- Konfirmasi izin pengguna sebelum melakukan `git push`, merge/deploy, atau melanjutkan milestone berikutnya.
- `apps/api/.agent-internal` dan `AGENTS.md` adalah lokal only: jangan commit/push `.md`, `.mdx`, atau secret.

**KHUSUS PILOT:** harus ada izin eksplisit institusi/owner data dan SOP sebelum penggunaan data mahasiswa atau go-live.
