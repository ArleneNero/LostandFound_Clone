import React from 'react';
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm';

export const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6">
      <ForgotPasswordForm />
    </div>
  );
};

