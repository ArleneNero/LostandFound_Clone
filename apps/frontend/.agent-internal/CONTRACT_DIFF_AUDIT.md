# CONTRACT_DIFF_AUDIT — Perbedaan salinan lama vs backend terbaru

**Audit file, bukan audit runtime.** Salinan historis di workspace mempunyai nama API v1.0/ERD v6.2 yang sama secara versi label tetapi **SHA berbeda** dari paket backend yang diperbarui. Untuk frontend gunakan snapshot `contracts/` di ZIP ini dan cocokkan dengan root backend aktual. Perubahan ini tidak menaikkan versi label kontrak; itu sendiri risiko proses versioning yang harus dikendalikan saat pengembangan.

| Artefak | SHA salinan historis lama | SHA snapshot backend terbaru |
|---|---|---|
| OpenAPI YAML | `6fcdfdc3332410159b1189c589bfa95c1f19c8acf56e21ade1c513ea6dc30a9a` | `52953e53e230c84ad9015771096838d6f3bfa233424b1715fef3504c30d5d084` |
| API Contract MD | `006964370b9601fd784c769cfd239ecf64f6734ca08a267b31313279a6889ef6` | `527eeee1f8b0f6aa4d795c9a8005a20a67e662a12fd299291edadfc61930485f` |
| DBML v6.2 | `5e1ed978b791720a037189abe0598cdb4f040f06a0bc23843063312ed2474fe2` | `892605fa3d8be4ed0631cfddd28bf60bd9e59f353dce44e9dd996d2877375ecf` |

## Konflik material yang sudah diverifikasi

- **Salinan lama:** API Contract teks contoh menerima `item_photo_upload_tokens: ["TOKEN_1","TOKEN_2"]` dan keterangan jumlah inventaris 1–5. DBML historis belum memaksa `item_photos.item_id UNIQUE`.
- **Salinan baru backend:** `ItemCreateRequest.item_photo_upload_tokens` dan `ReceiveRequest.item_photo_upload_tokens` wajib **minItems=1/maxItems=1**; `FoundItemPublic.photos` dan `InventoryOfficer.photos` juga maksimum 1; API Contract terbaru menyatakan tepat 1 foto, `item_photos.item_id UNIQUE` di DBML.
- Perubahan ini menyamakan backend dengan aturan Figma `324:144` dan foto wajib frontend. Tidak perlu membuat UI multi-photo 1–5.

## Status verifikasi

- PASS statis: 22 operasi OpenAPI di snapshot canonical.
- PASS statis: aturan satu foto inventaris ada di request dan response schemas canonical.
- PASS statis: snapshot canonical disalin byte-for-byte, hash tercatat.
- **NOT RUN**: server Fastify/Neon/R2/Neon Auth, response runtime, test end-to-end.

Jika tim backend kelak memakai file lama atau memperbarui API, jangan teruskan integrasi atas dasar kontrak berbeda tanpa perbaikan dan izin. Tes contract/transport tetap wajib pada F/E dan F/F.
