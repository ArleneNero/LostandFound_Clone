import {
  IItemService,
  GetItemsParams,
  GetOfficerItemsParams,
  CreateItemInput,
} from '../contracts/IItemService';
import { FoundItem, PaginatedResult } from '@/types/domain';
import { mapItemDtoToDomain } from '@/types/domain/mappers';
import { mockStore } from '@/data/mockStore';
import { InventoryOfficerDto, FoundItemPublicDto } from '@/types/api';
import { requireOfficer, requireOwnedItem, requireStoredItem } from './policies';
import { paginate } from './paginate';
import { buildItem } from './itemFactory';
import { consumeMockUpload } from './mockUploads';
function publicDto(item: InventoryOfficerDto): FoundItemPublicDto {
  return {
    item_id: item.item_id,
    inventory_code: item.inventory_code,
    item_name: item.item_name,
    category: item.category,
    public_description: item.public_description,
    found_location: item.found_location,
    found_on: item.found_on,
    received_at: item.received_at,
    post: { ...item.post },
    photos: item.photos.map((photo) => ({ ...photo })),
  };
}
function officerItem(item: InventoryOfficerDto): FoundItem {
  return {
    ...mapItemDtoToDomain(item),
    storageLimitDays: mockStore.getState().storageLimits[item.storage_post_id] ?? null,
  };
}
function filterItems(items: InventoryOfficerDto[], params: GetItemsParams = {}) {
  const query = params.search?.trim().toLowerCase();
  return items
    .filter(
      (item) =>
        (!query ||
          [item.item_name, item.public_description, item.found_location, item.inventory_code].some(
            (value) => value?.toLowerCase().includes(query),
          )) &&
        (!params.category || params.category === 'ALL' || item.category === params.category) &&
        (params.postId === undefined || item.storage_post_id === params.postId),
    )
    .sort(
      (a, b) =>
        (params.sort === 'oldest' ? 1 : -1) *
          (Date.parse(a.received_at) - Date.parse(b.received_at)) ||
        a.item_id.localeCompare(b.item_id),
    );
}
export class InMemoryItemService implements IItemService {
  async getItems(params: GetItemsParams = {}): Promise<PaginatedResult<FoundItem>> {
    const items = mockStore
      .getState()
      .items.filter((item) => item.status === 'STORED' && item.is_visible);
    return paginate(
      filterItems(items, params).map((item) => mapItemDtoToDomain(publicDto(item))),
      params.page,
      params.limit,
    );
  }
  async getOfficerItems(params: GetOfficerItemsParams = {}): Promise<PaginatedResult<FoundItem>> {
    const user = requireOfficer();
    const items = mockStore
      .getState()
      .items.filter(
        (item) =>
          item.storage_post_id === user.assignedPostId &&
          (!params.status || item.status === params.status) &&
          (params.isVisible === undefined || item.is_visible === params.isVisible),
      );
    return paginate(filterItems(items, params).map(officerItem), params.page, params.limit);
  }
  async getItemById(id: string): Promise<FoundItem | null> {
    return officerItem(requireOwnedItem(id));
  }
  async getPublicItemById(id: string): Promise<FoundItem | null> {
    const item = mockStore
      .getState()
      .items.find((entry) => entry.item_id === id && entry.status === 'STORED' && entry.is_visible);
    return item ? mapItemDtoToDomain(publicDto(item)) : null;
  }
  async createItem(input: CreateItemInput): Promise<FoundItem> {
    const item = buildItem(input);
    consumeMockUpload(input.photoToken);
    mockStore.getState().items.unshift(item);
    mockStore.publish();
    return officerItem(item);
  }
  async updateVisibility(id: string, visible: boolean): Promise<FoundItem> {
    const item = requireStoredItem(id);
    item.is_visible = visible;
    mockStore.publish();
    return officerItem(item);
  }
  async returnItem(id: string, recipient: string, summary: string): Promise<FoundItem> {
    const user = requireOfficer();
    if (!recipient?.trim()) throw new Error('Nama penerima wajib diisi.');
    if (!summary?.trim()) throw new Error('Ringkasan verifikasi wajib diisi.');
    const item = requireStoredItem(id);
    const state = mockStore.getState();
    if (state.returns.some((entry) => entry.item_id === id))
      throw new Error('Barang sudah pernah diproses serah terima sebelumnya.');
    state.returns.push({
      return_id: crypto.randomUUID(),
      item_id: id,
      recipient_name: recipient.trim(),
      verification_summary: summary.trim(),
      returned_at: new Date().toISOString(),
      returned_by_user_id: user.userId,
    });
    item.status = 'RETURNED_TO_OWNER';
    item.is_visible = false;
    mockStore.publish();
    return officerItem(item);
  }
  async distributeItem(id: string, notes: string): Promise<FoundItem> {
    if (!notes?.trim()) throw new Error('Catatan tujuan penyaluran wajib diisi.');
    const item = requireStoredItem(id);
    item.status = 'DISTRIBUTED';
    item.is_visible = false;
    // Internal note only; distribution is not a return to the owner.
    item.private_verification_notes = [
      item.private_verification_notes,
      `[DISALURKAN] ${notes.trim()}`,
    ]
      .filter(Boolean)
      .join('\n');
    mockStore.publish();
    return officerItem(item);
  }
}
