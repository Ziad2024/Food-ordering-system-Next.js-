'use client';

import { useParams, useRouter } from 'next/navigation';
import { useOrderTracking } from '@/features/orders/hooks/useOrderTracking';
import { TrackingProgress } from '@/features/orders/components/TrackingProgress';
import { OrderTimeline } from '@/features/orders/components/OrderTimeline';
import { ArrowLeft, MapPin, CreditCard, Banknote } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function OrderDetailPage() {
  const router = useRouter();
  const { id, locale } = useParams<{ id: string; locale: string }>();
  const { order, isLoading, isError } = useOrderTracking(id);
  const t = useTranslations('orders.detail');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-red-500">{t('not_found')}</p>
          <button
            onClick={() => router.push(`/${locale}/orders`)}
            className="py-2.5 px-5 rounded-xl bg-orange-600 hover:bg-orange-500 font-semibold transition-colors"
          >
            {t('back_to_orders')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push(`/${locale}/orders`)}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t('back_to_orders')}</span>
          </button>
          <span className="font-mono text-zinc-500">#{order._id.toUpperCase()}</span>
        </div>

        {/* Status Bar */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
          <TrackingProgress status={order.status} />
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Details & Summary */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-4">
              <h2 className="text-xl font-bold border-b border-white/5 pb-3">{t('summary_title')}</h2>
              <div className="divide-y divide-white/5">
                {order.items.map((item) => (
                  <div key={item.product} className="py-3 flex justify-between items-center text-sm">
                    <div>
                      <p className="font-semibold">{item.name[locale as 'en' | 'ar'] || item.name.en}</p>
                      <p className="text-zinc-500 text-xs">x{item.quantity}</p>
                    </div>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-white/5 flex justify-between font-bold text-lg">
                <span>{t('total')}</span>
                <span className="text-orange-500">${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Delivery & Payment Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-3">
                <h3 className="font-bold flex items-center gap-2 text-sm text-zinc-400">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  {t('delivery_address')}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-300 font-medium">
                  {order.address.addressLine}
                  {order.address.building && `, Building ${order.address.building}`}
                  {order.address.floor && `, Floor ${order.address.floor}`}
                  {order.address.apartment && `, Apt ${order.address.apartment}`}
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-3">
                <h3 className="font-bold flex items-center gap-2 text-sm text-zinc-400">
                  {order.paymentMethod === 'card' ? (
                    <CreditCard className="h-4 w-4 text-orange-500" />
                  ) : (
                    <Banknote className="h-4 w-4 text-orange-500" />
                  )}
                  {t('payment_method')}
                </h3>
                <p className="text-sm font-semibold capitalize text-zinc-300">
                  {order.paymentMethod === 'card' ? t('card') : t('cash')}
                </p>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${order.paymentStatus === 'paid' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                  {t(order.paymentStatus)}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline Panel */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 h-fit">
            <h2 className="text-xl font-bold border-b border-white/5 pb-3 mb-5">{t('timeline_title')}</h2>
            <OrderTimeline timeline={order.timeline} />
          </div>
        </div>
      </div>
    </main>
  );
}
