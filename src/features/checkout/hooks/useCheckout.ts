'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { useCartStore } from '@/features/cart/store/cart.store';
import orderService from '@/services/order.service';
import { CheckoutFormValues } from '@/features/checkout/schemas/checkout.schema';

export type CheckoutStep = 'address' | 'payment' | 'confirm';

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

  const savePayment = (paymentMethod: 'card' | 'cash') => {
    setFormData((prev) => ({ ...prev, paymentMethod }));
    setStep('confirm');
  };

  const submitOrder = async () => {
    if (!formData.address || !formData.paymentMethod) return;
    setIsLoading(true);
    try {
      const res = await orderService.checkout({
        address: formData.address,
        paymentMethod: formData.paymentMethod,
      });
      clearItems();
      const { order, stripeUrl } = res.data;

      if (formData.paymentMethod === 'card' && stripeUrl) {
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

  return { step, goTo, formData, saveAddress, savePayment, submitOrder, isLoading };
}
