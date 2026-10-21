import { MapPin } from 'lucide-react';
import type { FoundItem } from '@/types/domain';
import { formatDate } from '@/utils/formatDate';
export function PublicItemCard({ item, onClick }: { item: FoundItem; onClick: () => void }) {
  return (
    <button
      type="button"
      className="lf-public-item"
      data-testid="catalog-card"
      onClick={onClick}
      aria-label={`Lihat ${item.name}`}
    >
      <img src={item.photoUrl} alt={item.name} loading="lazy" decoding="async" />
      <span className="lf-public-item-info">
        <strong>{item.name}</strong>
        <span>
          <MapPin size={14} />
          {item.postName.replace(/^Pos\s+/, '')}
        </span>
        <small>Diterima {formatDate(item.receivedAt)}</small>
      </span>
    </button>
  );
}
