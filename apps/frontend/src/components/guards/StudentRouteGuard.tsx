import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { registry } from '@/services/registry';
import { UserSession } from '@/types/domain';

export const StudentRouteGuard: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authService = registry.getServices().auth;
      let user = await authService.getCurrentUser();

      // If in demo mode and no active session, auto initialize mock student
      if (!user || user.role !== 'STUDENT') {
        user = await authService.loginAsStudent(
          '2411502194@student.budiluhur.ac.id',
          'Nero Mahasiswa',
          '2411502194'
        );
      }
      setCurrentUser(user);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--lf-canvas)]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-3 border-[var(--lf-action)] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[var(--lf-muted)] font-medium">Memuat portal mahasiswa...</span>
        </div>
      </div>
    );
  }

  return <Outlet context={{ currentUser }} />;
};

