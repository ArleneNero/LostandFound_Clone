import React from 'react';
import { ClipboardList, Clock, CheckCircle2 } from 'lucide-react';

interface StudentMetricsSectionProps {
  totalReports: number;
  pendingReports: number;
  receivedReports: number;
  isLoading: boolean;
}

export const StudentMetricsSection: React.FC<StudentMetricsSectionProps> = ({
  totalReports,
  pendingReports,
  receivedReports,
  isLoading,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white p-5 rounded-2xl border border-[var(--lf-border)] flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[var(--lf-soft)] text-[var(--lf-action)] flex items-center justify-center shrink-0">
          <ClipboardList className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs text-[var(--lf-muted)] font-medium block">
            Total Laporan Saya
          </span>
          <span className="text-xl font-bold text-[var(--lf-ink)]">
            {isLoading ? '...' : totalReports}
          </span>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-[var(--lf-border)] flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs text-[var(--lf-muted)] font-medium block">
            Menunggu Serah Fisik
          </span>
          <span className="text-xl font-bold text-amber-600">
            {isLoading ? '...' : pendingReports}
          </span>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-[var(--lf-border)] flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs text-[var(--lf-muted)] font-medium block">
            Diterima di Pos
          </span>
          <span className="text-xl font-bold text-emerald-600">
            {isLoading ? '...' : receivedReports}
          </span>
        </div>
      </div>
    </div>
  );
};

