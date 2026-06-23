'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { toast } from 'sonner';
import { loginSchema, LoginInput } from '../schemas/auth.schema';
import authService from '@/services/auth.service';
import FormField from '@/components/forms/FormField';
import SubmitButton from '@/components/forms/SubmitButton';
import { useAuthStore } from '@/store/auth.store';

export default function LoginForm() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const setAuth = useAuthStore((state) => state.setAuth);

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      const res = await authService.login(data);
      if (res.data) {
        setAuth(res.data.user, res.data.accessToken);
        toast.success(res.message || 'Logged in successfully.');
        router.push('/');
      }
    } catch (err: any) {
      toast.error(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm">
        <FormField
          name="email"
          labelKey="auth.labels.email"
          placeholderKey="auth.placeholders.email"
          type="email"
          disabled={isLoading}
        />
        <FormField
          name="password"
          labelKey="auth.labels.password"
          placeholderKey="auth.placeholders.password"
          type="password"
          disabled={isLoading}
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.push('/forgot-password')}
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
          >
            {t('links.forgot_password')}
          </button>
        </div>
        <SubmitButton isLoading={isLoading} labelKey="auth.actions.login" />
      </form>
    </FormProvider>
  );
}
