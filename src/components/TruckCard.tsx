import { motion } from 'framer-motion';
import { Truck } from '@/types';
import { Truck as TruckIcon, Gauge, Building2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TruckCardProps {
  truck: Truck;
  onClick?: () => void;
}

export function TruckCard({ truck, onClick }: TruckCardProps) {
  const milesUntilOilChange = truck.nextOilChangeDue - truck.mileage;
  const needsOilChange = milesUntilOilChange <= 1000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className={cn(
        "relative bg-[#18181b]/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800/50 hover:border-gray-700/50 transition-all",
        needsOilChange && "border-[#ef4444]/50"
      )}>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">{truck.name}</h3>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#18181b]/30 text-gray-400 border border-gray-800/50">
              {truck.licensePlate}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-gray-400" />
                <p className="text-sm font-medium text-gray-400">Mileage</p>
              </div>
              <p className="text-sm text-white">{truck.mileage.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-400" />
                <p className="text-sm font-medium text-gray-400">Last Oil Change</p>
              </div>
              <p className="text-sm text-white">
                {truck.oilChanges[truck.oilChanges.length - 1]?.miles.toLocaleString() || 'N/A'}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`h-4 w-4 ${needsOilChange ? 'text-[#ef4444]' : 'text-gray-400'}`} />
                <p className="text-sm font-medium text-gray-400">Next Oil Change</p>
              </div>
              <p className={`text-sm ${needsOilChange ? 'text-[#ef4444]' : 'text-white'}`}>
                {milesUntilOilChange.toLocaleString()} miles remaining
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
