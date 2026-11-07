import React, { useRef, useState, useEffect } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';

interface ReportPhotoUploaderProps {
  onPhotoSelected: (file: File | null) => void;
  selectedFile: File | null;
}

export const ReportPhotoUploader: React.FC<ReportPhotoUploaderProps> = ({
  onPhotoSelected,
  selectedFile,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manage object URL lifecycle & memory revoke (F/D.3.1 requirement)
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  const validateAndProcessFile = (file: File) => {
    setError(null);

    // Validate mime type: JPEG or PNG
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Format foto harus berupa JPG atau PNG');
      return;
    }

    // Validate size: <= 5MB
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Ukuran foto maksimal 5 MB');
      return;
    }

    onPhotoSelected(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleRemove = () => {
    onPhotoSelected(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-[var(--lf-ink)]">
        Foto Barang Temuan <span className="text-red-500">*</span>
      </label>

      {error && (
        <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {previewUrl ? (
        <div className="relative rounded-2xl overflow-hidden border border-[var(--lf-border)] bg-[var(--lf-canvas)] group max-w-sm aspect-video flex items-center justify-center">
          <img
            src={previewUrl}
            alt="Preview barang temuan"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-lg transition-all"
            title="Hapus foto"
            aria-label="Hapus foto"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded font-medium">
            1 Foto Terpilih
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-[var(--lf-border)] hover:border-[var(--lf-action)] bg-[var(--lf-canvas)] hover:bg-[var(--lf-soft)]/30 rounded-2xl p-6 text-center cursor-pointer transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-10 h-10 rounded-full bg-[var(--lf-soft)] text-[var(--lf-action)] flex items-center justify-center mx-auto mb-2">
            <Upload className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-[var(--lf-ink)] block">
            Pilih Foto atau Tarik ke Sini
          </span>
          <span className="text-[11px] text-[var(--lf-muted)] mt-1 block">
            Format JPG/PNG, ukuran maks. 5MB (Tepat 1 foto)
          </span>
        </div>
      )}
    </div>
  );
};

