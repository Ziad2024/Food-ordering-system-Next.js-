'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Product } from '@/types/api.types';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale() as 'en' | 'ar';
  const t = useTranslations('Navbar');

  const name = product.name[locale] || product.name.en;
  const description = product.description[locale] || product.description.en;

  return (
    <div className="bg-white rounded-xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full group">
      <Link href={`/products/${product._id}`} className="relative aspect-video w-full bg-stone-100 overflow-hidden block">
        {product.image ? (
          <Image
            src={product.image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-400">
            No Image
          </div>
        )}
      </Link>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/products/${product._id}`}>
            <h3 className="font-bold text-stone-900 text-lg hover:text-orange-600 transition-colors line-clamp-1">
              {name}
            </h3>
          </Link>
          <p className="text-stone-500 text-xs mt-1 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4 pt-2 border-t border-stone-50">
          <span className="font-extrabold text-orange-600 text-lg">
            {product.price} {locale === 'ar' ? 'ج.م' : 'EGP'}
          </span>
          <Link
            href={`/products/${product._id}`}
            className="bg-stone-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors"
          >
            {locale === 'ar' ? 'عرض التفاصيل' : 'Details'}
          </Link>
        </div>
      </div>
    </div>
  );
}
