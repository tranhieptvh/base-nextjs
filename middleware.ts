import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get token from cookies or headers
  const token = request.cookies.get('auth-token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');
  
  // Check if user is authenticated
  const isAuthenticated = !!token;
  
  // Admin redirect logic is now handled by the /admin page component
  
  // User redirect logic for dashboard
  if (pathname === '/dashboard') {
    if (!isAuthenticated) {
      // If not authenticated, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Admin pages protection (except login)
  if (pathname.startsWith('/admin/') && pathname !== '/admin/login') {
    if (!isAuthenticated) {
      // If not authenticated, redirect to admin login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // User auth pages redirect if already authenticated
  if ((pathname === '/login' || pathname === '/register') && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Admin login redirect if already authenticated
  if (pathname === '/admin/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard',
    '/login',
    '/register'
  ]
};
