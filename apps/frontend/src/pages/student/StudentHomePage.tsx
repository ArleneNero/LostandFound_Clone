import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, ClipboardList, ArrowRight, Building2 } from 'lucide-react';
import { RoutePaths } from '@/constants/routes';
import { useStudentReports } from '@/features/student/hooks/useStudentReports';
import { StudentReportCard } from '@/features/student/components/StudentReportCard';
import { useStudentProfile } from '@/features/student/hooks/useStudentProfile';
import { StudentWelcomeBanner } from '@/features/student/components/StudentWelcomeBanner';
import { StudentMetricsSection } from '@/features/student/components/StudentMetricsSection';

export const StudentHomePage: React.FC = () => {
  const { profile, stats, isLoading: isProfileLoading } = useStudentProfile();
  const { reports, isLoading: isReportsLoading } = useStudentReports();

  const recentReports = reports.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 sm:py-8 space-y-6">
      <StudentWelcomeBanner
        name={profile?.name}
        studentNumber={profile?.studentNumber}
      />

      <StudentMetricsSection
        totalReports={stats.totalReports}
        pendingReports={stats.pendingReports}
        receivedReports={stats.receivedReports}
        isLoading={isProfileLoading}
      />

      {/* Notice Banner */}
      <div className="bg-white border border-[var(--lf-border)] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-blue-50 text-[var(--lf-action)] flex items-center justify-center shrink-0 mt-0.5">
          <Building2 className="w-5 h-5" />
        </div>
        <div className="flex-1 text-xs">
          <h4 className="font-bold text-[var(--lf-ink)] text-sm mb-1">
            Pos Pelayanan Pengajaran Budi Luhur
          </h4>
          <p className="text-[var(--lf-muted)] leading-relaxed">
            Setiap barang yang Anda laporkan secara online <strong>wajib diserahkan fisiknya</strong> ke{' '}
            <strong className="text-[var(--lf-ink)]">Ruang Pengajaran (Gedung Unit 4 Lt. 1)</strong> pada hari Senin–Jumat, 08.00–16.00 WIB untuk dicocokkan dan disimpan ke inventaris resmi.
          </p>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--lf-ink)]">
              Laporan Temuan Terbaru
            </h2>
            <p className="text-xs text-[var(--lf-muted)]">
              Pantau status penyerahan fisik barang yang Anda temukan
            </p>
          </div>
          <Link
            to={RoutePaths.STUDENT_MY_REPORTS}
            className="text-xs font-semibold text-[var(--lf-action)] hover:underline flex items-center gap-1"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {isReportsLoading ? (
          <div className="py-12 text-center text-xs text-[var(--lf-muted)]">
            Memuat laporan terbaru...
          </div>
        ) : recentReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentReports.map((report) => (
              <StudentReportCard key={report.id} report={report} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[var(--lf-border)] p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[var(--lf-canvas)] text-[var(--lf-muted)] flex items-center justify-center mx-auto">
              <ClipboardList className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-[var(--lf-ink)]">
              Belum Ada Laporan Temuan
            </h3>
            <p className="text-xs text-[var(--lf-muted)] max-w-sm mx-auto">
              Jika Anda menemukan barang tertinggal di area kampus, laporkan di sini agar pemiliknya dapat menemukannya kembali.
            </p>
            <Link
              to={RoutePaths.STUDENT_REPORT_FOUND}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--lf-action)] text-white text-xs font-semibold rounded-xl hover:bg-[#094bb0] transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Buat Laporan Temuan Baru</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
