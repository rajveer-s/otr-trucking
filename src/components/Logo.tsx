'use client';

import { Truck } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f97316]">
        <Truck className="h-5 w-5 text-white" />
      </div>
      <span className="text-lg font-bold text-white">OTR</span>
    </div>
  );
}
