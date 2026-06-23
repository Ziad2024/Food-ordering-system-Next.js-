import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import LoginForm from '@/features/auth/components/LoginForm';
import AuthLayout from '@/components/layouts/AuthLayout';
import { Link } from '@/i18n/routing';

interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LoginPageContent />;
}

function LoginPageContent() {
  const t = useTranslations('auth');

  return (
    <AuthLayout>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-stone-900">{t('title.login')}</h1>
      </div>
      <LoginForm />
      <div className="mt-6 text-center">
        <Link
          href="/register"
          className="text-xs font-semibold text-stone-600 hover:text-stone-800 transition-colors"
        >
          {t('links.need_account')}
        </Link>
      </div>
    </AuthLayout>
  );
}
