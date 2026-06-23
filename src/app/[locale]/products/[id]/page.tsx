'use client';

import React, { use } from 'react';
import { useLocale } from 'next-intl';
import { useProductDetail } from '@/features/products/hooks/useProducts';
import ProductDetailView from '@/features/products/components/ProductDetailView';
import { Link } from '@/i18n/routing';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  const locale = useLocale();
  const { data: product, isLoading, isError } = useProductDetail(id);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4">
        <p className="text-stone-600 font-medium">
          {locale === 'ar' ? 'المنتج غير موجود' : 'Product not found'}
        </p>
        <Link href="/products" className="text-orange-600 font-bold hover:underline">
          {locale === 'ar' ? 'العودة للقائمة' : 'Back to Menu'}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center w-full">
      <div className="w-full max-w-4xl mb-6">
        <Link
          href="/products"
          className="text-stone-500 hover:text-stone-700 text-sm font-semibold transition-colors flex items-center gap-1"
        >
          {locale === 'ar' ? '← العودة للقائمة' : '← Back to Menu'}
        </Link>
      </div>
      <ProductDetailView product={product} />
    </div>
  );
}
