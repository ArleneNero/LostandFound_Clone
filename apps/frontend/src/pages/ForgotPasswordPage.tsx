import React from 'react';
import { StudentAuthLayout } from '@/features/auth/components/StudentAuthLayout';
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm';

export const ForgotPasswordPage: React.FC = () => {
  return (
    <StudentAuthLayout
      title="Pemulihan Kata Sandi"
      subtitle="Atur ulang kata sandi akun mahasiswa Anda."
    >
      <ForgotPasswordForm />
    </StudentAuthLayout>
  );
};
