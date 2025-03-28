import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export async function rateLimitMiddleware(_req: NextRequest) {
  // **Rate Limiting Logic**

  return NextResponse.next(); // Proceed to the next middleware or route handler
}

// **Global Middleware**
export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  if (url.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  if (url.startsWith('/api/')) {
    return rateLimitMiddleware(req);
  }

  // **Always preserve headers for all routes**
  return NextResponse.next();
}

// Matcher: Only apply to specific API routes
export const config = {
  matcher: [
    '/api/hello', // Explicit single API route
    '/api/v1/:path*', // All API routes under /api/v1/
    '/:path*',
    '/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',

  ],
};
