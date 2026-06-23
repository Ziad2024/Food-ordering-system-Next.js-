import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import ForgotPasswordForm from '@/features/auth/components/ForgotPasswordForm';
import AuthLayout from '@/components/layouts/AuthLayout';
import { Link } from '@/i18n/routing';

interface ForgotPasswordPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ForgotPasswordPage({ params }: ForgotPasswordPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ForgotPasswordPageContent />;
}

function ForgotPasswordPageContent() {
  const t = useTranslations('auth');

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-stone-900">{t('title.forgot_password')}</h1>
      </div>
      <ForgotPasswordForm />
      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-xs font-semibold text-stone-600 hover:text-stone-800 transition-colors"
        >
          {t('links.have_account')}
        </Link>
      </div>
    </AuthLayout>
  );
}
