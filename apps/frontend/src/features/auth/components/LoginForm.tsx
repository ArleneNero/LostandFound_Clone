import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, GraduationCap, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { RoutePaths } from '@/constants/routes';
import { registry } from '@/services/registry';

interface LoginFormProps {
  initialRole?: 'STUDENT' | 'OFFICER';
}

export const LoginForm: React.FC<LoginFormProps> = ({ initialRole = 'OFFICER' }) => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState<'STUDENT' | 'OFFICER'>(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRoleChange = (role: 'STUDENT' | 'OFFICER') => {
    setActiveRole(role);
    setErrorMessage(null);
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (activeRole === 'STUDENT' && email.trim()) {
        const normalized = email.trim().toLowerCase();
        if (!normalized.endsWith('@student.budiluhur.ac.id')) {
          setErrorMessage('Akun mahasiswa wajib menggunakan email resmi (@student.budiluhur.ac.id).');
          setIsLoading(false);
          return;
        }
      }

      const authService = registry.getServices().auth;
      if (activeRole === 'OFFICER') {
        await authService.loginAsOfficer(
          email || 'petugas.pengajaran@budiluhur.ac.id',
          password || 'admin321'
        );
        navigate(RoutePaths.OFFICER_DASHBOARD);
      } else {
        await authService.loginAsStudent(
          email || '2411502194@student.budiluhur.ac.id'
        );
        navigate(RoutePaths.STUDENT_HOME);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan saat masuk';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-[var(--lf-border)] shadow-sm p-6 sm:p-8">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--lf-ink)]">
          Masuk ke UBL LostnFound
        </h2>
        <p className="text-xs sm:text-sm text-[var(--lf-muted)] mt-1">
          Pilih peran akun untuk melanjutkan akses ke portal
        </p>
      </div>

      {/* Role Switch Tabs */}
      <div className="grid grid-cols-2 p-1 bg-[var(--lf-canvas)] rounded-xl border border-[var(--lf-border)] mb-6">
        <button
          type="button"
          onClick={() => handleRoleChange('OFFICER')}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeRole === 'OFFICER'
              ? 'bg-white text-[var(--lf-action)] shadow-sm'
              : 'text-[var(--lf-muted)] hover:text-[var(--lf-ink)]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Petugas Pos</span>
        </button>

        <button
          type="button"
          onClick={() => handleRoleChange('STUDENT')}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeRole === 'STUDENT'
              ? 'bg-white text-[var(--lf-action)] shadow-sm'
              : 'text-[var(--lf-muted)] hover:text-[var(--lf-ink)]'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Mahasiswa</span>
        </button>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--lf-ink)] mb-1.5">
            {activeRole === 'OFFICER' ? 'Email Petugas' : 'Email Kampus / NIM'}
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[var(--lf-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={activeRole === 'OFFICER' ? 'email' : 'text'}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                activeRole === 'OFFICER'
                  ? 'nama@budiluhur.ac.id'
                  : 'nim@student.budiluhur.ac.id'
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--lf-border)] text-xs sm:text-sm text-[var(--lf-ink)] focus:outline-none focus:border-[var(--lf-action)] focus:ring-2 focus:ring-[var(--lf-soft)] transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-[var(--lf-ink)]">
              Kata Sandi
            </label>
            {activeRole === 'STUDENT' && (
              <Link
                to={RoutePaths.FORGOT_PASSWORD}
                className="text-xs text-[var(--lf-action)] font-medium hover:underline"
              >
                Lupa sandi?
              </Link>
            )}
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-[var(--lf-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--lf-border)] text-xs sm:text-sm text-[var(--lf-ink)] focus:outline-none focus:border-[var(--lf-action)] focus:ring-2 focus:ring-[var(--lf-soft)] transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-xl bg-[var(--lf-action)] text-white font-semibold text-xs sm:text-sm hover:bg-[#094bb0] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
        >
          {isLoading ? (
            <span>Memproses...</span>
          ) : (
            <>
              <span>Masuk Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Onboarding Register link for student */}
      {activeRole === 'STUDENT' && (
        <div className="mt-6 pt-5 border-t border-[var(--lf-border)] text-center">
          <p className="text-xs text-[var(--lf-muted)]">
            Belum memiliki akun mahasiswa?{' '}
            <Link
              to={RoutePaths.REGISTER}
              className="text-[var(--lf-action)] font-semibold hover:underline"
            >
              Daftar di sini
            </Link>
          </p>
        </div>
      )}

      {/* Demo helper */}
      <div className="mt-4 p-2.5 bg-[var(--lf-soft)] rounded-lg text-[11px] text-[var(--lf-action)] text-center">
        💡 <strong>Mode Demo:</strong> Bisa langsung klik Masuk untuk simulasi instan
      </div>
    </div>
  );
};
