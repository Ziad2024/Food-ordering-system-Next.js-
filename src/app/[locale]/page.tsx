import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Simple composable view matching rule of pages being thin shells
  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("Navbar");
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
        {t("home")}
      </h1>
      <p className="mt-4 text-lg text-stone-600 max-w-md">
        Welcome to our single restaurant ordering platform! Start exploring tasty meals.
      </p>
    </main>
  );
}
