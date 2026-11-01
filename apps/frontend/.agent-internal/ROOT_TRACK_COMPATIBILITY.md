# ROOT_TRACK_COMPATIBILITY — Penyatuan dengan roadmap backend

Backend canonical dari `UBL_LostnFound_Agent_Docs_Updated.zip` memakai `B/A..B/G` yang **TIDAK berubah** di paket ini. Namun daftar `F/*` dalam root docs backend sebelumnya masih memakai urutan *catalog first*, bukan role-first.

## Action wajib setelah ekstrak ke monorepo

1. Pertahankan seluruh backend `B/*`, source `apps/api/`, root `.agent-internal/contracts/*` tanpa perubahan.
2. Tandai **frontend F/* lama di root sebagai `SUPERSEDED: lihat apps/web/.agent-internal/ID_MIGRATION.md`**, tanpa menghapus bukti progres lama yang benar-benar sudah terjadi.
3. Ubah root overview `F/*` menjadi pointer `apps/web/.agent-internal/MILESTONES.md` dan TODO nested. Jangan duplikasi checklist atau menganggap F/B lama=F/B baru.
4. Root `AGENTS.md` tambahkan instruksi: untuk task frontend baca `apps/web/AGENTS.md`; prioritas exact-Figma + role-first + Clean Code dan asset SHA.
5. Root approval gate Git sama, tidak ada auto push/deploy; backend milestone B/* tidak dinomori ulang.

## Cross area integration dependency

| Frontend | Backend prerequisite | Gate integrasi |
|---|---|---|
| `F/A` | `B/A` konsep folder bersama, API tidak wajib online | monorepo konsisten |
| `F/B`,`F/C`,`F/D` | Tidak wajib backend live untuk UI mock | Figma screens exact; in-memory source shared |
| `F/E` | `B/E` (termasuk `B/B` Neon, `B/C` Neon Auth, `B/D` R2 sesuai backend dependencies) | GET katalog/detail nyata, backend POST officer/items P7 terbukti |
| `F/F` | `B/F` full 22 endpoint + services nyata | Neon Auth JWT, R2 intent/PUT/finalize, OFFICER per post, full E2E |
| `F/G` | `B/G` staging (Cloudflare Worker feasibility gate) | QA/deploy consent |

**Exception P7:** Bila tenggat Pertemuan 7 lebih dulu, pemilik dapat memberi izin untuk subset `F/E` setelah `F/C`. Tandai dependency override tertulis, `F/D` tetap PLANNED, dan jangan klaim role Mahasiswa selesai. **Tidak otomatis disetujui oleh paket ini.**

## Saran patch root AGENTS (manual approval)

```markdown
### F/* frontend active source-of-truth (role-first)
- Selalu baca `apps/web/AGENTS.md` dan `apps/web/.agent-internal/CLEAN_CODE.md` sebelum mengerjakan F/*.
- Rencana F/* lama di root superseded oleh `apps/web/.agent-internal/MILESTONES.md`; lihat `ID_MIGRATION.md`.
- Urutan F/A -> F/B Officer -> F/C Guest -> F/D Student -> F/E public API -> F/F full API -> F/G QA.
- Jangan mulai role berikutnya, push, merge atau deploy tanpa izin pengguna.
```
