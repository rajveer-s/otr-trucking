'use client';

import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { StatCard } from '@/components/StatCard';
import { mockLoads, mockTrucks, mockDashboardStats } from '@/lib/data/mockData';
import {
  DollarSign,
  Truck,
  Fuel,
  TrendingUp,
} from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AdminDashboardPage() {
  // Calculate statistics
  const totalRevenue = mockLoads.reduce((sum, load) => sum + load.paymentAmount, 0);
  const totalFuelCost = mockLoads.reduce((sum, load) => sum + load.fuelCost, 0);
  const totalLoads = mockLoads.length;
  const averageRatePerMile = totalRevenue / mockLoads.reduce((sum, load) => sum + load.miles, 0);

  // Prepare data for charts
  const earningsByTruck = mockTrucks.map((truck) => ({
    name: truck.name,
    earnings: mockLoads
      .filter((load) => load.truckId === truck.id)
      .reduce((sum, load) => sum + load.paymentAmount, 0),
  }));

  const fuelCostDistribution = [
    { name: 'Fuel Cost', value: totalFuelCost },
    { name: 'Other Expenses', value: totalRevenue * 0.1 }, // Example: 10% of revenue as other expenses
  ];

  const topEarningLoads = [...mockLoads]
    .sort((a, b) => b.paymentAmount - a.paymentAmount)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of fleet operations</p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          description="From all loads"
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Total Fuel Cost"
          value={`$${totalFuelCost.toLocaleString()}`}
          icon={Fuel}
          description="Across all trucks"
          trend={{ value: 8, isPositive: false }}
        />
        <StatCard
          title="Total Loads"
          value={totalLoads}
          icon={Truck}
          description="Completed this month"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Average Rate/Mile"
          value={`$${averageRatePerMile.toFixed(2)}`}
          icon={TrendingUp}
          description="Across all loads"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="p-4 bg-card rounded-lg border"
        >
          <h2 className="text-lg font-semibold mb-4">Earnings by Truck</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsByTruck}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="earnings" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="p-4 bg-card rounded-lg border"
        >
          <h2 className="text-lg font-semibold mb-4">Fuel Cost Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fuelCostDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fuelCostDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="p-4 bg-card rounded-lg border"
      >
        <h2 className="text-lg font-semibold mb-4">Top Earning Loads</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Load Name</th>
                <th className="text-left py-2">Route</th>
                <th className="text-right py-2">Payment</th>
                <th className="text-right py-2">Miles</th>
                <th className="text-right py-2">Rate/Mile</th>
              </tr>
            </thead>
            <tbody>
              {topEarningLoads.map((load) => (
                <tr key={load.id} className="border-b">
                  <td className="py-2">{load.name}</td>
                  <td className="py-2">
                    {load.pickupCity} → {load.dropoffCity}
                  </td>
                  <td className="py-2 text-right">
                    ${load.paymentAmount.toLocaleString()}
                  </td>
                  <td className="py-2 text-right">
                    {load.miles.toLocaleString()}
                  </td>
                  <td className="py-2 text-right">
                    ${(load.paymentAmount / load.miles).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
