'use client';

import { usePathname, useRouter } from 'next/navigation';
import { AppTemplate } from '@/components/AppTemplate';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export function AppTemplateWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  // Redirect to login if not authenticated and not on an auth page
  useEffect(() => {
    if (!isLoading && !user && !isAuthPage) {
      router.push('/login');
    }
  }, [user, isLoading, isAuthPage, router]);

  // Show auth pages without the app template
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f97316]"></div>
      </div>
    );
  }

  // Only render the app template if the user is authenticated
  if (!user) {
    return null;
  }

  return <AppTemplate>{children}</AppTemplate>;
}
