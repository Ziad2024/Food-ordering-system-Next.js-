'use client';

import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { toast } from 'sonner';
import { resetPasswordSchema, ResetPasswordInput } from '../schemas/auth.schema';
import authService from '@/services/auth.service';
import FormField from '@/components/forms/FormField';
import SubmitButton from '@/components/forms/SubmitButton';

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: '',
      password: '',
      confirmPassword: '',
    },
  });

  const tokenParam = searchParams.get('token');

  useEffect(() => {
    if (tokenParam) {
      methods.setValue('token', tokenParam);
    }
  }, [tokenParam, methods]);

  const onSubmit = async (data: ResetPasswordInput) => {
    setIsLoading(true);
    try {
      const res = await authService.resetPassword(data);
      toast.success(res.message || 'Password reset successfully.');
      router.push('/login');
    } catch (err: any) {
      toast.error(err.message || 'Reset failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm">
        {!tokenParam && (
          <FormField
            name="token"
            labelKey="auth.labels.token"
            placeholderKey="auth.placeholders.token"
            disabled={isLoading}
          />
        )}
        <FormField
          name="password"
          labelKey="auth.labels.password"
          placeholderKey="auth.placeholders.password"
          type="password"
          disabled={isLoading}
        />
        <FormField
          name="confirmPassword"
          labelKey="auth.labels.confirmPassword"
          placeholderKey="auth.placeholders.confirmPassword"
          type="password"
          disabled={isLoading}
        />
        <SubmitButton isLoading={isLoading} labelKey="auth.actions.reset_password" />
      </form>
    </FormProvider>
  );
}
