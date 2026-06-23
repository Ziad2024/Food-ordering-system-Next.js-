'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { CartItem as CartItemType } from '@/types/api.types';
import { useCart } from '@/features/cart/hooks/useCart';

interface Props {
  item: CartItemType;
}

export function CartItem({ item }: Props) {
  const t = useTranslations('cart');
  const { updateItem, removeItem } = useCart();

  const { product, quantity } = item;
  const name = product.name;
  const subtotal = (product.price * quantity).toFixed(2);

  return (
    <div className="flex items-start gap-3 py-4 border-b border-white/10">
      {/* Product image */}
      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
        {product.image ? (
          <Image src={product.image} alt={name.en} fill className="object-cover" sizes="64px" />
        ) : (
          <div className="w-full h-full bg-white/10 flex items-center justify-center text-2xl">🍽️</div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{name.en}</p>
        <p className="text-xs text-white/50 mt-0.5">${product.price.toFixed(2)} each</p>
        <p className="text-sm font-bold text-amber-400 mt-1">${subtotal}</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <button
          aria-label={t('decrease')}
          onClick={() => quantity > 1 ? updateItem(product._id, quantity - 1) : removeItem(product._id)}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <Minus size={12} />
        </button>
        <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
        <button
          aria-label={t('increase')}
          onClick={() => updateItem(product._id, quantity + 1)}
          className="w-7 h-7 rounded-full bg-amber-500/80 hover:bg-amber-500 flex items-center justify-center transition-colors"
        >
          <Plus size={12} />
        </button>
        <button
          aria-label={t('remove')}
          onClick={() => removeItem(product._id)}
          className="w-7 h-7 rounded-full bg-red-500/20 hover:bg-red-500/40 flex items-center justify-center text-red-400 transition-colors ms-1"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
}
