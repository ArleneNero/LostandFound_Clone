# FOLDER_STRUCTURE — satu monorepo, rapi, tanpa folder palsu

```text
ubl-lostnfound/
├── AGENTS.md                   # root policy lokal (jangan ditimpa)
├── .agent-internal/            # backend/root policy, canonical contracts
├── .gitignore                  # gabungkan aturan, jangan overwrite
├── package.json                # workspace scripts opsional bila disepakati
├── apps/
│   ├── api/                    # Backend Fastify B/*; NO EDIT oleh task F/*
│   └── web/
│       ├── AGENTS.md           # nested policy F/* lokal
│       ├── .agent-internal/    # ini, bukan source publik
│       ├── public/
│       │   ├── favicon.svg
│       │   └── assets/
│       │       ├── branding/Logo_LostnFound.png
│       │       └── illustrations/
│       │           ├── roles/Icon_Mahasiswa.png
│       │           ├── roles/Icon_Petugas.png
│       │           ├── authentication/Ikon Pesawat dan Gembok 3D.png
│       │           └── landing/Kotak Barang Hilang dan Ditemukan.png
│       └── src/
│           ├── app/          # providers, router, routePaths, guards (UI only)
│           ├── styles/       # tokens.css, globals.css
│           ├── components/   # ui primitives & layouts reusable
│           ├── features/
│           │   ├── officer/     # dashboard/inventory/item-registration/report-management/handover
│           │   ├── guest/       # home khusus Guest
│           │   ├── discovery/   # shared catalog/item detail/posts/pickup guide
│           │   ├── auth/        # login/register/recovery UI
│           │   └── student/     # home/report/profile
│           ├── services/
│           │   ├── contracts/   # IO interfaces
│           │   ├── in-memory/   # mock adapter
│           │   └── http/        # adapter OpenAPI API (baru F/E F/F)
│           ├── data/           # fixture dan store in-memory HANYA MOCK
│           ├── types/          # api DTO vs domain view-model
│           ├── validation/     # form Zod dari backend contract
│           ├── constants/      # enums/paths/page size
│           ├── hooks/          # shared hooks
│           └── utils/          # utilities pure
└── packages/                 # opsional; shared contracts jika benar diperlukan dan disetujui
```

## Aturan penempatan file

- Jangan buat 3 React app untuk tiga role; satu `apps/web` dengan satu router, satu katalog publik shared.
- Berkas dibuat **bertahap saat task-nya dimulai**. Tree di atas = rancangan, bukan instruksi membuat file kosong.
- `officer/` dibuat pada F/B dan harus independen dari Guest UI; `guest/` & `discovery/` pada F/C; `auth/` & `student/` pada F/D. Shared UI masuk `components/` hanya jika benar reusable.
- `pages/`: layout komposisi. `components/`: presentasional. `hooks/`: state; `services/`: data IO; `types/api/`: wire schema, `types/domain/`: view model; `selectors/`: derivasi mock; test per modul.
- Jangan `fetch` di page, mengimpor fixture langsung di component, menyimpan data sensitif pada localStorage, atau membuat fake backend di apps/web.
- Asset pengguna disimpan hanya sekali pada `public/` dengan nama asli; tidak ada duplikasi file di `src/assets`/role folder.
- Bila workspace lama memakai struktur `Frontend/`, migrasikan path ke `apps/web/` secara terkontrol setelah audit dan persetujuan. Jangan overwrite atau memindahkan file source anggota lain diam-diam.
- Semua file internal `.agent-internal/` dan `AGENTS.md` tidak dimasukkan GitHub, sedangkan public/asset actual dapat di-stage bila sesuai penggunaan dan lisensi.
