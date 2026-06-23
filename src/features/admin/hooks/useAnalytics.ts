'use client';

import { useQuery } from '@tanstack/react-query';
import adminService from '@/services/admin.service';

export function useAnalytics() {
  const dashboardQuery = useQuery({
    queryKey: ['admin', 'analytics', 'dashboard'],
    queryFn: async () => {
      const res = await adminService.getDashboardSummary();
      return res.data;
    },
    staleTime: 60_000,
  });

  const salesTrendsQuery = useQuery({
    queryKey: ['admin', 'analytics', 'sales-trends'],
    queryFn: async () => {
      const res = await adminService.getSalesTrends();
      return res.data;
    },
    staleTime: 120_000,
  });

  const topProductsQuery = useQuery({
    queryKey: ['admin', 'analytics', 'top-products'],
    queryFn: async () => {
      const res = await adminService.getTopProducts();
      return res.data;
    },
    staleTime: 120_000,
  });

  return {
    dashboard: dashboardQuery.data,
    salesTrends: salesTrendsQuery.data || [],
    topProducts: topProductsQuery.data || [],
    isLoadingDashboard: dashboardQuery.isLoading,
    isLoadingTrends: salesTrendsQuery.isLoading,
    isLoadingTopProducts: topProductsQuery.isLoading,
    isError: dashboardQuery.isError || salesTrendsQuery.isError || topProductsQuery.isError,
  };
}
