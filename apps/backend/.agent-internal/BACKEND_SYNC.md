# BACKEND_SYNC — local snapshot vs active canonical

1. Determine canonical `.agent-internal/contracts` from root if present. Do not assume local snapshots override authoritative root contract.
2. Compare SHA-256 of OpenAPI, DBML, API Contract against manifest; run `tools/verify_backend_contracts.py` and inspect mismatch details.
3. For every proposed endpoint, inspect `API_ROUTE_MATRIX.md` and actual YAML path/security/DTO; never create derived GET officer/items.
4. `BACKEND_MVP.md` prose uses photo tokens 1–5; attached OpenAPI YAML sets exactly one; if root canonical differs, report CONTRACT_DRIFT and ask user before editing.
5. Frontend `apps/web/.agent-internal` is separate and must not be overwritten; changes only at B/K after approval.
