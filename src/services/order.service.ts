import { axiosClient } from './axiosClient';
import { ApiResponse, Order, Address, PaginatedResponse } from '@/types/api.types';

export interface CheckoutPayload {
  paymentMethod: 'card' | 'cash';
  address: Address;
}

export interface CheckoutResult {
  order: Order;
  stripeUrl?: string;
}

export const orderService = {
  async checkout(payload: CheckoutPayload): Promise<ApiResponse<CheckoutResult>> {
    const res = await axiosClient.post<ApiResponse<CheckoutResult>>('/orders/checkout', payload);
    return res.data;
  },

  async getMyOrders(): Promise<ApiResponse<Order[]>> {
    const res = await axiosClient.get<ApiResponse<Order[]>>('/orders');
    return res.data;
  },

  async getOrderById(id: string): Promise<ApiResponse<Order>> {
    const res = await axiosClient.get<ApiResponse<Order>>(`/orders/${id}`);
    return res.data;
  },

  // Admin
  async getAdminOrders(params?: {
    status?: string;
    paymentStatus?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Order>> {
    const res = await axiosClient.get<PaginatedResponse<Order>>('/orders/admin', { params });
    return res.data;
  },

  async updateOrderStatus(id: string, status: string, description?: string): Promise<ApiResponse<Order>> {
    const res = await axiosClient.patch<ApiResponse<Order>>(`/orders/${id}/status`, { status, description });
    return res.data;
  },
};

export default orderService;
