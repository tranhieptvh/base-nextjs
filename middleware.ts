import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value;
  const hasToken = !!token && token.trim() !== '';
  
  console.log(`🔍 Middleware: ${pathname} - Token: ${token ? 'EXISTS' : 'NONE'} - HasToken: ${hasToken}`);

  // Admin routes - require auth
  if (pathname.startsWith('/admin') && !hasToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // User routes - require auth (everything except / and /admin/*)
  if (pathname !== '/' && !pathname.startsWith('/admin') && !hasToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect authenticated users from auth pages
  if (hasToken) {
    if (pathname === '/login' || pathname === '/register') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};
