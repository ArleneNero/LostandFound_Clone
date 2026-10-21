import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRound, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { services } from '@/services/registry';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import { useServiceVersion } from '@/hooks/useServiceVersion';
export function OfficerAccountPage() {
  const navigate = useNavigate();
  const version = useServiceVersion();
  const load = useCallback(() => services.auth.getCurrentUser(), []);
  const { data: user, loading, error } = useAsyncResource(load, version);
  const logout = async () => {
    await services.auth.logout();
    navigate('/');
  };
  return (
    <div className="lf-stack" style={{ maxWidth: 560, margin: 'auto' }}>
      <div className="lf-page-intro">
        <h1 className="lf-title">Akun Petugas</h1>
        <p>Sesi simulasi frontend. Belum terhubung ke Clerk.</p>
      </div>
      <section className="lf-surface lf-stack" style={{ padding: 24 }}>
        <UserRound size={32} aria-hidden="true" />
        {loading ? (
          <p role="status">Memuat sesi...</p>
        ) : error ? (
          <p role="alert">{error}</p>
        ) : (
          <>
            <h2 className="lf-section-title">{user?.name ?? 'Tidak ada sesi'}</h2>
            <p>{user?.email}</p>
            <p>Penugasan pos: {user?.assignedPostId ?? '-'}</p>
            <Button variant="secondary" leftIcon={<LogOut size={20} />} onClick={logout}>
              Keluar Panel
            </Button>
          </>
        )}
      </section>
    </div>
  );
}
