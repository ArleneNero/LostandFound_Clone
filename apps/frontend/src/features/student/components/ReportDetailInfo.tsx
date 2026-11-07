import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Submission } from '@/types/domain';

interface ReportDetailInfoProps {
  report: Submission;
}

export const ReportDetailInfo: React.FC<ReportDetailInfoProps> = ({ report }) => {
  return (
    <div className="space-y-6">
      {/* Photo Container */}
      <div className="bg-white rounded-3xl border border-[var(--lf-border)] p-4 sm:p-6 overflow-hidden">
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[var(--lf-canvas)] border border-[var(--lf-border)] flex items-center justify-center">
          <img
            src={report.photoUrl || '/assets/branding/Logo_LostnFound.png'}
            alt={report.itemName}
            className="w-full h-full object-contain max-h-[360px]"
          />
        </div>
      </div>

      {/* Details Box */}
      <div className="bg-white rounded-3xl border border-[var(--lf-border)] p-6 space-y-4">
        <h3 className="text-sm font-bold text-[var(--lf-ink)]">
          Informasi Barang Temuan
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[var(--lf-muted)] block mb-1">Kategori</span>
            <span className="font-semibold text-[var(--lf-ink)]">
              {report.category}
            </span>
          </div>

          <div>
            <span className="text-[var(--lf-muted)] block mb-1">Tanggal Ditemukan</span>
            <span className="font-semibold text-[var(--lf-ink)] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[var(--lf-muted)]" />
              {report.foundDate}
            </span>
          </div>

          <div className="sm:col-span-2">
            <span className="text-[var(--lf-muted)] block mb-1">Lokasi Ditemukan</span>
            <span className="font-semibold text-[var(--lf-ink)] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[var(--lf-muted)] shrink-0" />
              {report.foundLocation}
            </span>
          </div>

          <div className="sm:col-span-2 pt-2 border-t border-[var(--lf-border)]">
            <span className="text-[var(--lf-muted)] block mb-1">
              Deskripsi & Ciri-Ciri
            </span>
            <p className="text-xs text-[var(--lf-ink)] leading-relaxed bg-[var(--lf-canvas)] p-3 rounded-xl border border-[var(--lf-border)]">
              {report.description || 'Tidak ada deskripsi tambahan.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

