import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  const { pathname } = req.nextUrl;

  if (!token && pathname.startsWith('/admin') && pathname !== '/admin') {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.ADMIN_PASSWORD);
      await jwtVerify(token, secret);

      if (pathname === '/admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Token validation failed:", error);
      const response = NextResponse.redirect(new URL('/admin', req.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};