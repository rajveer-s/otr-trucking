'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { StatCard } from '@/components/StatCard';
import { LoadCard } from '@/components/LoadCard';
import { TruckCard } from '@/components/TruckCard';
import { OilReminder } from '@/components/OilReminder';
import { mockDashboardStats, mockLoads, mockTrucks } from '@/lib/data/mockData';
import {
  DollarSign,
  Truck,
  Gauge,
  Package,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f97316]"></div>
      </div>
    );
  }

  // Don't render anything if not authenticated
  if (!user) {
    return null;
  }

  // Get unique years from loads
  const years = Array.from(new Set(mockLoads.map(load =>
    new Date(load.createdAt).getFullYear()
  ))).sort((a, b) => b - a);

  // Filter loads for selected year
  const yearLoads = mockLoads.filter(load =>
    new Date(load.createdAt).getFullYear().toString() === selectedYear
  );

  // Calculate statistics for selected year
  const totalLoads = yearLoads.length;
  const totalMiles = yearLoads.reduce((sum, load) => sum + load.miles, 0);
  const totalEarnings = yearLoads.reduce((sum, load) => sum + load.paymentAmount, 0);
  const totalFuelCost = yearLoads.reduce((sum, load) => sum + (load.fuelCost || 0), 0);
  const netEarnings = totalEarnings - totalFuelCost;

  // Get recent loads (last 3)
  const recentLoads = [...mockLoads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  // Calculate monthly statistics
  const monthlyStats = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const monthLoads = yearLoads.filter(load =>
      new Date(load.createdAt).getMonth() + 1 === month
    );
    const monthEarnings = monthLoads.reduce((sum, load) => sum + load.paymentAmount, 0);
    const monthMiles = monthLoads.reduce((sum, load) => sum + load.miles, 0);
    const monthFuelCost = monthLoads.reduce((sum, load) => sum + (load.fuelCost || 0), 0);
    const monthNetEarnings = monthEarnings - monthFuelCost;

    return {
      month,
      name: new Date(2024, i).toLocaleString('default', { month: 'long' }),
      loads: monthLoads.length,
      earnings: monthEarnings,
      miles: monthMiles,
      netEarnings: monthNetEarnings
    };
  });

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px] bg-[#18181b]/50 backdrop-blur-sm border border-gray-800/50">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="group"
        >
          <div className="relative bg-[#18181b]/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800/50 hover:border-gray-700/50 transition-all">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Total Loads</h3>
                <Package className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-white">{totalLoads}</p>
                <p className="text-sm text-gray-400">
                  {selectedYear} Year to Date
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="group"
        >
          <div className="relative bg-[#18181b]/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800/50 hover:border-gray-700/50 transition-all">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Total Miles</h3>
                <Truck className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-white">{totalMiles.toLocaleString()}</p>
                <p className="text-sm text-gray-400">
                  {selectedYear} Year to Date
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="group"
        >
          <div className="relative bg-[#18181b]/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800/50 hover:border-gray-700/50 transition-all">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Total Earnings</h3>
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-white">{formatCurrency(totalEarnings)}</p>
                <p className="text-sm text-gray-400">
                  {selectedYear} Year to Date
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="group"
        >
          <div className="relative bg-[#18181b]/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800/50 hover:border-gray-700/50 transition-all">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Net Earnings</h3>
                <TrendingUp className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-white">{formatCurrency(netEarnings)}</p>
                <p className="text-sm text-gray-400">
                  After fuel costs ({selectedYear})
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="lg:col-span-2 group"
        >
          <div className="relative bg-[#18181b]/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800/50 hover:border-gray-700/50 transition-all">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Monthly Overview - {selectedYear}</h3>
              </div>
              <div className="space-y-4">
                {monthlyStats.map((stat) => (
                  <div
                    key={stat.month}
                    className="flex items-center justify-between border-b border-gray-800/50 pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <h3 className="font-medium text-white">{stat.name}</h3>
                      <p className="text-sm text-gray-400">
                        {stat.loads} loads • {stat.miles.toLocaleString()} miles
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">{formatCurrency(stat.earnings)}</p>
                      <p className="text-sm text-gray-400">
                        Net: {formatCurrency(stat.netEarnings)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="group"
        >
          <div className="relative bg-[#18181b]/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800/50 hover:border-gray-700/50 transition-all">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Recent Loads</h3>
              </div>
              <div className="space-y-4">
                {recentLoads.map((load) => (
                  <div
                    key={load.id}
                    className="flex items-center justify-between border-b border-gray-800/50 pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <h3 className="font-medium text-white">{load.name}</h3>
                      <p className="text-sm text-gray-400">
                        {load.pickupCity} → {load.dropoffCity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">{formatCurrency(load.paymentAmount)}</p>
                      <p className="text-sm text-gray-400">
                        {formatDate(load.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/loads">
                  <Button variant="outline" className="w-full bg-[#18181b]/30 border-gray-800/50 hover:bg-[#18181b]/50 hover:border-gray-700/50">
                    View All Loads
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <OilReminder truck={mockTrucks[0]} />
      </motion.div>
    </div>
  );
}
