import React, { useState } from 'react';
import { Building2, Calendar, MapPin, PlusCircle } from 'lucide-react';
import { ITEM_CATEGORIES } from '@/constants/categories';
import { ReportPhotoUploader } from './ReportPhotoUploader';

export interface ReportFoundFormValues {
  itemName: string;
  category: string;
  foundLocation: string;
  foundDate: string;
  description: string;
  photoFile: File | null;
  agreedToPhysicalDrop: boolean;
}

interface ReportFoundFormProps {
  isSubmitting: boolean;
  onSubmit: (values: ReportFoundFormValues) => Promise<void>;
  onCancel: () => void;
}

export const ReportFoundForm: React.FC<ReportFoundFormProps> = ({
  isSubmitting,
  onSubmit,
  onCancel,
}) => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [foundLocation, setFoundLocation] = useState('');
  const [foundDate, setFoundDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [agreedToPhysicalDrop, setAgreedToPhysicalDrop] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      itemName,
      category,
      foundLocation,
      foundDate,
      description,
      photoFile,
      agreedToPhysicalDrop,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[var(--lf-border)] p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="p-4 bg-[var(--lf-soft)] rounded-2xl border border-[rgba(11,94,215,0.15)] flex items-start gap-3">
        <Building2 className="w-5 h-5 text-[var(--lf-action)] shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-bold text-[var(--lf-action)] block">
            Pos Tujuan: Pos Pengajaran UBL (Gedung Unit 4 Lt. 1)
          </span>
          <span className="text-[var(--lf-muted)] mt-0.5 block">
            Barang fisik wajib diserahkan ke pos ini setelah formulir dikirimkan.
          </span>
        </div>
      </div>

      <ReportPhotoUploader selectedFile={photoFile} onPhotoSelected={setPhotoFile} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-[var(--lf-ink)] mb-1.5">
            Nama Barang Temuan <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Contoh: Kunci Motor Vario Merah / Dompet Cokelat"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--lf-border)] text-xs sm:text-sm text-[var(--lf-ink)] focus:outline-none focus:border-[var(--lf-action)] focus:ring-2 focus:ring-[var(--lf-soft)] transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--lf-ink)] mb-1.5">
            Kategori Barang <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--lf-border)] text-xs sm:text-sm text-[var(--lf-ink)] focus:outline-none focus:border-[var(--lf-action)] focus:ring-2 focus:ring-[var(--lf-soft)] transition-all bg-white"
          >
            <option value="">Pilih Kategori</option>
            {ITEM_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--lf-ink)] mb-1.5">
            Tanggal Ditemukan <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-[var(--lf-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="date"
              required
              value={foundDate}
              onChange={(e) => setFoundDate(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[var(--lf-border)] text-xs sm:text-sm text-[var(--lf-ink)] focus:outline-none focus:border-[var(--lf-action)] focus:ring-2 focus:ring-[var(--lf-soft)] transition-all"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-[var(--lf-ink)] mb-1.5">
            Lokasi Tepat Penemuan <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[var(--lf-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={foundLocation}
              onChange={(e) => setFoundLocation(e.target.value)}
              placeholder="Contoh: Meja Lab Komputer 3 / Kantin Depan Gedung 6"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[var(--lf-border)] text-xs sm:text-sm text-[var(--lf-ink)] focus:outline-none focus:border-[var(--lf-action)] focus:ring-2 focus:ring-[var(--lf-soft)] transition-all"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-[var(--lf-ink)] mb-1.5">
            Deskripsi & Ciri-Ciri Barang
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan warna, merk, stiker, atau detail fisik lain yang memudahkan identifikasi pemilik"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--lf-border)] text-xs sm:text-sm text-[var(--lf-ink)] focus:outline-none focus:border-[var(--lf-action)] focus:ring-2 focus:ring-[var(--lf-soft)] transition-all resize-none"
          />
        </div>
      </div>

      <div className="p-4 bg-[var(--lf-canvas)] rounded-2xl border border-[var(--lf-border)]">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={agreedToPhysicalDrop}
            onChange={(e) => setAgreedToPhysicalDrop(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded text-[var(--lf-action)] border-[var(--lf-border)] focus:ring-[var(--lf-action)]"
          />
          <span className="text-xs text-[var(--lf-ink)] leading-relaxed">
            Saya menyatakan bahwa saya menemukan barang ini di area kampus Universitas Budi Luhur dan <strong>berkomitmen untuk segera menyerahkan fisik barang ke Ruang Pengajaran (Gedung Unit 4 Lt. 1)</strong>.
          </span>
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl border border-[var(--lf-border)] text-xs sm:text-sm font-semibold text-[var(--lf-muted)] hover:text-[var(--lf-ink)] hover:bg-[var(--lf-canvas)] transition-all"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl bg-[var(--lf-action)] text-white text-xs sm:text-sm font-semibold hover:bg-[#094bb0] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm"
        >
          {isSubmitting ? (
            <span>Mengirim Laporan...</span>
          ) : (
            <>
              <PlusCircle className="w-4 h-4" />
              <span>Kirim Laporan Temuan</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

