import { setRequestLocale } from 'next-intl/server';
import HomeClient from '@/components/layouts/HomeClient';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeClient />;
}
