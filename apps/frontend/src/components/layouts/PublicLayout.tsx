import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  Home,
  Search,
  PlusCircle,
  MapPin,
  ArrowRight,
  ClipboardList,
  User,
  LogOut,
  GraduationCap,
} from 'lucide-react';
import { RoutePaths } from '@/constants/routes';
import { registry } from '@/services/registry';
import { UserSession } from '@/types/domain';
import { GuestReportNoticeModal } from '@/features/public/components/GuestReportNoticeModal';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  isActionModal?: boolean;
}

export const PublicLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const isLanding = location.pathname === RoutePaths.LANDING;

  useEffect(() => {
    let isMounted = true;
    registry
      .getServices()
      .auth.getCurrentUser()
      .then((user) => {
        if (isMounted) setCurrentUser(user);
      })
      .catch(() => {
        if (isMounted) setCurrentUser(null);
      });
    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  const handleLogout = async () => {
    await registry.getServices().auth.logout();
    setCurrentUser(null);
    navigate(RoutePaths.LANDING);
  };

  const isStudent = currentUser?.role === 'STUDENT';

  const navItems: NavItem[] = isStudent
    ? [
        { name: 'Beranda', path: RoutePaths.GUEST_HOME, icon: Home },
        { name: 'Cari Barang', path: RoutePaths.CATALOG, icon: Search },
        { name: 'Lapor Temuan', path: RoutePaths.STUDENT_REPORT_FOUND, icon: PlusCircle },
        { name: 'Laporan Saya', path: RoutePaths.STUDENT_MY_REPORTS, icon: ClipboardList },
        { name: 'Pos Pelayanan', path: RoutePaths.POSTS, icon: MapPin },
      ]
    : [
        { name: 'Beranda', path: RoutePaths.GUEST_HOME, icon: Home },
        { name: 'Cari Barang', path: RoutePaths.CATALOG, icon: Search },
        { name: 'Lapor Temuan', path: '#lapor', icon: PlusCircle, isActionModal: true },
        { name: 'Pos Pelayanan', path: RoutePaths.POSTS, icon: MapPin },
      ];

  const mobileNavItems: NavItem[] = isStudent
    ? [
        { name: 'Beranda', path: RoutePaths.GUEST_HOME, icon: Home },
        { name: 'Cari Barang', path: RoutePaths.CATALOG, icon: Search },
        { name: 'Lapor', path: RoutePaths.STUDENT_REPORT_FOUND, icon: PlusCircle },
        { name: 'Riwayat', path: RoutePaths.STUDENT_MY_REPORTS, icon: ClipboardList },
        { name: 'Profil', path: RoutePaths.STUDENT_PROFILE, icon: User },
      ]
    : navItems;

  const isNavActive = (itemPath: string) => {
    if (itemPath === RoutePaths.GUEST_HOME) {
      return (
        location.pathname === RoutePaths.GUEST_HOME ||
        location.pathname === RoutePaths.STUDENT_HOME
      );
    }
    if (itemPath.startsWith('/')) {
      return location.pathname.startsWith(itemPath);
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-[var(--lf-canvas)] flex flex-col">
      {/* Top Header (Unified Single Shell) */}
      <header className="bg-white border-b border-[var(--lf-border)] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-[64px] flex items-center justify-between">
          {/* Logo & Subtitle */}
          <NavLink to={RoutePaths.LANDING} className="flex items-center gap-3">
            <img
              src="/assets/branding/Logo_LostnFound.png"
              alt="UBL LostnFound Logo"
              className="w-9 h-9 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[var(--lf-ink)] leading-tight">
                UBL LostnFound
              </span>
              <span className="text-[11px] text-[var(--lf-muted)]">
                Temukan barangmu dengan mudah.
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation - Hidden on 00.01 Landing Frame per Figma */}
          {!isLanding && (
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => {
                if (item.isActionModal) {
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setIsNoticeOpen(true)}
                      className="text-sm transition-colors py-1 text-[#475467] font-medium hover:text-[#1570EF] cursor-pointer"
                    >
                      {item.name}
                    </button>
                  );
                }
                const active = isNavActive(item.path);
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={clsx(
                      'text-sm transition-colors py-1',
                      active
                        ? 'text-[#1570EF] font-semibold'
                        : 'text-[#475467] font-medium hover:text-[#1570EF]'
                    )}
                  >
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>
          )}

          {/* User Auth CTA / Profile Area - Hidden on 00.01 Landing Frame */}
          {!isLanding && (
            <div className="flex items-center gap-2">
              {isStudent && currentUser ? (
                <div className="flex items-center gap-2">
                  <Link
                    to={RoutePaths.STUDENT_PROFILE}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#EFF8FF] text-[#1570EF] hover:bg-[#D1E9FF] transition-colors border border-[#B2DDFF] shadow-2xs"
                    title="Buka Profil Mahasiswa"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#1570EF] text-white flex items-center justify-center font-bold text-xs">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold max-w-[130px] truncate text-[#111827]">
                      {currentUser.name}
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    title="Keluar dari Akun"
                    aria-label="Keluar"
                    className="p-2 rounded-xl text-[#667085] hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate(RoutePaths.LOGIN)}
                  className="bg-[#1570EF] hover:bg-[#175CD3] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Masuk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-8">
        <Outlet />
      </main>

      {/* Guest Notice Modal */}
      <GuestReportNoticeModal
        isOpen={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
      />

      {/* Mobile Bottom Navigation */}
      {!isLanding && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--lf-border)] h-[64px] z-40 flex items-center justify-around px-2 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            if (item.isActionModal) {
              return (
                <button
                  key={`mobile-${item.name}`}
                  type="button"
                  onClick={() => setIsNoticeOpen(true)}
                  className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors select-none text-[var(--lf-muted)] hover:text-[#1570EF] cursor-pointer"
                >
                  <Icon className="w-5 h-5 text-[var(--lf-muted)]" />
                  <span className="text-[10px] leading-none">{item.name}</span>
                </button>
              );
            }
            const active = isNavActive(item.path);
            return (
              <NavLink
                key={`mobile-${item.path}`}
                to={item.path}
                className={clsx(
                  'flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors select-none',
                  active ? 'text-[#1570EF] font-semibold' : 'text-[var(--lf-muted)]'
                )}
              >
                <Icon className={clsx('w-5 h-5', active ? 'text-[#1570EF]' : 'text-[var(--lf-muted)]')} />
                <span className="text-[10px] leading-none">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      )}

      {/* Footer - Hidden on 00.01 Landing Frame per Figma */}
      {!isLanding && (
        <footer className="hidden md:block bg-white border-t border-[var(--lf-border)] py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--lf-muted)] gap-2">
            <span>&copy; 2026 Universitas Budi Luhur — Layanan Barang Temuan Terpadu</span>
            <span>Pos Layanan: Pengajaran, Perpustakaan, Lab Komputer</span>
          </div>
        </footer>
      )}
    </div>
  );
};
