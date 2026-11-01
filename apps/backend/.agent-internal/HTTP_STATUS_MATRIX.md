# HTTP_STATUS_MATRIX — contract-first

**Do not assume all status codes apply to every operation.** For each route, read `contracts/openapi-v1.0.yaml` response map and implement/test exactly those responses.

- `200`: successful GET, finalize, patch/distribute when specified.
- `201`: successful POST create (officer item, upload intent, submission, return, etc.) when specified.
- `400` / `422`: distinguish malformed vs semantically invalid input per contract; Zod mapping consistent.
- `401`: missing/invalid Neon Auth authentication on protected route.
- `403`: authenticated identity without required role/assignment/ownership; use `404` for concealment if contract/policy calls for it.
- `404`: absent public item, hidden/non-STORED item, no resource in authorized scope.
- `409`: state transition conflict, duplicate return, concurrent update, reused upload token as defined.
- `429`: if documented for route and rate-limit exceeded.
- `500`: internal errors; sanitized envelope only.

Error structure: `{ "error": { "code": "...", "message": "...", "request_id": "..." } }`. Do not leak SQL errors, stack traces or object keys. Successful body envelope `{data}` / `{data,meta}` by schema.
