'use client';

import LayoutFile from '@/components/Layout/LayoutFile';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
     <LayoutFile >
        {children}
     </LayoutFile>
    </ProtectedRoute>
  );
}
