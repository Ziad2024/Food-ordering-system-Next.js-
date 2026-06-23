'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { Order } from '@/types/api.types';
import { OrderStatusBadge } from './OrderStatusBadge';
import { Calendar, ChevronRight, ShoppingBag } from 'lucide-react';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const t = useTranslations('orders.card');

  const formattedDate = new Date(order.createdAt).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Join item names for display: e.g., "Burger x2, Fries x1"
  const itemsText = order.items
    .map((item) => `${item.name[locale as 'en' | 'ar'] || item.name.en} x${item.quantity}`)
    .join(', ');

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-mono text-sm text-zinc-300 font-semibold">#{order._id.slice(-8).toUpperCase()}</span>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="flex flex-col gap-1.5 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-zinc-500" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-3.5 w-3.5 text-zinc-500" />
            <span className="line-clamp-1">{itemsText}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
        <div className="space-y-0.5 text-left md:text-right">
          <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">{t('total')}</span>
          <div className="text-lg font-bold text-orange-500">${order.totalAmount.toFixed(2)}</div>
        </div>

        <button
          onClick={() => router.push(`/${locale}/orders/${order._id}`)}
          className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all duration-200 border border-white/10 flex items-center gap-1 group"
        >
          {t('view_details')}
          <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
