import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Package, FileText, UserRound, LogOut } from 'lucide-react';
import { Brand } from '@/components/ui/Brand';
import { RoutePaths } from '@/constants/routes';
import { services } from '@/services/registry';
import { useServiceVersion } from '@/hooks/useServiceVersion';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import { useCallback } from 'react';
import { Button } from '@/components/ui/Button';
const nav = [
  { label: 'Dashboard', path: RoutePaths.OFFICER_DASHBOARD, icon: Home },
  { label: 'Inventaris', path: RoutePaths.OFFICER_INVENTORY, icon: Package },
  { label: 'Laporan', path: RoutePaths.OFFICER_REPORTS, icon: FileText },
  { label: 'Akun', path: RoutePaths.OFFICER_ACCOUNT, icon: UserRound },
];
function titleFor(path: string) {
  if (path.includes('/inventaris/')) return 'Detail Inventaris';
  if (path.includes('/inventaris')) return 'Inventaris Pengajaran';
  if (path.includes('/catat-barang')) return 'Catat Barang';
  if (path.includes('/laporan/')) return 'Detail Laporan Mahasiswa';
  if (path.includes('/laporan')) return 'Laporan Mahasiswa';
  if (path.includes('/akun')) return 'Akun Petugas';
  return 'Dashboard Pengajaran';
}
export function OfficerLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const version = useServiceVersion();
  const load = useCallback(() => services.auth.getCurrentUser(), []);
  const { data: user, loading } = useAsyncResource(load, version);
  if (!loading && user?.role !== 'OFFICER')
    return (
      <div className="lf-public-content lf-stack">
        <h1 className="lf-title">Akses Petugas</h1>
        <p>
          Masuk ke sesi demo Petugas untuk mengelola inventaris. Ini bukan autentikasi produksi.
        </p>
        <Button onClick={() => navigate('/masuk?role=officer')}>Masuk sebagai Petugas</Button>
      </div>
    );
  const active = (path: string) =>
    pathname.startsWith(path) ||
    (path === RoutePaths.OFFICER_REPORTS && pathname.includes('/catat-barang'));
  const logout = async () => {
    await services.auth.logout();
    navigate('/');
  };
  return (
    <div className="lf-officer-shell" data-app-mode="mock">
      <aside className="lf-officer-sidebar" aria-label="Panel Petugas">
        <Brand compact />
        <div className="lf-assignment">
          <small>PETUGAS</small>
          <strong>Pengajaran</strong>
        </div>
        <nav aria-label="Navigasi Petugas desktop">
          {nav.slice(0, 3).map(({ label, path, icon: Icon }) => (
            <NavLink key={path} to={path} className={active(path) ? 'active' : ''}>
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="lf-sidebar-bottom">
          <p>
            Akses hanya untuk unit
            <br />
            yang ditugaskan.
          </p>
          <button type="button" onClick={logout}>
            <LogOut size={24} />
            Keluar
          </button>
        </div>
      </aside>
      <div className="lf-officer-workspace">
        <header className="lf-officer-mobile-header">
          <Brand officer />
          <NavLink to={RoutePaths.OFFICER_ACCOUNT} aria-label="Akun Petugas">
            <UserRound size={24} />
          </NavLink>
        </header>
        <header className="lf-officer-topbar">
          <strong>{titleFor(pathname)}</strong>
          <NavLink to={RoutePaths.OFFICER_ACCOUNT}>
            <UserRound size={24} />
            <span>Petugas Pengajaran</span>
          </NavLink>
        </header>
        <main className="lf-officer-main" id="main-content">
          <div className="lf-officer-content">
            <Outlet />
          </div>
        </main>
      </div>
      <nav className="lf-officer-bottom-nav" aria-label="Navigasi Petugas mobile">
        {nav.map(({ label, path, icon: Icon }) => (
          <NavLink key={path} to={path} className={active(path) ? 'active' : ''}>
            <Icon size={22} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
