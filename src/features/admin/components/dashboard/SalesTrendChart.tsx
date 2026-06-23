'use client';

import { useTranslations } from 'next-intl';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { SalesTrend } from '@/services/admin.service';

interface SalesTrendChartProps {
  data: SalesTrend[];
  isLoading?: boolean;
}

export function SalesTrendChart({ data, isLoading }: SalesTrendChartProps) {
  const t = useTranslations('admin.dashboard.sales_trends');

  // Format dates for display
  const chartData = data.map((item) => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
    }),
  }));

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-4">
      <h3 className="text-lg font-bold border-b border-white/5 pb-3">{t('title')}</h3>

      {isLoading ? (
        <div className="h-64 bg-white/5 rounded-xl animate-pulse" />
      ) : data.length === 0 ? (
        <p className="text-zinc-500 text-sm py-20 text-center">{t('empty')}</p>
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ea580c" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="formattedDate"
                stroke="#71717a"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#71717a"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#09090b',
                  borderColor: '#27272a',
                  borderRadius: '12px',
                  color: '#fff',
                }}
                itemStyle={{ color: '#ea580c' }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#ea580c"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default SalesTrendChart;
