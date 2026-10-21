import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, PackageOpen } from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { Pagination } from '@/components/ui/Pagination';
import { usePublicCatalog } from '@/features/public/hooks/usePublicCatalog';
import { PublicItemCard } from '@/features/public/components/PublicItemCard';
import { CatalogFiltersRow } from '@/features/public/components/CatalogFiltersRow';
import { GuestCategoryList } from '@/features/public/components/GuestCategoryList';
import { CATALOG_PAGE_SIZE } from '@/constants/pagination';
export function CatalogPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const p = usePublicCatalog(CATALOG_PAGE_SIZE);
  const { setSearchQuery, setCategoryFilter, setPostIdFilter } = p;
  useEffect(() => {
    setSearchQuery(params.get('q') ?? '');
    setCategoryFilter(params.get('cat') ?? 'ALL');
    const post = Number(params.get('post'));
    setPostIdFilter(post > 0 ? post : undefined);
  }, [params, setSearchQuery, setCategoryFilter, setPostIdFilter]);
  const reset = () => {
    p.setSearchQuery('');
    p.setCategoryFilter('ALL');
    p.setPostIdFilter(undefined);
    p.setSortOrder('newest');
  };
  return (
    <div className="lf-public-content lf-stack lf-catalog">
      <div className="lf-page-intro">
        <h1 className="lf-title">Katalog Barang</h1>
        <p>Hanya barang yang sudah diterima petugas.</p>
      </div>
      <label className="lf-search">
        <Search size={20} />
        <span className="sr-only">Cari nama barang</span>
        <input
          value={p.searchQuery}
          onChange={(e) => p.setSearchQuery(e.target.value)}
          placeholder="Cari nama barang..."
        />
      </label>
      <CatalogFiltersRow {...p} onResetFilters={reset} />
      <div className="lf-only-mobile">
        <GuestCategoryList onSelect={p.setCategoryFilter} selected={p.categoryFilter} />
      </div>
      <div className="lf-heading-row lf-result-count">
        <span>{p.totalItems} barang tersedia</span>
        <button type="button" className="lf-only-mobile lf-text-link" onClick={reset}>
          Hapus filter
        </button>
      </div>
      {p.error ? (
        <ErrorState title="Gagal memuat katalog" description={p.error} onRetry={p.refetch} />
      ) : p.isLoading ? (
        <div className="lf-catalog-grid" aria-busy="true" aria-label="Memuat katalog">
          {[1, 2, 3, 4].map((n) => (
            <Skeleton key={n} height={258} />
          ))}
        </div>
      ) : !p.items.length ? (
        <section className="lf-surface lf-empty">
          <PackageOpen size={32} />
          <h2>Tidak Ada Barang Temuan Sesuai</h2>
          <p>Belum ada barang untuk filter ini.</p>
          <button type="button" className="lf-text-link" onClick={reset}>
            Tampilkan Semua Barang
          </button>
        </section>
      ) : (
        <div className="lf-catalog-grid">
          {p.items.map((item) => (
            <PublicItemCard
              key={item.id}
              item={item}
              onClick={() => navigate(`/barang/${item.id}`)}
            />
          ))}
        </div>
      )}
      {!p.error && (
        <Pagination
          page={p.page}
          totalPages={p.totalPages}
          total={p.totalItems}
          busy={p.isLoading}
          onPage={p.setPage}
        />
      )}
    </div>
  );
}
