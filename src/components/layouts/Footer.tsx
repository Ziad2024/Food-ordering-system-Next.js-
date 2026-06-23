'use client';

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Navbar'); // Reusing existing translation or fallback
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-white/5 py-8 text-zinc-500 text-xs mt-auto">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-semibold text-zinc-300">Resto</span> © {currentYear}. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">{t('home')}</a>
          <a href="#" className="hover:text-white transition-colors">{t('products')}</a>
          <a href="#" className="hover:text-white transition-colors">{t('cart')}</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
