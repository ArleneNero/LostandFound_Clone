import { useState, useCallback, useEffect } from 'react';
import { services } from '@/services/registry';
import { useServiceVersion } from '@/hooks/useServiceVersion';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import { CATALOG_PAGE_SIZE } from '@/constants/pagination';
export function usePublicCatalog(initialLimit = CATALOG_PAGE_SIZE) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [postIdFilter, setPostIdFilter] = useState<number>();
  const [page, setPage] = useState(1);
  const version = useServiceVersion();
  const limit = Math.max(1, Math.min(CATALOG_PAGE_SIZE, initialLimit));
  const load = useCallback(
    () =>
      services.items.getItems({
        search: searchQuery.trim() || undefined,
        category: categoryFilter === 'ALL' ? undefined : categoryFilter,
        postId: postIdFilter,
        sort: sortOrder,
        page,
        limit,
      }),
    [searchQuery, categoryFilter, postIdFilter, sortOrder, page, limit],
  );
  const { data, loading, error, refetch } = useAsyncResource(load, version);
  useEffect(() => {
    if (data && data.page !== page) setPage(data.page);
  }, [data, page]);
  const changeSearch = useCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, []);
  const changeCategory = useCallback((value: string) => {
    setCategoryFilter(value);
    setPage(1);
  }, []);
  const changeSort = useCallback((value: 'newest' | 'oldest') => {
    setSortOrder(value);
    setPage(1);
  }, []);
  const changePost = useCallback((value: number | undefined) => {
    setPostIdFilter(value);
    setPage(1);
  }, []);
  return {
    items: data?.items ?? [],
    isLoading: loading,
    error,
    searchQuery,
    setSearchQuery: changeSearch,
    categoryFilter,
    setCategoryFilter: changeCategory,
    sortOrder,
    setSortOrder: changeSort,
    postIdFilter,
    setPostIdFilter: changePost,
    page,
    setPage,
    totalPages: data?.totalPages ?? 1,
    totalItems: data?.total ?? 0,
    refetch,
  };
}
