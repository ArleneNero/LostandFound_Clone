import React from 'react';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6">
      <RegisterForm />
    </div>
  );
};

