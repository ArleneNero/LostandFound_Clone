# DEPLOYMENT_SECURITY — deferred until approved

- Dev/test not production. Do not deploy to live or use real student data before authorized campus/operator approval, privacy/retention policy, SOP verification, backups and incident contact.
- CI quality check read-only; no GitHub Actions bot commits; no secret in workflow or logs; minimized permissions.
- For staging: HTTPS, exact CORS, secure headers, strict environment config, rate limit, error redaction, pinned deps and vulnerability review; test actual Neon Auth/R2/Neon.
- DB migration: direct connection on isolated branch, backup/restore plan, no production DDL without approval; test rollback.
- Private R2 object read via authorized short-lived URL; reject plain public storage-path enumeration. Retention/cleanup rules need business approval.
- UAT: officer roles, legitimate campus handover/pickup process, return and distribution, privacy and audit logs; signed approval before campus pilot.
- Evidence: restore drill, authorized security tests, E2E screenshots/network, dashboard logs; NOT RUN when unavailable.
