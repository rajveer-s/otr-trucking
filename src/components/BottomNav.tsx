'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Truck,
  FileText,
  Settings,
  User,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Loads', href: '/loads', icon: FileText },
  { name: 'Trucks', href: '/trucks', icon: Truck },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#18181b]/50 backdrop-blur-sm border-t border-gray-800/50">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center justify-around h-20">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center w-16 h-16 transition-colors relative',
                  isActive(item.href)
                    ? 'text-[#f97316]'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                {isActive(item.href) && (
                  <motion.div
                    layoutId="bottomNav"
                    className="absolute inset-0 bg-[#f97316]/10 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className="h-6 w-6 relative mb-1" />
                <span className="text-xs font-medium mt-1">{item.name}</span>
              </Link>
            );
          })}
          <Link
            href="/profile"
            className={cn(
              'flex flex-col items-center justify-center w-16 h-16 transition-colors relative',
              isActive('/profile')
                ? 'text-[#f97316]'
                : 'text-gray-400 hover:text-white'
            )}
          >
            {isActive('/profile') && (
              <motion.div
                layoutId="bottomNav"
                className="absolute inset-0 bg-[#f97316]/10 rounded-lg"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#18181b] flex items-center justify-center ring-2 ring-[#f97316] mb-1">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <span className="text-xs font-medium mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
