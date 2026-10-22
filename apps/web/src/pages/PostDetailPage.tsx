import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { services } from '@/services/registry';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';
export function PostDetailPage() {
  const { id } = useParams();
  const load = useCallback(() => services.posts.getPostById(Number(id)), [id]);
  const { data: post, loading, error, refetch } = useAsyncResource(load);
  if (loading)
    return (
      <div className="lf-public-content">
        <Skeleton height={350} />
      </div>
    );
  if (error)
    return (
      <div className="lf-public-content">
        <ErrorState title="Gagal memuat pos" description={error} onRetry={refetch} />
      </div>
    );
  if (!post)
    return (
      <div className="lf-public-content">
        <h1 className="lf-title">Pos tidak ditemukan</h1>
        <Link to="/pos">Kembali ke daftar pos</Link>
      </div>
    );
  return (
    <div className="lf-public-content lf-stack">
      <Link className="lf-text-link" to="/pos">
        Kembali ke pos pelayanan
      </Link>
      <h1 className="lf-title">{post.name}</h1>
      <div className="lf-post-gallery">
        {post.photos.length ? (
          post.photos
            .slice(0, 3)
            .map((photo, i) => (
              <img key={photo} src={photo} alt={`Foto ${post.name} ${i + 1}`} loading="lazy" />
            ))
        ) : (
          <div className="lf-surface lf-empty">Foto pos belum tersedia.</div>
        )}
      </div>
      <section className="lf-surface lf-location-card">
        <h2 className="lf-section-title">Lokasi &amp; jam pelayanan</h2>
        <p>{post.location || 'Informasi lokasi belum tersedia.'}</p>
        <p>{post.openingHours || 'Jam pelayanan belum tersedia.'}</p>
        <p>{post.directions || 'Petunjuk arah belum tersedia.'}</p>
      </section>
      <Link className="lf-text-link" to={`/barang?post=${post.id}`}>
        Lihat barang pada pos ini
      </Link>
    </div>
  );
}
