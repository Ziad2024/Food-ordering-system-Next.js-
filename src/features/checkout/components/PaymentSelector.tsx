'use client';

import { CreditCard, Banknote } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onNext: (method: 'card' | 'cash') => void;
  onBack: () => void;
  isLoading?: boolean;
}

const OPTIONS = [
  {
    value: 'cash' as const,
    icon: <Banknote size={24} />,
    label: 'Cash on Delivery',
    description: 'Pay when your order arrives',
  },
  {
    value: 'card' as const,
    icon: <CreditCard size={24} />,
    label: 'Pay with Card',
    description: 'Secure checkout via Stripe',
  },
];

export function PaymentSelector({ onNext, onBack, isLoading }: Props) {
  const [selected, setSelected] = useState<'card' | 'cash'>('cash');

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold mb-4">Payment Method</h2>
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          disabled={isLoading}
          onClick={() => setSelected(opt.value)}
          className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-start ${
            selected === opt.value
              ? 'border-amber-500 bg-amber-500/10'
              : 'border-white/10 bg-white/5 hover:border-white/20'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className={`p-3 rounded-xl ${selected === opt.value ? 'bg-amber-500 text-black' : 'bg-white/10 text-white'}`}>
            {opt.icon}
          </div>
          <div>
            <p className="font-semibold">{opt.label}</p>
            <p className="text-xs text-white/50">{opt.description}</p>
          </div>
          <div className={`ms-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            selected === opt.value ? 'border-amber-500' : 'border-white/30'
          }`}>
            {selected === opt.value && <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
          </div>
        </button>
      ))}
      <div className="flex gap-3 mt-2">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 py-3 border border-white/20 hover:bg-white/5 rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Back
        </button>
        <button
          onClick={() => onNext(selected)}
          disabled={isLoading}
          className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Placing Order...
            </>
          ) : (
            'Place Order →'
          )}
        </button>
      </div>
    </div>
  );
}
