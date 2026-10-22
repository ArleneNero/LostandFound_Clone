import { CATALOG_PAGE_SIZE } from '@/constants/pagination';
export function paginate<T>(items: T[], requestedPage = 1, requestedLimit = CATALOG_PAGE_SIZE) {
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(CATALOG_PAGE_SIZE, Math.max(1, Math.floor(requestedLimit)))
    : CATALOG_PAGE_SIZE;
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const page = Math.min(
    totalPages,
    Math.max(1, Number.isFinite(requestedPage) ? Math.floor(requestedPage) : 1),
  );
  return { items: items.slice((page - 1) * limit, page * limit), page, limit, total, totalPages };
}
