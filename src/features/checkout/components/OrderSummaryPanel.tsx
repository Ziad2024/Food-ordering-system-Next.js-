'use client';

import { MapPin, CreditCard, Banknote, Loader2 } from 'lucide-react';
import { useCartStore } from '@/features/cart/store/cart.store';
import { CheckoutFormValues } from '@/features/checkout/schemas/checkout.schema';

interface Props {
  formData: Partial<CheckoutFormValues>;
  onBack: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export function OrderSummaryPanel({ formData, onBack, onConfirm, isLoading }: Props) {
  const { items, totalPrice } = useCartStore();
  const total = totalPrice();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Order Summary</h2>

      {/* Items */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3 max-h-48 overflow-y-auto">
        {items.map((item) => (
          <div key={item.product._id} className="flex justify-between text-sm">
            <span className="text-white/80">{item.product.name.en} × {item.quantity}</span>
            <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
          <span>Total</span>
          <span className="text-amber-400">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Address */}
      {formData.address && (
        <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 text-sm">
          <MapPin size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">{formData.address.addressLine}</p>
            <p className="text-white/50">
              {[formData.address.building, formData.address.floor, formData.address.apartment]
                .filter(Boolean).join(', ')}
            </p>
          </div>
        </div>
      )}

      {/* Payment */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 text-sm">
        {formData.paymentMethod === 'card'
          ? <CreditCard size={16} className="text-amber-400" />
          : <Banknote size={16} className="text-amber-400" />
        }
        <span className="font-medium capitalize">
          {formData.paymentMethod === 'card' ? 'Pay with Card (Stripe)' : 'Cash on Delivery'}
        </span>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="flex-1 py-3 border border-white/20 hover:bg-white/5 rounded-xl text-sm transition-colors">
          ← Back
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 size={16} className="animate-spin" />}
          {isLoading ? 'Placing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}
