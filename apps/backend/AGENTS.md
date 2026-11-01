# AGENTS — Backend UBL LostnFound (LOCAL ONLY)

Sebelum bertindak baca `.agent-internal/README.md`, `WORKFLOW.md`, `CLEAN_CODE.md`, `GIT_POLICY.md`, `MILESTONES_Backend.md`, `TODO_Backend.md`, `task-registry.json` dan detail `milestones/B-X.md`. Kontrak OpenAPI v1.0/ERD v6.2 lebih tinggi dari contoh blueprint. Mulai `B/A` preflight; jangan mulai coding tanpa izin. Jangan menulis ke `apps/web` sampai Integration Gate B/K berizin. Tidak ada backend nyata hanya karena folder dokumentasi ada.

Larangan Git: `.md`, `.mdx`, AGENTS, `.agent-internal`, credential, `.env`, secrets, data pribadi, token/R2 signed URL tidak boleh di-stage/commit/push. GitHub Actions boleh menjalankan CI read-only saja; tidak boleh commit/push sebagai bot. Pesan commit harus sesuai `GIT_POLICY.md` dan dokumentasi lokal yang lebih tinggi. Gunakan identitas manusia yang sebenarnya mengerjakan/bertanggung jawab atas perubahan; jangan menyusun atribusi palsu.

Tiap task: audit → rencana → approval sesuai gate → implementasi → test → bukti → catat status → minta izin push/next milestone. `BLOCKED` bila kontrak/provider tidak jelas. Tidak ada `git add .`, `git push --force`, auto-deploy, migrasi destruktif tanpa persetujuan eksplisit.
