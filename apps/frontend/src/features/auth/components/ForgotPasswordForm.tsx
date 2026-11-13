import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { KeyRound, AlertCircle } from 'lucide-react';
import { RoutePaths } from '@/constants/routes';
import { apiClient } from '@/services/http/apiClient';
import { ForgotRequestStep } from './forgot/ForgotRequestStep';
import { ForgotSentStep } from './forgot/ForgotSentStep';
import { ForgotResetStep } from './forgot/ForgotResetStep';
import { ForgotSuccessStep } from './forgot/ForgotSuccessStep';

export const ForgotPasswordForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get('token');
  const emailFromUrl = searchParams.get('email');

  const [step, setStep] = useState<'REQUEST' | 'SENT' | 'RESET' | 'SUCCESS'>('REQUEST');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      if (emailFromUrl) setEmail(emailFromUrl);
      setStep('RESET');
    }
  }, [tokenFromUrl, emailFromUrl]);

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

  const handleRequestReset = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.includes('@') || !cleanEmail.endsWith('@student.budiluhur.ac.id')) {
      setError('Masukkan alamat email resmi mahasiswa Budi Luhur (@student.budiluhur.ac.id).');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await apiClient('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email: cleanEmail }),
      });
      setStep('SENT');
      setTimer(60);
      setCanResend(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mengirim tautan pemulihan kata sandi';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
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

    const resetToken = token || tokenFromUrl;
    if (!resetToken) {
      setError('Token pemulihan tidak ditemukan. Silakan ajukan ulang tautan pemulihan.');
      return;
    }

    setIsLoading(true);
    try {
      await apiClient('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({
          token: resetToken,
          new_password: newPassword,
        }),
      });
      setStep('SUCCESS');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mengatur ulang kata sandi';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="text-center mb-2">
        <div className="w-12 h-12 rounded-full bg-[#EFF8FF] flex items-center justify-center text-[#1677FF] mx-auto mb-3">
          <KeyRound className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-[#111827]">
          {step === 'SUCCESS' ? 'Kata Sandi Diperbarui' : 'Pemulihan Akun Mahasiswa'}
        </h3>
        <p className="text-xs text-[#667085] mt-1">
          {step === 'REQUEST' && 'Masukkan email kampus untuk menerima instruksi pemulihan'}
          {step === 'SENT' && `Tautan pemulihan telah dikirim ke ${email}`}
          {step === 'RESET' && 'Buat kata sandi baru untuk akun mahasiswa Anda'}
          {step === 'SUCCESS' && 'Kata sandi Anda berhasil diubah. Silakan masuk kembali.'}
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {step === 'REQUEST' && (
        <ForgotRequestStep
          email={email}
          onEmailChange={setEmail}
          onSubmit={handleRequestReset}
          isLoading={isLoading}
        />
      )}

      {step === 'SENT' && (
        <ForgotSentStep
          email={email}
          timer={timer}
          canResend={canResend}
          onResend={() => handleRequestReset()}
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
          isLoading={isLoading}
        />
      )}

      {step === 'SUCCESS' && <ForgotSuccessStep />}

      {step !== 'SUCCESS' && (
        <div className="mt-4 pt-4 border-t border-[#E4E7EC] text-center">
          <Link to={RoutePaths.LOGIN} className="text-xs text-[#0B5ED7] font-semibold hover:underline">
            ← Kembali ke Halaman Masuk
          </Link>
        </div>
      )}
    </div>
  );
};
