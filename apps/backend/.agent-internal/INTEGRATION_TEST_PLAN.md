# INTEGRATION_TEST_PLAN — Backend & Frontend gates

## Database / migrations

- 8 tables match ERD; correct FKs, unique, CHECK, UUID/role enums. `users.Neon Auth_user_id` UNIQUE NOT NULL.
- Seed synthetic only and idempotent; STORED visible, STORED hidden, RETURNED/DISTRIBUTED, enough rows to prove pagination 10; cleanup predictable.
- Isolation dev/test Neon branch; no destructive SQL without approval.

## Public GET

- `GET /items` 200, query q/category/post/sort, stable order, limit 1..10, pagination, filter-before-page; never expose non-STORED/hidden.
- `GET /items/{id}` valid 200, missing/hidden/non-STORED 404; absence of private notes/email/NIM/R2 key.
- `/posts` and `/posts/{id}` DTO photos 0..3 without storage keys.

## Neon Auth, R2, POST

- 401 no JWT, 403 STUDENT to officer, 403 cross-post; identity DB role. No debug bypass.
- `POST /uploads/intents` allowed MIME/5 MiB/role/purpose, URL TTL; signed PUT R2; finalize verifies actual bytes/object + token ownership/purpose/replay.
- `POST /officer/items` expects exactly 1 photo token; 201 real provider, records item+primary photo atomically. 0 or >1 tokens must not pass.

## Operational

- Student bootstrap cannot choose role; report create/list/detail/cancel own only; status history initial/transitions correct.
- Officer receive/reject use per-post scope, manual physical receipt; concurrent receive not duplicate inventory.
- Return requires recipient_name + verification_summary; one item_returns max; state transitions atomic/hidden. Distribute manual, no return row.
- Overdue computed by received_at/storage_limit_days, no silent status change.

## Frontend Integration Gate

- **Only after approval:** replace mock with HTTP adapter; no silent fallback. Login Neon Auth, upload R2, POST officer, list/detail guest real, inventory officer from `/officer/inventory`, student flows if authorized.
- E2E full browser with 2 roles + Guest; data survives refresh and server restart. Different roles cannot access forbidden records.

## QA bookkeeping

Every scenario: case ID, preconditions, request, expected response, actual response, environment/provider, PASS/FAIL/NOT RUN, evidence link/path, test timestamp. Never mark Gate complete from mocks alone.
