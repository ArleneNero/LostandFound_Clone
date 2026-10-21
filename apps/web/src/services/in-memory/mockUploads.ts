import { validateImageFile } from '@/utils/validateImageFile';
type Purpose = 'REPORT_PHOTO' | 'ITEM_PHOTO';
interface MockUpload {
  url: string;
  purpose: Purpose;
  owner: string;
  expiresAt: number;
  consumed: boolean;
}
const uploads = new Map<string, MockUpload>();
export function createMockUpload(file: File, purpose: Purpose, owner: string) {
  const error = validateImageFile(file);
  if (error) throw new Error(error);
  const token = crypto.randomUUID();
  const url = URL.createObjectURL(file);
  uploads.set(token, { url, purpose, owner, expiresAt: Date.now() + 900000, consumed: false });
  return { uploadToken: token, previewUrl: url };
}
export function resolveMockUpload(token: string, purpose: Purpose, owner: string) {
  const upload = uploads.get(token);
  if (
    !upload ||
    upload.purpose !== purpose ||
    upload.owner !== owner ||
    upload.expiresAt <= Date.now() ||
    upload.consumed
  ) {
    throw new Error('Foto tidak valid atau sudah digunakan. Pilih dan unggah kembali satu foto.');
  }
  return upload;
}
export function consumeMockUpload(token: string) {
  const upload = uploads.get(token);
  if (upload) upload.consumed = true;
}
export function releaseMockUpload(token: string) {
  const upload = uploads.get(token);
  if (upload && !upload.consumed) {
    URL.revokeObjectURL(upload.url);
    uploads.delete(token);
  }
}
export function clearMockUploads() {
  for (const upload of uploads.values()) URL.revokeObjectURL(upload.url);
  uploads.clear();
}
