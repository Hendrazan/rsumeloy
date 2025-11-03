
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  
  // Whitelist legitimate admin routes sebelum check suspicious patterns
  const legitimateRoutes = [
    '/admin/login',
    '/admin',
    '/login',
  ];
  
  const isLegitimateRoute = legitimateRoutes.some(route => pathname.startsWith(route));
  
  // Daftar suspicious patterns untuk SEO spam/phishing
  const suspiciousPatterns = [
    /\b(slot|judi|togel|poker|casino|bet|gambling|cuan|gacor|maxwin)\b/i,
    /\b(dansa|porno|xxx|sex|adult)\b/i,
    /\b(obat|viagra|cialis|pharmacy)\b/i,
    /\b(fake|scam|phishing)\b/i,
  ];
  
  // Check untuk suspicious URL patterns (skip jika legitimate route)
  const fullPath = pathname + search;
  const matchedPattern = !isLegitimateRoute && suspiciousPatterns.find(pattern => pattern.test(fullPath));
  
  if (matchedPattern) {
    const ipAddress = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referer = request.headers.get('referer') || 'direct';
    
    console.warn('🚨 Suspicious URL detected:', fullPath, 'from IP:', ipAddress);
    
    // Log to database (async, tidak perlu await agar tidak blocking)
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
      
      fetch(`${supabaseUrl}/rest/v1/suspicious_urls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          path: pathname,
          query_params: search || null,
          full_url: fullPath,
          ip_address: ipAddress,
          user_agent: userAgent,
          referer: referer,
          pattern_matched: matchedPattern.toString(),
        }),
      }).catch(err => console.error('Failed to log suspicious URL:', err));
    } catch (error) {
      console.error('Error logging suspicious URL:', error);
    }
    
    // Return 404 untuk suspicious URLs
    return new NextResponse('Not Found', { status: 404 });
  }
  
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
      "frame-src 'self' https://www.google.com https://maps.google.com",
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

    // Redirect old /login route to /admin/login
    if (pathname === '/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

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
    '/admin/:path*',
    // Check all routes for suspicious patterns
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ]
}
