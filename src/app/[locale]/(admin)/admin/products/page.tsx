'use client';

import { useState } from 'react';
import { useProducts, useCategories } from '@/features/products/hooks/useProducts';
import { useAdminProducts } from '@/features/admin/hooks/useAdminProducts';
import { ProductTable } from '@/features/admin/components/products/ProductTable';
import { CategoryManager } from '@/features/admin/components/products/CategoryManager';
import { ProductForm } from '@/features/admin/components/products/ProductForm';
import { Product } from '@/types/api.types';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AdminProductsPage() {
  const t = useTranslations('admin.products');
  const { data: productsRes, isLoading: loadingProducts } = useProducts();
  const { data: categories = [], isLoading: loadingCategories } = useCategories();
  const { createProduct, updateProduct, toggleAvailability, deleteProduct, createCategory, deleteCategory } = useAdminProducts();

  const [activeProduct, setActiveProduct] = useState<Product | null | undefined>(undefined);

  const products = productsRes?.data || [];

  return (
    <main className="p-6 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">{t('title')}</h1>
          <p className="text-zinc-400 text-sm mt-1">{t('subtitle')}</p>
        </div>
        <button
          onClick={() => setActiveProduct(null)}
          className="py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 font-semibold text-white transition-colors duration-200 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {t('add_btn')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {loadingProducts ? (
            <div className="h-96 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
          ) : (
            <ProductTable
              products={products}
              onEdit={setActiveProduct}
              onDelete={deleteProduct}
              onToggleAvailability={(id, val) => toggleAvailability({ id, isAvailable: val })}
            />
          )}
        </div>

        <div>
          {loadingCategories ? (
            <div className="h-64 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
          ) : (
            <CategoryManager
              categories={categories}
              onCreate={createCategory}
              onDelete={deleteCategory}
            />
          )}
        </div>
      </div>

      {activeProduct !== undefined && (
        <ProductForm
          product={activeProduct}
          categories={categories}
          onClose={() => setActiveProduct(undefined)}
          onSubmit={(formData) => {
            if (activeProduct) {
              updateProduct({ id: activeProduct._id, formData });
            } else {
              createProduct(formData);
            }
            setActiveProduct(undefined);
          }}
        />
      )}
    </main>
  );
}
