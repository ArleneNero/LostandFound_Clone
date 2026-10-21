import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, LockKeyhole } from 'lucide-react';
import { RoutePaths } from '@/constants/routes';
import { Button } from '@/components/ui/Button';
import { ErrorState } from '@/components/ui/ErrorState';
import { Skeleton } from '@/components/ui/Skeleton';
import { useOfficerItemDetail } from '@/features/officer/hooks/useOfficerItemDetail';
import { isItemOverdue } from '@/features/officer/selectors/inventorySelectors';
import {
  ItemVisibilityToggle,
  ReturnItemModal,
  DistributeItemModal,
} from '@/features/officer/components';
import { ItemStatusBadge } from '@/features/officer/components/ItemStatusBadge';
import { formatDate } from '@/utils/formatDate';
export function OfficerItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const p = useOfficerItemDetail(id);
  const [isReturnOpen, setIsReturnOpen] = useState(false);
  const [isDistributeOpen, setIsDistributeOpen] = useState(false);
  if (p.isLoading) return <Skeleton height={400} />;
  if (p.error || !p.item)
    return (
      <ErrorState
        title="Barang Tidak Ditemukan"
        description={p.error || 'Data tidak tersedia pada pos penugasan.'}
        onRetry={p.refetch}
      />
    );
  const item = p.item;
  return (
    <div className="lf-stack">
      <button
        type="button"
        className="lf-text-link"
        onClick={() => navigate(RoutePaths.OFFICER_INVENTORY)}
      >
        <ArrowLeft size={20} />
        Kembali ke inventaris
      </button>
      <div className="lf-page-intro">
        <h1 className="lf-title">{item.name}</h1>
        <p>{item.category}</p>
      </div>
      <div className="lf-internal-detail-grid">
        <div className="lf-stack">
          <img className="lf-detail-photo" src={item.photoUrl} alt={item.name} />
          <section className="lf-surface lf-detail-description">
            <h2>Deskripsi publik</h2>
            <p>{item.description}</p>
            <small>Diterima {formatDate(item.receivedAt)}</small>
          </section>
        </div>
        <div className="lf-stack">
          <ItemStatusBadge item={item} />
          <section className="lf-surface lf-soft lf-private">
            <h2 className="lf-text-link">
              <LockKeyhole size={20} />
              Hanya untuk petugas
            </h2>
            <p>
              {item.privateNotes ||
                'Catatan ciri kepemilikan tersedia di sini. Tidak ditampilkan pada katalog publik.'}
            </p>
          </section>
          {item.status === 'STORED' ? (
            <>
              <Button onClick={() => setIsReturnOpen(true)}>Proses Serah Terima</Button>
              <Button
                variant="secondary"
                disabled
                title="Edit informasi belum tersedia dalam kontrak API"
              >
                Edit Informasi Barang
              </Button>
              <section className="lf-surface lf-detail-controls">
                <ItemVisibilityToggle
                  isVisible={item.isVisible}
                  isUpdating={p.isUpdating}
                  onToggle={p.toggleVisibility}
                />
                <Button variant="secondary" onClick={() => setIsDistributeOpen(true)}>
                  Salurkan Barang
                </Button>
              </section>
            </>
          ) : (
            <p role="status" className="lf-surface lf-soft">
              {item.status === 'RETURNED_TO_OWNER'
                ? 'Barang telah diserahkan kepada pemilik sah.'
                : 'Barang telah disalurkan dan ditarik dari katalog.'}
            </p>
          )}
          {item.status === 'STORED' &&
            isItemOverdue(item.receivedAt, item.storageLimitDays ?? null) && (
              <p role="status" className="lf-warning">
                Peringatan penyimpanan: lebih dari {item.storageLimitDays} hari. Status dan
                visibilitas tidak berubah otomatis.
              </p>
            )}
        </div>
      </div>
      <ReturnItemModal
        key={`return-${isReturnOpen}`}
        isOpen={isReturnOpen}
        onClose={() => setIsReturnOpen(false)}
        onConfirm={async (rec, sum) => {
          await p.returnItem(rec, sum);
          setIsReturnOpen(false);
        }}
        item={item}
        isSubmitting={p.isSubmitting}
      />
      <DistributeItemModal
        key={`distribute-${isDistributeOpen}`}
        isOpen={isDistributeOpen}
        onClose={() => setIsDistributeOpen(false)}
        onConfirm={async (notes) => {
          await p.distributeItem(notes);
          setIsDistributeOpen(false);
        }}
        item={item}
        isSubmitting={p.isSubmitting}
      />
    </div>
  );
}
