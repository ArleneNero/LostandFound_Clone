# Role-first QA gates

1. All coding tasks: read Clean Code source + docs first, inspect source/branch, exact Figma frame and asset manifest.
2. F/B Officer: Dashboard, Inventory, Direct Create, Incoming Reports, Receive/Reject, Visibility, Return/Distribute, responsive and error states. **User approves before Guest.**
3. F/C Guest: Landing, Home, Catalog10 (0/1/10/11/21), Detail404, Posts0-3 photos, Guide. **User approves before Student.**
4. F/D Student/login: Login/Register/OTP/Recovery, Profile, Submission1photo, History/Cancel, shared Catalog. **User approves before API integration.**
5. F/E: canonical contract match, actual Fastify Neon GET in browser Network, verify B/E 3 endpoints, server pagination not re-sliced.
6. F/F: Neon Auth user verified/Officer provisioned, R2 upload intent PUT finalize, 22 operations as used, E2E cross role, 409 & auth failures.
7. F/G: screenshot compare 390/1440 + 768, actual assets no broken link, clean code counts, 429/503 UX, approval deployment.

All tests factually PASS/FAIL/NOT RUN; no invented successful outcome.
