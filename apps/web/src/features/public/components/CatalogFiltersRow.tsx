import { ITEM_CATEGORIES } from '@/constants/itemCategories';
interface Props {
  postIdFilter?: number;
  setPostIdFilter: (p?: number) => void;
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  sortOrder: 'newest' | 'oldest';
  setSortOrder: (s: 'newest' | 'oldest') => void;
  onResetFilters: () => void;
}
export function CatalogFiltersRow(p: Props) {
  return (
    <div className="lf-catalog-filters">
      <select
        aria-label="Filter Pos"
        value={p.postIdFilter ?? ''}
        onChange={(e) => p.setPostIdFilter(e.target.value ? Number(e.target.value) : undefined)}
      >
        <option value="">Semua Pos</option>
        <option value="1">Pos Pengajaran</option>
        <option value="2">Pos Perpustakaan</option>
        <option value="3">Pos Lab Komputer</option>
      </select>
      <select
        className="lf-only-desktop"
        aria-label="Filter Kategori"
        value={p.categoryFilter}
        onChange={(e) => p.setCategoryFilter(e.target.value)}
      >
        <option value="ALL">Semua Kategori</option>
        {ITEM_CATEGORIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <select
        aria-label="Urutkan Waktu"
        value={p.sortOrder}
        onChange={(e) => p.setSortOrder(e.target.value as 'newest' | 'oldest')}
      >
        <option value="newest">Terbaru</option>
        <option value="oldest">Terlama</option>
      </select>
      <button type="button" className="lf-only-desktop lf-text-link" onClick={p.onResetFilters}>
        Hapus Filter
      </button>
    </div>
  );
}
