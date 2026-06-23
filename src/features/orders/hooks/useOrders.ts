'use client';

import { useQuery } from '@tanstack/react-query';
import orderService from '@/services/order.service';

export function useOrders() {
  return useQuery({
    queryKey: ['orders', 'my'],
    queryFn: async () => {
      const res = await orderService.getMyOrders();
      return res.data;
    },
    staleTime: 30_000,
  });
}

export function useOrderDetail(id: string) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const res = await orderService.getOrderById(id);
      return res.data;
    },
    enabled: !!id,
    staleTime: 20_000,
  });
}
