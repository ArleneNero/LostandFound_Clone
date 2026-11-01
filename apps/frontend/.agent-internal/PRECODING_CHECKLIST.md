# PRECODING_CHECKLIST — Agent wajib mengisi sebelum menulis React

- [ ] Sudah baca **dua standar** `CLEAN_CODE.md` dan `references/FRONTEND_STANDARDS_SOURCE.md` dan tahu aturan >300 LOC.
- [ ] Sudah baca Blueprint `references/FRONTEND_BLUEPRINT_SOURCE.md` serta `FOLDER_STRUCTURE.md`.
- [ ] Sudah pastikan urutan peran: Petugas sebelum Guest sebelum Mahasiswa; ada izin pemilik untuk milestone aktif.
- [ ] Sudah cari Figma frame/node yang tepat, screenshot referensi sesuai mobile dan desktop tersedia.
- [ ] Sudah cek style tokens, copy, urutan elemen, states, nav, font, spacing dan image position, bukan interpretasi bebas.
- [ ] Sudah jalankan `tools/verify_assets.py` untuk enam file asli dan menyatakan aset tambahan apa yang MISSING.
- [ ] Sudah baca `ID_MIGRATION.md`, tidak menjalankan ID F/* lama yang tabrakan.
- [ ] Sudah cocokkan backend OpenAPI/DTO sebelum menambah service atau payload.
- [ ] Sudah audit tree, `git status`, existing source, dependency, rencana file yang akan disentuh.
- [ ] Sudah tentukan test + visual acceptance; jika tak bisa, status task BLOCKED dan tanya user.

**Larangan:** jangan langsung generate semua modul, commit/push massal, mengarang aset/endpoints, redesign Figma, atau menyatakan selesai hanya dari screenshot mock.
