'use client';

import { ProtectedRoute } from '@/components/layouts/ProtectedRoute';
import { AdminSidebar } from '@/components/layouts/AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="flex min-h-screen bg-zinc-900 text-white font-sans">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
