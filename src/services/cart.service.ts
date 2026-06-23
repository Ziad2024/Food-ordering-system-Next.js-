import { axiosClient } from './axiosClient';
import { ApiResponse, Cart } from '@/types/api.types';

export interface AddItemPayload {
  productId: string;
  quantity: number;
}

export interface UpdateItemPayload {
  quantity: number;
}

export const cartService = {
  async getCart(): Promise<ApiResponse<Cart>> {
    const res = await axiosClient.get<ApiResponse<Cart>>('/cart');
    return res.data;
  },

  async addItem(payload: AddItemPayload): Promise<ApiResponse<Cart>> {
    const res = await axiosClient.post<ApiResponse<Cart>>('/cart/items', payload);
    return res.data;
  },

  async updateItem(productId: string, payload: UpdateItemPayload): Promise<ApiResponse<Cart>> {
    const res = await axiosClient.put<ApiResponse<Cart>>(`/cart/items/${productId}`, payload);
    return res.data;
  },

  async removeItem(productId: string): Promise<ApiResponse<Cart>> {
    const res = await axiosClient.delete<ApiResponse<Cart>>(`/cart/items/${productId}`);
    return res.data;
  },

  async clearCart(): Promise<ApiResponse<null>> {
    const res = await axiosClient.delete<ApiResponse<null>>('/cart');
    return res.data;
  },
};

export default cartService;
