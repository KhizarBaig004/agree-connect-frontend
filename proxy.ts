import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Proxy for handling requests
 * Runs before the request is completed
 * Note: In Next.js 16, middleware.ts is now proxy.ts
 */
export function proxy(request: NextRequest) {
  // Add any proxy logic here
  // Example: Authentication checks, redirects, etc.
  
  return NextResponse.next();
}

// Configure which routes the proxy should run on
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

