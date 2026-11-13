import React from 'react';
import { Lock, ArrowRight } from 'lucide-react';

interface ForgotResetStepProps {
  newPassword: string;
  confirmPassword: string;
  onNewPasswordChange: (val: string) => void;
  onConfirmPasswordChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export const ForgotResetStep: React.FC<ForgotResetStepProps> = ({
  newPassword,
  confirmPassword,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  isLoading = false,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-[var(--lf-ink)] mb-1.5">
          Kata Sandi Baru
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-[var(--lf-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="password"
            required
            disabled={isLoading}
            value={newPassword}
            onChange={(e) => onNewPasswordChange(e.target.value)}
            placeholder="Minimal 8 karakter"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--lf-border)] text-xs sm:text-sm text-[var(--lf-ink)] focus:outline-none focus:border-[var(--lf-action)] focus:ring-2 focus:ring-[var(--lf-soft)] transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--lf-ink)] mb-1.5">
          Konfirmasi Kata Sandi Baru
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-[var(--lf-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="password"
            required
            disabled={isLoading}
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            placeholder="Ulangi kata sandi baru"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--lf-border)] text-xs sm:text-sm text-[var(--lf-ink)] focus:outline-none focus:border-[var(--lf-action)] focus:ring-2 focus:ring-[var(--lf-soft)] transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2.5 px-4 rounded-xl bg-[var(--lf-action)] text-white font-semibold text-xs sm:text-sm hover:bg-[#094bb0] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
      >
        <span>{isLoading ? 'Menyimpan Kata Sandi...' : 'Simpan Kata Sandi Baru'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};

