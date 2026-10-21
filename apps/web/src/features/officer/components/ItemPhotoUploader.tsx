import { useId, useRef, useState } from 'react';
import { Camera, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { validateImageFile } from '@/utils/validateImageFile';
export interface ItemPhotoUploaderProps {
  previewUrl: string | null;
  onPhotoSelect: (file: File) => void;
  onPhotoRemove: () => void;
  error?: string | null;
}
export function ItemPhotoUploader({
  previewUrl,
  onPhotoSelect,
  onPhotoRemove,
  error,
}: ItemPhotoUploaderProps) {
  const id = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  return (
    <div className="lf-field">
      <label htmlFor={id}>Foto barang *</label>
      <p className="lf-caption">JPG, PNG, WebP - maksimal 5 MiB.</p>
      <input
        id={id}
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const issue = validateImageFile(file);
          setFileError(issue);
          if (!issue) onPhotoSelect(file);
          e.target.value = '';
        }}
      />
      {previewUrl ? (
        <div className="lf-photo-preview">
          <img src={previewUrl} alt="Preview barang" width="80" height="80" />
          <div>
            <p>Foto contoh dipilih.</p>
            <div className="lf-inline-actions">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                leftIcon={<RefreshCw size={14} />}
              >
                Ganti Foto
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setFileError(null);
                  onPhotoRemove();
                }}
                leftIcon={<Trash2 size={14} />}
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <button type="button" className="lf-upload" onClick={() => fileInputRef.current?.click()}>
          <Camera size={20} />
          Unggah Foto Barang
        </button>
      )}
      {(fileError || error) && (
        <span className="lf-field-error" role="alert">
          {fileError || error}
        </span>
      )}
    </div>
  );
}
