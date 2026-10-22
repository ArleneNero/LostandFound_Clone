import type { FoundItem } from '@/types/domain';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { ItemStatusBadge } from './ItemStatusBadge';
import { formatDate } from '@/utils/formatDate';
export interface InventoryTableProps {
  items: FoundItem[];
  isLoading: boolean;
  onDetailClick: (id: string) => void;
}
export function InventoryTable({ items, isLoading, onDetailClick }: InventoryTableProps) {
  return (
    <div className="lf-inventory-table lf-surface">
      {isLoading ? (
        <Skeleton height={220} />
      ) : items.length === 0 ? (
        <p className="lf-empty">Tidak ada barang inventaris yang sesuai dengan filter.</p>
      ) : (
        <table>
          <thead>
            <tr>
              {['Barang', 'Kode inventaris', 'Tanggal diterima', 'Status', 'Tindakan'].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="lf-table-item">
                    <img src={item.photoUrl} width="48" height="48" alt="" loading="lazy" />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td>{item.inventoryCode}</td>
                <td>{formatDate(item.receivedAt)}</td>
                <td>
                  <ItemStatusBadge item={item} />
                </td>
                <td>
                  <Button variant="secondary" onClick={() => onDetailClick(item.id)}>
                    Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
