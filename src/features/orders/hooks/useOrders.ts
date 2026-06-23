'use client';

import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import orderService from '@/services/order.service';
import { useSocket } from '@/providers/SocketProvider';

export function useOrders() {
  const queryClient = useQueryClient();
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleOrderStatusUpdated = () => {
      queryClient.invalidateQueries({ queryKey: ['orders', 'my'] });
    };

    socket.on('order_status_updated', handleOrderStatusUpdated);

    return () => {
      socket.off('order_status_updated', handleOrderStatusUpdated);
    };
  }, [socket, queryClient]);

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
