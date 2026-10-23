import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { RoutePaths } from '@/constants/routes';
import { RoleCard } from './RoleCard';
export function RoleSelectionSection() {
  const navigate = useNavigate();
  return (
    <section className="lf-role-section" aria-label="Pilihan pengguna">
      <h2 className="lf-only-desktop">Masuk ke UBL LostnFound</h2>
      <div className="lf-role-grid">
        <RoleCard
          title="Mahasiswa"
          description="Login / Register untuk melapor dan cek status"
          iconSrc={`${import.meta.env.BASE_URL}assets/illustrations/roles/Icon_Mahasiswa.png`}
          onClick={() => navigate('/masuk?role=student')}
        />
        <RoleCard
          title="Petugas"
          description="Login untuk mengelola barang dan penyerahan"
          iconSrc={`${import.meta.env.BASE_URL}assets/illustrations/roles/Icon_Petugas.png`}
          onClick={() => navigate('/masuk?role=officer')}
        />
        <RoleCard
          title="Mode Tamu"
          description="Lihat barang dan lokasi pos tanpa login"
          iconFallback={<Search size={30} />}
          onClick={() => navigate(RoutePaths.GUEST_HOME)}
        />
      </div>
      <p>Katalog dapat diakses tanpa membuat akun.</p>
    </section>
  );
}
