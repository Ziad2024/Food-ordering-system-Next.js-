'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Zap, Leaf, CreditCard, Star } from 'lucide-react';

const FOOD_IMAGES = [
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
  'https://images.unsplash.com/photo-1604068549290-dea0e4a30536?w=400&q=80',
  'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80',
  'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80',
  'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80',
  'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80',
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export default function HomeClient() {
  const t = useTranslations('home');
  const nt = useTranslations('Navbar');
  const { locale } = useParams<{ locale: string }>();
  const isAr = locale === 'ar';

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-900 min-h-screen flex items-center">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="text-white space-y-6 order-2 lg:order-1"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
                <Star size={12} fill="currentColor" />
                {isAr ? 'المطعم الأول في مصر 🇪🇬' : 'Egypt\'s #1 Food Ordering Platform 🇪🇬'}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
            >
              <span className="text-white">{t('hero_title').split(' ').slice(0, -1).join(' ')} </span>
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                {t('hero_title').split(' ').slice(-1)}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-zinc-400 text-lg max-w-md leading-relaxed"
            >
              {t('hero_subtitle')}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-amber-500/30"
              >
                {t('cta_menu')}
                <ChevronRight size={18} />
              </Link>
              <Link
                href={`/${locale}/register`}
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-3.5 rounded-xl transition-all duration-200 hover:bg-white/5"
              >
                {t('cta_order')}
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              variants={fadeUp}
              className="flex gap-8 pt-4 border-t border-white/10"
            >
              {[
                { val: '50+', label: isAr ? 'وجبة شهية' : 'Menu Items' },
                { val: '30', label: isAr ? 'دقيقة توصيل' : 'Min Delivery' },
                { val: '4.9★', label: isAr ? 'تقييم العملاء' : 'Customer Rating' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-amber-400">{s.val}</div>
                  <div className="text-xs text-zinc-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Food photo grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="grid grid-cols-3 gap-3">
              {FOOD_IMAGES.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                  className={`relative overflow-hidden rounded-2xl shadow-xl ${
                    i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
                  }`}
                >
                  <Image
                    src={src}
                    alt="food"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>
              ))}
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute -bottom-4 -start-4 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl">🚀</div>
              <div>
                <div className="font-bold text-zinc-900 text-sm">{isAr ? 'توصيل سريع' : 'Fast Delivery'}</div>
                <div className="text-xs text-zinc-500">{isAr ? 'أقل من ٣٠ دقيقة' : 'Under 30 minutes'}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs tracking-widest uppercase">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            className="w-0.5 h-6 bg-white/20 rounded-full"
          />
        </motion.div>
      </section>

      {/* ── WHY US ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-zinc-900">{t('why_title')}</h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: <Zap className="h-7 w-7" />, color: 'bg-amber-100 text-amber-600', title: t('feature_fast'), desc: t('feature_fast_desc') },
              { icon: <Leaf className="h-7 w-7" />, color: 'bg-green-100 text-green-600', title: t('feature_fresh'), desc: t('feature_fresh_desc') },
              { icon: <CreditCard className="h-7 w-7" />, color: 'bg-blue-100 text-blue-600', title: t('feature_pay'), desc: t('feature_pay_desc') },
            ].map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="group bg-stone-50 hover:bg-white rounded-2xl p-8 text-center border border-stone-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-extrabold text-zinc-900 mb-2">{f.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-600">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-6 text-center"
        >
          <h2 className="text-4xl font-black text-white mb-4">
            {isAr ? 'جائع؟ لا تنتظر!' : 'Hungry? Don\'t wait!'}
          </h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            {isAr ? 'اطلب الآن واستمتع بأشهى الوجبات في أسرع وقت.' : 'Order now and enjoy the tastiest meals delivered to you.'}
          </p>
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-10 py-4 rounded-2xl hover:bg-orange-50 transition-colors shadow-xl"
          >
            {nt('products')}
            <ChevronRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
