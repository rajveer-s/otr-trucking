'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Truck,
  Package,
  Settings,
  User,
  LogOut,
  Share,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Loads',
    href: '/loads',
    icon: Package,
  },
  {
    name: 'Trucks',
    href: '/trucks',
    icon: Truck,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: User,
  },
];

export default function AppTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#18181b]/50 backdrop-blur-md border-b border-gray-800/50">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-2">
            <div className="bg-orange-600 rounded-lg p-1.5">
              <Share className="h-5 w-5" />
            </div>
            <span className="font-semibold">OTR TRUCKING</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-gray-400 hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#18181b]/50 backdrop-blur-md border-t border-gray-800/50">
        <div className="flex items-center justify-around h-20">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 px-4 py-2 text-sm transition-colors rounded-lg relative',
                  isActive ? 'text-orange-600 bg-orange-600/10' : 'text-gray-400 hover:text-gray-300'
                )}
              >
                <item.icon className="h-6 w-6" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
