'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth.store';
import { useCartStore } from '@/features/cart/store/cart.store';
import cartService from '@/services/cart.service';
import { Product } from '@/types/api.types';

export function useCart() {
  const { isAuthenticated } = useAuthStore();
  const { items, setItems, optimisticAdd, optimisticUpdate, optimisticRemove, clearItems } =
    useCartStore();

  // Sync cart from server when user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      clearItems();
      return;
    }
    cartService.getCart()
      .then((res) => setItems(res.data?.items || []))
      .catch(() => {}); // Silently fail — cart may be empty
  }, [isAuthenticated]);

  const addItem = async (product: Product, quantity: number = 1) => {
    optimisticAdd({ product, quantity });
    try {
      const res = await cartService.addItem({ productId: product._id, quantity });
      setItems(res.data?.items || []);
      toast.success(`Added to cart`);
    } catch (err: any) {
      // Revert optimistic update
      optimisticRemove(product._id);
      toast.error(err.message || 'Failed to add item');
    }
  };

  const updateItem = async (productId: string, quantity: number) => {
    const prev = items.find((i) => i.product._id === productId)?.quantity;
    optimisticUpdate(productId, quantity);
    try {
      const res = await cartService.updateItem(productId, { quantity });
      setItems(res.data?.items || []);
    } catch (err: any) {
      if (prev !== undefined) optimisticUpdate(productId, prev);
      toast.error(err.message || 'Failed to update item');
    }
  };

  const removeItem = async (productId: string) => {
    const snapshot = [...items];
    optimisticRemove(productId);
    try {
      const res = await cartService.removeItem(productId);
      setItems(res.data?.items || []);
      toast.success('Item removed from cart');
    } catch (err: any) {
      setItems(snapshot);
      toast.error(err.message || 'Failed to remove item');
    }
  };

  const clearCart = async () => {
    const snapshot = [...items];
    clearItems();
    try {
      await cartService.clearCart();
      toast.success('Cart cleared');
    } catch (err: any) {
      setItems(snapshot);
      toast.error(err.message || 'Failed to clear cart');
    }
  };

  return { items, addItem, updateItem, removeItem, clearCart };
}
