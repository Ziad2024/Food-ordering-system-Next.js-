'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { forgotPasswordSchema, ForgotPasswordInput } from '../schemas/auth.schema';
import authService from '@/services/auth.service';
import FormField from '@/components/forms/FormField';
import SubmitButton from '@/components/forms/SubmitButton';

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    try {
      const res = await authService.forgotPassword(data);
      toast.success(res.message || 'If an account exists, a reset link was sent.');
    } catch (err: any) {
      toast.error(err.message || 'Request failed');
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
        <SubmitButton isLoading={isLoading} labelKey="auth.actions.forgot_password" />
      </form>
    </FormProvider>
  );
}
