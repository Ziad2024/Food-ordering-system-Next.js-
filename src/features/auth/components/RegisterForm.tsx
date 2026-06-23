'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@/i18n/routing';
import { toast } from 'sonner';
import { registerSchema, RegisterInput } from '../schemas/auth.schema';
import authService from '@/services/auth.service';
import FormField from '@/components/forms/FormField';
import SubmitButton from '@/components/forms/SubmitButton';

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      const res = await authService.register(data);
      toast.success(res.message || 'OTP Sent successfully.');
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (err: any) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm">
        <FormField
          name="name"
          labelKey="auth.labels.name"
          placeholderKey="auth.placeholders.name"
          disabled={isLoading}
        />
        <FormField
          name="email"
          labelKey="auth.labels.email"
          placeholderKey="auth.placeholders.email"
          type="email"
          disabled={isLoading}
        />
        <FormField
          name="phone"
          labelKey="auth.labels.phone"
          placeholderKey="auth.placeholders.phone"
          type="tel"
          disabled={isLoading}
        />
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
        <SubmitButton isLoading={isLoading} labelKey="auth.actions.register" />
      </form>
    </FormProvider>
  );
}
