import { AppErrorBoundary } from '@/components/ui/AppErrorBoundary';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export const App: React.FC = () => {
  return (
    <AppErrorBoundary>
      <RouterProvider router={router} />
    </AppErrorBoundary>
  );
};
