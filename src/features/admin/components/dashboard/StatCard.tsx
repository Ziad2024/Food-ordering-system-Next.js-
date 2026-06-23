'use client';

import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  color?: string;
  isLoading?: boolean;
}

export function StatCard({ title, value, icon: Icon, description, color = 'text-orange-500', isLoading }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 flex items-center justify-between gap-4">
      <div className="space-y-2">
        <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">{title}</span>
        {isLoading ? (
          <div className="h-8 w-24 bg-white/5 rounded animate-pulse" />
        ) : (
          <div className="text-3xl font-extrabold tracking-tight">{value}</div>
        )}
        {description && <p className="text-xs text-zinc-400">{description}</p>}
      </div>

      <div className={`p-3.5 rounded-xl bg-white/5 border border-white/5 ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  );
}

export default StatCard;
