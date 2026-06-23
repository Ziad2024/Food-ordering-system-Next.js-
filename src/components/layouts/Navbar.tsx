'use client';

import { ShoppingCart, Menu, X, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCartStore } from '@/features/cart/store/cart.store';
import { useAuthStore } from '@/store/auth.store';

interface NavbarProps {
  locale: string;
}

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const { openDrawer, itemCount } = useCartStore();
  const count = itemCount();

  const otherLocale = locale === 'en' ? 'ar' : 'en';
  // Swap locale in current path
  const altPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/products`, label: t('products') },
  ];

  if (isAuthenticated) {
    navLinks.push({ href: `/${locale}/orders`, label: t('orders') });
  }

  if (isAuthenticated && user?.role === 'admin') {
    navLinks.push({ href: `/${locale}/admin/dashboard`, label: t('admin') });
  }

  return (
    <header className="fixed top-0 inset-x-0 z-30 bg-zinc-900/80 backdrop-blur-md border-b border-white/10">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 group">
          <span className="text-2xl">🍽️</span>
          <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors">
            Flavor<span className="text-amber-400">Rush</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-colors hover:text-amber-400 ${
                  pathname === link.href ? 'text-amber-400' : 'text-white/70'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Locale switcher */}
          <Link
            href={altPath}
            aria-label="Switch language"
            className="flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors"
          >
            <Globe size={14} />
            {otherLocale === 'ar' ? 'عربي' : 'EN'}
          </Link>

          {/* Cart button */}
          <button
            aria-label={t('cart')}
            onClick={openDrawer}
            className="relative w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ShoppingCart size={16} />
            {count > 0 && (
              <span className="absolute -top-1 -end-1 w-4 h-4 bg-amber-500 text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </button>

          {/* Auth */}
          {isAuthenticated ? (
            <button
              onClick={clearAuth}
              className="hidden md:block text-sm text-white/60 hover:text-white transition-colors"
            >
              {t('logout')}
            </button>
          ) : (
            <Link
              href={`/${locale}/login`}
              className="hidden md:block px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold rounded-lg transition-colors"
            >
              {t('login')}
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/10"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-white/10 px-4 pb-4">
          <ul className="space-y-3 pt-3 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-white/70 hover:text-amber-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {isAuthenticated ? (
              <li>
                <button
                  onClick={() => { clearAuth(); setMobileOpen(false); }}
                  className="block py-2 text-white/60 hover:text-white"
                >
                  {t('logout')}
                </button>
              </li>
            ) : (
              <li>
                <Link href={`/${locale}/login`} onClick={() => setMobileOpen(false)}
                  className="block py-2 text-amber-400 font-semibold"
                >
                  {t('login')}
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
