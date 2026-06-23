'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Product, Category } from '@/types/api.types';
import { Edit2, Trash2 } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onToggleAvailability: (id: string, isAvailable: boolean) => void;
}

export function ProductTable({ products, onEdit, onDelete, onToggleAvailability }: ProductTableProps) {
  const { locale } = useParams<{ locale: string }>();
  const t = useTranslations('admin.products.table');

  const getCategoryName = (category: string | Category) => {
    if (typeof category === 'string') return category;
    return category?.name[locale as 'en' | 'ar'] || category?.name?.en || '';
  };

  return (
    <div className="overflow-x-auto rounded-2xl bg-white/5 border border-white/10">
      <table className="w-full text-sm text-left rtl:text-right border-collapse">
        <thead>
          <tr className="text-zinc-400 border-b border-white/10 bg-white/5">
            <th className="p-4 font-semibold">{t('image')}</th>
            <th className="p-4 font-semibold">{t('name')}</th>
            <th className="p-4 font-semibold">{t('category')}</th>
            <th className="p-4 font-semibold">{t('price')}</th>
            <th className="p-4 font-semibold text-center">{t('available')}</th>
            <th className="p-4 font-semibold text-end">{t('actions')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-white/5 transition-colors">
              <td className="p-4">
                <img
                  src={product.image}
                  alt={product.name.en}
                  className="h-12 w-12 rounded-xl object-cover border border-white/10"
                />
              </td>
              <td className="p-4">
                <div className="font-semibold">{product.name[locale as 'en' | 'ar'] || product.name.en}</div>
                <div className="text-xs text-zinc-500 line-clamp-1">
                  {product.description[locale as 'en' | 'ar'] || product.description.en}
                </div>
              </td>
              <td className="p-4 text-zinc-300">{getCategoryName(product.category)}</td>
              <td className="p-4 font-bold text-orange-500">${product.price.toFixed(2)}</td>
              <td className="p-4 text-center">
                <input
                  type="checkbox"
                  checked={product.isAvailable}
                  onChange={(e) => onToggleAvailability(product._id, e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-800 bg-zinc-900 text-orange-600 focus:ring-orange-500 focus:ring-offset-zinc-900"
                />
              </td>
              <td className="p-4 text-end">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
