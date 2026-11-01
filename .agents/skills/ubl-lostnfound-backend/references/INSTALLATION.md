# Installing Backend Agent Overlay

The ZIP is a **skill with an optional local documentation overlay**, not an application build.

1. Inspect existing `apps/api/`, `.agent-internal`, and root contracts. Back up existing files and compare; do not overwrite.
2. Merge `assets/project-overlay/apps/api/AGENTS.md` and `assets/project-overlay/apps/api/.agent-internal/` into local project only after confirming no collisions. Preserve frontend files and repo Git history.
3. Put `apps/api/AGENTS.md` and `apps/api/.agent-internal` in `.gitignore` according to current repo policy (also exclude *.md, *.mdx if user policy applies); existing tracked files must be addressed safely without force rewrite.
4. Run `python apps/api/.agent-internal/tools/verify_backend_contracts.py`, then read `README.md`, `MILESTONES_Backend.md`, `TODO_Backend.md`, `GIT_POLICY.md`, `WORKFLOW.md`.
5. Begin with B/A preflight; every task PLANNED, no credentials or code deployed. No root Git modifications by the skill installation itself.
