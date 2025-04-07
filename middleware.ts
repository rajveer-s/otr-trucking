import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userCookie = request.cookies.get('user');

  // Check if the route is protected (starts with /dashboard)
  const isProtectedRoute = pathname.startsWith('/dashboard');

  // Check if the route is a public route (landing page, login, signup)
  const isPublicRoute = ['/', '/login', '/signup'].includes(pathname);

  // If trying to access a protected route without being authenticated
  if (isProtectedRoute && !userCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If trying to access auth pages while authenticated
  if (userCookie && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
