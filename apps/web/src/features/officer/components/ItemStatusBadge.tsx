import type { FoundItem } from '@/types/domain';
import { Badge } from '@/components/ui/Badge';
export function ItemStatusBadge({ item }: { item: FoundItem }) {
  return (
    <Badge
      variant={
        item.status === 'STORED'
          ? 'available'
          : item.status === 'RETURNED_TO_OWNER'
            ? 'returned'
            : 'neutral'
      }
    >
      {item.status === 'STORED'
        ? 'Tersedia di pos'
        : item.status === 'RETURNED_TO_OWNER'
          ? 'Sudah diserahkan'
          : 'Disalurkan'}
    </Badge>
  );
}
