import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { RoutePaths } from '@/constants/routes';

export const StudentReportPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">
      <Button
        variant="ghost"
        size="sm"
        leftIcon={<ArrowLeft className="w-4 h-4" />}
        onClick={() => navigate(RoutePaths.STUDENT_HOME)}
        className="w-fit -ml-2"
      >
        Kembali ke Portal
      </Button>

      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-[var(--lf-ink)]">
          Lapor Barang Temuan
        </h1>
        <p className="text-xs lg:text-sm text-[var(--lf-muted)] mt-1">
          Laporkan barang yang Anda temukan di kampus untuk diserahkan ke Pos Pengajaran (Figma 04.01)
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={(e) => { e.preventDefault(); navigate(RoutePaths.STUDENT_MY_REPORTS); }} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--lf-ink)]">
              Foto Barang Temuan <span className="text-[var(--lf-error)]">*</span>
            </label>
            <div className="border-2 border-dashed border-[var(--lf-border)] rounded-[14px] p-6 flex flex-col items-center justify-center text-center bg-[#F9FAFB] hover:bg-[#F2F4F7] cursor-pointer">
              <Camera className="w-8 h-8 text-[var(--lf-muted)] mb-2" />
              <span className="text-xs font-semibold text-[var(--lf-blue)]">Upload Foto Bukti Temuan</span>
              <span className="text-[11px] text-[var(--lf-muted)] mt-0.5">Maksimal 1 foto sesuai ketentuan MVP</span>
            </div>
          </div>

          <Input label="Nama Barang" placeholder="Contoh: Jaket Parasut Biru" required />
          <Input label="Lokasi Ditemukan" placeholder="Contoh: Koridor Lab Komputer Lt. 3" required />
          <Input label="Deskripsi Karakteristik" placeholder="Ciri khusus, kondisi barang..." />

          <Button
            type="submit"
            variant="primary"
            rightIcon={<Send className="w-4 h-4" />}
            className="w-full mt-4"
          >
            Kirim Laporan Temuan
          </Button>
        </form>
      </Card>
    </div>
  );
};
