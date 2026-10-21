import { useState, useRef, useEffect } from 'react';
import type { FoundItem } from '@/types/domain';
import { services } from '@/services/registry';
import { validateImageFile } from '@/utils/validateImageFile';
import { currentWibFields } from '@/utils/formatDate';
export interface RegisterItemFormData {
  name: string;
  category: string;
  description: string;
  foundLocation: string;
  foundDate: string;
  receivedDate: string;
  receivedTime: string;
  privateNotes: string;
  isPhysicallyReceived: boolean;
}
const getInitialData = (): RegisterItemFormData => ({
  name: '',
  category: '',
  description: '',
  foundLocation: '',
  foundDate: '',
  privateNotes: '',
  receivedDate: currentWibFields().date,
  receivedTime: currentWibFields().time,
  isPhysicallyReceived: false,
});
export function useRegisterItem() {
  const [formData, setFormData] = useState(getInitialData);
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdItem, setCreatedItem] = useState<FoundItem | null>(null);
  const busy = useRef(false);
  useEffect(
    () => () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    },
    [previewUrl],
  );
  const handlePhotoSelect = (file: File) => {
    const error = validateImageFile(file);
    if (error) {
      setErrors((p) => ({ ...p, photo: error }));
      return;
    }
    setPhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
    setErrors((p) => ({ ...p, photo: '' }));
  };
  const handlePhotoRemove = () => {
    setPhoto(null);
    setPreviewUrl(null);
  };
  const submit = async (): Promise<boolean> => {
    if (busy.current) return false;
    const errs: Record<string, string> = {};
    if (!photo) errs.photo = 'Wajib unggah 1 foto barang.';
    if (!formData.name.trim() || formData.name.length > 150)
      errs.name = 'Nama barang wajib diisi (maksimal 150 karakter).';
    if (!formData.category) errs.category = 'Pilih kategori barang.';
    if (!formData.description.trim()) errs.description = 'Deskripsi publik wajib diisi.';
    if (!formData.isPhysicallyReceived)
      errs.isPhysicallyReceived = 'Centang konfirmasi penerimaan fisik.';
    const received = new Date(`${formData.receivedDate}T${formData.receivedTime}:00+07:00`);
    if (Number.isNaN(received.getTime()))
      errs.receivedDate = 'Tanggal dan waktu diterima tidak valid.';
    setErrors(errs);
    if (Object.keys(errs).length || !photo) return false;
    busy.current = true;
    setIsSubmitting(true);
    let token: string | undefined;
    try {
      const uploaded = await services.upload.uploadPhoto(photo, 'ITEM_PHOTO');
      token = uploaded.uploadToken;
      const item = await services.items.createItem({
        name: formData.name.trim(),
        category: formData.category,
        description: formData.description.trim(),
        foundLocation: formData.foundLocation.trim() || undefined,
        foundDate: formData.foundDate || undefined,
        privateNotes: formData.privateNotes.trim() || undefined,
        photoToken: token,
        ...(services.mode === 'in-memory' ? { mockReceivedAt: received.toISOString() } : {}),
      });
      setCreatedItem(item);
      return true;
    } catch (err) {
      if (token) services.upload.releaseUpload(token);
      setErrors({ form: err instanceof Error ? err.message : 'Gagal menyimpan barang' });
      return false;
    } finally {
      busy.current = false;
      setIsSubmitting(false);
    }
  };
  const resetForm = () => {
    handlePhotoRemove();
    setFormData(getInitialData());
    setErrors({});
    setCreatedItem(null);
  };
  return {
    formData,
    setFormData,
    photo,
    previewUrl,
    handlePhotoSelect,
    handlePhotoRemove,
    errors,
    isSubmitting,
    createdItem,
    submit,
    resetForm,
  };
}
