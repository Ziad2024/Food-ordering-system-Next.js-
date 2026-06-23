'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Product, Category } from '@/types/api.types';
import { X, Upload } from 'lucide-react';

interface ProductFormProps {
  product?: Product | null;
  categories: Category[];
  onSubmit: (formData: FormData) => void;
  onClose: () => void;
}

export function ProductForm({ product, categories, onSubmit, onClose }: ProductFormProps) {
  const t = useTranslations('admin.products.form');
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name_en: product?.name.en || '',
      name_ar: product?.name.ar || '',
      description_en: product?.description.en || '',
      description_ar: product?.description.ar || '',
      price: product?.price || 0,
      category: typeof product?.category === 'string' ? product.category : product?.category?._id || '',
      isAvailable: product?.isAvailable ?? true,
      image: null as any,
    },
  });

  const onFormSubmit = (data: any) => {
    const fd = new FormData();
    fd.append('name[en]', data.name_en);
    fd.append('name[ar]', data.name_ar);
    fd.append('description[en]', data.description_en);
    fd.append('description[ar]', data.description_ar);
    fd.append('price', data.price.toString());
    fd.append('category', data.category);
    fd.append('isAvailable', data.isAvailable.toString());
    if (data.image?.[0]) fd.append('image', data.image[0]);
    onSubmit(fd);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-zinc-950 border border-white/10 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 end-4 text-zinc-500 hover:text-white transition-colors">
          <X className="h-5 w-5" />
        </button>

        <h3 className="text-xl font-bold">{product ? t('edit_title') : t('create_title')}</h3>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 mb-1">{t('name_en')}</label>
              <input {...register('name_en')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white" required />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">{t('name_ar')}</label>
              <input {...register('name_ar')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-right" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 mb-1">{t('desc_en')}</label>
              <textarea {...register('description_en')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white h-20" required />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">{t('desc_ar')}</label>
              <textarea {...register('description_ar')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-right h-20" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 mb-1">{t('price')}</label>
              <input type="number" step="0.01" {...register('price')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white" required />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">{t('category')}</label>
              <select {...register('category')} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-white" required>
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name.en}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 mb-1">{t('image')}</label>
            <input type="file" accept="image/*" {...register('image')} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white" />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" id="isAvailable" {...register('isAvailable')} className="h-4 w-4 rounded border-zinc-800 bg-zinc-900 text-orange-600 focus:ring-orange-500" />
            <label htmlFor="isAvailable" className="text-zinc-300 font-semibold">{t('is_available')}</label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">{t('cancel')}</button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-semibold text-white transition-colors">{t('submit')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
