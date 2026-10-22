import { mockStore } from '@/data/mockStore';
import { InventoryOfficerDto } from '@/types/api';
import { CreateItemInput } from '@/services/contracts/IItemService';
import { requireOfficer } from './policies';
import { resolveMockUpload } from './mockUploads';
export function buildItem(
  input: CreateItemInput,
  sourceSubmissionId: string | null = null,
): InventoryOfficerDto {
  const user = requireOfficer();
  const name = input.name.trim();
  if (
    !name ||
    name.length > 150 ||
    !input.category.trim() ||
    input.category.length > 80 ||
    !input.description.trim()
  )
    throw new Error('Nama, kategori, dan deskripsi publik wajib valid.');
  const upload = resolveMockUpload(input.photoToken, 'ITEM_PHOTO', user.userId);
  const post = mockStore.getState().posts.find((entry) => entry.post_id === user.assignedPostId);
  if (!post) throw new Error('Pos penugasan tidak tersedia.');
  const receivedAt = input.mockReceivedAt ?? new Date().toISOString();
  if (Number.isNaN(Date.parse(receivedAt)))
    throw new Error('Tanggal dan waktu diterima tidak valid.');
  const sequence = mockStore.getState().items.length + 1;
  return {
    item_id: crypto.randomUUID(),
    inventory_code: `INV-${new Date().getFullYear()}-${String(sequence).padStart(4, '0')}`,
    item_name: name,
    category: input.category.trim(),
    public_description: input.description.trim(),
    found_location: input.foundLocation?.trim() || null,
    found_on: input.foundDate || null,
    received_at: receivedAt,
    storage_post_id: post.post_id,
    post: { post_id: post.post_id, name: post.name },
    status: 'STORED',
    is_visible: true,
    source_submission_id: sourceSubmissionId,
    private_verification_notes: input.privateNotes?.trim() || null,
    photos: [
      {
        photo_id: crypto.randomUUID(),
        url: upload.url,
        expires_at: new Date(Date.now() + 86400000).toISOString(),
        is_primary: true,
      },
    ],
  };
}
