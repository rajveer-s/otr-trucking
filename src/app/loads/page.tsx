'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { mockLoads } from '@/lib/data/mockData';
import { Plus, Edit2, MapPin, DollarSign, Calendar, LayoutGrid, List, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

const statusColors = {
  'pending': 'bg-[#f59e0b]/10 text-[#f59e0b]',
  'in-progress': 'bg-[#3b82f6]/10 text-[#3b82f6]',
  'completed': 'bg-[#22c55e]/10 text-[#22c55e]',
  'cancelled': 'bg-[#ef4444]/10 text-[#ef4444]',
};

const statusLabels = {
  'pending': 'Pending',
  'in-progress': 'In Progress',
  'completed': 'Completed',
  'cancelled': 'Cancelled',
};

export default function LoadsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [monthFilter, setMonthFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get unique years from loads
  const years = Array.from(new Set(mockLoads.map(load => new Date(load.createdAt).getFullYear()))).sort((a, b) => b - a);

  // Get months for the selected year
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2024, i);
    return {
      value: (i + 1).toString(),
      label: date.toLocaleString('default', { month: 'long' })
    };
  });

  const filteredLoads = mockLoads.filter(load => {
    const matchesSearch = load.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.pickupCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.dropoffCity.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || load.status === statusFilter;

    const loadDate = new Date(load.createdAt);
    const matchesMonth = monthFilter === 'all' || (loadDate.getMonth() + 1).toString() === monthFilter;
    const matchesYear = yearFilter === 'all' || loadDate.getFullYear().toString() === yearFilter;

    return matchesSearch && matchesStatus && matchesMonth && matchesYear;
  });

  // Calculate rate per mile for each load
  const loadsWithRatePerMile = filteredLoads.map(load => {
    const ratePerMile = load.miles > 0 ? load.paymentAmount / load.miles : 0;
    return {
      ...load,
      ratePerMile: ratePerMile
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">Loads</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'list'
                  ? 'text-[#f97316]'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              <List className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2 rounded-md transition-colors',
                viewMode === 'grid'
                  ? 'text-[#f97316]'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search loads..."
              className="w-full px-4 py-2 bg-[#18181b]/50 border border-gray-800 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f97316]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 bg-[#18181b]/50 border border-gray-800 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f97316]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <Select value={monthFilter} onValueChange={setMonthFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              {months.map(month => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {user?.role === 'admin' && (
            <Button
              onClick={() => router.push('/loads/new')}
              className="bg-[#f97316] hover:bg-[#f97316]/90 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Load
            </Button>
          )}
        </div>
      </div>

      {loadsWithRatePerMile.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">No loads found</p>
        </div>
      ) : (
        <div className={cn(
          'grid gap-4',
          viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
        )}>
          {loadsWithRatePerMile.map((load, index) => (
            <motion.div
              key={load.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-[#18181b]/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800/50 hover:border-gray-700/50 transition-colors">
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">#{load.id?.slice(-6) || 'N/A'}</p>
                      <h3 className="text-lg font-medium text-white">
                        {load.pickupCity || 'N/A'} → {load.dropoffCity || 'N/A'}
                      </h3>
                    </div>
                    {load.status && (
                      <span className={cn(
                        'px-2.5 py-1 rounded-full text-xs font-medium',
                        statusColors[load.status] || ''
                      )}>
                        {statusLabels[load.status] || load.status}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Payment</p>
                      <p className="text-sm text-white">${load.paymentAmount.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Distance</p>
                      <p className="text-sm text-white">{load.miles.toLocaleString()} miles</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Rate/Mile</p>
                      <p className="text-sm text-white flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1 text-[#f97316]" />
                        ${load.ratePerMile.toFixed(2)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Fuel Cost</p>
                      <p className="text-sm text-white">${load.fuelCost.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Created</p>
                      <p className="text-sm text-white">
                        {load.createdAt ? new Date(load.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {user?.role === 'admin' && (
                    <div className="pt-4 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/loads/${load.id}/edit`)}
                        className="text-gray-400 hover:text-white border-gray-800/50 hover:border-gray-700/50 bg-transparent"
                      >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
