import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/constants/routes';
import { ErrorState } from '@/components/ui/ErrorState';
import { Button } from '@/components/ui/Button';
import { useOfficerDashboard } from '@/features/officer/hooks/useOfficerDashboard';
import {
  DashboardMetricsSection,
  DashboardSearchActions,
  DashboardRecentTable,
} from '@/features/officer/components';
export function OfficerDashboardPage() {
  const navigate = useNavigate();
  const { metrics, filteredRecentItems, isLoading, error, searchQuery, setSearchQuery, refetch } =
    useOfficerDashboard();
  if (error)
    return <ErrorState title="Gagal Memuat Dashboard" description={error} onRetry={refetch} />;
  return (
    <div className="lf-stack lf-dashboard">
      <div className="lf-page-intro">
        <h1 className="lf-title">
          <span className="lf-only-mobile">Dashboard</span>
          <span className="lf-only-desktop">Kelola barang temuan dengan cepat.</span>
        </h1>
        <p>
          <span className="lf-only-mobile">Pencatatan barang unit Pengajaran.</span>
          <span className="lf-only-desktop">
            Ringkasan dan tindakan untuk barang yang berada di pos Pengajaran.
          </span>
        </p>
      </div>
      <DashboardMetricsSection metrics={metrics} isLoading={isLoading} />
      <DashboardSearchActions
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onRegisterClick={() => navigate(RoutePaths.OFFICER_REGISTER_ITEM)}
      />
      <h2 className="lf-section-title">
        <span className="lf-only-mobile">Barang terbaru</span>
        <span className="lf-only-desktop">Inventaris terbaru</span>
      </h2>
      <DashboardRecentTable
        items={filteredRecentItems}
        isLoading={isLoading}
        onDetailClick={(id) => navigate(`/petugas/inventaris/${id}`)}
      />
      <Button
        className="lf-pending-link"
        variant="secondary"
        onClick={() => navigate(RoutePaths.OFFICER_REPORTS)}
      >
        Laporan Menunggu
      </Button>
    </div>
  );
}
