# CONTRACT_DIFF_AUDIT — baseline, NOT implementation evidence

Validated baseline from local Frontend agent sources: 22 method+path combinations, 8 ERD tables, response body snake_case, photo tokens exactly one for ItemCreateRequest and ReceiveRequest.

**Known disagreement:** BACKEND_MVP prose describes min/max 1–5; YAML snapshot has 1..1. Use canonical YAML. Photo storage DBML rules require 1 photo primary; post gallery 0..3. **Known incorrect informal endpoint:** GET officer/items as list — OpenAPI has GET officer/inventory.

At task execution: rehash root canonical and local snapshots; report exact source path, hash, field/method and decision. Do not mutate contracts or silently choose older snapshot.
