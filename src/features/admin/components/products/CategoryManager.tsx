'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Category } from '@/types/api.types';
import { Trash2, Plus } from 'lucide-react';

interface CategoryManagerProps {
  categories: Category[];
  onCreate: (formData: FormData) => void;
  onDelete: (id: string) => void;
}

export function CategoryManager({ categories, onCreate, onDelete }: CategoryManagerProps) {
  const t = useTranslations('admin.products.category');
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name_en: '', name_ar: '', image: null },
  });

  const onSubmit = (data: any) => {
    const fd = new FormData();
    fd.append('name[en]', data.name_en);
    fd.append('name[ar]', data.name_ar);
    if (data.image?.[0]) fd.append('image', data.image[0]);
    onCreate(fd);
    reset();
  };

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-6">
      <h3 className="text-lg font-bold border-b border-white/5 pb-3">{t('title')}</h3>

      {/* Create form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <label className="block text-xs text-zinc-500 mb-1">{t('name_en')}</label>
            <input {...register('name_en')} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white" required />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">{t('name_ar')}</label>
            <input {...register('name_ar')} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-right" required />
          </div>
        </div>
        <div className="text-sm">
          <label className="block text-xs text-zinc-500 mb-1">{t('image')}</label>
          <input type="file" accept="image/*" {...register('image')} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs" required />
        </div>
        <button type="submit" className="w-full py-2 bg-orange-600 hover:bg-orange-500 font-semibold rounded-xl text-white text-sm transition-colors flex items-center justify-center gap-2">
          <Plus className="h-4 w-4" />
          {t('add')}
        </button>
      </form>

      {/* Category list */}
      <div className="divide-y divide-white/5 max-h-60 overflow-y-auto pr-1">
        {categories.map((c) => (
          <div key={c._id} className="py-2.5 flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-3">
              {c.image && <img src={c.image} alt={c.name.en} className="h-8 w-8 rounded-lg object-cover border border-white/10" />}
              <span className="font-semibold text-zinc-300">{c.name.en} / {c.name.ar}</span>
            </div>
            <button onClick={() => onDelete(c._id)} className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryManager;
