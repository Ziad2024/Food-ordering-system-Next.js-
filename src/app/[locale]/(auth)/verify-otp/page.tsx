import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import OtpVerifyForm from '@/features/auth/components/OtpVerifyForm';
import AuthLayout from '@/components/layouts/AuthLayout';

interface VerifyOtpPageProps {
  params: Promise<{ locale: string }>;
}

export default async function VerifyOtpPage({ params }: VerifyOtpPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <VerifyOtpPageContent />;
}

function VerifyOtpPageContent() {
  const t = useTranslations('auth');

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-stone-900">{t('title.verify_otp')}</h1>
      </div>
      <OtpVerifyForm />
    </AuthLayout>
  );
}
