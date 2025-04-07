import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for authentication
  const hasAuthCookie = request.cookies.has('user');
  const isAuthPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup';

  // Always redirect to login if not authenticated and not on auth pages
  if (!hasAuthCookie && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to dashboard if authenticated and trying to access auth pages
  if (hasAuthCookie && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Continue with the request
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
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
