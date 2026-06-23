'use client';

import { usePathname, useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  LayoutDashboard,
  Utensils,
  ShoppingBag,
  BarChart3,
  Users,
  LogOut,
  ChevronLeft,
} from 'lucide-react';

export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams<{ locale: string }>();
  const { clearAuth } = useAuthStore();
  const t = useTranslations('admin.sidebar');

  const links = [
    { href: `/${locale}/admin/dashboard`, label: t('dashboard'), icon: LayoutDashboard },
    { href: `/${locale}/admin/products`, label: t('products'), icon: Utensils },
    { href: `/${locale}/admin/orders`, label: t('orders'), icon: ShoppingBag },
    { href: `/${locale}/admin/analytics`, label: t('analytics'), icon: BarChart3 },
    { href: `/${locale}/admin/management`, label: t('management'), icon: Users },
  ];

  const handleLogout = () => {
    clearAuth();
    router.replace(`/${locale}/login`);
  };

  return (
    <aside className="w-64 bg-zinc-950 border-e border-white/10 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
          {t('title')}
        </h2>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/10' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Icon className="h-4 w-4" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-3">
        <button
          onClick={() => router.push(`/${locale}/products`)}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-semibold border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <span>{t('store_view')}</span>
          <ChevronLeft className="h-3.5 w-3.5 rotate-180 rtl:rotate-0" />
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
        >
          <LogOut className="h-4 w-4" />
          <span>{t('logout')}</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
