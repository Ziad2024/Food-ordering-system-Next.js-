'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import adminService from '@/services/admin.service';
import { toast } from 'sonner';

export function useAdminProducts() {
  const queryClient = useQueryClient();

  const createProduct = useMutation({
    mutationFn: (formData: FormData) => adminService.createProduct(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
    },
    onError: (err: any) => toast.error(err.message || 'Failed to create product'),
  });

  const updateProduct = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      adminService.updateProduct(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully');
    },
    onError: (err: any) => toast.error(err.message || 'Failed to update product'),
  });

  const toggleAvailability = useMutation({
    mutationFn: ({ id, isAvailable }: { id: string; isAvailable: boolean }) =>
      adminService.toggleProductAvailability(id, isAvailable),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product availability updated');
    },
    onError: (err: any) => toast.error(err.message || 'Failed to update availability'),
  });

  const deleteProduct = useMutation({
    mutationFn: (id: string) => adminService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
    },
    onError: (err: any) => toast.error(err.message || 'Failed to delete product'),
  });

  const createCategory = useMutation({
    mutationFn: (formData: FormData) => adminService.createCategory(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created successfully');
    },
    onError: (err: any) => toast.error(err.message || 'Failed to create category'),
  });

  const deleteCategory = useMutation({
    mutationFn: (id: string) => adminService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted successfully');
    },
    onError: (err: any) => toast.error(err.message || 'Failed to delete category'),
  });

  return {
    createProduct: createProduct.mutate,
    updateProduct: updateProduct.mutate,
    toggleAvailability: toggleAvailability.mutate,
    deleteProduct: deleteProduct.mutate,
    createCategory: createCategory.mutate,
    deleteCategory: deleteCategory.mutate,
    isPending: createProduct.isPending || updateProduct.isPending || deleteProduct.isPending || createCategory.isPending || deleteCategory.isPending,
  };
}
