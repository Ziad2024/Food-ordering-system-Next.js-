'use client';

import { useEffect, useState } from 'react';
import { useOrderDetail } from './useOrders';
import { Order } from '@/types/api.types';
import { useSocket } from '@/providers/SocketProvider';
import { toast } from 'sonner';

export function useOrderTracking(orderId: string) {
  const query = useOrderDetail(orderId);
  const [liveOrder, setLiveOrder] = useState<Order | null>(null);
  const { socket } = useSocket();

  // Seed liveOrder once the query resolves
  useEffect(() => {
    if (query.data) setLiveOrder(query.data as unknown as Order);
  }, [query.data]);

  // Subscribe to real-time status updates
  useEffect(() => {
    if (!orderId || !socket) return;
    const handler = (payload: { orderId: string; status: string; paymentStatus?: string; timeline: Order['timeline'] }) => {
      if (payload.orderId !== orderId) return;
      setLiveOrder((prev) =>
        prev ? {
          ...prev,
          status: payload.status as Order['status'],
          ...(payload.paymentStatus ? { paymentStatus: payload.paymentStatus as Order['paymentStatus'] } : {}),
          timeline: payload.timeline
        } : prev
      );
      toast.info(`Order status updated: ${payload.status.replace(/_/g, ' ')}`);
    };
    socket.on('order_status_updated', handler);
    return () => {
      socket.off('order_status_updated', handler);
    };
  }, [orderId, socket]);

  return {
    order: liveOrder,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
