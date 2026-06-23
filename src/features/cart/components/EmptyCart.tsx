'use client';

import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function EmptyCart() {
  const t = useTranslations('cart');
  const { locale } = useParams<{ locale: string }>();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
        <ShoppingCart size={40} className="text-white/30" />
      </div>
      <h2 className="text-xl font-bold mb-2">{t('empty_title')}</h2>
      <p className="text-white/50 text-sm mb-8 max-w-xs">{t('empty_subtitle')}</p>
      <Link
        href={`/${locale}/products`}
        className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-xl transition-colors"
      >
        {t('browse_menu')}
      </Link>
    </div>
  );
}
