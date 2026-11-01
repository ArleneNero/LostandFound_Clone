# DESIGN_SYSTEM — tokens dari Figma yang disediakan

| Token | Nilai teramati | Node sumber |
|---|---|---|
| `--lf-blue` | `#1677FF` | `34:73` |
| `--lf-action` | `#0B5ED7` | `34:76` |
| `--lf-soft` | `#EAF3FF` | `34:83` |
| `--lf-canvas` | `#F7F9FC` | `34:82` |
| `--lf-ink` | `#111827` | `34:84` |
| `--lf-muted` | `#667085` | `34:88` |
| Font | Plus Jakarta Sans | `34:91` |
| Page heading | 26px / line-height 34px | `34:92` |
| Section heading | 18px / 26px | `34:93` |
| Card heading | 16px / 24px | `34:94` |
| Body/form | 14px / 22px | `34:95` |
| Meta | 12px / 18px | `34:96` |
| Control height | 48px | `34:110` |
| Spacing scale | 4,8,12,16,20,24,32,40,48px | `34:149` |

**Catatan:** Token warna/font di atas diperoleh dari style guide pada link pengguna; nilai radius dan shadow per-component harus diinspeksi melalui Figma node relevan, **jangan menebak satu nilai seragam untuk semua**. Tidak boleh memakai random gradients atau shadow tebal. Font harus dimuat dari penyedia/asset berlisensi dan diverifikasi di browser, bukan bundling font yang tak tersedia. Contoh Figma `34:67` bukan seluruh Page05.

Tampilan M/D satu komponen responsive, bukan copy two codebases. Simpan token pada `apps/web/src/styles/tokens.css`; components menggunakan CSS variables/Tailwind configured tokens yang sama. Perubahan visual di luar design requires user approval.
