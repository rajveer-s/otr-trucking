'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { Logo } from './Logo';
import { Orbitron } from 'next/font/google';

// Load Google font
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

export function Header() {
  const { logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#18181b]/50 backdrop-blur-sm border-b border-gray-800/50">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity group">
            <Logo />
            <div className="flex items-baseline">
              <span className={`text-2xl font-bold text-white ${orbitron.variable} font-orbitron bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:from-[#f97316] group-hover:to-white transition-all duration-300`}>
                OTR
              </span>
              <div className="w-px h-4 mx-2 bg-gray-700" />
              <span className={`text-xl font-light text-white ${orbitron.variable} font-orbitron tracking-wider opacity-80`}>
                TRUCKING
              </span>
            </div>
          </Link>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="text-gray-400 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
