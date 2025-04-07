'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { mockTrucks } from '@/lib/data/mockData';
import { Plus, Edit2, LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusColors = {
  'available': 'bg-green-500/10 text-green-500',
  'in-use': 'bg-blue-500/10 text-blue-500',
  'maintenance': 'bg-yellow-500/10 text-yellow-500'
};

const statusLabels = {
  'available': 'Available',
  'in-use': 'In Use',
  'maintenance': 'Maintenance'
};

export default function TrucksPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredTrucks = mockTrucks.filter(truck => {
    const matchesSearch = searchTerm ? (
      ((truck.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (truck.licensePlate?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (truck.make?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (truck.model?.toLowerCase() || '').includes(searchTerm.toLowerCase()))
    ) : true;

    const matchesStatus = statusFilter === 'all' ? true : truck.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">Trucks</h1>
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
              placeholder="Search trucks..."
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
            <option value="available">Available</option>
            <option value="in-use">In Use</option>
            <option value="maintenance">Maintenance</option>
          </select>
          {user?.role === 'admin' && (
            <Button
              onClick={() => router.push('/trucks/new')}
              className="bg-[#f97316] hover:bg-[#f97316]/90 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Truck
            </Button>
          )}
        </div>
      </div>

      {filteredTrucks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">No trucks found</p>
        </div>
      ) : (
        <div className={cn(
          'grid gap-4',
          viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
        )}>
          {filteredTrucks.map((truck, index) => (
            <motion.div
              key={truck.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-[#18181b]/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800/50 hover:border-gray-700/50 transition-colors">
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">#{truck.id?.slice(-6) || 'N/A'}</p>
                      <h3 className="text-lg font-medium text-white">
                        {truck.name || 'N/A'}
                      </h3>
                    </div>
                    {truck.status && (
                      <span className={cn(
                        'px-2.5 py-1 rounded-full text-xs font-medium',
                        statusColors[truck.status] || ''
                      )}>
                        {statusLabels[truck.status] || truck.status}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">License Plate</p>
                      <p className="text-sm text-white">{truck.licensePlate || 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Mileage</p>
                      <p className="text-sm text-white">{truck.mileage.toLocaleString()} miles</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Next Oil Change</p>
                      <p className="text-sm text-white">
                        {truck.nextOilChangeDue?.toLocaleString() || 'N/A'} miles
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Fuel Efficiency</p>
                      <p className="text-sm text-white">{truck.fuelEfficiency || 'N/A'} mpg</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Next Maintenance</p>
                      <p className="text-sm text-white">
                        {new Date(truck.nextMaintenance).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Last Maintenance</p>
                      <p className="text-sm text-white">
                        {new Date(truck.lastMaintenance).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {user?.role === 'admin' && (
                    <div className="pt-4 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/trucks/${truck.id}/edit`)}
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
