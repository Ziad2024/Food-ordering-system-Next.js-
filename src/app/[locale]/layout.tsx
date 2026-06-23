import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import QueryProvider from "@/providers/QueryProvider";
import SocketProvider from "@/providers/SocketProvider";
import { Navbar } from "@/components/layouts/Navbar";
import { CartDrawerPortal } from "@/components/layouts/CartDrawerPortal";
import { Footer } from "@/components/layouts/Footer";
import { ErrorBoundary } from "@/components/layouts/ErrorBoundary";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 font-sans">
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <SocketProvider>
              <Navbar />
              <CartDrawerPortal />
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
              <Footer />
            </SocketProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
