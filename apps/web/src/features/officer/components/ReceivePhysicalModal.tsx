import { useState, useEffect, useRef } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { ItemPhotoUploader } from './ItemPhotoUploader';
import { services } from '@/services/registry';
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (notes: string, photoToken: string) => Promise<void>;
  isSubmitting: boolean;
  itemName: string;
  reportCode: string;
}
export function ReceivePhysicalModal({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
  itemName,
  reportCode,
}: Props) {
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const lock = useRef(false);
  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );
  const busy = isSubmitting || saving;
  const submit = async () => {
    if (!file || !confirmed || lock.current) return;
    lock.current = true;
    setSaving(true);
    setError('');
    let token: string | undefined;
    try {
      const upload = await services.upload.uploadPhoto(file, 'ITEM_PHOTO');
      token = upload.uploadToken;
      await onConfirm(notes.trim(), token);
    } catch (e) {
      if (token) services.upload.releaseUpload(token);
      setError(e instanceof Error ? e.message : 'Penerimaan gagal.');
    } finally {
      lock.current = false;
      setSaving(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Konfirmasi Terima Fisik" busy={busy}>
      <div className="lf-stack">
        <p>
          {itemName} · {reportCode}
        </p>
        <p>Pastikan barang fisik sudah diterima dari mahasiswa sebelum masuk inventaris.</p>
        <ItemPhotoUploader
          previewUrl={preview}
          onPhotoSelect={(f) => {
            setFile(f);
            setPreview(URL.createObjectURL(f));
          }}
          onPhotoRemove={() => {
            setFile(null);
            setPreview(null);
          }}
        />
        <div className="lf-field">
          <label htmlFor="receipt-notes">Catatan verifikasi internal (opsional)</label>
          <textarea id="receipt-notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <label className="lf-inline-actions">
          <input
            id="receiveCheck"
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          <span>Barang fisik sudah berada di pos Pengajaran.</span>
        </label>
        {error && (
          <p role="alert" className="lf-field-error">
            {error}
          </p>
        )}
        <div className="lf-inline-actions">
          <Button variant="secondary" disabled={busy} onClick={onClose}>
            Batal
          </Button>
          <Button disabled={!file || !confirmed || busy} isLoading={busy} onClick={submit}>
            Konfirmasi Penerimaan
          </Button>
        </div>
      </div>
    </Modal>
  );
}
