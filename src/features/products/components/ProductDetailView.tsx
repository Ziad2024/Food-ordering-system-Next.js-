'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { Product } from '@/types/api.types';
import Image from 'next/image';
import { useCart } from '@/features/cart/hooks/useCart';
import { useCartStore } from '@/features/cart/store/cart.store';

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const locale = useLocale() as 'en' | 'ar';
  const [quantity, setQuantity] = useState(1);

  const name = product.name[locale] || product.name.en;
  const description = product.description[locale] || product.description.en;

  const { addItem } = useCart();
  const { openDrawer } = useCartStore();

  const handleAddToCart = async () => {
    await addItem(product, quantity);
    openDrawer();
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8 max-w-4xl w-full">
      <div className="relative aspect-video md:aspect-square w-full md:w-1/2 bg-stone-100 rounded-xl overflow-hidden shadow-inner">
        {product.image ? (
          <Image
            src={product.image}
            alt={name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-400">
            No Image
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col items-start gap-1">
            <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
              {locale === 'ar' ? 'مأكولات' : 'Food Item'}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900 mt-2">{name}</h1>
          </div>
          <p className="text-stone-600 text-sm leading-relaxed">{description}</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-stone-50 pb-4">
            <span className="text-stone-500 text-sm font-medium">
              {locale === 'ar' ? 'السعر' : 'Price'}
            </span>
            <span className="text-3xl font-black text-orange-600">
              {product.price} {locale === 'ar' ? 'ج.م' : 'EGP'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-200 rounded"
              >
                -
              </button>
              <span className="w-10 text-center font-bold text-stone-900">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-200 rounded"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-center"
            >
              {locale === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
