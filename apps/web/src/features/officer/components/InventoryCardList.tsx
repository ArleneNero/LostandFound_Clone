import { Skeleton } from '@/components/ui/Skeleton';
import { DashboardItemCard } from './DashboardItemCard';
import type { InventoryTableProps } from './InventoryTable';
export function InventoryCardList({ items, isLoading, onDetailClick }: InventoryTableProps) {
  return (
    <div className="lf-inventory-cards">
      {isLoading ? (
        [1, 2, 3].map((i) => <Skeleton key={i} height={170} />)
      ) : items.length ? (
        items.map((item) => (
          <DashboardItemCard key={item.id} item={item} onDetailClick={onDetailClick} />
        ))
      ) : (
        <p className="lf-empty">Tidak ada barang inventaris yang ditemukan.</p>
      )}
    </div>
  );
}
