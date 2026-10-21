import { ChevronRight } from 'lucide-react';
import type { FoundItem } from '@/types/domain';
import { ItemStatusBadge } from './ItemStatusBadge';
import { formatDate } from '@/utils/formatDate';
export function DashboardItemCard({
  item,
  onDetailClick,
}: {
  item: FoundItem;
  onDetailClick: (id: string) => void;
}) {
  return (
    <article className="lf-inventory-card lf-surface">
      <div className="lf-inventory-card-heading">
        <img src={item.photoUrl} width="64" height="64" alt={item.name} loading="lazy" />
        <div>
          <h3>{item.name}</h3>
          <p>
            {item.inventoryCode} · {formatDate(item.receivedAt)}
          </p>
        </div>
      </div>
      <ItemStatusBadge item={item} />
      <button className="lf-text-link" type="button" onClick={() => onDetailClick(item.id)}>
        <ChevronRight size={20} />
        Detail inventaris
      </button>
    </article>
  );
}
