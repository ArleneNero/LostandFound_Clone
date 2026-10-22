import { Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
export function DashboardSearchActions({
  searchQuery,
  onSearchChange,
  onRegisterClick,
}: {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onRegisterClick: () => void;
}) {
  return (
    <div className="lf-dashboard-actions">
      <Button onClick={onRegisterClick}>Catat Barang</Button>
      <label className="lf-search">
        <Search size={20} />
        <span className="sr-only">Cari inventaris Pengajaran</span>
        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari inventaris Pengajaran..."
        />
      </label>
    </div>
  );
}
