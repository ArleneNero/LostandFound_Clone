# STACK_ENV — Toolchain frontend dan koneksi runtime

## Baseline yang dicantumkan dalam DOCX sumber (bukan bukti versi npm terpasang)

| Paket/tool | Baseline yang tertulis | Catatan verifikasi sebelum implementasi |
|---|---|---|
| React / React DOM | 19.3.1 | Versi kedua paket harus cocok |
| TypeScript | 7.0.2 | Cek registry/compatibility, jangan memaksa jika dependency belum mendukung |
| Vite | 8.3.4 | Periksa Node `engines` dari Vite/plugin aktual |
| Tailwind / @tailwindcss/vite | 4.3.3 | Cocok dengan Vite plugin |
| @vitejs/plugin-react | 6.1.2 | Kunci setelah install terverifikasi |
| React Router | 8.4.0 | Cek perubahan API dan peer dependencies secara aktual |
| Lucide React | 1.57.0 | UI ikon generik; branding dari aset asli |
| React Hook Form | 7.90.0 | Form, optional sesuai scope |
| @hookform/resolvers | 5.2.2 | Schema resolver, pastikan Zod kompatibel |
| Vitest | 5.0.5 | Unit/integration |
| @testing-library/react | 16.3.3 | Tambahkan @testing-library/dom sesuai peer deps |
| @playwright/test | 1.64.1 | E2E browser |
| Node.js | 24.x LTS (saran dokumen) | Runtime build/dev saja; Fastify backend terpisah |

**Aturan:** ini **baseline tertulis** dari blueprint DOCX, bukan rekomendasi bahwa setiap patch pasti ada di npm. Periksa registry, `engines`, peerDependencies, audit vuln, lalu kunci `package-lock.json` dengan `npm install` nyata. Jangan mengarang package lock.

## Env frontend yang boleh diakses browser

- Public base URL API sesuai lingkungan, misalnya konsep `VITE_API_BASE_URL` yang berakhir `/api/v1` (jangan gabungkan prefix dua kali); URL sebenarnya ditentukan saat setup.
- Neon Auth client configuration boleh di browser; server auth secret harus di backend, tidak di Vite/source.
- Tidak boleh ada URL Neon connection, password DB, R2 secret/access keys, backend JWT verification secrets, signed object paths pada bundle JS.
- Semua `.env` masuk `.gitignore`, `.env.example` hanya nama variabel dan placeholder tanpa credential.

## Mode fitur

- `mock` — fixture in-memory/reset reload, tanpa network. Role session mock bukan auth.
- `http` — API Fastify aktual: tidak fallback ke mock saat 5xx. `GET /items` berjalan anonymous, endpoint protected pakai Neon Auth session/token; source response snake_case.
- Deployment Cloudflare Pages adalah target setelah F/G dan pengujian build/CORS/SPA fallback/Neon Auth/R2. Jangan mengklaim live hanya dari build sukses.

## Batas tes

- `format:check`, `lint`, `typecheck`, `build`, `test`, `e2e` adalah nama skrip yang **direncanakan**; cek `package.json` asli sebelum melaporkan PASS.
- Vite web app tidak memakai database/SQL langsung. DB Neon diakses hanya oleh backend Fastify.


> **Role-first note (2026-10-20):** Id integrasi publik yang dulu `F/D` sekarang `F/E`; operasi produksi masih `F/F`. Baca `ID_MIGRATION.md`. Isi kontrak API di tabel ini tetap authoritative dari snapshot backend.
