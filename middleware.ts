
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  
  // Create Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => {
          res.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove: (name, options) => {
          res.cookies.delete(name);
        },
      },
    }
  );

  // Add security headers
  const securityHeaders = {
    'X-DNS-Prefetch-Control': 'on',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    // Content Security Policy (CSP) for XSS protection
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://res.cloudinary.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' https://res.cloudinary.com data: blob:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://*.supabase.co https://generativelanguage.googleapis.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  };

  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.headers.set(key, value);
  });

  try {
    // Get session
    const { data: { session } } = await supabase.auth.getSession();
    const { pathname } = request.nextUrl;

    // Check if current path is an admin route
    const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/(admin)');
    
    // Handle admin routes protection
    if (isAdminRoute && pathname !== '/admin/login') {
      if (!session) {
        const returnUrl = encodeURIComponent(request.url);
        return NextResponse.redirect(new URL(`/admin/login?returnUrl=${returnUrl}`, request.url));
      }
    }

    // Handle login page access when already logged in
    if (pathname === '/admin/login' && session) {
      const returnUrl = request.nextUrl.searchParams.get('returnUrl');
      const decodedReturnUrl = returnUrl ? decodeURIComponent(returnUrl) : null;
      
      // Only redirect to return URL if it's an admin route
      if (decodedReturnUrl && (decodedReturnUrl.includes('/admin') || decodedReturnUrl.includes('/(admin)'))) {
        return NextResponse.redirect(new URL(decodedReturnUrl, request.url));
      }
      
      // Default redirect to admin dashboard
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    return res;
  } catch (error) {
    console.error('Auth error:', error);
    // Redirect to login on auth error for admin routes
    const currentPath = request.nextUrl.pathname;
    if (currentPath.startsWith('/admin') || currentPath.startsWith('/(admin)')) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return res;
  }
}

export const config = {
  matcher: [
    // Protect all admin routes
    '/admin',
    '/admin/:path*'
  ]
}
