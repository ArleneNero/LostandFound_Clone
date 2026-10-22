import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockStore } from '@/data/mockStore';
import { services, registry } from '@/services/registry';
import { makePhotoToken } from './helpers';
import { resolveMockUpload } from '@/services/in-memory/mockUploads';
import { isItemOverdue } from '@/features/officer/selectors/inventorySelectors';
import { validateImageFile } from '@/utils/validateImageFile';
const input = {
  name: 'Barang Uji',
  category: 'Elektronik',
  description: 'Deskripsi publik',
  privateNotes: 'CIRI RAHASIA',
};
beforeEach(() => {
  registry.setMode('in-memory');
  mockStore.reset();
});
describe('F/A-F/C remediation regressions', () => {
  it('public service exports redact private notes and remain detached from storage', async () => {
    const original = structuredClone(mockStore.getState().items);
    const result = await services.items.getItems();
    expect(result.items.every((i) => i.privateNotes === null)).toBe(true);
    result.items[0].name = 'mutated result';
    expect(mockStore.getState().items).toEqual(original);
  });
  it('changing registry mode cannot retain an exported mock service silently', () => {
    registry.setMode('http');
    expect(() => services.items).toThrow(/HTTP Adapter/);
  });
  it('officer list is scoped to its assigned post', async () => {
    const result = await services.items.getOfficerItems();
    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items.every((i) => i.postId === 1)).toBe(true);
    expect(result.items.some((i) => i.id === 'item-uuid-002')).toBe(false);
  });
  it('blocks cross-post detail and every mutation, including hidden direct URLs', async () => {
    const before = structuredClone(mockStore.getState());
    await expect(services.items.getItemById('item-uuid-002')).rejects.toThrow(/pos penugasan/);
    await expect(services.items.updateVisibility('item-uuid-002', false)).rejects.toThrow(
      /pos penugasan/,
    );
    await expect(services.items.returnItem('item-uuid-002', 'Demo', 'Cocok')).rejects.toThrow(
      /pos penugasan/,
    );
    await expect(services.items.distributeItem('item-uuid-002', 'Sosial')).rejects.toThrow(
      /pos penugasan/,
    );
    expect(mockStore.getState()).toEqual(before);
  });
  it('denies officer operations after logout', async () => {
    await services.auth.logout();
    await expect(services.items.getOfficerItems()).rejects.toThrow(/Petugas/);
  });
  it('creates a real mock photo URL, survives release after consume and revokes on reset', async () => {
    const photoToken = await makePhotoToken();
    const owner = mockStore.getState().currentUser!.userId;
    const url = resolveMockUpload(photoToken, 'ITEM_PHOTO', owner).url;
    const created = await services.items.createItem({ ...input, photoToken });
    expect(created.photoUrl).toBe(url);
    expect(url).toMatch(/^blob:/);
    services.upload.releaseUpload(photoToken);
    expect(URL.revokeObjectURL).not.toHaveBeenCalledWith(url);
    expect((await services.items.getPublicItemById(created.id))?.photoUrl).toBe(url);
    mockStore.reset();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(url);
  });
  it('one upload token cannot create a duplicate item', async () => {
    const photoToken = await makePhotoToken();
    const first = await services.items.createItem({ ...input, photoToken });
    await expect(services.items.createItem({ ...input, photoToken })).rejects.toThrow(
      /Foto tidak valid/,
    );
    expect(mockStore.getState().items.filter((i) => i.item_id === first.id)).toHaveLength(1);
  });
  it('preserves edited WIB demo reception time without adding a wire request field', async () => {
    const photoToken = await makePhotoToken();
    const mockReceivedAt = new Date('2026-10-14T17:30:00+07:00').toISOString();
    expect(
      (await services.items.createItem({ ...input, photoToken, mockReceivedAt })).receivedAt,
    ).toBe('2026-10-14T10:30:00.000Z');
  });
  it('validates MIME, empty file and maximum size', () => {
    expect(validateImageFile(new File(['x'], 'x.svg', { type: 'image/svg+xml' }))).toBeTruthy();
    expect(validateImageFile(new File([], 'x.png', { type: 'image/png' }))).toBeTruthy();
    expect(
      validateImageFile(
        new File([new Uint8Array(5 * 1024 * 1024 + 1)], 'x.png', { type: 'image/png' }),
      ),
    ).toBeTruthy();
    expect(validateImageFile(new File(['x'], 'x.webp', { type: 'image/webp' }))).toBeNull();
  });
  it.each([0, 1, 10, 11, 21])(
    'caps catalog pagination for %i records even if caller requests 100',
    async (count) => {
      const template = mockStore.getState().items[0];
      mockStore.getState().items = Array.from({ length: count }, (_, i) => ({
        ...structuredClone(template),
        item_id: `test-${i}`,
      }));
      const result = await services.items.getItems({ limit: 100, page: 99 });
      expect(result.limit).toBe(10);
      expect(result.items.length).toBeLessThanOrEqual(10);
      expect(result.total).toBe(count);
      expect(result.page).toBe(Math.max(1, Math.ceil(count / 10)));
    },
  );
  it('filters before pagination and prevents negative limits', async () => {
    const template = mockStore.getState().items[0];
    mockStore.getState().items = Array.from({ length: 21 }, (_, i) => ({
      ...structuredClone(template),
      item_id: `test-${i}`,
      category: i % 2 ? 'Tas' : 'Kunci',
    }));
    const result = await services.items.getItems({ category: 'Tas', page: 2 });
    expect(result.total).toBe(10);
    expect(result.page).toBe(1);
    expect((await services.items.getItems({ limit: -2 })).limit).toBe(1);
  });
  it('receipt with an invalid photo leaves item, status and history unchanged', async () => {
    const before = structuredClone(mockStore.getState());
    await expect(
      services.submissions.receiveSubmission('sub-uuid-001', {
        publicDescription: 'Valid',
        photoToken: 'fake',
      }),
    ).rejects.toThrow(/Foto/);
    expect(mockStore.getState()).toEqual(before);
  });
  it('receives a report once with a distinct inventory photo and history', async () => {
    const photoToken = await makePhotoToken();
    const report = mockStore.getState().submissions[0];
    const created = await services.submissions.receiveSubmission(report.submission_id, {
      publicDescription: 'Tas',
      photoToken,
    });
    expect(created.photoUrl).not.toBe(report.report_photo_url);
    expect(report.status).toBe('RECEIVED');
    expect(mockStore.getState().histories.at(-1)?.to).toBe('RECEIVED');
    await expect(
      services.submissions.receiveSubmission(report.submission_id, {
        publicDescription: 'Tas',
        photoToken,
      }),
    ).rejects.toThrow(/tidak dapat diproses/);
  });
  it('reject reason is stored in history, not inserted into public description', async () => {
    const original = mockStore.getState().submissions[0].public_description;
    await expect(services.submissions.rejectSubmission('sub-uuid-001', '   ')).rejects.toThrow(
      /wajib/,
    );
    const rejected = await services.submissions.rejectSubmission(
      'sub-uuid-001',
      ' Tidak diserahkan ',
    );
    expect(rejected.description).toBe(original);
    expect(rejected.history?.at(-1)?.reason).toBe('Tidak diserahkan');
  });
  it('return is final, preserves private notes and removes public access', async () => {
    const note = mockStore.getState().items[0].private_verification_notes;
    await services.items.returnItem('item-uuid-001', 'Pemilik Demo', 'Cocok');
    expect(mockStore.getState().returns).toHaveLength(1);
    expect(mockStore.getState().items[0].private_verification_notes).toBe(note);
    expect(await services.items.getPublicItemById('item-uuid-001')).toBeNull();
    await expect(services.items.updateVisibility('item-uuid-001', true)).rejects.toThrow(/STORED/);
    await expect(services.items.returnItem('item-uuid-001', 'Demo', 'Cocok')).rejects.toThrow(
      /STORED/,
    );
  });
  it('distribution is not a return-to-owner record', async () => {
    await services.items.distributeItem('item-uuid-001', 'Penyaluran sesuai kebijakan pos');
    expect(mockStore.getState().returns).toHaveLength(0);
    expect(await services.items.getPublicItemById('item-uuid-001')).toBeNull();
  });
  it('retention is optional per post and never changes visibility/status automatically', () => {
    const ago = new Date(Date.now() - 366 * 86400000).toISOString();
    const before = structuredClone(mockStore.getState());
    expect(isItemOverdue(ago, 365)).toBe(true);
    expect(isItemOverdue(ago, null)).toBe(false);
    expect(isItemOverdue(ago)).toBe(false);
    expect(mockStore.getState()).toEqual(before);
  });
  it('successful mutations publish one reactive update', async () => {
    const notify = vi.fn();
    const unsubscribe = mockStore.subscribe(notify);
    await services.items.updateVisibility('item-uuid-001', false);
    expect(notify).toHaveBeenCalledTimes(1);
    unsubscribe();
  });
});
