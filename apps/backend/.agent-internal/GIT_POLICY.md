# GIT_POLICY — Backend + Human-only + AI documentation exclusion

## Sumber aturan & checkpoint

Baca root `AGENTS.md`, `apps/api/AGENTS.md`, Git rules lain yang berlaku dan dokumentasi lokal sebelum commit. Jika ada perbedaan nyata, `BLOCKED` dan minta keputusan; **jangan menebak format commit**. Paket Backend mengikuti pola Frontend: task 1 per waktu, commit lokal **satu per submilestone yang selesai/teruji**, bukan commit per file/checkbox, kecuali user meminta tahapan berbeda.

## Subject & body

Mengikuti aturan Frontend sumber: `<type>(<scope>): [<id>] <deskripsi singkat Bahasa Indonesia>` misalnya `feat(catalog): [B/C.2] implementasi katalog publik berbasis Neon` **hanya bila B/C.2 benar telah lulus**. Subject harus menjelaskan perubahan riil; body merinci task ID terkait, alasan, perilaku, test PASS/FAIL/NOT RUN, risiko, batas MOCK/DEV_DB/INTEGRATED. Jangan membuat pesan generik, histori palsu, tanggal palsu, atau atribusi kerja anggota yang tidak dapat diverifikasi.

## Author, bot, approval

- Commit author & committer harus identitas manusia yang sah dan bertanggung jawab atas pekerjaan; bukan `github-actions[bot]`, dependabot, AI bot, atau identitas anggota yang dipinjam.
- GitHub Actions hanya boleh CI read-only, `permissions: contents: read`, tanpa auto-commit/push. Jangan menyalin `.git` source bila rekonstruksi.
- Commit hanya setelah audit diff dan tes; **push/merge/deploy masing-masing memerlukan approval eksplisit terpisah** menurut kebijakan aktif. Jangan `push --force`, `reset --hard`, mengubah remote, atau squash seluruh progres sembarangan.

## Larangan staging absolut sesuai instruksi pengguna

JANGAN stage, commit, atau push file `*.md`, `*.mdx`, `AGENTS.md`, `.agent-internal/`, `.agents/`, `.claude/`, `.gemini/`, `SKILL.md`, `.env*` berisi secrets, key, signed URL, foto identitas, dump data, credential, atau binary ZIP mentah. `.gitignore` tidak menghapus file tracked: audit staged paths dan bila ada file terlarang stop/unstage tanpa rewrite history otomatis.

**Cek minimum**: `git status --short`, `git remote -v`, `git branch --show-current`, `git config --local user.name`, `git config --local user.email`, `git diff --cached --name-status`, `git diff --cached --check`, `git log -1 --format='%an <%ae> | %cn <%ce>'`; verifikasi remote commit SHA setelah izin push.
