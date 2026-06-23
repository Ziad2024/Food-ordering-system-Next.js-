import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import ResetPasswordForm from '@/features/auth/components/ResetPasswordForm';
import AuthLayout from '@/components/layouts/AuthLayout';
import { Suspense } from 'react';

interface ResetPasswordPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ResetPasswordPageContent />;
}

function ResetPasswordPageContent() {
  const t = useTranslations('auth');

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-stone-900">{t('title.reset_password')}</h1>
      </div>
      <Suspense fallback={<p className="text-stone-500">Loading form...</p>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
