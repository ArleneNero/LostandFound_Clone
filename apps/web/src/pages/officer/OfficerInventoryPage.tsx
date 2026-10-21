import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/constants/routes';
import { Button } from '@/components/ui/Button';
import { ErrorState } from '@/components/ui/ErrorState';
import { useOfficerInventory } from '@/features/officer/hooks/useOfficerInventory';
import { InventoryFilters, InventoryTable, InventoryCardList } from '@/features/officer/components';
export function OfficerInventoryPage() {
  const navigate = useNavigate();
  const p = useOfficerInventory();
  if (p.error)
    return <ErrorState title="Gagal Memuat Inventaris" description={p.error} onRetry={p.refetch} />;
  const open = (id: string) => navigate(`/petugas/inventaris/${id}`);
  return (
    <div className="lf-stack">
      <div className="lf-heading-row">
        <div className="lf-page-intro">
          <h1 className="lf-title">Inventaris Barang</h1>
          <p className="lf-only-mobile">Hanya data unit Pengajaran.</p>
        </div>
        <Button
          className="lf-only-desktop"
          onClick={() => navigate(RoutePaths.OFFICER_REGISTER_ITEM)}
        >
          Terima Barang
        </Button>
      </div>
      <InventoryFilters
        searchQuery={p.searchQuery}
        onSearchChange={p.setSearchQuery}
        statusFilter={p.statusFilter}
        onStatusChange={p.setStatusFilter}
        sortBy={p.sortBy}
        onSortChange={p.setSortBy}
      />
      <InventoryTable items={p.filteredItems} isLoading={p.isLoading} onDetailClick={open} />
      <InventoryCardList items={p.filteredItems} isLoading={p.isLoading} onDetailClick={open} />
      <p className="lf-caption">
        Data hanya dari unit Pengajaran. Tidak ada akses edit inventaris unit lain.
      </p>
    </div>
  );
}
