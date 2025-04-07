'use client';

import { Header } from './Header';
import { BottomNav } from './BottomNav';

export function AppTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 pb-16 bg-[#0A0A0A]">
        <div className="max-w-[1600px] mx-auto p-4 lg:p-6">
          {children}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
