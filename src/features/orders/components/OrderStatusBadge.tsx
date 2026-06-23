'use client';

import { useTranslations } from 'next-intl';
import { Order } from '@/types/api.types';

interface OrderStatusBadgeProps {
  status: Order['status'];
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const t = useTranslations('orders.status');

  const styles: Record<Order['status'], string> = {
    pending_payment: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    confirmed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    preparing: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    out_for_delivery: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
    delivered: 'bg-green-500/10 text-green-500 border-green-500/20',
    cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status] || 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'}`}>
      {t(status)}
    </span>
  );
}
