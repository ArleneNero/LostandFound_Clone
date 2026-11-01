# ARCHITECTURE — React frontend dalam monorepo Fastify backend

- **Monorepo:** apps/web (React 19, Vite, TypeScript, Tailwind), apps/api (Fastify, Drizzle/Neon/Neon Auth/R2), packages/ optional. Jangan membuat tiga React app role.
- **Source order:** F/A foundation → F/B Officer UI mock → F/C Guest UI mock → F/D Student login/report UI mock → F/E HTTP public real → F/F Neon Auth + R2 + business operations real → F/G QA/deploy.
- **Composition:** Router+providers → Page→Hook→Service interface→ (InMemory adapter + one reactive store) / (HTTP adapter→Fastify API canonical).
- **Mock:** reset on refresh, seeding non-real identities, one global source to demonstrate cross-role operations; hidden/catalog filtering in mock pipeline before pagination. F/B Officer first means catalog UI may not exist yet: mock service still stores visibility state for future F/C; do not build Guest screens ahead of F/B.
- **HTTP:** source truth server, `snake_case` wire DTO vs UI view model via mapper, server-side page limit=10; never re-paginate response or fallback to mock silently.
- **Security:** Guest public, student JWT Neon Auth and verified email bootstrap, officer role validated backend/assigned post. Browser route guards UX only.
- **Storage:** `apps/web/public` six static images user-supplied for UI; runtime R2 image uploads only F/F after intent/PUT/finalize. Do not replace static brand asset with R2 upload.
- **Figma:** exact match on elements, typography, tokens, responsive, state, icons, layout. See FIGMA_EXACT_RULES. Fail task visual gate if screenshot not obtained.
- **Backend:** snapshot read-only `contracts/openapi-v1.0.yaml`, `api-contract-v1.0.md`, `erd-v6.2.dbml`, hash compared to root canonical. 22 endpoint paths API `/api/v1`, no speculation.
- **Deployment candidate:** Cloudflare Pages frontend. API Cloudflare Workers only if Fastify runtime/Neon/R2 compatibility proven by B/*; no automatic switch and no production readiness claim.
