import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, RefreshCw, X } from 'lucide-react';

interface OtpVerificationModalProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
  onVerifySuccess: () => void;
}

export const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({
  isOpen,
  email,
  onClose,
  onVerifySuccess,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  if (!isOpen) return null;

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError(null);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(60);
    setCanResend(false);
    setError(null);
    setOtp(['', '', '', '', '', '']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setError('Masukkan 6 digit kode OTP lengkap');
      return;
    }

    setIsVerifying(true);
    setError(null);

    // Simulation: any 6 digit code or dummy '123456'
    setTimeout(() => {
      setIsVerifying(false);
      onVerifySuccess();
    }, 600);
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

        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[var(--lf-soft)] flex items-center justify-center text-[var(--lf-action)] mb-3">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[var(--lf-ink)]">
            Verifikasi Email Kampus
          </h3>
          <p className="text-xs text-[var(--lf-muted)] mt-1 max-w-xs">
            Kode verifikasi 6 digit telah dikirimkan ke <span className="font-semibold text-[var(--lf-ink)]">{email}</span>.
          </p>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
            Mode Simulasi Demo: Masukkan 6 angka sembarang
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-11 h-12 text-center text-lg font-bold rounded-xl border border-[var(--lf-border)] focus:border-[var(--lf-action)] focus:ring-2 focus:ring-[var(--lf-soft)] outline-none text-[var(--lf-ink)] transition-all"
                autoFocus={idx === 0}
              />
            ))}
          </div>

          {error && (
            <p className="text-xs text-center text-red-600 font-medium">{error}</p>
          )}

          <div className="flex items-center justify-between text-xs">
            <span className="text-[var(--lf-muted)]">Belum menerima kode?</span>
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="font-semibold text-[var(--lf-action)] hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Kirim Ulang
              </button>
            ) : (
              <span className="text-[var(--lf-muted)] font-medium">
                Kirim ulang ({timer}s)
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-2.5 px-4 rounded-xl bg-[var(--lf-action)] text-white font-semibold text-sm hover:bg-[#094bb0] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Memverifikasi...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Verifikasi & Masuk
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

