import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { RoutePaths } from '@/constants/routes';

export const StudentHomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-[var(--lf-ink)]">
            Portal Mahasiswa
          </h1>
          <p className="text-xs lg:text-sm text-[var(--lf-muted)] mt-1">
            Layanan penemuan barang kampus Universitas Budi Luhur
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<PlusCircle className="w-4 h-4" />}
          onClick={() => navigate(RoutePaths.STUDENT_REPORT_FOUND)}
        >
          Lapor Barang Temuan
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card
          hoverable
          className="cursor-pointer"
          onClick={() => navigate(RoutePaths.CATALOG)}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[14px] bg-[var(--lf-soft)] text-[var(--lf-blue)] flex items-center justify-center shrink-0">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[var(--lf-ink)]">Cari Barang Hilang</h2>
              <p className="text-xs text-[var(--lf-muted)] mt-0.5">
                Periksa daftar barang yang telah tersimpan di pos
              </p>
            </div>
          </div>
        </Card>

        <Card
          hoverable
          className="cursor-pointer"
          onClick={() => navigate(RoutePaths.STUDENT_MY_REPORTS)}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[14px] bg-[var(--lf-warning-soft)] text-[var(--lf-warning)] flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[var(--lf-ink)]">Laporan Saya</h2>
              <p className="text-xs text-[var(--lf-muted)] mt-0.5">
                Pantau status verifikasi barang yang Anda temukan
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
