/**
 * Rate Limiter untuk API routes dan endpoints
 * Menggunakan in-memory cache untuk tracking request
 */

import { NextRequest } from 'next/server';

interface RateLimitConfig {
  interval: number; // dalam milidetik
  uniqueTokenPerInterval: number; // jumlah token unik dalam interval
}

interface TokenBucket {
  count: number;
  resetTime: number;
}

// In-memory cache untuk rate limiting
const tokenCache = new Map<string, TokenBucket>();

// Daftar user agents untuk search engine bots (whitelist)
const SEARCH_ENGINE_BOTS = [
  'googlebot',
  'bingbot',
  'slurp', // Yahoo
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'sogou',
  'exabot',
  'facebot', // Facebook
  'ia_archiver', // Alexa
];

/**
 * Cek apakah request berasal dari search engine bot
 */
function isSearchEngineBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return SEARCH_ENGINE_BOTS.some(bot => ua.includes(bot));
}

/**
 * Rate limiter function
 * @param request - NextRequest object
 * @param config - Konfigurasi rate limit
 * @returns Promise<{ success: boolean, remaining: number }>
 */
export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig = {
    interval: 60 * 1000, // 1 menit
    uniqueTokenPerInterval: 10, // 10 requests per menit
  }
): Promise<{ success: boolean; remaining: number; limit: number }> {
  // Cek user agent
  const userAgent = request.headers.get('user-agent') || '';
  
  // Whitelist search engine bots
  if (isSearchEngineBot(userAgent)) {
    return {
      success: true,
      remaining: 999,
      limit: 999,
    };
  }

  // Dapatkan identifier unik (IP atau user identifier)
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 
             request.headers.get('x-real-ip') || 
             'unknown';

  const now = Date.now();
  const tokenKey = `${ip}`;

  // Cleanup expired tokens (setiap 10 menit)
  if (tokenCache.size > 10000) {
    const keysToDelete: string[] = [];
    tokenCache.forEach((bucket, key) => {
      if (now > bucket.resetTime) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach(key => tokenCache.delete(key));
  }

  let bucket = tokenCache.get(tokenKey);

  // Jika tidak ada bucket atau sudah expired, buat baru
  if (!bucket || now > bucket.resetTime) {
    bucket = {
      count: 0,
      resetTime: now + config.interval,
    };
    tokenCache.set(tokenKey, bucket);
  }

  // Increment count
  bucket.count++;

  const remaining = Math.max(0, config.uniqueTokenPerInterval - bucket.count);
  const success = bucket.count <= config.uniqueTokenPerInterval;

  return {
    success,
    remaining,
    limit: config.uniqueTokenPerInterval,
  };
}

/**
 * Rate limiter khusus untuk AI/Chatbot endpoints
 */
export async function rateLimitAI(request: NextRequest) {
  return rateLimit(request, {
    interval: 60 * 1000, // 1 menit
    uniqueTokenPerInterval: 5, // 5 requests per menit untuk AI
  });
}

/**
 * Rate limiter khusus untuk login endpoints
 */
export async function rateLimitAuth(request: NextRequest) {
  return rateLimit(request, {
    interval: 15 * 60 * 1000, // 15 menit
    uniqueTokenPerInterval: 5, // 5 login attempts per 15 menit
  });
}

/**
 * Rate limiter khusus untuk form submissions
 */
export async function rateLimitForm(request: NextRequest) {
  return rateLimit(request, {
    interval: 60 * 1000, // 1 menit
    uniqueTokenPerInterval: 3, // 3 form submissions per menit
  });
}
