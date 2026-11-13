import React from 'react';
import { RefreshCw } from 'lucide-react';

interface ForgotSentStepProps {
  email: string;
  timer: number;
  canResend: boolean;
  onResend: () => void;
  onContinueToReset: () => void;
}

export const ForgotSentStep: React.FC<ForgotSentStepProps> = ({
  email,
  timer,
  canResend,
  onResend,
  onContinueToReset,
}) => {
  return (
    <div className="space-y-5 text-center">
      <div className="p-4 bg-[var(--lf-canvas)] rounded-xl border border-[var(--lf-border)] text-left">
        <span className="text-xs font-semibold text-[var(--lf-ink)] block mb-1">
          Periksa Kotak Masuk Email
        </span>
        <p className="text-xs text-[var(--lf-muted)] leading-relaxed">
          Kami telah mengirimkan tautan reset kata sandi ke <strong>{email}</strong>.
          Tautan berlaku selama 15 menit.
        </p>
      </div>

      <div className="flex items-center justify-between text-xs px-1">
        <span className="text-[var(--lf-muted)]">Belum terima email?</span>
        {canResend ? (
          <button
            type="button"
            onClick={onResend}
            className="font-semibold text-[var(--lf-action)] hover:underline flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Kirim Ulang
          </button>
        ) : (
          <span className="text-[var(--lf-muted)]">
            Kirim ulang ({timer}s)
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={onContinueToReset}
        className="w-full py-2.5 px-4 rounded-xl bg-[var(--lf-soft)] text-[var(--lf-action)] font-semibold text-xs sm:text-sm hover:bg-[#dbeafe] transition-all"
      >
        Buka Formulir Kata Sandi Baru
      </button>
    </div>
  );
};

