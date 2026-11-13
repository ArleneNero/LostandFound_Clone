import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { StudentAuthLayout } from '@/features/auth/components/StudentAuthLayout';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { RoutePaths } from '@/constants/routes';
import { registry } from '@/services/registry';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const checkSession = async () => {
      try {
        const user = await registry.getServices().auth.getCurrentUser();
        if (isMounted && user && user.role === 'STUDENT') {
          navigate(RoutePaths.STUDENT_HOME, { replace: true });
        }
      } catch {
        // ignore
      }
    };
    checkSession();
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <StudentAuthLayout
      title="Buat Akun Mahasiswa"
      subtitle="Lengkapi data untuk membuat akun."
      activeTab="register"
      footerAction={
        <p className="text-xs sm:text-sm text-[#667085]">
          Sudah memiliki akun?{' '}
          <Link
            to={RoutePaths.LOGIN}
            className="text-[#0B5ED7] font-semibold hover:underline"
          >
            Masuk di sini
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </StudentAuthLayout>
  );
};
