'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  DollarSign,
  Truck,
  Package,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { mockLoads, mockTrucks } from '@/lib/data/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

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
      miles: monthMiles,
      earnings: monthEarnings,
      netEarnings: monthNetEarnings
    };
  });

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px] bg-[#18181b]/50 backdrop-blur-sm border-gray-800/50">
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
        >
          <div className="bg-[#18181b]/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800/50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Total Loads</h3>
              <Package className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-2xl font-bold text-white">{totalLoads}</p>
              <p className="text-sm text-gray-400">{selectedYear} Year to Date</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="bg-[#18181b]/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800/50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Total Miles</h3>
              <Truck className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-2xl font-bold text-white">{totalMiles.toLocaleString()}</p>
              <p className="text-sm text-gray-400">{selectedYear} Year to Date</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="bg-[#18181b]/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800/50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Total Earnings</h3>
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-2xl font-bold text-white">{formatCurrency(totalEarnings)}</p>
              <p className="text-sm text-gray-400">{selectedYear} Year to Date</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="bg-[#18181b]/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800/50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Net Earnings</h3>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-2xl font-bold text-white">{formatCurrency(netEarnings)}</p>
              <p className="text-sm text-gray-400">After fuel costs ({selectedYear})</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div className="bg-[#18181b]/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800/50">
            <h3 className="text-lg font-medium text-white mb-4">Monthly Overview - {selectedYear}</h3>
            <div className="space-y-4">
              {monthlyStats.map((stat) => (
                <div
                  key={stat.month}
                  className="flex items-center justify-between border-b border-gray-800/50 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <h4 className="font-medium text-white">{stat.name}</h4>
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <div className="bg-[#18181b]/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800/50">
            <h3 className="text-lg font-medium text-white mb-4">Recent Loads</h3>
            <div className="space-y-4">
              {recentLoads.map((load) => (
                <div
                  key={load.id}
                  className="flex items-center justify-between border-b border-gray-800/50 pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <h4 className="font-medium text-white">{load.pickupCity} → {load.dropoffCity}</h4>
                    <p className="text-sm text-gray-400">{formatDate(load.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">{formatCurrency(load.paymentAmount)}</p>
                    <p className="text-sm text-gray-400">{load.miles} miles</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full bg-[#18181b]/30 border-gray-800/50 hover:bg-[#18181b]/50 hover:border-gray-700/50" asChild>
                <Link href="/loads">View All Loads</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <div className="bg-[#18181b]/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Oil Change Reminders</h3>
            <AlertTriangle className="h-5 w-5 text-orange-500" />
          </div>
          <div className="space-y-6">
            {mockTrucks.map((truck) => {
              // Calculate miles until next oil change (assuming oil change every 15,000 miles)
              const milesSinceLastOilChange = truck.mileage - (truck.lastMaintenanceMileage || 0);
              const milesUntilNextChange = 15000 - milesSinceLastOilChange;
              const isOilChangeDue = milesUntilNextChange <= 1000;

              return (
                <div key={truck.id} className="space-y-3 pb-4 border-b border-gray-800/50 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">{truck.name}</h4>
                      <p className="text-sm text-gray-400">#{truck.id} • Current: {truck.mileage.toLocaleString()} miles</p>
                    </div>
                    {isOilChangeDue && (
                      <div className="px-2 py-1 rounded bg-orange-600/10 border border-orange-600/20">
                        <p className="text-sm font-medium text-orange-600">Due Soon</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Next Change Due</p>
                      <p className="font-medium text-white">In {milesUntilNextChange.toLocaleString()} miles</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Last Oil Change</p>
                      <p className="font-medium text-white">
                        {truck.lastMaintenance ? formatDate(truck.lastMaintenance) : 'No record'}
                        {truck.lastMaintenanceMileage ? ` at ${truck.lastMaintenanceMileage.toLocaleString()} miles` : ''}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
