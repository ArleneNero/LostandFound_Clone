import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, Search, Plus, MapPin, UserRound, LogIn } from 'lucide-react';
import { Brand } from '@/components/ui/Brand';
const items = [
  { name: 'Beranda', short: 'Beranda', path: '/beranda', icon: Home },
  { name: 'Cari Barang', short: 'Cari', path: '/barang', icon: Search },
  { name: 'Lapor Temuan', short: 'Lapor', path: '/masuk?role=student', icon: Plus },
  { name: 'Pos Pelayanan', short: 'Pos', path: '/pos', icon: MapPin },
];
export function PublicLayout() {
  const { pathname } = useLocation();
  const landing = pathname === '/';
  const login = '/masuk?role=student';
  return (
    <div className={`lf-public-shell ${landing ? 'lf-landing-shell' : ''}`} data-app-mode="mock">
      <header className="lf-public-header">
        <div>
          <Brand />
          {!landing && (
            <>
              <nav className="lf-public-desktop-nav" aria-label="Navigasi Guest desktop">
                {items.map((i) => (
                  <NavLink key={i.name} to={i.path}>
                    {i.name}
                  </NavLink>
                ))}
              </nav>
              <NavLink className="lf-login-link" to={login}>
                Login
                <LogIn size={19} />
              </NavLink>
            </>
          )}
        </div>
      </header>
      <main id="main-content" className={`lf-public-main ${landing ? 'lf-landing-main' : ''}`}>
        <Outlet />
      </main>
      {!landing && (
        <nav className="lf-public-bottom-nav" aria-label="Navigasi Guest mobile">
          {[...items, { name: 'Profil', short: 'Profil', path: login, icon: UserRound }].map(
            ({ name, short, path, icon: Icon }) => (
              <NavLink
                key={name}
                to={path}
                className={`${pathname.startsWith(path.split('?')[0]) && name !== 'Lapor Temuan' ? 'active' : ''} ${short === 'Lapor' ? 'lf-report-nav' : ''}`}
              >
                <span className="lf-nav-icon">
                  <Icon size={short === 'Lapor' ? 28 : 22} />
                </span>
                <span>{short}</span>
              </NavLink>
            ),
          )}
        </nav>
      )}
    </div>
  );
}
