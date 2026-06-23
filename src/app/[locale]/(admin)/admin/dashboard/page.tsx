'use client';

import { useAnalytics } from '@/features/admin/hooks/useAnalytics';
import { StatCard } from '@/features/admin/components/dashboard/StatCard';
import { SalesTrendChart } from '@/features/admin/components/dashboard/SalesTrendChart';
import { TopProductsTable } from '@/features/admin/components/dashboard/TopProductsTable';
import { DollarSign, ShoppingBag, Users, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AdminDashboardPage() {
  const { dashboard, salesTrends, topProducts, isLoadingDashboard, isLoadingTrends, isLoadingTopProducts } = useAnalytics();
  const t = useTranslations('admin.dashboard');

  return (
    <main className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">{t('title')}</h1>
        <p className="text-zinc-400 text-sm mt-1">{t('subtitle')}</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('revenue')}
          value={`$${dashboard?.totalRevenue.toFixed(2) || '0.00'}`}
          icon={DollarSign}
          color="text-green-500"
          isLoading={isLoadingDashboard}
        />
        <StatCard
          title={t('orders')}
          value={dashboard?.totalOrders || 0}
          icon={ShoppingBag}
          color="text-blue-500"
          isLoading={isLoadingDashboard}
        />
        <StatCard
          title={t('active_users')}
          value={dashboard?.activeUsers || 0}
          icon={Users}
          color="text-indigo-500"
          isLoading={isLoadingDashboard}
        />
        <StatCard
          title={t('pending_orders')}
          value={dashboard?.pendingOrders || 0}
          icon={Clock}
          color="text-yellow-500"
          isLoading={isLoadingDashboard}
        />
      </div>

      {/* Charts & Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesTrendChart data={salesTrends} isLoading={isLoadingTrends} />
        </div>
        <div>
          <TopProductsTable products={topProducts} isLoading={isLoadingTopProducts} />
        </div>
      </div>
    </main>
  );
}
