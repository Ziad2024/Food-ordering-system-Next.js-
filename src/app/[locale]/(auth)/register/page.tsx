import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import RegisterForm from '@/features/auth/components/RegisterForm';
import AuthLayout from '@/components/layouts/AuthLayout';
import { Link } from '@/i18n/routing';

interface RegisterPageProps {
  params: Promise<{ locale: string }>;
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RegisterPageContent />;
}

function RegisterPageContent() {
  const t = useTranslations('auth');

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-stone-900">{t('title.register')}</h1>
      </div>
      <RegisterForm />
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
