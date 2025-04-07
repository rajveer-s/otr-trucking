import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, icon: Icon, description, trend }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className="relative bg-[#18181b]/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800/50 hover:border-gray-700/50 transition-all">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-400">{title}</h3>
            <div className="p-2 bg-[#f97316]/10 rounded-lg">
              <Icon className="h-4 w-4 text-[#f97316]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-white">{value}</div>
            {description && (
              <p className="text-xs text-gray-400">{description}</p>
            )}
            {trend && (
              <div className={cn(
                'text-xs font-medium',
                trend.isPositive ? 'text-[#22c55e]' : 'text-[#ef4444]'
              )}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
