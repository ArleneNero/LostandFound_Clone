import { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { services } from '@/services/registry';
import { useServiceVersion } from '@/hooks/useServiceVersion';
import { useAsyncResource } from '@/hooks/useAsyncResource';
export function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const version = useServiceVersion();
  const load = useCallback(
    () => (id ? services.items.getPublicItemById(id) : Promise.resolve(null)),
    [id],
  );
  const { data: item, loading, error, refetch } = useAsyncResource(load, version);
  if (loading)
    return (
      <div className="lf-public-content">
        <Skeleton height={400} />
      </div>
    );
  if (error)
    return (
      <div className="lf-public-content">
        <ErrorState title="Gagal memuat barang" description={error} onRetry={refetch} />
      </div>
    );
  if (!item)
    return (
      <div className="lf-public-content lf-stack">
        <h1 className="lf-title">Barang Tidak Ditemukan</h1>
        <p>Barang ini tidak tersedia di katalog publik atau sudah diserahkan.</p>
        <Button onClick={() => navigate('/barang')}>Kembali ke Katalog</Button>
      </div>
    );
  return (
    <div className="lf-public-content lf-stack">
      <button type="button" className="lf-text-link" onClick={() => navigate('/barang')}>
        <ArrowLeft size={20} />
        Kembali ke katalog
      </button>
      <div className="lf-public-detail-grid">
        <img src={item.photoUrl} className="lf-detail-photo" alt={item.name} />
        <div className="lf-stack">
          <div className="lf-page-intro">
            <div className="lf-heading-row">
              <h1 className="lf-title">{item.name}</h1>
              <span className="lf-available">Tersedia di pos</span>
            </div>
            <p className="lf-caption">{item.category}</p>
            <p>{item.description}</p>
          </div>
          <section className="lf-surface lf-soft lf-location-card">
            <div className="lf-inline-actions">
              <MapPin size={22} />
              <div>
                <small>Barang disimpan di</small>
                <h2 className="lf-section-title">{item.postName.replace(/^Pos\s+/, '')}</h2>
              </div>
            </div>
            <Button onClick={() => navigate(`/pos/${item.postId}`)}>
              Lihat Lokasi Pengambilan
            </Button>
          </section>
          <section className="lf-surface lf-location-card">
            <h2 className="lf-section-title">Merasa ini barang milikmu?</h2>
            <p>
              Datang ke pos dan siapkan informasi atau bukti kepemilikan. Verifikasi dilakukan
              langsung oleh petugas, tanpa klaim online.
            </p>
            <Button variant="secondary" onClick={() => navigate('/panduan')}>
              Lihat alur pengambilan
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
