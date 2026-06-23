'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import orderService from '@/services/order.service';
import { toast } from 'sonner';

interface OrderFilterParams {
  status?: string;
  paymentStatus?: string;
  page?: number;
  limit?: number;
}

export function useAdminOrders(filters: OrderFilterParams = {}) {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ['admin', 'orders', filters],
    queryFn: async () => {
      const res = await orderService.getAdminOrders(filters);
      return res; // returns { data: Order[], pagination: ... }
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status, description }: { id: string; status: string; description?: string }) =>
      orderService.updateOrderStatus(id, status, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order status updated successfully');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update order status');
    },
  });

  return {
    orders: ordersQuery.data?.data || [],
    pagination: ordersQuery.data?.pagination,
    isLoading: ordersQuery.isLoading,
    isError: ordersQuery.isError,
    refetch: ordersQuery.refetch,
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
  };
}
