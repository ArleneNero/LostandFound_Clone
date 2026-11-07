import React from 'react';
import { LoginForm } from '@/features/auth/components/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6">
      <LoginForm initialRole="OFFICER" />
    </div>
  );
};
