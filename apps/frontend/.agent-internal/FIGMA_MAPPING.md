# FIGMA_MAPPING — dua Figma sources, role sequence

## Sumber yang diverifikasi dalam percakapan

- **File yang diberikan pengguna:** `U1CiotvJOC2B3zQI417fF7`, Page `0:1` bernama **`00 — Style Guide & Components`**; berisi section style `34:66` dan rules `324:135`. Tidak boleh menyebut file ini memuat frame Page05 apabila metadata halaman tidak menunjukkan itu.
- **Reference dari dua DOCX v6.2:** file **berbeda** `O7CTpA8dQPMdVi8ZQo2PWK`, Page 05 `373:2904`, bernama `05 — Role-Based Views`; sumber layout M/D Petugas, Guest, Student. Kalau desain aktual bertentangan dengan link yang diberi, minta keputusan, jangan memilih file lama otomatis.

## Wajib baca dan verifikasi sebelum coding

| Role/fase | Frame (referensi dua DOCX v6.2) | Halaman utama | Acceptance |
|---|---|---|---|
| `F/B` Petugas | 02.01/a; 06.01/a; 06.02/a; 02.M01; 02.02/a/b/c; 02.03; 05.01–05.06; 06.03/a | Dashboard, Inventory, ItemRegistration, OfficerReports, Receive/Reject, Handover | semua interaksi+state mock+visual 390/1440 lulus sebelum Guest |
| `F/C` Guest | 00.01; 03.P01/a; 03.01/a; 03.02/a; 03.P03/a; 03.P04/a; 03.P05/a | Landing, GuestHome, shared Catalog/ItemDetail, Posts/Guide | pagination10, hidden404, no asset invented |
| `F/D` Student | 01.01–01.08, 01.P01–P08; 03.P02/a; 04.01–04.07, 04.P01 | Auth/Recovery, StudentHome, FoundReport, MyReports, Cancel, Profile | login & reporting mock, shared Guest discovery |
| Semua | 07.M/07.D (states) | Skeleton, error, empty, disabled, confirmations, success | state varian bukan route baru |

## Design tokens teridentifikasi dari style guide user

- Plus Jakarta Sans; Blue `#1677FF`, Action `#0B5ED7`, Soft `#EAF3FF`, Canvas `#F7F9FC`, Ink `#111827`, Muted `#667085`.
- Type hierarchy page heading `26/34`, section `18/26`, card `16/24`, body `14/22`, metadata `12/18`; spacing 4,8,12,16,20,24,32,40,48 px. Render based on actual frame node.
- Product rules nodes: role/nav `324:138`, two paths Officer reports `324:141`, photo required `324:144`, physical receipt `324:147`, WIB editable `324:150`, recovery/QA `324:153`.
- Actual screenshot of each Page05 frame must be fetched at implementation time. **Blueprint mapping ≠ proof exact visual tested**.

Lihat `FIGMA_EXACT_RULES.md` untuk review dan manual exception logging.
