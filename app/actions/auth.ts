"use server";

import { rateLimitAction } from "@/lib/rateLimitAction";

/**
 * Server action untuk login dengan rate limiting
 * Ini adalah wrapper untuk mencegah brute force attacks
 */
export async function rateLimitedLogin(_email: string, _password: string) {
  // Rate limiting untuk login
  const rateLimitResult = await rateLimitAction({
    interval: 15 * 60 * 1000, // 15 menit
    uniqueTokenPerInterval: 5, // 5 login attempts per 15 menit
  });

  if (!rateLimitResult.success) {
    return {
      success: false,
      error: 'Terlalu banyak percobaan login. Silakan coba lagi dalam 15 menit.',
      remaining: rateLimitResult.remaining,
      limit: rateLimitResult.limit,
    };
  }

  // Return success untuk melanjutkan proses login
  // (actual login dilakukan di client dengan Supabase)
  return {
    success: true,
    remaining: rateLimitResult.remaining,
    limit: rateLimitResult.limit,
  };
}
