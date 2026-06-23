'use client';

import { useOrders } from '@/features/orders/hooks/useOrders';
import { OrderCard } from '@/features/orders/components/OrderCard';
import { ShoppingBag } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function OrdersPage() {
  const { data: orders, isLoading, isError, refetch } = useOrders();
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const t = useTranslations('orders.page');

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-28 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-red-500 mb-4">{t('error')}</p>
            <button
              onClick={() => refetch()}
              className="py-2 px-4 bg-orange-600 hover:bg-orange-500 font-semibold rounded-xl text-white transition-colors"
            >
              {t('retry')}
            </button>
          </div>
        )}

        {!isLoading && !isError && (!orders || orders.length === 0) && (
          <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
            <div className="h-16 w-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-500">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">{t('empty_title')}</h2>
              <p className="text-zinc-500 text-sm max-w-sm mx-auto">{t('empty_subtitle')}</p>
            </div>
            <button
              onClick={() => router.push(`/${locale}/products`)}
              className="py-3 px-6 bg-orange-600 hover:bg-orange-500 font-semibold rounded-xl text-white transition-colors shadow-lg shadow-orange-600/20"
            >
              {t('browse_menu')}
            </button>
          </div>
        )}

        {!isLoading && !isError && orders && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
