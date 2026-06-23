'use client';

import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCartStore } from '@/features/cart/store/cart.store';
import { useCart } from '@/features/cart/hooks/useCart';

export function CartSummary() {
  const t = useTranslations('cart');
  const { locale } = useParams<{ locale: string }>();
  const { items, itemCount, totalPrice } = useCartStore();
  const { clearCart } = useCart();

  const count = itemCount();
  const total = totalPrice();

  if (items.length === 0) return null;

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-4">
      <h2 className="text-lg font-bold">{t('order_summary')}</h2>

      <div className="space-y-2 text-sm text-white/70">
        <div className="flex justify-between">
          <span>{t('items_count', { count })}</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>{t('delivery_fee')}</span>
          <span className="text-green-400">{t('free')}</span>
        </div>
      </div>

      <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-base">
        <span>{t('total')}</span>
        <span className="text-amber-400">${total.toFixed(2)}</span>
      </div>

      <Link
        href={`/${locale}/checkout`}
        className="block w-full text-center py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-colors"
      >
        {t('proceed_checkout')}
      </Link>

      <button
        onClick={clearCart}
        className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors mx-auto"
      >
        <Trash2 size={12} />
        {t('clear_cart')}
      </button>
    </div>
  );
}
