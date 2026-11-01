# WORKFLOW — role-first & Figma gate

## Preflight untuk SETIAP task
1. Baca `apps/web/AGENTS.md` lalu `README.md`, **`CLEAN_CODE.md` dan `references/FRONTEND_STANDARDS_SOURCE.md` penuh**, `FIGMA_EXACT_RULES.md`, `ASSET_MANIFEST.md`, `FOLDER_STRUCTURE.md`, dan file milestone/contract relevan.
2. Audit Git working tree, folder nyata, gambar tersedia, types, role, komponen reuse, node Figma. Jangan asumsi screenshot Page05 dari link style guide.
3. Tentukan **hanya satu task aktif** (contoh F/B.1.0) dan rencana perubahan path/risiko/test; tunggu klarifikasi saat conflict.
4. Jalankan `tools/verify_assets.py` jika menggunakan visual image dan `tools/verify_backend_sync.py` jika mulai HTTP integration.

## Coding dan checklist
- Tahap wajib F/A→F/B Petugas→F/C Guest→F/D Mahasiswa/Login→F/E GET backend→F/F operasi nyata→F/G QA.
- Jangan mulai role berikutnya tanpa **izin pengguna setelah demonstrasi role sebelumnya**. Jangan mengerjakan integrasi mendahului mock kecuali user menyetujui exception P7.
- Gunakan page→hook→service→adapter→store/API. Katalog shared. Aset user exact. Clean Code harus dipatuhi, review >300 baris wajib.
- Setiap layar diuji behavior dan *visual comparison* Figma 390/1440/768; nilai PASS/FAIL/NOT RUN. Jika layar tidak cocok atau aset tidak ada, task `BLOCKED`/`IN_PROGRESS`, bukan COMPLETED.
- Backend adalah sumber nyata: GET server paginasi, response envelope, 409 conflicts, upload token, Neon Auth role; tidak ada endpoint buatan atau fallback mock diam-diam.

## Gate satu sub-milestone
- Kirim ringkasan ID task + file touched + jumlah baris; test log lint/typecheck/build/unit/E2E sesuai relevansi; screenshot source vs actual; hash asset; API drift check; failure list.
- Jika ada kode dan tes lulus, satu commit lokal koheren; tidak push otomatis. Track status TODO berdasarkan bukti saja.

## Gate satu milestone / role
- F/B Petugas **semua** layar/fungsi mock harus direview; baru minta izin F/C Guest.
- F/C Guest semuanya direview; baru minta izin F/D Mahasiswa/Login.
- F/D login, recovery, report, riwayat semuanya direview; baru minta izin F/E integration.
- F/E requires actual network GET Fastify Neon and B/E POST officer/item verified.
- F/F requires Neon Auth + R2 + backend B/F real with cross-role persistent data.
- F/G requires actual QA, 429/503 recovery, security check dan izin deploy terpisah.

## Handoff agent wajib

```text
Task: F/B.1.0 (PLANNED -> IN_PROGRESS -> COMPLETED only with evidence)
Role: PETUGAS | Scope: Dashboard | Figma file/page/node: (actual)
Assets: verify_assets.py PASS/FAIL/NOT RUN
Clean code source read: YES/NO; file LOC + review status
Tests: format=?, lint=?, typecheck=?, build=?, unit=?, e2e=?, visual=?
Visual evidence: Figma screenshots vs local 390/768/1440; deviations
Backend contract verify: PASS/NOT APPLICABLE/BLOCKED
Commit: hash atau BELUM; Push: BELUM; Next role: WAIT USER APPROVAL
```
