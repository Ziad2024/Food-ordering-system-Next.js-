'use client';

import { useState } from 'react';
import { useAdminOrders } from '@/features/admin/hooks/useAdminOrders';
import { OrdersTable } from '@/features/admin/components/orders/OrdersTable';
import { useTranslations } from 'next-intl';

export default function AdminOrdersPage() {
  const t = useTranslations('admin.orders');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const { orders, isLoading, updateStatus, isUpdating } = useAdminOrders({
    status: statusFilter || undefined,
  });

  return (
    <main className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">{t('title')}</h1>
          <p className="text-zinc-400 text-sm mt-1">{t('subtitle')}</p>
        </div>

        {/* Filter Dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-zinc-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500 max-w-xs"
        >
          <option value="">{t('filter_all')}</option>
          <option value="pending_payment">Pending Payment</option>
          <option value="confirmed">Confirmed</option>
          <option value="preparing">Preparing</option>
          <option value="out_for_delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {isLoading ? (
        <div className="h-96 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
      ) : (
        <OrdersTable
          orders={orders}
          onUpdateStatus={(id, status) => updateStatus({ id, status })}
          isUpdating={isUpdating}
        />
      )}
    </main>
  );
}
