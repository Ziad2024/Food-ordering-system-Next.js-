'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { useCategories, useProducts } from '@/features/products/hooks/useProducts';
import CategoryFilter from '@/features/products/components/CategoryFilter';
import ProductGrid from '@/features/products/components/ProductGrid';
import ProductCard from '@/features/products/components/ProductCard';
import ProductSkeleton from '@/features/products/components/ProductSkeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductsPage() {
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);

  const { data: categories = [], isLoading: catsLoading } = useCategories();

  const { data: productsRes, isLoading: prodsLoading } = useProducts({
    category: selectedCategory,
    page,
    limit: 12,
  });

  const products = productsRes?.data || [];
  const pagination = productsRes?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  const handleCategoryChange = (id: string) => {
    setSelectedCategory(id);
    setPage(1); // reset to first page on filter change
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 flex flex-col items-center w-full">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
          {locale === 'ar' ? 'قائمة المأكولات' : 'Our Delicious Menu'}
        </h1>
        <p className="text-stone-500 max-w-md">
          {locale === 'ar'
            ? 'اختر وجبتك المفضلة من قائمتنا المميزة المصنوعة بحب'
            : 'Choose your favorite meal from our menu crafted with fresh ingredients'}
        </p>
      </div>

      {catsLoading ? (
        <div className="h-10 w-full bg-stone-100 animate-pulse rounded-full" />
      ) : (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
        />
      )}

      {prodsLoading ? (
        <ProductGrid>
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </ProductGrid>
      ) : products.length === 0 ? (
        <div className="text-center py-12 text-stone-500">
          {locale === 'ar' ? 'لا توجد منتجات متاحة حالياً' : 'No items found in this category'}
        </div>
      ) : (
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ProductGrid>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || prodsLoading}
            className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5 text-stone-600" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              disabled={prodsLoading}
              className={`w-9 h-9 rounded-xl text-sm font-semibold transition-colors border ${
                p === page
                  ? 'bg-orange-600 text-white border-orange-600'
                  : 'border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || prodsLoading}
            className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5 text-stone-600" />
          </button>
        </div>
      )}
    </div>
  );
}
