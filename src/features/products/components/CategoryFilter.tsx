'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Category } from '@/types/api.types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const locale = useLocale() as 'en' | 'ar';

  return (
    <div className="w-full overflow-x-auto py-2 scrollbar-none flex gap-2">
      <button
        onClick={() => onSelectCategory('')}
        className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${
          selectedCategory === ''
            ? 'bg-orange-600 border-orange-600 text-white shadow-sm'
            : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
        }`}
      >
        {locale === 'ar' ? 'الكل' : 'All'}
      </button>

      {categories.map((category) => {
        const name = category.name[locale] || category.name.en;
        return (
          <button
            key={category._id}
            onClick={() => onSelectCategory(category._id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${
              selectedCategory === category._id
                ? 'bg-orange-600 border-orange-600 text-white shadow-sm'
                : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}
