# B/F — Officer Direct Item Registration & Backend MVP Gate

**Status awal:** `PLANNED` · **Prioritas:** `P0` · **Area:** `apps/api` (kecuali B/K dengan approval) · **Depends:** B/B + B/C + B/D + B/E

**Crosswalk:** B3 POST + B4 gate. Ini milestone package B/A..B/M; jangan menyamakan secara numerik dengan `B0..B4` (MVP checkpoint) atau `B1..B6` (blueprint).

**Preflight sebelum tugas:** baca `../README.md`, `../GIT_POLICY.md`, `../CLEAN_CODE.md`, kontrak canonical, `../PRECODING_CHECKLIST.md`, dan dokumentasi task relevan. Gunakan izin terpisah untuk coding/push/merge/deploy.

## B/F.1 — Contract and atomic officer item creation

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/F.1.0` POST /officer/items contract | Implementasikan request ItemCreateRequest snake_case: item_name, category, public_description, opsi valid, item_photo_upload_tokens tepat 1 menurut OpenAPI final yang tersedia. | Contract validation + 422 untuk 0/>1 token. | `PLANNED` |
| `B/F.1.1` Server-derived post & actor | Officer wajib memiliki assignment pada DB; jangan menerima post_id client untuk override pos; public/private fields dibedakan. | Cross-post escalation tests. | `PLANNED` |
| `B/F.1.2` Transaction item + photo | Konsumsi token ITEM_PHOTO sah; insert found_items dan item_photos dengan satu primary, inventory code yang aman/unik; transaksi rollback jika gagal. | 201 response; unique, partial failure rollback. | `PLANNED` |

**Exit gate B/F.1:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## B/F.2 — Real-provider tests and MVP signoff

| ID | Pekerjaan | Acceptance / bukti yang harus benar-benar terlihat | Status |
|---|---|---|---|
| `B/F.2.0` State and visibility rules | Status awal dan is_visible mengikuti kontrak/ERD dan keputusan yang telah diverifikasi; tidak auto-publish dengan asumsi. | State assertion dan visibility regression. | `PLANNED` |
| `B/F.2.1` End-to-end real providers | Dengan token Neon Auth OFFICER dev dan file R2 nyata: intent → PUT → finalize → POST; cek persisted row dan API yang sah. | 201 HTTP + DB rows + referenced R2 object. | `PLANNED` |
| `B/F.2.2` Negative/concurrency cases | No token, STUDENT, no assigned post, wrong image token, replay, invalid data, simultaneous POST; status code tepat menurut kontrak. | 401/403/409/422 sesuai test yang relevan. | `PLANNED` |
| `B/F.2.3` Backend MVP Gate review | Kompilasi bukti B/B-B/F: migration+seed, GET catalog/detail, 201 officer post + R2/Neon Auth, security, lint/build/test. STOP untuk persetujuan; tidak mengklaim selesai bila provider BLOCKED. | Approval eksplisit sebelum integrasi; status PASS/FAIL/NOT RUN. | `PLANNED` |

**Exit gate B/F.2:** semua task di tabel mendapatkan evidence faktual `PASS`, pemeriksaan diff/secret, hasil lint/typecheck/build/test sesuai scope, dan handoff. `COMPLETED` tidak otomatis mengizinkan push atau pindah milestone.

## Gate milestone

- Dependency terpenuhi: B/B + B/C + B/D + B/E.
- Contract hash and DTO drift check `PASS` atau `BLOCKED` bila sumber tak tersedia.
- Negative tests role/ownership/status yang relevan; rollback/transaksi untuk mutasi.
- Evidence nyata: command, hasil HTTP status, DB query dengan data sintetis, output test, file berubah, risiko.
- Konfirmasi izin pengguna sebelum melakukan `git push`, merge/deploy, atau melanjutkan milestone berikutnya.
- `apps/api/.agent-internal` dan `AGENTS.md` adalah lokal only: jangan commit/push `.md`, `.mdx`, atau secret.

**KHUSUS MVP:** keluar B/F baru boleh setelah GET publik B/C, Neon Auth B/D, R2 B/E, POST valid 201, row Neon, negative cases dan upload nyata terbukti. Tanpa Neon Auth/R2 sebenarnya = `BLOCKED`, bukan `COMPLETED`.
