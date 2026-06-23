'use client';

import { useAdminUsers } from '@/features/admin/hooks/useAdminUsers';
import { UsersTable } from '@/features/admin/components/management/UsersTable';
import { useTranslations } from 'next-intl';

export default function AdminManagementPage() {
  const t = useTranslations('admin.management');
  const { users, isLoading, toggleRole, toggleStatus, isUpdatingRole, isUpdatingStatus } = useAdminUsers();

  return (
    <main className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">{t('title')}</h1>
        <p className="text-zinc-400 text-sm mt-1">{t('subtitle')}</p>
      </div>

      {isLoading ? (
        <div className="h-96 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
      ) : (
        <UsersTable
          users={users}
          onToggleRole={(id, role) => toggleRole({ id, role: role === 'admin' ? 'customer' : 'admin' })}
          onToggleStatus={(id, status) => toggleStatus({ id, isActive: !status })}
          isPending={isUpdatingRole || isUpdatingStatus}
        />
      )}
    </main>
  );
}
