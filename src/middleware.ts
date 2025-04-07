import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for both cookie formats that might be used
  const userCookie = request.cookies.get('user');
  const userDataCookie = request.cookies.get('user_data');
  const authTokenCookie = request.cookies.get('auth_token');

  // Allow access to public routes
  if (pathname === '/' || pathname === '/login' || pathname === '/signup') {
    return NextResponse.next();
  }

  // Protect dashboard routes - check for any authentication indicator
  if (pathname.startsWith('/dashboard')) {
    if (!userCookie && !userDataCookie && !authTokenCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

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
