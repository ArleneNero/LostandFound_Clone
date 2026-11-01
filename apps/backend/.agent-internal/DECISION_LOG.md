# DECISION_LOG — decisions from project sources

| Topic | Active decision | Evidence / limitation |
|---|---|---|
| Domain | Found items only; no online lost-report/claim | ERD v6.2 + OpenAPI final |
| First operational post | Pos Pengajaran | other two posts modeled, not active by assumption |
| DB roles | STUDENT, OFFICER; no ADMIN, Guest public | OpenAPI enums |
| Student number | self-declared, not academically verified | OpenAPI description |
| Officer privilege | assigned via trusted backend; post scope from DB | backend blueprint / contract |
| Schema | 8 ERD tables; exactly 1 inventory/report photo | v6.2 + OpenAPI snapshot |
| Catalog | STORED + is_visible true; hidden 404 | OpenAPI |
| Returns | physical verified, one item_returns, no ID photo | ERD + blueprint |
| Distribution | manual DISTRIBUTED, hidden, no item_returns | ERD + blueprint |
| Upload | R2 private, intent/PUT/finalize, mime/size checks | OpenAPI/blueprint |
| Unresolved | campus operational ownership, retention policy, external provider credentials, staging/UAT approval | do not claim ready |
| Contract drift | BACKEND_MVP text says 1–5 photos; canonical snapshot has exactly 1 | canonical wins; request decision if workspace canonical differs |
| Milestone mapping | package B/A–B/M ≠ MVP B0–B4 ≠ blueprint B1–B6 | ID_MIGRATION |
