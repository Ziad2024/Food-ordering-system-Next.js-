'use client';

import { useTranslations } from 'next-intl';
import { User } from '@/types/api.types';
import { Shield, ShieldAlert, ToggleLeft, ToggleRight } from 'lucide-react';

interface UsersTableProps {
  users: User[];
  onToggleRole: (id: string, currentRole: 'customer' | 'admin') => void;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
  isPending?: boolean;
}

export function UsersTable({ users, onToggleRole, onToggleStatus, isPending }: UsersTableProps) {
  const t = useTranslations('admin.management');

  return (
    <div className="overflow-x-auto rounded-2xl bg-white/5 border border-white/10">
      <table className="w-full text-sm text-left rtl:text-right border-collapse">
        <thead>
          <tr className="text-zinc-400 border-b border-white/10 bg-white/5">
            <th className="p-4 font-semibold">{t('name')}</th>
            <th className="p-4 font-semibold">{t('phone')}</th>
            <th className="p-4 font-semibold">{t('role')}</th>
            <th className="p-4 font-semibold text-center">{t('status')}</th>
            <th className="p-4 font-semibold text-end">{t('actions')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-white/5 transition-colors">
              <td className="p-4">
                <div className="font-semibold">{user.name}</div>
                <div className="text-xs text-zinc-500">{user.email}</div>
              </td>
              <td className="p-4 text-zinc-300">{user.phone}</td>
              <td className="p-4">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${user.role === 'admin' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}>
                  {user.role === 'admin' ? <ShieldAlert className="h-3 w-3" /> : <Shield className="h-3 w-3" />}
                  {user.role}
                </span>
              </td>
              <td className="p-4 text-center">
                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${user.isActive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  {user.isActive ? t('active') : t('inactive')}
                </span>
              </td>
              <td className="p-4 text-end">
                <div className="flex justify-end gap-2">
                  <button
                    disabled={isPending}
                    onClick={() => onToggleRole(user.id, user.role)}
                    className="py-1 px-3 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-zinc-300 hover:text-white transition-all"
                  >
                    {t('toggle_role')}
                  </button>
                  <button
                    disabled={isPending}
                    onClick={() => onToggleStatus(user.id, user.isActive)}
                    className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-zinc-300 hover:text-white transition-all"
                  >
                    {user.isActive ? <ToggleRight className="h-5 w-5 text-green-500" /> : <ToggleLeft className="h-5 w-5 text-zinc-500" />}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
