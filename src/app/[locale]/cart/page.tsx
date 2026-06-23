'use client';

import { useCartStore } from '@/features/cart/store/cart.store';
import { useCart } from '@/features/cart/hooks/useCart';
import { CartItem } from '@/features/cart/components/CartItem';
import { CartSummary } from '@/features/cart/components/CartSummary';
import { EmptyCart } from '@/features/cart/components/EmptyCart';
import { useTranslations } from 'next-intl';

export default function CartPage() {
  const t = useTranslations('cart');
  const { items } = useCartStore();

  // Trigger server sync on mount
  useCart();

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">{t('page_title')}</h1>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items list */}
            <div className="lg:col-span-2 divide-y divide-white/10">
              {items.map((item) => (
                <CartItem key={item.product._id} item={item} />
              ))}
            </div>
            {/* Order summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
