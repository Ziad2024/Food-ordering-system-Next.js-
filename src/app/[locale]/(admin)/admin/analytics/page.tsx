'use client';

import { useAnalytics } from '@/features/admin/hooks/useAnalytics';
import { SalesTrendChart } from '@/features/admin/components/dashboard/SalesTrendChart';
import { TopProductsTable } from '@/features/admin/components/dashboard/TopProductsTable';
import { useTranslations } from 'next-intl';

export default function AdminAnalyticsPage() {
  const { salesTrends, topProducts, isLoadingTrends, isLoadingTopProducts } = useAnalytics();
  const t = useTranslations('admin.analytics');

  return (
    <main className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">{t('title')}</h1>
        <p className="text-zinc-400 text-sm mt-1">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
