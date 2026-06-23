'use client';

import { CheckoutStep } from '@/features/checkout/hooks/useCheckout';
import { useTranslations } from 'next-intl';

interface Props {
  current: CheckoutStep;
}

export function CheckoutStepper({ current }: Props) {
  const t = useTranslations('checkout');
  const STEPS_LIST: CheckoutStep[] = ['address', 'payment'];
  const currentIdx = STEPS_LIST.indexOf(current);
  const LABELS: Record<CheckoutStep, string> = {
    address: t('step_address'),
    payment: t('step_payment'),
  };

  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS_LIST.map((step, idx) => {
        const isDone = idx < currentIdx;
        const isActive = idx === currentIdx;
        return (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  isDone
                    ? 'bg-green-500 text-white'
                    : isActive
                    ? 'bg-amber-500 text-black'
                    : 'bg-white/10 text-white/40'
                }`}
              >
                {isDone ? '✓' : idx + 1}
              </div>
              <span
                className={`text-xs mt-1 font-medium ${
                  isActive ? 'text-amber-400' : isDone ? 'text-green-400' : 'text-white/40'
                }`}
              >
                {LABELS[step]}
              </span>
            </div>
            {idx < STEPS_LIST.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mt-[-12px] transition-colors ${
                  isDone ? 'bg-green-500' : 'bg-white/10'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
