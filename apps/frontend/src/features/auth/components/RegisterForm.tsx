import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, User, Hash, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { RoutePaths } from '@/constants/routes';
import { registry } from '@/services/registry';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [nim, setNim] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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

    setIsSubmitting(true);
    try {
      const authService = registry.getServices().auth;
      if (authService.registerStudent) {
        await authService.registerStudent({
          fullName,
          email,
          password,
          studentNumber: nim,
        });
      } else {
        await authService.loginAsStudent(email, fullName, nim);
      }
      navigate(RoutePaths.STUDENT_HOME);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registrasi akun mahasiswa gagal.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col">
        {error && (
          <div
            role="alert"
            className="mb-5 p-3.5 rounded-xl bg-[#FEF3F2] border border-[#FECDCA] text-[#B42318] text-xs font-medium flex items-start gap-2.5 animate-in fade-in duration-200"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#D92D20]" />
            <div className="flex-1 leading-relaxed">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" autoComplete="off">
          {/* Nama Lengkap */}
          <Input
            label="Nama Lengkap"
            type="text"
            id="register-fullname"
            name="student_fullname"
            autoComplete="off"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Contoh: Arlene Nero"
            leftIcon={<User className="w-4 h-4" />}
          />

          {/* NIM */}
          <Input
            label="Nomor Induk Mahasiswa (NIM)"
            type="text"
            id="register-nim"
            name="student_nim"
            autoComplete="off"
            required
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            placeholder="Contoh: 2411502194"
            leftIcon={<Hash className="w-4 h-4" />}
          />

          {/* Email Kampus */}
          <Input
            label="Email Kampus"
            type="email"
            id="register-email"
            name="student_register_email"
            autoComplete="off"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="2411502194@student.budiluhur.ac.id"
            leftIcon={<Mail className="w-4 h-4" />}
            helperText="Wajib menggunakan email resmi mahasiswa (@student.budiluhur.ac.id)"
          />

          {/* Kata Sandi */}
          <Input
            label="Kata Sandi"
            type={showPassword ? 'text' : 'password'}
            id="register-password"
            name="new_password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 8 karakter"
            leftIcon={<Lock className="w-4 h-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer text-[var(--lf-muted)] hover:text-[var(--lf-ink)] transition-colors focus:outline-none"
                aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />

          {/* Konfirmasi Kata Sandi */}
          <Input
            label="Konfirmasi Kata Sandi"
            type={showConfirmPassword ? 'text' : 'password'}
            id="register-confirm-password"
            name="confirm_new_password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Ulangi kata sandi"
            leftIcon={<Lock className="w-4 h-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="cursor-pointer text-[var(--lf-muted)] hover:text-[var(--lf-ink)] transition-colors focus:outline-none"
                aria-label={showConfirmPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSubmitting}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full mt-2"
          >
            {isSubmitting ? 'Mendaftarkan Akun...' : 'Daftar Akun Mahasiswa'}
          </Button>
        </form>
      </div>
    </>
  );
};
