'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface SubmitButtonProps {
  isLoading: boolean;
  disabled?: boolean;
  labelKey: string;
  loadingLabelKey?: string;
  className?: string;
}

export default function SubmitButton({
  isLoading,
  disabled = false,
  labelKey,
  loadingLabelKey = 'Common.loading',
  className = '',
}: SubmitButtonProps) {
  const t = useTranslations();

  return (
    <Button
      type="submit"
      disabled={isLoading || disabled}
      className={`w-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition-all duration-200 ${className}`}
    >
      {isLoading ? t(loadingLabelKey) : t(labelKey)}
    </Button>
  );
}
