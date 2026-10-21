import { IUploadService, UploadResult } from '../contracts/IUploadService';
import { mockStore } from '@/data/mockStore';
import { createMockUpload, releaseMockUpload } from './mockUploads';
export class InMemoryUploadService implements IUploadService {
  async uploadPhoto(file: File, purpose: 'REPORT_PHOTO' | 'ITEM_PHOTO'): Promise<UploadResult> {
    const user = mockStore.getState().currentUser;
    if (!user || (purpose === 'ITEM_PHOTO' && user.role !== 'OFFICER'))
      throw new Error('Akses upload ditolak.');
    return createMockUpload(file, purpose, user.userId);
  }
  releaseUpload(token: string) {
    releaseMockUpload(token);
  }
}
