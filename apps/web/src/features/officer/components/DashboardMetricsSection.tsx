import { Skeleton } from '@/components/ui/Skeleton';
import type { DashboardMetrics } from '../selectors/dashboardSelectors';
export function DashboardMetricsSection({
  metrics,
  isLoading,
}: {
  metrics: DashboardMetrics;
  isLoading: boolean;
}) {
  return (
    <div className="lf-dashboard-metrics">
      {[
        { small: 'Tersedia', full: 'Barang tersedia', value: metrics.totalStored },
        { small: 'Diserahkan', full: 'Sudah diserahkan', value: metrics.totalReturned },
      ].map((m) => (
        <section className="lf-metric lf-surface" key={m.full}>
          <span className="lf-only-mobile">{m.small}</span>
          <span className="lf-only-desktop">{m.full}</span>
          {isLoading ? <Skeleton height={42} width={70} /> : <strong>{m.value}</strong>}
        </section>
      ))}
    </div>
  );
}
