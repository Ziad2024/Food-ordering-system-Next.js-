'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCartStore } from '@/features/cart/store/cart.store';
import { CartItem } from './CartItem';
import { EmptyCart } from './EmptyCart';

export function CartDrawer() {
  const t = useTranslations('cart');
  const { locale } = useParams<{ locale: string }>();
  const { items, isDrawerOpen, closeDrawer, itemCount, totalPrice } = useCartStore();

  const count = itemCount();
  const total = totalPrice();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer panel */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed top-0 end-0 h-full w-full max-w-md bg-zinc-900 border-s border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} className="text-amber-400" />
                <h2 className="font-bold text-lg">{t('your_cart')}</h2>
                {count > 0 && (
                  <span className="bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
              </div>
              <button
                aria-label={t('close_cart')}
                onClick={closeDrawer}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <EmptyCart />
              ) : (
                items.map((item) => (
                  <CartItem key={item.product._id} item={item} />
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-white/10 space-y-3">
                <div className="flex justify-between font-bold text-base">
                  <span>{t('total')}</span>
                  <span className="text-amber-400">${total.toFixed(2)}</span>
                </div>
                <Link
                  href={`/${locale}/checkout`}
                  onClick={closeDrawer}
                  className="block w-full text-center py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-colors"
                >
                  {t('proceed_checkout')}
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
