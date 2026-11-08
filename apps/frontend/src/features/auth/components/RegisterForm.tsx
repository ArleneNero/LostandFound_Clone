import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, Mail, User, Hash, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { RoutePaths } from '@/constants/routes';
import { registry } from '@/services/registry';
import { OtpVerificationModal } from './OtpVerificationModal';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [nim, setNim] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isOtpOpen, setIsOtpOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    if (password.length < 8) {
      setError('Kata sandi minimal 8 karakter.');
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail.endsWith('@student.budiluhur.ac.id')) {
      setError('Wajib menggunakan email resmi mahasiswa Budi Luhur (@student.budiluhur.ac.id).');
      return;
    }

    // Open OTP modal for simulation (F/D.1.1 & F/D.1.2)
    setIsOtpOpen(true);
  };

  const handleVerifySuccess = async () => {
    setIsOtpOpen(false);
    try {
      const authService = registry.getServices().auth;
      await authService.loginAsStudent(email, fullName, nim);
      navigate(RoutePaths.STUDENT_HOME);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registrasi gagal';
      setError(msg);
    }
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-[var(--lf-border)] shadow-sm p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[var(--lf-soft)] flex items-center justify-center text-[var(--lf-action)] mx-auto mb-3">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--lf-ink)]">
            Daftar Akun Mahasiswa
          </h2>
          <p className="text-xs sm:text-sm text-[var(--lf-muted)] mt-1">
            Gunakan email resmi Universitas Budi Luhur
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--lf-ink)] mb-1.5">
              Nama Lengkap
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[var(--lf-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Contoh: Arlene Nero"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--lf-border)] text-xs sm:text-sm text-[var(--lf-ink)] focus:outline-none focus:border-[var(--lf-action)] focus:ring-2 focus:ring-[var(--lf-soft)] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--lf-ink)] mb-1.5">
              Nomor Induk Mahasiswa (NIM)
            </label>
            <div className="relative">
              <Hash className="w-4 h-4 text-[var(--lf-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                placeholder="Contoh: 2411502194"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--lf-border)] text-xs sm:text-sm text-[var(--lf-ink)] focus:outline-none focus:border-[var(--lf-action)] focus:ring-2 focus:ring-[var(--lf-soft)] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--lf-ink)] mb-1.5">
              Email Kampus
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[var(--lf-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="2411502194@student.budiluhur.ac.id"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--lf-border)] text-xs sm:text-sm text-[var(--lf-ink)] focus:outline-none focus:border-[var(--lf-action)] focus:ring-2 focus:ring-[var(--lf-soft)] transition-all"
              />
            </div>
            <p className="text-[11px] text-[var(--lf-muted)] mt-1">
              Wajib menggunakan email resmi mahasiswa (@student.budiluhur.ac.id)
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--lf-ink)] mb-1.5">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[var(--lf-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--lf-border)] text-xs sm:text-sm text-[var(--lf-ink)] focus:outline-none focus:border-[var(--lf-action)] focus:ring-2 focus:ring-[var(--lf-soft)] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--lf-ink)] mb-1.5">
              Konfirmasi Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[var(--lf-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi kata sandi"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--lf-border)] text-xs sm:text-sm text-[var(--lf-ink)] focus:outline-none focus:border-[var(--lf-action)] focus:ring-2 focus:ring-[var(--lf-soft)] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-[var(--lf-action)] text-white font-semibold text-xs sm:text-sm hover:bg-[#094bb0] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>Lanjutkan Verifikasi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[var(--lf-border)] text-center">
          <p className="text-xs text-[var(--lf-muted)]">
            Sudah memiliki akun?{' '}
            <Link
              to={RoutePaths.LOGIN}
              className="text-[var(--lf-action)] font-semibold hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>

      <OtpVerificationModal
        isOpen={isOtpOpen}
        email={email || 'mahasiswa@student.budiluhur.ac.id'}
        onClose={() => setIsOtpOpen(false)}
        onVerifySuccess={handleVerifySuccess}
      />
    </>
  );
};

