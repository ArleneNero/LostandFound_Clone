import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, AlertCircle } from 'lucide-react';
import { RoutePaths } from '@/constants/routes';
import { ForgotRequestStep } from './forgot/ForgotRequestStep';
import { ForgotSentStep } from './forgot/ForgotSentStep';
import { ForgotResetStep } from './forgot/ForgotResetStep';
import { ForgotSuccessStep } from './forgot/ForgotSuccessStep';

export const ForgotPasswordForm: React.FC = () => {
  const [step, setStep] = useState<'REQUEST' | 'SENT' | 'RESET' | 'SUCCESS'>('REQUEST');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'SENT' && timer > 0) {
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
  }, [step, timer]);

  const handleRequestReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Masukkan alamat email yang valid.');
      return;
    }
    setError(null);
    setTimer(60);
    setCanResend(false);
    setStep('SENT');
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (newPassword.length < 8) {
      setError('Kata sandi baru minimal 8 karakter.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Konfirmasi kata sandi baru tidak cocok.');
      return;
    }
    setStep('SUCCESS');
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-[var(--lf-border)] shadow-sm p-6 sm:p-8">
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-full bg-[var(--lf-soft)] flex items-center justify-center text-[var(--lf-action)] mx-auto mb-3">
          <KeyRound className="w-6 h-6" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--lf-ink)]">
          {step === 'SUCCESS' ? 'Kata Sandi Diperbarui' : 'Pemulihan Kata Sandi'}
        </h2>
        <p className="text-xs sm:text-sm text-[var(--lf-muted)] mt-1">
          {step === 'REQUEST' && 'Masukkan email kampus untuk menerima instruksi pemulihan'}
          {step === 'SENT' && `Tautan pemulihan telah dikirim ke ${email}`}
          {step === 'RESET' && 'Buat kata sandi baru untuk akun mahasiswa Anda'}
          {step === 'SUCCESS' && 'Kata sandi Anda berhasil diubah. Silakan masuk kembali.'}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {step === 'REQUEST' && (
        <ForgotRequestStep email={email} onEmailChange={setEmail} onSubmit={handleRequestReset} />
      )}

      {step === 'SENT' && (
        <ForgotSentStep
          email={email}
          timer={timer}
          canResend={canResend}
          onResend={() => {
            setTimer(60);
            setCanResend(false);
          }}
          onContinueToReset={() => setStep('RESET')}
        />
      )}

      {step === 'RESET' && (
        <ForgotResetStep
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          onNewPasswordChange={setNewPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onSubmit={handleResetSubmit}
        />
      )}

      {step === 'SUCCESS' && <ForgotSuccessStep />}

      {step !== 'SUCCESS' && (
        <div className="mt-6 pt-5 border-t border-[var(--lf-border)] text-center">
          <Link to={RoutePaths.LOGIN} className="text-xs text-[var(--lf-action)] font-semibold hover:underline">
            ← Kembali ke Halaman Masuk
          </Link>
        </div>
      )}
    </div>
  );
};
