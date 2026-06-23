'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Order } from '@/types/api.types';
import { Check, ClipboardList, ChefHat, Truck, CheckSquare } from 'lucide-react';

interface TrackingProgressProps {
  status: Order['status'];
}

const STEPS = [
  { key: 'confirmed', icon: ClipboardList, threshold: 1 },
  { key: 'preparing', icon: ChefHat, threshold: 2 },
  { key: 'out_for_delivery', icon: Truck, threshold: 3 },
  { key: 'delivered', icon: CheckSquare, threshold: 4 },
];

const STATUS_MAP: Record<Order['status'], number> = {
  pending_payment: 0,
  confirmed: 1,
  preparing: 2,
  out_for_delivery: 3,
  delivered: 4,
  cancelled: -1,
};

export function TrackingProgress({ status }: TrackingProgressProps) {
  const t = useTranslations('orders.steps');
  const currentStep = STATUS_MAP[status] ?? 0;

  if (status === 'cancelled') {
    return (
      <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-center text-red-500 font-semibold text-sm">
        {t('cancelled_msg')}
      </div>
    );
  }

  // Calculate percentage progress: 0 -> 0%, 1 -> 0%, 2 -> 33%, 3 -> 66%, 4 -> 100%
  const progressPercent = currentStep <= 1 ? 0 : ((currentStep - 1) / 3) * 100;

  return (
    <div className="py-6">
      <div className="relative flex items-center justify-between">
        {/* Background Track */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-zinc-800 rounded-full" />
        
        {/* Animated Active Progress Line */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-orange-600 rounded-full origin-left"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {STEPS.map((step) => {
          const StepIcon = step.icon;
          const isDone = currentStep >= step.threshold;
          const isActive = currentStep === step.threshold;

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isDone ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20' : 'bg-zinc-950 border-zinc-800 text-zinc-500'} ${isActive ? 'ring-4 ring-orange-500/20 scale-110' : ''}`}
              >
                {isDone && currentStep > step.threshold ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <StepIcon className="h-5 w-5" />
                )}
              </div>
              <span className={`mt-2 text-xs font-semibold whitespace-nowrap ${isDone ? 'text-white' : 'text-zinc-500'}`}>
                {t(step.key)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
