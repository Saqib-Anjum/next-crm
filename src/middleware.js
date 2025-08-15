import { NextResponse } from "next/server";

export default function middleware(request) {
  const token = request.cookies.get('token'); // Assuming token is stored in cookies
  const { pathname } = request.nextUrl;

  // Allow access to login, signup, and API routes without a token
  if (pathname === '/' || pathname.startsWith('/auth/signup') || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Redirect to login if no token and trying to access protected routes
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/auth/signup/:path*', '/api/:path*'],
};
