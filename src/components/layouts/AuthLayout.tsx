'use client';

import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-tr from-stone-50 via-amber-50/20 to-orange-50/20">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl border border-stone-100 shadow-xl shadow-stone-100/50 p-8 flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
