import { InventoryTable, type InventoryTableProps } from './InventoryTable';
import { InventoryCardList } from './InventoryCardList';
export function DashboardRecentTable(props: InventoryTableProps) {
  return (
    <>
      <InventoryTable {...props} />
      <InventoryCardList {...props} />
    </>
  );
}
