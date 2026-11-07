import React from 'react';
import { ClipboardList, Clock, CheckCircle2 } from 'lucide-react';

interface StudentActivityCardProps {
  totalReports: number;
  pendingReports: number;
  receivedReports: number;
  isLoading: boolean;
}

export const StudentActivityCard: React.FC<StudentActivityCardProps> = ({
  totalReports,
  pendingReports,
  receivedReports,
  isLoading,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-[var(--lf-border)] p-6 sm:p-8 space-y-4 shadow-sm">
      <h3 className="text-sm font-bold text-[var(--lf-ink)]">
        Ringkasan Kontribusi Kejujuran
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-[var(--lf-soft)] rounded-2xl border border-[rgba(11,94,215,0.15)]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--lf-muted)] font-medium">Total Laporan</span>
            <ClipboardList className="w-4 h-4 text-[var(--lf-action)]" />
          </div>
          <span className="text-2xl font-bold text-[var(--lf-action)]">
            {isLoading ? '...' : totalReports}
          </span>
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-amber-700 font-medium">Menunggu Serah Fisik</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-2xl font-bold text-amber-700">
            {isLoading ? '...' : pendingReports}
          </span>
        </div>

        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-emerald-700 font-medium">Diterima di Pos</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-bold text-emerald-700">
            {isLoading ? '...' : receivedReports}
          </span>
        </div>
      </div>
    </div>
  );
};

