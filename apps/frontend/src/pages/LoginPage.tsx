import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { StudentAuthLayout } from '@/features/auth/components/StudentAuthLayout';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { RoutePaths } from '@/constants/routes';
import { registry } from '@/services/registry';

export const LoginPage: React.FC = () => {
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
      title="Masuk sebagai Mahasiswa"
      subtitle="Gunakan akun email kampus untuk melanjutkan."
      activeTab="login"
      footerAction={
        <p className="text-xs sm:text-sm text-[#667085]">
          Belum punya akun?{' '}
          <Link
            to={RoutePaths.REGISTER}
            className="text-[#0B5ED7] font-semibold hover:underline"
          >
            Daftar sekarang
          </Link>
        </p>
      }
    >
      <LoginForm />
    </StudentAuthLayout>
  );
};
