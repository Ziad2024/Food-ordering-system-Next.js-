'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const nt = useTranslations('Navbar');
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
              { Icon: InstagramIcon, label: 'Instagram' },
              { Icon: TwitterIcon, label: 'Twitter' },
              { Icon: FacebookIcon, label: 'Facebook' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-black flex items-center justify-center transition-all duration-200"
              >
                <Icon />
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
