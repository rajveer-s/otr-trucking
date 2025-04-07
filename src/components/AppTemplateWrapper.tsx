'use client';

import { usePathname } from 'next/navigation';
import AppTemplate from '@/components/AppTemplate';

export function AppTemplateWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicRoute = pathname === '/' || pathname === '/login' || pathname === '/signup';

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return <AppTemplate>{children}</AppTemplate>;
}
