import { Search } from 'lucide-react';
import type { ItemStatus } from '@/types/api';
interface Props {
  searchQuery: string;
  onSearchChange: (s: string) => void;
  statusFilter: ItemStatus | 'ALL';
  onStatusChange: (s: ItemStatus | 'ALL') => void;
  sortBy: 'newest' | 'oldest';
  onSortChange: (s: 'newest' | 'oldest') => void;
}
export function InventoryFilters(p: Props) {
  return (
    <div className="lf-inventory-filters">
      <label className="lf-search">
        <Search size={20} />
        <span className="sr-only">Cari barang inventaris</span>
        <input
          placeholder="Cari barang atau kode inventaris..."
          value={p.searchQuery}
          onChange={(e) => p.onSearchChange(e.target.value)}
        />
      </label>
      <label className="lf-select-control">
        <span className="sr-only">Filter status</span>
        <select
          value={p.statusFilter}
          onChange={(e) => p.onStatusChange(e.target.value as ItemStatus | 'ALL')}
        >
          <option value="ALL">Semua Status</option>
          <option value="STORED">Tersedia di pos</option>
          <option value="RETURNED_TO_OWNER">Sudah diserahkan</option>
          <option value="DISTRIBUTED">Disalurkan</option>
        </select>
      </label>
      <label className="lf-select-control">
        <span className="sr-only">Urutan inventaris</span>
        <select
          value={p.sortBy}
          onChange={(e) => p.onSortChange(e.target.value as 'newest' | 'oldest')}
        >
          <option value="newest">Terbaru</option>
          <option value="oldest">Terlama</option>
        </select>
      </label>
    </div>
  );
}
