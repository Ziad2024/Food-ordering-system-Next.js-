'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addressSchema } from '@/features/checkout/schemas/checkout.schema';
import { CheckoutFormValues } from '@/features/checkout/schemas/checkout.schema';

type AddressValues = CheckoutFormValues['address'];

interface Props {
  defaultValues?: Partial<AddressValues>;
  onNext: (data: AddressValues) => void;
}

export function AddressForm({ defaultValues, onNext }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<AddressValues>({
    resolver: zodResolver(addressSchema),
    defaultValues,
  });

  const field = (label: string, name: keyof AddressValues, required?: boolean) => (
    <div>
      <label className="block text-sm font-medium text-white/70 mb-1">
        {label}{required && <span className="text-red-400 ms-1">*</span>}
      </label>
      <input
        {...register(name)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-500 transition-colors"
        placeholder={label}
      />
      {errors[name] && <p className="text-xs text-red-400 mt-1">{errors[name]?.message}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <h2 className="text-lg font-bold mb-4">Delivery Address</h2>
      {field('Street Address', 'addressLine', true)}
      <div className="grid grid-cols-3 gap-3">
        {field('Building', 'building')}
        {field('Floor', 'floor')}
        {field('Apartment', 'apartment')}
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-colors mt-2"
      >
        Continue to Payment →
      </button>
    </form>
  );
}
