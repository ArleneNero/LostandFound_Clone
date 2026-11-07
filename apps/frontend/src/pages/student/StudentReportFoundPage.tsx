import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { RoutePaths } from '@/constants/routes';
import { useCreateReport } from '@/features/student/hooks/useCreateReport';
import { ReportFoundSuccess } from '@/features/student/components/ReportFoundSuccess';
import { ReportFoundForm, ReportFoundFormValues } from '@/features/student/components/ReportFoundForm';

export const StudentReportFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { submitReport, isSubmitting, error, clearError } = useCreateReport();

  const [createdInfo, setCreatedInfo] = useState<{ code: string; id: string } | null>(null);

  const handleFormSubmit = async (values: ReportFoundFormValues) => {
    clearError();
    try {
      const res = await submitReport({
        ...values,
        targetPostId: 1, // Pos Pengajaran
      });
      setCreatedInfo({ code: res.reportCode, id: res.id });
    } catch {
      // Error is stored in hook state
    }
  };

  if (createdInfo) {
    return (
      <ReportFoundSuccess
        reportCode={createdInfo.code}
        reportId={createdInfo.id}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-6 sm:py-8 space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[var(--lf-ink)]">
          Lapor Barang Ditemukan
        </h1>
        <p className="text-xs sm:text-sm text-[var(--lf-muted)] mt-1">
          Bantu kembalikan barang temuan kepada pemiliknya di lingkungan Universitas Budi Luhur
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-xs text-red-700">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      <ReportFoundForm
        isSubmitting={isSubmitting}
        onSubmit={handleFormSubmit}
        onCancel={() => navigate(RoutePaths.STUDENT_HOME)}
      />
    </div>
  );
};
