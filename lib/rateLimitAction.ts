/**
 * Rate Limiter untuk Server Actions
 * Menggunakan headers() dari next/headers untuk tracking
 */

import { headers } from 'next/headers';

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
 * Rate limiter untuk Server Actions
 */
export async function rateLimitAction(
  config: RateLimitConfig = {
    interval: 60 * 1000,
    uniqueTokenPerInterval: 10,
  }
): Promise<{ success: boolean; remaining: number; limit: number }> {
  let ip = 'unknown';
  
  try {
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';

    // Whitelist search engine bots
    if (isSearchEngineBot(userAgent)) {
      return {
        success: true,
        remaining: 999,
        limit: 999,
      };
    }

    const forwarded = headersList.get('x-forwarded-for');
    ip = forwarded ? forwarded.split(',')[0].trim() : 
         headersList.get('x-real-ip') || 
         'unknown';
  } catch (error) {
    console.error("Error getting headers in rateLimitAction:", error);
    // Continue with 'unknown' IP
  }

  const now = Date.now();
  const tokenKey = `${ip}`;

  // Cleanup
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

  if (!bucket || now > bucket.resetTime) {
    bucket = {
      count: 0,
      resetTime: now + config.interval,
    };
    tokenCache.set(tokenKey, bucket);
  }

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
 * Rate limiter untuk AI actions
 */
export async function rateLimitAIAction() {
  return rateLimitAction({
    interval: 60 * 1000,
    uniqueTokenPerInterval: 5,
  });
}
