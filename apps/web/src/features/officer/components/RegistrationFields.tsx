import { LockKeyhole } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import type { RegisterItemFormData } from '../hooks/useRegisterItem';
import { ITEM_CATEGORIES } from '@/constants/itemCategories';
interface Props {
  form: RegisterItemFormData;
  setForm: Dispatch<SetStateAction<RegisterItemFormData>>;
  errors: Record<string, string>;
}
export function RegistrationFields({ form, setForm, errors }: Props) {
  const set = (name: keyof RegisterItemFormData, value: string) =>
    setForm((p) => ({ ...p, [name]: value }));
  return (
    <>
      <div className="lf-field">
        <label htmlFor="item-name">Nama barang *</label>
        <input
          id="item-name"
          maxLength={150}
          aria-invalid={!!errors.name}
          placeholder="Nama barang"
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
        />
        {errors.name && (
          <span role="alert" className="lf-field-error">
            {errors.name}
          </span>
        )}
      </div>
      <div className="lf-field">
        <label htmlFor="item-category">Kategori *</label>
        <select
          id="item-category"
          aria-invalid={!!errors.category}
          value={form.category}
          onChange={(e) => set('category', e.target.value)}
        >
          <option value="">Pilih kategori</option>
          {ITEM_CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {errors.category && (
          <span role="alert" className="lf-field-error">
            {errors.category}
          </span>
        )}
      </div>
      <div className="lf-field">
        <label htmlFor="item-description">Deskripsi publik *</label>
        <textarea
          id="item-description"
          aria-invalid={!!errors.description}
          rows={3}
          placeholder="Deskripsi umum barang"
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
        />
        {errors.description && (
          <span role="alert" className="lf-field-error">
            {errors.description}
          </span>
        )}
      </div>
      <p className="lf-text-link">
        <LockKeyhole size={20} />
        Pos penyimpanan: Pengajaran
      </p>
      <div className="lf-two-columns">
        <div className="lf-field">
          <label htmlFor="received-date">Tanggal diterima</label>
          <input
            type="date"
            id="received-date"
            value={form.receivedDate}
            onChange={(e) => set('receivedDate', e.target.value)}
          />
        </div>
        <div className="lf-field">
          <label htmlFor="received-time">Waktu diterima (WIB)</label>
          <input
            type="time"
            id="received-time"
            value={form.receivedTime}
            onChange={(e) => set('receivedTime', e.target.value)}
          />
        </div>
      </div>
      {errors.receivedDate && (
        <span role="alert" className="lf-field-error">
          {errors.receivedDate}
        </span>
      )}
      <p className="lf-caption">
        Tanggal dan waktu dapat diubah pada simulasi ini. Saat integrasi API, waktu penerimaan
        ditentukan server.
      </p>
    </>
  );
}
export function RegistrationExtras({ form, setForm }: Omit<Props, 'errors'>) {
  const set = (name: keyof RegisterItemFormData, value: string) =>
    setForm((p) => ({ ...p, [name]: value }));
  return (
    <details className="lf-surface lf-extra-fields">
      <summary>Informasi tambahan (opsional)</summary>
      <p className="lf-caption">Lokasi &amp; tanggal penemuan, ciri verifikasi internal.</p>
      <div className="lf-field">
        <label htmlFor="found-location">Lokasi ditemukan</label>
        <input
          id="found-location"
          value={form.foundLocation}
          onChange={(e) => set('foundLocation', e.target.value)}
        />
      </div>
      <div className="lf-field">
        <label htmlFor="found-date">Tanggal ditemukan</label>
        <input
          type="date"
          id="found-date"
          value={form.foundDate}
          onChange={(e) => set('foundDate', e.target.value)}
        />
      </div>
      <div className="lf-field">
        <label htmlFor="private-notes">Catatan internal (tidak dipublikasikan)</label>
        <textarea
          id="private-notes"
          value={form.privateNotes}
          onChange={(e) => set('privateNotes', e.target.value)}
        />
      </div>
    </details>
  );
}
