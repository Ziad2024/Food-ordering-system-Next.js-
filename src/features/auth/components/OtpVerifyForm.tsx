'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { toast } from 'sonner';
import { verifyOtpSchema, VerifyOtpInput } from '../schemas/auth.schema';
import authService from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import OtpInput from './OtpInput';
import OtpCountdown from './OtpCountdown';
import SubmitButton from '@/components/forms/SubmitButton';

function OtpVerifyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(60);
  const setAuth = useAuthStore((state) => state.setAuth);

  const emailParam = searchParams.get('email') || '';

  const methods = useForm<VerifyOtpInput>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: emailParam,
      otp: '',
      deviceIdentifier: 'web-browser',
    },
  });

  useEffect(() => {
    if (emailParam) {
      methods.setValue('email', emailParam);
    }
  }, [emailParam, methods]);

  const onSubmit = async (data: VerifyOtpInput) => {
    setIsLoading(true);
    try {
      const res = await authService.verifyOtp(data);
      toast.success(res.message || 'Verification successful.');
      setAuth(res.data.user, res.data.accessToken);

      if (res.data.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      toast.error(err.message || 'OTP Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await authService.login({ email: emailParam, password: '' }); // Trigger OTP resend
      toast.success('New code sent to your email.');
      setCooldown(60); // Reset timer cooldown
    } catch (err: any) {
      // Use fallback if password is empty but email is registered
      if (err.message && err.message.includes('password')) {
        toast.info('Please re-login to request a code.');
      } else {
        toast.error(err.message || 'Failed to resend code');
      }
    }
  };

  const maskEmail = (email: string) => {
    if (!email) return '';
    const [local, domain] = email.split('@');
    if (local.length <= 2) {
      return `${local[0]}***@${domain}`;
    }
    return `${local[0]}***${local[local.length - 1]}@${domain}`;
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-sm flex flex-col items-center">
        {emailParam && (
          <p className="text-sm text-stone-600 text-center">
            Code sent to <span className="font-semibold">{maskEmail(emailParam)}</span>
          </p>
        )}
        <OtpInput name="otp" />
        <OtpCountdown cooldownSeconds={cooldown} onResend={handleResend} />
        <SubmitButton isLoading={isLoading} labelKey="auth.actions.verify_otp" />
      </form>
    </FormProvider>
  );
}

export default function OtpVerifyFormWrapper() {
  return (
    <Suspense fallback={<p className="text-stone-500">Loading verification screen...</p>}>
      <OtpVerifyForm />
    </Suspense>
  );
}
