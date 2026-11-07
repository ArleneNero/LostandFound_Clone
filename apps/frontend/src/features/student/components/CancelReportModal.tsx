import React, { useState } from 'react';
import { Ban, AlertCircle, X, RefreshCw } from 'lucide-react';

interface CancelReportModalProps {
  isOpen: boolean;
  reportCode: string;
  onClose: () => void;
  onConfirmCancel: (reason: string) => Promise<void>;
}

export const CancelReportModal: React.FC<CancelReportModalProps> = ({
  isOpen,
  reportCode,
  onClose,
  onConfirmCancel,
}) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = reason.trim();
    if (!trimmed) {
      setError('Alasan pembatalan wajib diisi.');
      return;
    }
    if (trimmed.length < 5) {
      setError('Mohon jelaskan alasan pembatalan lebih spesifik (minimal 5 karakter).');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onConfirmCancel(trimmed);
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal membatalkan laporan';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-[var(--lf-border)] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[var(--lf-muted)] hover:bg-[var(--lf-canvas)]"
          aria-label="Tutup modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-3">
            <Ban className="w-6 h-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--lf-ink)]">
            Batalkan Laporan Temuan
          </h3>
          <p className="text-xs text-[var(--lf-muted)] mt-1">
            Laporan <span className="font-mono font-semibold text-[var(--lf-ink)]">{reportCode}</span> akan ditandai dibatalkan dan tidak lagi diproses.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--lf-ink)] mb-1.5">
              Alasan Pembatalan <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Contoh: Barang telah diserahkan langsung kepada pemilik aslinya / Salah memasukkan data laporan."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--lf-border)] text-xs text-[var(--lf-ink)] focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all resize-none"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-2.5 px-4 rounded-xl border border-[var(--lf-border)] text-xs font-semibold text-[var(--lf-ink)] hover:bg-[var(--lf-canvas)] transition-all"
            >
              Kembali
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Membatalkan...</span>
                </>
              ) : (
                <span>Konfirmasi Batal</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

