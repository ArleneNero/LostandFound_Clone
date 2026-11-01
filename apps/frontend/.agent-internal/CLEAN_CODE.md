# CLEAN_CODE — WAJIB DIBACA SEBELUM SETIAP TASK FRONTEND

**Sumber resmi proyek:** dua DOCX v6.2 yang disertakan sebagai Markdown `references/FRONTEND_STANDARDS_SOURCE.md` dan `references/FRONTEND_BLUEPRINT_SOURCE.md`. Agent wajib membaca standar sumber **sebelum** membuat perubahan, bukan hanya file ringkasan ini.

## 1. Wajib, bukan rekomendasi desain generik

- Clean Code = meaningful names, Single Responsibility Principle, DRY, cohesive modules, early return, proper error handling, explicit types, no arbitrary wrapper/god-component.
- `pages/` komposisi layar, `components/` tampilan reusable, `hooks/` state/UI orchestration, `services/contracts/` interface, `services/in-memory/` mock, `services/http/` real adapter, `data/selectors/` derivasi mock, `validation/` form schema, `types/api/` DTO; **jangan** menyatukan semuanya dalam App.tsx/Page.tsx.
- Jangan import fixtures lalu mutasi langsung dari JSX; UI dan data harus sinkron lintas Petugas/Guest/Mahasiswa melalui service layer.
- Jangan 3 project React per role dan jangan menduplikasi katalognya. Folder dan file dibuat saat dibutuhkan, tidak overengineering.
- Jangan ganti UI Figma dengan template desain AI; setiap komponen wajib visual verified. Jangan menebak nama aset atau gambar.

## 2. Ambang internal dari DOCX Clean Code

| Jenis | Target review (bukan ukuran sakral) |
|---|---|
| Fungsi/method | ~20 baris, evaluasi kohesi |
| Komponen reusable | ≤80 baris |
| Page.tsx | ≤150 baris |
| Hook/selector/validator | ≤100 baris |
| In-memory service | ≤200 baris |
| File apa pun >300 baris | **HARUS review tertulis dan persetujuan sebelum merge** |

Hitung baris non-kosong termasuk JSX, import dan komentar. Jangan memecah satu fungsi ke file mikro hanya untuk memuaskan angka; utamakan tanggung jawab dan keterbacaan.

## 3. Larangan teknis

- UI menampilkan status sukses sebelum operasi commit mock/server resolve.
- Data status string/role/angka pagination 10 di-hardcode berkali-kali, infer union types dengan `any` tanpa alasan.
- `localStorage` sebagai inventaris mock (reload mock harus reset), secret di source, upload gambar ke layanan random, browser role sebagai authorization production.
- Menambah route baru untuk frame "Lanjutan", "Foto Terunggah", "Alasan Terisi" yang merupakan kondisi satu halaman.
- Mengabaikan skeleton, empty, error, disabled, invalid, confirmation, success dari Figma 07.M/07.D.
- Silent catch dan auto retry mutasi POST/PATCH ambigu, log JWT, presigned URL atau PII.
- Mengklaim pixel-perfect dari screenshot yang tidak dibandingkan/asset missing.

## 4. Evidence wajib sebelum menutup task

- Nama task dan Figma frame/node, layar mobile+desktop, local screenshots/diff, asset SHA, daftar berkas dan jumlah LOC.
- Hasil nyata formatter/ESLint, `tsc --noEmit`, build Vite, unit/integration/E2E terkait (PASS/FAIL/NOT RUN dengan alasan).
- Negative path setidaknya satu kondisi gagal/boundary per task relevan: pagination 0/11/21; validasi foto; role; 404/409/429, form invalid.
- Reviewer harus memastikan file >300 memperoleh approval; file lama yang diubah tak merusak modul tetangga.
- Frontend-only mock bukan bukti API/DB/auth production. Data pribadi fiktif untuk demo.
