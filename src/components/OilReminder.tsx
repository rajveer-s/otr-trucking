import { motion } from 'framer-motion';
import { AlertTriangle, Calendar, Gauge } from 'lucide-react';
import { Truck } from '@/types';
import { cn } from '@/lib/utils';

interface OilReminderProps {
  truck: Truck;
}

export function OilReminder({ truck }: OilReminderProps) {
  const milesUntilOilChange = truck.nextOilChangeDue - truck.mileage;
  const needsOilChange = milesUntilOilChange <= 1000;
  const lastOilChange = truck.oilChanges[truck.oilChanges.length - 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className={cn(
        "relative bg-[#18181b]/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800/50 hover:border-gray-700/50 transition-all",
        needsOilChange && "border-[#ef4444]/50"
      )}>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Oil Change Reminder</h3>
            <AlertTriangle className={`h-5 w-5 ${needsOilChange ? 'text-[#ef4444]' : 'text-gray-400'}`} />
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-gray-400" />
                <p className="text-sm font-medium text-gray-400">Miles Until Next Change</p>
              </div>
              <p className={`text-sm ${needsOilChange ? 'text-[#ef4444] font-medium' : 'text-white'}`}>
                {milesUntilOilChange.toLocaleString()} miles
              </p>
            </div>
            {lastOilChange && (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <p className="text-sm font-medium text-gray-400">Last Oil Change</p>
                </div>
                <p className="text-sm text-white">
                  {new Date(lastOilChange.date).toLocaleDateString()} at {lastOilChange.miles.toLocaleString()} miles
                </p>
              </div>
            )}
            {needsOilChange && (
              <div className="mt-4 p-3 bg-[#ef4444]/10 rounded-lg border border-[#ef4444]/20">
                <p className="text-sm text-[#ef4444]">
                  ⚠️ Oil change needed soon! Please schedule maintenance.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
