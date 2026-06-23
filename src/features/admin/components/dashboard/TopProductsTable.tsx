'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { TopProduct } from '@/services/admin.service';

interface TopProductsTableProps {
  products: TopProduct[];
  isLoading?: boolean;
}

export function TopProductsTable({ products, isLoading }: TopProductsTableProps) {
  const { locale } = useParams<{ locale: string }>();
  const t = useTranslations('admin.dashboard.top_products');

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-4">
      <h3 className="text-lg font-bold border-b border-white/5 pb-3">{t('title')}</h3>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-10 bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-zinc-500 text-sm py-4 text-center">{t('empty')}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead>
              <tr className="text-zinc-500 border-b border-white/5">
                <th className="pb-3 font-semibold">{t('name')}</th>
                <th className="pb-3 text-end font-semibold">{t('sold')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((item, index) => (
                <tr key={index} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 font-medium">
                    {item.product?.name[locale as 'en' | 'ar'] || item.product?.name?.en || 'Unknown Product'}
                  </td>
                  <td className="py-3 text-end font-semibold text-orange-500">
                    {item.totalSold}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TopProductsTable;
