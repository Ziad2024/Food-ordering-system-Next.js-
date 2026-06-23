'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Order } from '@/types/api.types';
import { OrderStatusBadge } from '@/features/orders/components/OrderStatusBadge';

interface OrdersTableProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: Order['status']) => void;
  isUpdating?: boolean;
}

const STATUS_OPTIONS: Order['status'][] = [
  'pending_payment',
  'confirmed',
  'preparing',
  'out_for_delivery',
  'delivered',
  'cancelled',
];

export function OrdersTable({ orders, onUpdateStatus, isUpdating }: OrdersTableProps) {
  const { locale } = useParams<{ locale: string }>();
  const t = useTranslations('admin.orders');

  return (
    <div className="overflow-x-auto rounded-2xl bg-white/5 border border-white/10">
      <table className="w-full text-sm text-left rtl:text-right border-collapse">
        <thead>
          <tr className="text-zinc-400 border-b border-white/10 bg-white/5">
            <th className="p-4 font-semibold">{t('order_id')}</th>
            <th className="p-4 font-semibold">{t('customer')}</th>
            <th className="p-4 font-semibold">{t('total')}</th>
            <th className="p-4 font-semibold">{t('payment')}</th>
            <th className="p-4 font-semibold">{t('status')}</th>
            <th className="p-4 font-semibold text-end">{t('actions')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {orders.map((order) => {
            const customerName = typeof order.user === 'object' ? order.user.name : 'Guest';
            const customerEmail = typeof order.user === 'object' ? order.user.email : '';

            return (
              <tr key={order._id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-mono text-zinc-300">#{order._id.slice(-8).toUpperCase()}</td>
                <td className="p-4">
                  <div className="font-semibold">{customerName}</div>
                  <div className="text-xs text-zinc-500">{customerEmail}</div>
                </td>
                <td className="p-4 font-bold text-orange-500">${order.totalAmount.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold capitalize ${order.paymentStatus === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="p-4">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="p-4 text-end">
                  <select
                    disabled={isUpdating || ['cancelled', 'delivered'].includes(order.status)}
                    value={order.status}
                    onChange={(e) => onUpdateStatus(order._id, e.target.value as Order['status'])}
                    className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;
