import React from 'react';

export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-stone-100 p-4 space-y-4 animate-pulse">
      <div className="aspect-video w-full bg-stone-200 rounded-lg" />
      <div className="space-y-2">
        <div className="h-4 bg-stone-200 rounded w-2/3" />
        <div className="h-3 bg-stone-200 rounded w-full" />
        <div className="h-3 bg-stone-200 rounded w-5/6" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 bg-stone-200 rounded w-1/4" />
        <div className="h-8 bg-stone-200 rounded w-1/3" />
      </div>
    </div>
  );
}
