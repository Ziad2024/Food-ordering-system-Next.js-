'use client';

import { useCartStore } from '@/features/cart/store/cart.store';
import { CartItem } from '@/types/api.types';

interface Props {
  children: (bag: { items: CartItem[] }) => React.ReactNode;
}

export function CartStoreProvider({ children }: Props) {
  const items = useCartStore((s) => s.items);
  return <>{children({ items })}</>;
}
