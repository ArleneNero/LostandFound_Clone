import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, PlusCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RoutePaths } from '@/constants/routes';

export const StudentMyReportsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--lf-ink)]">
            Riwayat Laporan Temuan Saya
          </h1>
          <p className="text-xs lg:text-sm text-[var(--lf-muted)] mt-1">
            Status verifikasi barang yang telah Anda laporkan ke Pos Pengajaran (Figma 04.03)
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<PlusCircle className="w-4 h-4" />}
          onClick={() => navigate(RoutePaths.STUDENT_REPORT_FOUND)}
        >
          Lapor Baru
        </Button>
      </div>

      <Card className="p-8 text-center flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-[var(--lf-soft)] text-[var(--lf-blue)] flex items-center justify-center mb-3">
          <ClipboardList className="w-6 h-6" />
        </div>
        <h2 className="text-base font-semibold text-[var(--lf-ink)]">Belum Ada Laporan Aktif</h2>
        <p className="text-xs text-[var(--lf-muted)] max-w-sm mt-1">
          Barang yang Anda laporkan akan berstatus PENDING_RECEIPT sampai diserahkan ke Pos
          Pengajaran.
        </p>
      </Card>
    </div>
  );
};
