'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

function SuccessContent() {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (!orderId) {
      toast.error('No order ID found');
      router.push(`/${locale}/products`);
      return;
    }
    toast.success('Payment verified successfully!');
  }, [orderId, locale, router]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center pt-24 pb-16 px-4">
      <div className="max-w-md w-full text-center space-y-8 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-green-500 rounded-full blur opacity-30 animate-pulse"></div>
            <CheckCircle2 className="relative h-16 w-16 text-green-500" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight">Payment Successful!</h1>
          <p className="text-zinc-400 text-sm">
            Thank you for your purchase. Your order has been placed and is now being processed.
          </p>
        </div>

        {orderId && (
          <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-sm text-left space-y-1">
            <span className="text-zinc-500 block text-xs uppercase tracking-wider font-semibold">Order ID</span>
            <span className="font-mono text-zinc-300 break-all">{orderId}</span>
          </div>
        )}

        <div className="pt-4 flex flex-col gap-3">
          <button
            onClick={() => router.push(`/${locale}/orders/${orderId}`)}
            className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 font-semibold text-white transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20"
          >
            <ShoppingBag className="h-5 w-5" />
            Track Your Order
          </button>
          <button
            onClick={() => router.push(`/${locale}/products`)}
            className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 font-semibold text-zinc-300 transition-colors duration-200 border border-white/10"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950" />}>
      <SuccessContent />
    </Suspense>
  );
}
