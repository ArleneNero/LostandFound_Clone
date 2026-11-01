# SECURITY_THREAT_MODEL — Backend QA controls

| Risk | Control | Negative test |
|---|---|---|
| JWT forgery / missing token | Neon Auth signature/issuer verification | 401 on protected routes |
| Role escalation | role DB, no body override | STUDENT to OFFICER routes => 403 |
| Cross-post access/BOLA | DB-scoped post/owner queries | officer A cannot get B inventory |
| SQL injection | Drizzle parameterized, sort allowlist | injected query does not expose records |
| Data leakage public | DTO allowlist + 404 hidden | private notes/PII absent |
| Duplicate report transition | row state guard + transaction | only one successful update, history consistent |
| Double physical return | unique item_returns.item_id + transaction | one return; second/concurrent conflict |
| R2 spoof/replay/IDOR | private bucket, strict intent/finalize, signed per-user token | forged MIME/size/path/token rejected |
| Unauthorized upload intent | role & purpose policy | wrong role/purpose rejected |
| CORS/rate abuse | exact origin allowlist, throttle | blocked origin/429 cases |
| Logging secrets/PII | redaction and sanitization | JWT/DSN/presigned URL not logged |
| Migration loss | isolated branch, review/backup/rollback | no destructive SQL without approval |
| Stale contract | hash + contract schema tests | drift BLOCKED, not silently shipped |

Do not claim penetration test without performing one in an authorized environment. See `DEPLOYMENT_SECURITY.md`.
