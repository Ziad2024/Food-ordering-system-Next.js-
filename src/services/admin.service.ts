import { axiosClient } from './axiosClient';
import { ApiResponse, User, Product, Category } from '@/types/api.types';

export interface AnalyticsDashboard {
  totalOrders: number;
  totalRevenue: number;
  activeUsers: number;
  pendingOrders: number;
}

export interface SalesTrend {
  date: string;
  revenue: number;
}

export interface TopProduct {
  product: {
    name: {
      en: string;
      ar: string;
    };
  };
  totalSold: number;
}

export const adminService = {
  // Users
  async getUsers(): Promise<ApiResponse<User[]>> {
    const res = await axiosClient.get<ApiResponse<User[]>>('/admin/users');
    return res.data;
  },

  async updateUserRole(id: string, role: 'customer' | 'admin'): Promise<ApiResponse<User>> {
    const res = await axiosClient.patch<ApiResponse<User>>(`/admin/users/${id}/role`, { role });
    return res.data;
  },

  async updateUserStatus(id: string, isActive: boolean): Promise<ApiResponse<User>> {
    const res = await axiosClient.patch<ApiResponse<User>>(`/admin/users/${id}/status`, { isActive });
    return res.data;
  },

  // Analytics
  async getDashboardSummary(): Promise<ApiResponse<AnalyticsDashboard>> {
    const res = await axiosClient.get<ApiResponse<AnalyticsDashboard>>('/analytics/dashboard');
    return res.data;
  },

  async getSalesTrends(): Promise<ApiResponse<SalesTrend[]>> {
    const res = await axiosClient.get<ApiResponse<SalesTrend[]>>('/analytics/sales-trends');
    return res.data;
  },

  async getTopProducts(): Promise<ApiResponse<TopProduct[]>> {
    const res = await axiosClient.get<ApiResponse<TopProduct[]>>('/analytics/top-products');
    return res.data;
  },

  // Categories CRUD
  async createCategory(formData: FormData): Promise<ApiResponse<Category>> {
    const res = await axiosClient.post<ApiResponse<Category>>('/categories', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  async updateCategory(id: string, formData: FormData): Promise<ApiResponse<Category>> {
    const res = await axiosClient.put<ApiResponse<Category>>(`/categories/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  async deleteCategory(id: string): Promise<ApiResponse<{ message: string }>> {
    const res = await axiosClient.delete<ApiResponse<{ message: string }>>(`/categories/${id}`);
    return res.data;
  },

  // Products CRUD
  async createProduct(formData: FormData): Promise<ApiResponse<Product>> {
    const res = await axiosClient.post<ApiResponse<Product>>('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  async updateProduct(id: string, formData: FormData): Promise<ApiResponse<Product>> {
    const res = await axiosClient.put<ApiResponse<Product>>(`/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  async toggleProductAvailability(id: string, isAvailable: boolean): Promise<ApiResponse<Product>> {
    const res = await axiosClient.patch<ApiResponse<Product>>(`/products/${id}/availability`, { isAvailable });
    return res.data;
  },

  async deleteProduct(id: string): Promise<ApiResponse<{ message: string }>> {
    const res = await axiosClient.delete<ApiResponse<{ message: string }>>(`/products/${id}`);
    return res.data;
  },
};

export default adminService;
