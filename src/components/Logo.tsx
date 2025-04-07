import { Truck } from 'lucide-react';

export function Logo() {
  return (
    <div className="relative flex items-center">
      {/* Road element */}
      <div className="absolute left-0 right-0 bottom-0 flex space-x-1 opacity-50">
        <div className="h-0.5 w-2 bg-[#f97316] rounded-full" />
        <div className="h-0.5 w-2 bg-[#f97316] rounded-full" />
        <div className="h-0.5 w-2 bg-[#f97316] rounded-full" />
      </div>
      {/* Truck icon with glowing effect */}
      <div className="relative">
        <div className="absolute inset-0 bg-[#f97316] blur-lg opacity-20" />
        <div className="relative bg-[#f97316] rounded-lg p-1.5">
          <Truck className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
}
