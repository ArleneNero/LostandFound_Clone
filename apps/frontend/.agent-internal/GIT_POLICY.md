# GIT_POLICY — Frontend, satu monorepo, izin per gerbang

Mengikuti kebijakan backend root `.agent-internal/GIT_POLICY.md` yang terbaru, dengan ID area `F/*` dan lokasi `apps/web/`.

- Task `F/A.1.0`: coding dan uji, **tanpa commit wajib**, tanpa push.
- Sub-milestone `F/A.1`: setelah seluruh task lulus tes dan diff, **1 commit lokal** koheren bila ada perubahan source. Jangan push.
- Milestone `F/A`: review seluruh sub-milestone dan branch, baru **minta persetujuan eksplisit** untuk `git push` branch milestone yang disebut. Izin ini **tidak** berarti izin merge `main`, deploy, mengubah backend, atau lanjut milestone lain.
- Revisi pekerjaan selesai: `F/D.2.1(1)` (revisi 1), bukan pengulangan testing biasa; lampirkan gejala, penyebab, perbaikan dan regresi test.
- Jika perlu mengubah `apps/api` atau shared contracts, ajukan task terpisah area `B/*`; tidak menyelesaikan mismatch dengan patch backend terselubung.

**Conventional commit:** `<type>(<scope>): [<id>] <deskripsi singkat Bahasa Indonesia>`; scope fitur (`catalog`, `auth`, `officer`, `forms`, `setup`, `photos`). Bila 1 commit menutup sub-milestone, subject `[F/B.2]` dan body rincikan task `[F/B.2.0..]` yang lulus. Pengujian harus faktual `PASS/FAIL/NOT RUN`.

Branch direkomendasikan `milestone/f-a-foundation`, `milestone/f-d-api-integration`, dst., tetapi cek branch/remote yang sudah ada sebelum membuatnya. Dilarang `git push --force`, `reset --hard`, hapus branch, atau mengubah remote tanpa izin.

**Audit sebelum commit:** `git status --short`, `git branch --show-current`, `git remote -v`, stage path eksplisit, `git diff --cached --name-status`, `git diff --cached --check`, review secret. Jangan stage `apps/web/AGENTS.md`, `apps/web/.agent-internal/`, `AGENTS.md` root, `.env`, artefak snapshot privat, presigned URL, credentials.

**Handoff:** ID task, file count/baris, `format/lint/typecheck/build/unit/e2e` hasil nyata, screenshot responsif, API screenshot/network evidence jika integrasi, hash commit atau BELUM, status push dan izin selanjutnya.

## Penegasan approval role-first

- **F/B Petugas → F/C Guest** dan **F/C Guest → F/D Mahasiswa/login** tidak boleh pindah sebelum pemilik review dan izin secara eksplisit.
- Semua `F/*` lama di root backend harus direkonsiliasi menggunakan `ID_MIGRATION.md` lebih dulu. Jangan membuat commit dengan ID lama untuk pekerjaan baru.
- **Asset `apps/web/public/`** dari ZIP pengguna adalah source UI yang boleh di-commit jika disetujui; larangan commit hanya untuk dokumen instruksi internal, bukan untuk aset front-end runtime. Jangan commit file ZIP mentah kecuali diminta.
