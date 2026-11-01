# Aturan root .gitignore (GABUNG, jangan overwrite)

```gitignore
/AGENTS.md
/.agent-internal/
/apps/web/AGENTS.md
/apps/web/.agent-internal/
/README_PAKET.md
/GITIGNORE_TAMBAHAN.md
**/.env
**/.env.*
!**/.env.example
**/node_modules/
**/dist/
**/.dev.vars
**/.dev.vars.*
```

**PENTING:** jangan meng-ignore `apps/web/public/` — enam aset tersebut diperlukan ketika aplikasi berjalan. Sebelum `git add`, pilih explicit source files dan pastikan tidak ada secret; `AGENTS.md`/`.agent-internal` tetap lokal.
