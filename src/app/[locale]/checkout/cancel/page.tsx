'use client';

import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { XCircle, ArrowLeft } from 'lucide-react';

export default function CheckoutCancelPage() {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center pt-24 pb-16 px-4">
      <div className="max-w-md w-full text-center space-y-8 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-red-500 rounded-full blur opacity-30 animate-pulse"></div>
            <XCircle className="relative h-16 w-16 text-red-500" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight">Payment Cancelled</h1>
          <p className="text-zinc-400 text-sm">
            It looks like your payment transaction was cancelled. Don't worry, your cart is safe and you haven't been charged.
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <button
            onClick={() => router.push(`/${locale}/checkout`)}
            className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 font-semibold text-white transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20"
          >
            <ArrowLeft className="h-5 w-5" />
            Try Checkout Again
          </button>
          <button
            onClick={() => router.push(`/${locale}/products`)}
            className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 font-semibold text-zinc-300 transition-colors duration-200 border border-white/10"
          >
            Go back to Menu
          </button>
        </div>
      </div>
    </main>
  );
}
