import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    
    if (token.role !== 'ADMIN') {
      // Redirect non-admin users to appropriate dashboard
      if (token.role === 'EMPLOYER') {
        return NextResponse.redirect(new URL('/employer/dashboard', req.url));
      } else if (token.role === 'WORKER') {
        return NextResponse.redirect(new URL('/worker/dashboard', req.url));
      } else {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
  }

  // Protect employer routes
  if (pathname.startsWith('/employer') && pathname !== '/employer/login') {
    if (!token) {
      return NextResponse.redirect(new URL('/employer/login', req.url));
    }
    
    if (token.role !== 'EMPLOYER') {
      // Redirect non-employer users to appropriate dashboard
      if (token.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', req.url));
      } else if (token.role === 'WORKER') {
        return NextResponse.redirect(new URL('/worker/dashboard', req.url));
      } else {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
  }

  // Protect worker routes
  if (pathname.startsWith('/worker') && pathname !== '/worker/login') {
    if (!token) {
      return NextResponse.redirect(new URL('/worker/login', req.url));
    }
    
    if (token.role !== 'WORKER') {
      // Redirect non-worker users to appropriate dashboard
      if (token.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', req.url));
      } else if (token.role === 'EMPLOYER') {
        return NextResponse.redirect(new URL('/employer/dashboard', req.url));
      } else {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/employer/:path*', '/worker/:path*'],
};
