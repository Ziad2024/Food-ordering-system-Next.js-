'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { useCategories, useProducts } from '@/features/products/hooks/useProducts';
import CategoryFilter from '@/features/products/components/CategoryFilter';
import ProductGrid from '@/features/products/components/ProductGrid';
import ProductCard from '@/features/products/components/ProductCard';
import ProductSkeleton from '@/features/products/components/ProductSkeleton';

export default function ProductsPage() {
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page] = useState(1);

  // Fetch categories using react-query
  const { data: categories = [], isLoading: catsLoading } = useCategories();

  // Fetch products with selected filters using react-query
  const { data: productsRes, isLoading: prodsLoading } = useProducts({
    category: selectedCategory,
    page,
    limit: 12,
  });

  const products = productsRes?.data || [];

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
          onSelectCategory={(id) => setSelectedCategory(id)}
        />
      )}

      {prodsLoading ? (
        <ProductGrid>
          {Array.from({ length: 6 }).map((_, i) => (
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
    </div>
  );
}
