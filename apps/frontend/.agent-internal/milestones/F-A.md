# F/A — Fondasi monorepo dan standar Figma

**Status:** `COMPLETED` · **Dependensi:** B/A (workspace); tidak mensyaratkan API berjalan · **Area:** `apps/web`.

**Syarat masuk:** baca `AGENTS.md`, `CLEAN_CODE.md`, `FIGMA_EXACT_RULES.md`, `ASSET_MANIFEST.md`, `FOLDER_STRUCTURE.md`, kontrak dan milestone saat ini sebelum perubahan.
**Syarat keluar:** lulus tes+visual relevant, laporan bukti, review pengguna, izin push/pindah fase. Seluruh checkpoint awal masih kosong.

## F/A.1 — Audit repo, baseline dan pengamanan source

**Figma/sumber:** 00 Style Guide; seluruh role

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/A.1.0` Audit repository monorepo | Periksa root Git dan apps/web apps/api yang ada; jangan overwrite source eksisting | Tree terdata; root bukan git repo; apps/web ada; tidak ada repo kedua | `COMPLETED` |
| `F/A.1.1` Tetapkan batas kerja frontend | Rumuskan owner apps/web, mekanisme shared contract read-only, catatan dependency | apps/web terkunci; apps/api tidak diubah; kontrak read-only | `COMPLETED` |
| `F/A.1.2` Audit clean code sebelum coding | Baca CLEAN_CODE.md dan source standards DOCX yang dikonversi; buat checklist kepatuhan | Batas ukuran (20/80/150/100/200/300) dan anti-god-component tercatat | `COMPLETED` |
| `F/A.1.3` Audit Figma dan aturan prioritas | Validasi halaman style guide link user, halaman role Page05 dan konflik jika ada | Page 05 (373:2904) & Section 01-03 diverifikasi via Figma MCP API di file user | `COMPLETED` |
| `F/A.1.4` Verifikasi assets asli | Periksa semua 6 file dengan manifest, ukuran, hash dan path case-sensitive | 6 file SHA-256 cocok 100% dengan ASSET_MANIFEST.md; tidak ada placeholder | `COMPLETED` |

**Quality gate `F/A.1`:** Clean Code source dibaca; audit tree, Figma node, dan SHA-256 asset lulus; status `COMPLETED`. Tidak ada auto-push.

## F/A.2 — Design tokens, layout dan navigasi dasar

**Figma/sumber:** 00 style; Page05 Mobile/Desktop

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/A.2.0` Buat Vite React TypeScript baseline | Setup apps/web sesuai stack dan npm lock faktual | React 19 + Vite 6 + TS 5.7 + Tailwind 4; 91 pkgs 0 vuln; build & typecheck PASS | `COMPLETED` |
| `F/A.2.1` Buat tokens CSS dari Figma | Plus Jakarta Sans; warna, radius, spacing terukur | tokens.css & globals.css terpasang sesuai Figma 34:67 & DESIGN_SYSTEM.md | `COMPLETED` |
| `F/A.2.2` Buat primitive UI | Button, Input, Select, Modal, Card, Skeleton, Toast, ErrorState | 8 komponen UI primitive di src/components/ui/; varian exact Figma, clean code ≤80 LOC | `COMPLETED` |
| `F/A.2.3` Buat layout responsif | OfficerLayout, PublicLayout, StudentLayout tanpa duplikasi mobile/desktop | Desktop sidebar 244px & mobile bottom nav 64px, safe-area, tanpa horizontal scroll | `COMPLETED` |
| `F/A.2.4` Buat routing dan navigation constants | RoutePaths dan page shell; dummy protected view hanya UX | RoutePaths terdefinisi; 16 page shells terpasang; router.tsx terintegrasi | `COMPLETED` |

**Quality gate `F/A.2`:** Clean Code source dipatuhi (semua file ≤135 baris, 0 >300); typecheck PASS; build PASS; responsive layout terverifikasi; status `COMPLETED`. Tanpa auto-push.

## F/A.3 — Kontrak service dan fixture bersih

**Figma/sumber:** Bebas frame; domain mengikuti ERD/API

| Task | Pekerjaan | Bukti & acceptance | Status |
|---|---|---|---|
| `F/A.3.0` Tentukan types DTO dan view-model | Baca OpenAPI; pisahkan types/api dan types/domain | types/api/ (wire snake_case) & types/domain/ (camelCase) + mappers typed | `COMPLETED` |
| `F/A.3.1` Buat service interface async | Item, Submission, Post, Auth, Upload, Return | services/contracts/ (IItemService, ISubmissionService, IPostService, IAuthService, IUploadService) | `COMPLETED` |
| `F/A.3.2` Buat registry untuk adapter | Pilih in-memory atau HTTP secara eksplisit, tidak fallback silent | services/registry.ts (in-memory mode aktif; http mode throw eksplisit jika belum ada backend) | `COMPLETED` |
| `F/A.3.3` Buat application store untuk demo | Satu state bersama lintas role, reset saat reload | data/mockStore.ts reset on reload, tanpa localStorage/IndexedDB, non-PII | `COMPLETED` |
| `F/A.3.4` Buat test infrastruktur dan cek quality gates | Lint, typecheck, unit, satu smoke test layout | Vitest 2 test suites (8 tests) PASS, typecheck PASS, build PASS, 0 file > 155 LOC | `COMPLETED` |

**Quality gate `F/A.3`:** Clean Code dipatuhi; tests PASS (8/8 tests); typecheck PASS; build PASS; status `COMPLETED`. Tanpa auto-push.

## Persetujuan untuk pindah tahap

Selesaikan semua sub-milestone berdasarkan bukti dan review pengguna. **Tidak boleh mulai milestone berikutnya hanya karena task checklist dicentang sendiri.**
