'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  Plus,
  Edit,
  ArrowRight,
} from 'lucide-react';
import { mockLoads } from '@/lib/data/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function LoadsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [monthFilter, setMonthFilter] = useState('All Months');
  const [yearFilter, setYearFilter] = useState('All Years');

  // Get unique years from loads
  const years = Array.from(new Set(mockLoads.map(load =>
    new Date(load.createdAt).getFullYear()
  ))).sort((a, b) => b - a);

  // Filter loads based on search and filters
  const filteredLoads = mockLoads
    .filter(load => {
      const matchesSearch = searchQuery === '' ||
        `${load.pickupCity} ${load.dropoffCity}`.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All Status' ||
        load.status === statusFilter;

      const loadDate = new Date(load.createdAt);
      const matchesMonth = monthFilter === 'All Months' ||
        loadDate.toLocaleString('default', { month: 'long' }) === monthFilter;

      const matchesYear = yearFilter === 'All Years' ||
        loadDate.getFullYear().toString() === yearFilter;

      return matchesSearch && matchesStatus && matchesMonth && matchesYear;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'in progress':
      case 'pending':
        return 'bg-orange-600/10 text-orange-600 border-orange-600/20';
      case 'due':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Loads</h1>
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
            <Link href="/loads/new">
              <Plus className="h-4 w-4 mr-2" />
              New Load
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,auto,auto] gap-4 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search loads..."
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
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Due">Due</SelectItem>
          </SelectContent>
        </Select>
        <Select value={monthFilter} onValueChange={setMonthFilter}>
          <SelectTrigger className="w-[140px] bg-[#18181b]/50 border-gray-800/50">
            <SelectValue placeholder="All Months" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Months">All Months</SelectItem>
            {Array.from({ length: 12 }, (_, i) => (
              <SelectItem
                key={i}
                value={new Date(2024, i).toLocaleString('default', { month: 'long' })}
              >
                {new Date(2024, i).toLocaleString('default', { month: 'long' })}
              </SelectItem>
            ))}
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
        {filteredLoads.map((load, index) => (
          <motion.div
            key={load.id}
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
                      {load.pickupCity} <ArrowRight className="inline h-4 w-4" /> {load.dropoffCity}
                    </h3>
                  </div>
                  <Badge variant="outline" className={getStatusColor(load.status)}>
                    {load.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Payment</div>
                    <div className="font-medium text-white">{formatCurrency(load.paymentAmount)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Distance</div>
                    <div className="font-medium text-white">{load.miles} miles</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Rate/Mile</div>
                    <div className="font-medium text-orange-600">
                      {formatCurrency(load.paymentAmount / load.miles)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Fuel Cost</div>
                    <div className="font-medium text-white">{formatCurrency(load.fuelCost || 0)}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
                  <div className="text-sm text-gray-400">
                    Created<br />
                    {formatDate(load.createdAt)}
                  </div>
                  <Button variant="outline" size="sm" className="bg-[#18181b]/30 border-gray-800/50 hover:bg-[#18181b]/50 hover:border-gray-700/50" asChild>
                    <Link href={`/loads/${load.id}/edit`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
