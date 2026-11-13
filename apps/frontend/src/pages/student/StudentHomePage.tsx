import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Package,
  ArrowRight,
  HelpCircle,
  Building2,
  ClipboardList,
  PlusCircle,
} from 'lucide-react';
import { RoutePaths } from '@/constants/routes';
import { useStudentReports } from '@/features/student/hooks/useStudentReports';
import { useStudentProfile } from '@/features/student/hooks/useStudentProfile';
import { StudentReportCard } from '@/features/student/components/StudentReportCard';
import { StudentMetricsSection } from '@/features/student/components/StudentMetricsSection';

const QUICK_CATEGORIES = [
  'Semua',
  'Elektronik',
  'Dompet & Tas',
  'Aksesoris',
  'Kunci',
  'Dokumen',
];

export const StudentHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { profile, stats, isLoading: isProfileLoading } = useStudentProfile();
  const { reports, isLoading: isReportsLoading } = useStudentReports();

  const recentReports = reports.slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${RoutePaths.CATALOG}?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(RoutePaths.CATALOG);
    }
  };

  const handleCategoryClick = (category: string) => {
    if (category === 'Semua') {
      navigate(RoutePaths.CATALOG);
    } else {
      navigate(`${RoutePaths.CATALOG}?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* 1. Search-First Hero Section (Figma D | 03.P02 #374:19659) */}
      <section className="bg-white border border-[#E4E7EC] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-semibold text-[#1570EF] uppercase tracking-wider">
              Portal Mahasiswa — {profile?.name || 'Mahasiswa UBL'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight mt-1">
              Sedang mencari barangmu?
            </h1>
            <p className="text-xs sm:text-sm text-[#667085] mt-1.5 leading-relaxed">
              Jelajahi daftar barang yang telah ditemukan di lingkungan kampus Budi Luhur.
            </p>
          </div>

          <Link
            to={RoutePaths.GUIDE}
            className="inline-flex items-center gap-2 self-start lg:self-center px-4 py-2.5 rounded-xl border border-[#D1E9FF] bg-[#EFF8FF] text-[#175CD3] text-xs sm:text-sm font-semibold hover:bg-[#D1E9FF] transition-all shadow-xs shrink-0"
          >
            <HelpCircle className="w-4 h-4 text-[#1570EF]" />
            <span>Cara mengambil barang</span>
          </Link>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-[#98A2B3] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama barang, ciri fisik, atau lokasi..."
              className="w-full h-12 pl-11 pr-4 bg-[#F9FAFB] border border-[#E4E7EC] rounded-xl text-sm text-[#111827] placeholder-[#98A2B3] focus:outline-none focus:border-[#1570EF] focus:bg-white transition-all shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="h-12 px-6 rounded-xl bg-gradient-to-b from-[#3194FF] to-[#0873F8] text-white font-semibold text-sm hover:brightness-105 active:scale-[0.99] transition-all shadow-[0px_4px_12px_rgba(22,119,255,0.2)] flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Cari Barang</span>
          </button>
        </form>

        {/* Quick Category Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[#F2F4F7]">
          <span className="text-xs font-medium text-[#667085] mr-1">
            Kategori cepat:
          </span>
          {QUICK_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#F2F4F7] text-[#344054] hover:bg-[#E4E7EC] hover:text-[#111827] transition-all cursor-pointer"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Secondary Action: Lapor Barang Temuan (Figma D | 03.P02 #374:19703) */}
      <section className="bg-white border border-[#E4E7EC] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#EFF8FF] text-[#1570EF] flex items-center justify-center shrink-0 border border-[#B2DDFF]">
            <Package className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-bold text-[#111827]">
              Menemukan barang milik orang lain?
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] leading-relaxed max-w-2xl">
              Boleh langsung menyerahkan ke petugas jaga pos atau membuat laporan temuan terlebih dahulu untuk mendapatkan nomor antrean penyerahan fisik.
            </p>
          </div>
        </div>

        <Link
          to={RoutePaths.STUDENT_REPORT_FOUND}
          className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-5 py-3 rounded-xl border border-[#D1E9FF] bg-white text-[#1570EF] hover:bg-[#EFF8FF] font-semibold text-xs sm:text-sm shadow-xs transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-[#1570EF]" />
          <span>Lapor Temuan</span>
        </Link>
      </section>

      {/* 3. Ringkasan Status & Metrik Laporan Saya */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#111827]">
              Status Laporan Temuan Saya
            </h2>
            <p className="text-xs text-[#667085]">
              Ringkasan aktivitas barang yang Anda temukan dan laporkan
            </p>
          </div>
          <Link
            to={RoutePaths.STUDENT_MY_REPORTS}
            className="text-xs font-semibold text-[#1570EF] hover:underline flex items-center gap-1"
          >
            <span>Lihat Semua Riwayat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <StudentMetricsSection
          totalReports={stats.totalReports}
          pendingReports={stats.pendingReports}
          receivedReports={stats.receivedReports}
          isLoading={isProfileLoading}
        />
      </section>

      {/* 4. Notice Banner Penyerahan Fisik */}
      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-[#EFF8FF] text-[#1570EF] flex items-center justify-center shrink-0 mt-0.5">
          <Building2 className="w-5 h-5" />
        </div>
        <div className="flex-1 text-xs">
          <h4 className="font-bold text-[#111827] text-sm mb-1">
            Pos Pelayanan Pengajaran Budi Luhur
          </h4>
          <p className="text-[#667085] leading-relaxed">
            Setiap barang yang dilaporkan secara online <strong>wajib diserahkan fisiknya</strong> ke{' '}
            <strong className="text-[#111827]">Ruang Pengajaran (Gedung Unit 4 Lt. 1)</strong> pada hari Senin–Jumat, 08.00–16.00 WIB untuk diverifikasi dan disimpan ke inventaris resmi.
          </p>
        </div>
      </div>

      {/* 5. Daftar Laporan Temuan Terbaru */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-[#111827]">
            Laporan Temuan Terbaru
          </h3>
          <Link
            to={RoutePaths.STUDENT_MY_REPORTS}
            className="text-xs font-semibold text-[#1570EF] hover:underline"
          >
            Kelola Riwayat
          </Link>
        </div>

        {isReportsLoading ? (
          <div className="py-12 text-center text-xs text-[#667085]">
            Memuat laporan terbaru...
          </div>
        ) : recentReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentReports.map((report) => (
              <StudentReportCard key={report.id} report={report} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E4E7EC] p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#F2F4F7] text-[#667085] flex items-center justify-center mx-auto">
              <ClipboardList className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-[#111827]">
              Belum Ada Laporan Temuan Aktif
            </h4>
            <p className="text-xs text-[#667085] max-w-sm mx-auto">
              Jika Anda menemukan barang tertinggal di area kampus, laporkan di sini agar pemiliknya dapat menemukannya kembali.
            </p>
            <Link
              to={RoutePaths.STUDENT_REPORT_FOUND}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1570EF] text-white text-xs font-semibold rounded-xl hover:bg-[#175CD3] transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Buat Laporan Temuan Baru</span>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};
