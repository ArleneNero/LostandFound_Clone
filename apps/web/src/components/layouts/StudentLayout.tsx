import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { Home, Search, PlusCircle, ClipboardList, User } from 'lucide-react';
import { RoutePaths } from '@/constants/routes';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const studentNavItems: NavItem[] = [
  { name: 'Beranda', path: RoutePaths.STUDENT_HOME, icon: Home },
  { name: 'Cari', path: RoutePaths.CATALOG, icon: Search },
  { name: 'Lapor', path: RoutePaths.STUDENT_REPORT_FOUND, icon: PlusCircle },
  { name: 'Riwayat', path: RoutePaths.STUDENT_MY_REPORTS, icon: ClipboardList },
  { name: 'Profil', path: RoutePaths.STUDENT_PROFILE, icon: User },
];

export const StudentLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[var(--lf-canvas)] flex flex-col">
      {/* Student Top Header (Figma Header/Desktop/Student Node 27:31) */}
      <header className="bg-white border-b border-[var(--lf-border)] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-[64px] flex items-center justify-between">
          <NavLink to={RoutePaths.STUDENT_HOME} className="flex items-center gap-3">
            <img
              src="/assets/branding/Logo_LostnFound.png"
              alt="UBL LostnFound Logo"
              className="w-9 h-9 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[var(--lf-ink)] leading-tight">
                UBL LostnFound
              </span>
              <span className="text-[11px] text-[var(--lf-muted)]">Portal Mahasiswa</span>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {studentNavItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    'px-3.5 py-2 rounded-[12px] text-sm font-medium transition-colors',
                    isActive
                      ? 'text-[var(--lf-action)] font-semibold bg-[var(--lf-soft)]'
                      : 'text-[var(--lf-muted)] hover:text-[var(--lf-ink)] hover:bg-[#F9FAFB]',
                  )}
                >
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* User Profile Mini Badge */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[var(--lf-soft)] text-[var(--lf-action)] flex items-center justify-center font-bold text-xs">
              M
            </div>
            <span className="text-xs font-semibold text-[var(--lf-ink)] hidden sm:block">
              Mahasiswa
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-8">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--lf-border)] h-[64px] z-40 flex items-center justify-around px-2 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
        {studentNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={clsx(
                'flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors select-none',
                isActive ? 'text-[var(--lf-action)] font-semibold' : 'text-[var(--lf-muted)]',
              )}
            >
              <Icon
                className={clsx(
                  'w-5 h-5',
                  isActive ? 'text-[var(--lf-action)]' : 'text-[var(--lf-muted)]',
                )}
              />
              <span className="text-[11px] leading-none">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
