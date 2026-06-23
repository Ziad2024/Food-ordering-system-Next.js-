import { axiosClient } from './axiosClient';
import { ApiResponse, PaginatedResponse, Category, Product } from '@/types/api.types';

export interface ProductFilterParams {
  category?: string;
  page?: number;
  limit?: number;
}

export const productService = {
  async getCategories(): Promise<ApiResponse<Category[]>> {
    const res = await axiosClient.get<ApiResponse<Category[]>>('/categories');
    return res.data;
  },

  async getProducts(params?: ProductFilterParams): Promise<PaginatedResponse<Product>> {
    const res = await axiosClient.get<PaginatedResponse<Product>>('/products', {
      params: {
        category: params?.category || undefined,
        page: params?.page || undefined,
        limit: params?.limit || undefined,
      },
    });
    return res.data;
  },

  async getProductById(id: string): Promise<ApiResponse<Product>> {
    const res = await axiosClient.get<ApiResponse<Product>>(`/products/${id}`);
    return res.data;
  },
};

export default productService;
