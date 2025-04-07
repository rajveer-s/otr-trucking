'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  Plus,
  Edit,
  Truck,
  Calendar,
  Gauge,
} from 'lucide-react';
import { mockTrucks } from '@/lib/data/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function TrucksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [yearFilter, setYearFilter] = useState('All Years');

  // Get unique years from trucks
  const years = Array.from(new Set(mockTrucks.map(truck => truck.year))).sort((a, b) => b - a);

  // Filter trucks based on search and filters
  const filteredTrucks = mockTrucks
    .filter(truck => {
      const matchesSearch = searchQuery === '' ||
        `${truck.make} ${truck.model} ${truck.vin}`.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All Status' ||
        truck.status === statusFilter;

      const matchesYear = yearFilter === 'All Years' ||
        truck.year.toString() === yearFilter;

      return matchesSearch && matchesStatus && matchesYear;
    })
    .sort((a, b) => b.year - a.year);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'maintenance':
        return 'bg-orange-600/10 text-orange-600 border-orange-600/20';
      case 'out of service':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Trucks</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-[#18181b]/30 border-gray-800/50 hover:bg-[#18181b]/50 hover:border-gray-700/50">
            <svg
              className="h-4 w-4 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 8v13H3V8" />
              <path d="M1 3h22v5H1z" />
              <path d="M10 12h4" />
            </svg>
            Export
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700" asChild>
            <Link href="/trucks/new">
              <Plus className="h-4 w-4 mr-2" />
              New Truck
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,auto] gap-4 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search trucks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#18181b]/50 border-gray-800/50"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px] bg-[#18181b]/50 border-gray-800/50">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Status">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
            <SelectItem value="Out of Service">Out of Service</SelectItem>
          </SelectContent>
        </Select>
        <Select value={yearFilter} onValueChange={setYearFilter}>
          <SelectTrigger className="w-[140px] bg-[#18181b]/50 border-gray-800/50">
            <SelectValue placeholder="All Years" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Years">All Years</SelectItem>
            {years.map(year => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredTrucks.map((truck, index) => (
          <motion.div
            key={truck.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="bg-[#18181b]/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800/50">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-gray-400">#{index + 1}</div>
                    <h3 className="text-lg font-medium text-white mt-1">
                      {truck.make} {truck.model}
                    </h3>
                  </div>
                  <Badge variant="outline" className={getStatusColor(truck.status)}>
                    {truck.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">VIN</div>
                    <div className="font-medium text-white">{truck.vin}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Year</div>
                    <div className="font-medium text-white">{truck.year}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Mileage</div>
                    <div className="font-medium text-white">{truck.mileage.toLocaleString()} mi</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Last Service</div>
                    <div className="font-medium text-white">{formatDate(truck.lastMaintenance)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800/50">
                  <div>
                    <div className="text-sm text-gray-400">Next Service</div>
                    <div className="font-medium text-white">{formatDate(truck.nextMaintenance)}</div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" className="bg-[#18181b]/30 border-gray-800/50 hover:bg-[#18181b]/50 hover:border-gray-700/50" asChild>
                      <Link href={`/trucks/${truck.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
