'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { useCartStore } from '@/features/cart/store/cart.store';
import orderService from '@/services/order.service';
import { CheckoutFormValues } from '@/features/checkout/schemas/checkout.schema';

export type CheckoutStep = 'address' | 'payment';

export function useCheckout() {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const { clearItems } = useCartStore();

  const [step, setStep] = useState<CheckoutStep>('address');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<CheckoutFormValues>>({});

  const goTo = (s: CheckoutStep) => setStep(s);

  const saveAddress = (address: CheckoutFormValues['address']) => {
    setFormData((prev) => ({ ...prev, address }));
    setStep('payment');
  };

  const savePayment = async (paymentMethod: 'card' | 'cash') => {
    if (!formData.address) return;
    setFormData((prev) => ({ ...prev, paymentMethod }));
    setIsLoading(true);
    try {
      const res = await orderService.checkout({
        address: formData.address,
        paymentMethod,
      });
      clearItems();
      const { order, stripeUrl } = res.data;

      if (paymentMethod === 'card' && stripeUrl) {
        // Redirect to Stripe
        window.location.href = stripeUrl;
      } else {
        toast.success('Order placed successfully!');
        router.push(`/${locale}/orders/${order._id}`);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  return { step, goTo, formData, saveAddress, savePayment, isLoading };
}
