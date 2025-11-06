/**
 * Rate Limiter untuk Server Actions - Production Safe Version
 * Menggunakan fallback untuk production environment
 */

interface RateLimitConfig {
  interval: number;
  uniqueTokenPerInterval: number;
}

interface TokenBucket {
  count: number;
  resetTime: number;
}

const tokenCache = new Map<string, TokenBucket>();

const SEARCH_ENGINE_BOTS = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'sogou',
  'exabot',
  'facebot',
  'ia_archiver',
];

function isSearchEngineBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return SEARCH_ENGINE_BOTS.some(bot => ua.includes(bot));
}

/**
 * Safe function to get client IP
 */
function getClientIP(): string {
  // In production, try different headers but with fallback
  try {
    if (typeof window !== 'undefined') {
      // Client-side fallback
      return 'client-side';
    }

    // Server-side - try to get headers safely
    const { headers } = require('next/headers');
    const headersList = headers();
    
    const forwarded = headersList.get('x-forwarded-for');
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }

    const realIP = headersList.get('x-real-ip');
    if (realIP) {
      return realIP;
    }

    const cfConnectingIP = headersList.get('cf-connecting-ip');
    if (cfConnectingIP) {
      return cfConnectingIP;
    }

    return 'server-fallback';
  } catch (error) {
    // Production fallback - use a static identifier
    console.warn('Unable to get client IP, using fallback:', error);
    return 'production-fallback';
  }
}

/**
 * Safe function to get user agent
 */
function getUserAgent(): string {
  try {
    if (typeof window !== 'undefined') {
      return window.navigator.userAgent || 'client-browser';
    }

    // Server-side
    const { headers } = require('next/headers');
    const headersList = headers();
    return headersList.get('user-agent') || 'server-unknown';
  } catch (error) {
    console.warn('Unable to get user agent, using fallback:', error);
    return 'production-fallback';
  }
}

/**
 * Rate limiter untuk Server Actions - Production Safe
 */
export async function rateLimitAction(
  config: RateLimitConfig = {
    interval: 60 * 1000,
    uniqueTokenPerInterval: 10,
  }
): Promise<{ success: boolean; remaining: number; limit: number }> {
  
  try {
    const ip = getClientIP();
    const userAgent = getUserAgent();
    
    // Skip rate limiting untuk search engine bots
    if (isSearchEngineBot(userAgent)) {
      return {
        success: true,
        remaining: config.uniqueTokenPerInterval,
        limit: config.uniqueTokenPerInterval,
      };
    }

    const now = Date.now();
    const tokenKey = `${ip}-${Math.floor(now / config.interval)}`;

    const tokenBucket = tokenCache.get(tokenKey) || {
      count: 0,
      resetTime: now + config.interval,
    };

    // Reset bucket if interval has passed
    if (now >= tokenBucket.resetTime) {
      tokenBucket.count = 0;
      tokenBucket.resetTime = now + config.interval;
    }

    // Check if limit exceeded
    if (tokenBucket.count >= config.uniqueTokenPerInterval) {
      const remaining = Math.max(0, config.uniqueTokenPerInterval - tokenBucket.count);
      return {
        success: false,
        remaining,
        limit: config.uniqueTokenPerInterval,
      };
    }

    // Increment count
    tokenBucket.count++;
    tokenCache.set(tokenKey, tokenBucket);

    // Clean up old tokens (garbage collection)
    if (tokenCache.size > 1000) {
      const cutoff = now - config.interval;
      for (const [key, bucket] of tokenCache.entries()) {
        if (bucket.resetTime < cutoff) {
          tokenCache.delete(key);
        }
      }
    }

    const remaining = Math.max(0, config.uniqueTokenPerInterval - tokenBucket.count);
    return {
      success: true,
      remaining,
      limit: config.uniqueTokenPerInterval,
    };

  } catch (error) {
    // Production fallback - always allow if rate limiting fails
    console.error('Rate limiting error, allowing request:', error);
    return {
      success: true,
      remaining: config.uniqueTokenPerInterval,
      limit: config.uniqueTokenPerInterval,
    };
  }
}