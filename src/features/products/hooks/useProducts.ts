import { useQuery } from '@tanstack/react-query';
import productService, { ProductFilterParams } from '@/services/product.service';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => productService.getCategories(),
    select: (res) => res.data,
  });
}

export function useProducts(params?: ProductFilterParams) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts(params),
  });
}

export function useProductDetail(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    select: (res) => res.data,
    enabled: !!id,
  });
}
