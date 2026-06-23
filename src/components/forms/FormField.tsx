'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
  name: string;
  labelKey: string;
  type?: string;
  placeholderKey?: string;
  disabled?: boolean;
}

export default function FormField({
  name,
  labelKey,
  type = 'text',
  placeholderKey,
  disabled = false,
}: FormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const t = useTranslations();
  const errorMsg = errors[name]?.message as string | undefined;

  // Retrieve translation for dynamic localized validation error messages
  const resolvedError = errorMsg ? t(errorMsg) : undefined;

  return (
    <div className="space-y-2 flex flex-col items-start w-full">
      <Label htmlFor={name} className="text-sm font-medium text-stone-700">
        {t(labelKey)}
      </Label>
      <Input
        id={name}
        type={type}
        disabled={disabled}
        placeholder={placeholderKey ? t(placeholderKey) : undefined}
        {...register(name)}
        className={`w-full ${resolvedError ? 'border-red-500 focus-visible:ring-red-500' : 'border-stone-200'}`}
      />
      {resolvedError && (
        <span className="text-xs text-red-500 mt-1 font-medium">{resolvedError}</span>
      )}
    </div>
  );
}
