# FOLDER_STRUCTURE — Target, bukan klaim folder sudah dibuat

```text
apps/api/
  AGENTS.md                   # lokal/di-gitignore
  .agent-internal/            # lokal/di-gitignore
    README.md PRD.md PHASES.md ARCHITECTURE.md WORKFLOW.md
    MILESTONES_Backend.md TODO_Backend.md task-registry.json
    milestones/B-A.md ... B-M.md
    contracts/openapi-v1.0.yaml api-contract-v1.0.md erd-v6.2.dbml manifest.json
    tools/verify_backend_contracts.py
  src/
    app/ config/ plugins/ policies/ shared/
    modules/catalog/ modules/service-posts/ modules/identity/
    modules/submissions/ modules/inventory/ modules/item-returns/ modules/uploads/
    db/ integrations/
  tests/unit/ tests/integration/ tests/contract/ tests/security/
  drizzle/                    # hanya setelah migration design approved
  .env.example                # keys only, no secrets
```

Pilih versi Node/package manager mengikuti monorepo aktual; jangan membuat nested `.git` dan jangan memindahkan `apps/web`. Folder module dibuat **saat diperlukan**, bukan semua sekaligus demi angka file.
