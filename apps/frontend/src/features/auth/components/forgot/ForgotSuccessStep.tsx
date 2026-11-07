import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { RoutePaths } from '@/constants/routes';

export const ForgotSuccessStep: React.FC = () => {
  return (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <p className="text-xs sm:text-sm text-[var(--lf-muted)]">
        Kata sandi akun mahasiswa Anda telah diperbarui. Silakan masuk menggunakan kata sandi yang baru.
      </p>
      <Link
        to={RoutePaths.LOGIN}
        className="w-full inline-flex py-2.5 px-4 rounded-xl bg-[var(--lf-action)] text-white font-semibold text-xs sm:text-sm hover:bg-[#094bb0] transition-all items-center justify-center gap-2"
      >
        <span>Kembali ke Halaman Masuk</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

