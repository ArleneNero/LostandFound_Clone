import { mockStore } from '@/data/mockStore';
export function requireOfficer() {
  const user = mockStore.getState().currentUser;
  if (!user || user.role !== 'OFFICER' || user.assignedPostId == null)
    throw new Error('Akses ditolak: akun Petugas dengan pos penugasan diperlukan.');
  return user;
}
export function requireOwnedItem(id: string) {
  const user = requireOfficer();
  const item = mockStore
    .getState()
    .items.find((entry) => entry.item_id === id && entry.storage_post_id === user.assignedPostId);
  if (!item) throw new Error('Barang tidak ditemukan pada pos penugasan.');
  return item;
}
export function requireStoredItem(id: string) {
  const item = requireOwnedItem(id);
  if (item.status !== 'STORED')
    throw new Error('Barang tidak dalam status tersimpan (STORED) atau sudah diproses sebelumnya.');
  return item;
}
export function requireOwnedReport(id: string) {
  const user = requireOfficer();
  const report = mockStore
    .getState()
    .submissions.find(
      (entry) => entry.submission_id === id && entry.target_post_id === user.assignedPostId,
    );
  if (!report) throw new Error('Laporan tidak ditemukan pada pos penugasan.');
  return report;
}
