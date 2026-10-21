import { services } from '@/services/registry';
export async function makePhotoToken(purpose: 'ITEM_PHOTO' | 'REPORT_PHOTO' = 'ITEM_PHOTO') {
  const file = new File(['image-fixture'], 'fixture.png', { type: 'image/png' });
  return (await services.upload.uploadPhoto(file, purpose)).uploadToken;
}
