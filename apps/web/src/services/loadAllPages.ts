import type { PaginatedResult } from '@/types/domain';
import { CATALOG_PAGE_SIZE } from '@/constants/pagination';
/** Walk the existing paginated contract; do not invent a dashboard endpoint. */
export async function loadAllPages<T>(
  load: (page: number, limit: number) => Promise<PaginatedResult<T>>,
) {
  const first = await load(1, CATALOG_PAGE_SIZE);
  const items = [...first.items];
  for (let page = 2; page <= first.totalPages; page++) {
    if (page > 1000) throw new Error('Data terlalu besar untuk ringkasan demo.');
    const result = await load(page, CATALOG_PAGE_SIZE);
    items.push(...result.items);
  }
  return items;
}
