import { create } from 'zustand';
import { CartItem } from '@/types/api.types';

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;

  // Server-sync setter — called after fetching cart from backend
  setItems: (items: CartItem[]) => void;

  // Optimistic mutations — instant UI, server call happens in useCart hook
  optimisticAdd: (item: CartItem) => void;
  optimisticUpdate: (productId: string, quantity: number) => void;
  optimisticRemove: (productId: string) => void;
  clearItems: () => void;

  // Drawer controls
  openDrawer: () => void;
  closeDrawer: () => void;

  // Derived helpers
  itemCount: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],
  isDrawerOpen: false,

  setItems: (items) => set({ items }),

  optimisticAdd: (newItem) =>
    set((state) => {
      const exists = state.items.find(
        (i) => i.product._id === newItem.product._id
      );
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.product._id === newItem.product._id
              ? { ...i, quantity: i.quantity + newItem.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, newItem] };
    }),

  optimisticUpdate: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.product._id === productId ? { ...i, quantity } : i
      ),
    })),

  optimisticRemove: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.product._id !== productId),
    })),

  clearItems: () => set({ items: [] }),

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),

  itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: () =>
    get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
}));
