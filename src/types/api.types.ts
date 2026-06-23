export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  isVerified: boolean;
  isActive: boolean;
}

export interface Category {
  _id: string;
  name: {
    en: string;
    ar: string;
  };
  description?: {
    en: string;
    ar: string;
  };
  image?: string;
  isActive: boolean;
}

export interface Product {
  _id: string;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  price: number;
  image: string;
  category: string | Category;
  isAvailable: boolean;
  isActive: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  user: string;
  items: CartItem[];
}

export interface Address {
  addressLine: string;
  building?: string;
  floor?: string;
  apartment?: string;
  latitude?: number;
  longitude?: number;
}

export interface TimelineEntry {
  status: string;
  timestamp: string;
  description?: string;
}

export interface OrderItem {
  product: string;
  name: {
    en: string;
    ar: string;
  };
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  user: string | User;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: 'card' | 'cash';
  paymentStatus: 'pending' | 'paid' | 'failed';
  status: 'pending_payment' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  address: Address;
  stripeSessionId?: string;
  timeline: TimelineEntry[];
  createdAt: string;
  updatedAt: string;
}
