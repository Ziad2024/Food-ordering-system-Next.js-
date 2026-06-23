'use client';

import { useCheckout } from '@/features/checkout/hooks/useCheckout';
import { CheckoutStepper } from '@/features/checkout/components/CheckoutStepper';
import { AddressForm } from '@/features/checkout/components/AddressForm';
import { PaymentSelector } from '@/features/checkout/components/PaymentSelector';
import { AnimatePresence, motion } from 'framer-motion';

export default function CheckoutPage() {
  const { step, goTo, formData, saveAddress, savePayment, isLoading } = useCheckout();

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-lg">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <CheckoutStepper current={step} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl bg-white/5 border border-white/10 p-6"
          >
            {step === 'address' && (
              <AddressForm
                defaultValues={formData.address}
                onNext={saveAddress}
              />
            )}
            {step === 'payment' && (
              <PaymentSelector
                onNext={savePayment}
                onBack={() => goTo('address')}
                isLoading={isLoading}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
