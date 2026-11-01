# .gitignore merge suggestion (do not overwrite existing file)

```
# Local AI/agent instructions and documentation
**/.agent-internal/
**/AGENTS.md
**/*.md
**/*.mdx
.agents/
.claude/
.gemini/
.cursor/
# secrets & generated artifacts
**/.env
**/.env.*
!**/.env.example
**/node_modules/
**/dist/
**/coverage/
```

Check existing tracked files separately; `.gitignore` does not untrack committed files. Do not blindly run `git rm --cached` on another contributor's work. Commit runtime files only by explicit staging and approval.
