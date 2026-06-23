'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import adminService from '@/services/admin.service';
import { toast } from 'sonner';

export function useAdminUsers() {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: async () => {
      const res = await adminService.getUsers();
      // Normalize MongoDB _id to id so UsersTable actions work
      const users = (res.data as any[]).map((u) => ({
        ...u,
        id: u.id || u._id,
      }));
      return users;
    },
  });

  const toggleRoleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: 'customer' | 'admin' }) =>
      adminService.updateUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('User role updated successfully');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update user role');
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      adminService.updateUserStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('User status updated successfully');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update user status');
    },
  });

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    refetch: usersQuery.refetch,
    toggleRole: toggleRoleMutation.mutate,
    isUpdatingRole: toggleRoleMutation.isPending,
    toggleStatus: toggleStatusMutation.mutate,
    isUpdatingStatus: toggleStatusMutation.isPending,
  };
}
