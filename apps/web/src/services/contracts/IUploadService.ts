export interface UploadResult {
  uploadToken: string;
  previewUrl: string;
}

export interface IUploadService {
  releaseUpload(token: string): void;
  uploadPhoto(file: File, purpose: 'REPORT_PHOTO' | 'ITEM_PHOTO'): Promise<UploadResult>;
}
