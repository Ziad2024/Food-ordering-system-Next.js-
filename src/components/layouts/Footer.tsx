'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const nt = useTranslations('Navbar');
  const { locale } = useParams<{ locale: string }>();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-white/5 text-zinc-400">
      {/* Main footer body */}
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="lg:col-span-2 space-y-4">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2">
            <span className="text-3xl">🍽️</span>
            <span className="text-xl font-extrabold text-white">
              Flavor<span className="text-amber-400">Rush</span>
            </span>
          </Link>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
            {t('tagline')}
          </p>
          {/* Socials */}
          <div className="flex gap-3 pt-2">
            {[
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Twitter, label: 'Twitter' },
              { Icon: Facebook, label: 'Facebook' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-black flex items-center justify-center transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-white text-sm font-bold uppercase tracking-widest">
            {t('links_title')}
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { label: nt('home'), href: `/${locale}` },
              { label: nt('products'), href: `/${locale}/products` },
              { label: nt('orders'), href: `/${locale}/orders` },
              { label: nt('login'), href: `/${locale}/login` },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-amber-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-white text-sm font-bold uppercase tracking-widest">
            {locale === 'ar' ? 'تواصل معنا' : 'Contact'}
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="shrink-0 mt-0.5 text-amber-400" />
              <span>{locale === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt'}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="shrink-0 text-amber-400" />
              <span>+20 100 000 0000</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="shrink-0 text-amber-400" />
              <span>hello@flavorrush.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-5">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-600">
          <span>
            © {year} <span className="text-zinc-400 font-semibold">FlavorRush</span>. {t('copyright')}
          </span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-300 transition-colors">
              {locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              {locale === 'ar' ? 'الشروط والأحكام' : 'Terms of Service'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
