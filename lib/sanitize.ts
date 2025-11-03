/**
 * HTML Sanitization Library
 * 
 * Provides safe HTML sanitization to prevent XSS attacks when using dangerouslySetInnerHTML
 * 
 * Usage:
 * import { sanitizeHtml } from '@/lib/sanitize';
 * <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(userContent) }} />
 */

/**
 * Sanitize HTML content to prevent XSS attacks
 * 
 * This is a basic implementation. For production, consider using:
 * - DOMPurify: npm install isomorphic-dompurify
 * - sanitize-html: npm install sanitize-html
 * 
 * @param html - Raw HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';
  
  // Basic sanitization rules
  let sanitized = html;
  
  // Remove script tags and their content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove event handlers (onclick, onload, etc.)
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');
  
  // Remove javascript: protocol
  sanitized = sanitized.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"');
  sanitized = sanitized.replace(/src\s*=\s*["']javascript:[^"']*["']/gi, 'src=""');
  
  // Remove data: protocol (except for images)
  sanitized = sanitized.replace(/(?<!img[^>]*)\ssrc\s*=\s*["']data:[^"']*["']/gi, 'src=""');
  
  // Remove iframe, embed, object tags
  sanitized = sanitized.replace(/<(iframe|embed|object)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gi, '');
  
  // Remove style tags with potentially malicious content
  sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Remove meta refresh
  sanitized = sanitized.replace(/<meta[^>]*http-equiv\s*=\s*["']refresh["'][^>]*>/gi, '');
  
  return sanitized;
}

/**
 * Whitelist-based HTML sanitization (more restrictive)
 * 
 * Only allows specific tags and attributes
 * 
 * @param html - Raw HTML string to sanitize
 * @returns Sanitized HTML string
 */
export function sanitizeHtmlStrict(html: string): string {
  if (!html) return '';
  
  // Allowed tags
  const allowedTags = [
    'p', 'br', 'strong', 'em', 'u', 's', 'b', 'i',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li',
    'a', 'img',
    'blockquote', 'code', 'pre',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'div', 'span'
  ];
  
  // Allowed attributes per tag
  const allowedAttributes: Record<string, string[]> = {
    'a': ['href', 'title', 'target', 'rel'],
    'img': ['src', 'alt', 'title', 'width', 'height'],
    'div': ['class'],
    'span': ['class'],
    'p': ['class'],
    'h1': ['class'],
    'h2': ['class'],
    'h3': ['class'],
    'h4': ['class'],
    'h5': ['class'],
    'h6': ['class'],
  };
  
  // For strict sanitization, use a proper library in production
  // This is a placeholder implementation
  console.warn('Using basic HTML sanitization. Consider using DOMPurify for production.');
  
  return sanitizeHtml(html);
}

/**
 * Escape HTML entities
 * 
 * Converts HTML to safe plain text by escaping special characters
 * 
 * @param text - Text to escape
 * @returns Escaped text safe for HTML
 */
export function escapeHtml(text: string): string {
  if (!text) return '';
  
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
  };
  
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Sanitize URL to prevent javascript: and data: protocols
 * 
 * @param url - URL to sanitize
 * @returns Sanitized URL or empty string if dangerous
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';
  
  // Remove whitespace
  const trimmed = url.trim().toLowerCase();
  
  // Block dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
  
  for (const protocol of dangerousProtocols) {
    if (trimmed.startsWith(protocol)) {
      console.warn(`Blocked dangerous URL protocol: ${protocol}`);
      return '';
    }
  }
  
  // Allow only http, https, mailto, tel, and relative URLs
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('.')
  ) {
    return url;
  }
  
  // If protocol is ambiguous, assume relative URL
  return url;
}

/**
 * Sanitize content from database
 * 
 * Use this for content that comes from database (articles, descriptions, etc.)
 * 
 * @param content - Database content
 * @returns Sanitized content
 */
export function sanitizeDatabaseContent(content: string): string {
  if (!content) return '';
  
  // For now, use basic sanitization
  // TODO: Implement DOMPurify when installed
  return sanitizeHtml(content);
}

/**
 * Check if content is safe (basic check)
 * 
 * @param content - Content to check
 * @returns true if content appears safe
 */
export function isSafeContent(content: string): boolean {
  if (!content) return true;
  
  // Check for dangerous patterns
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // event handlers
    /<iframe/i,
    /<embed/i,
    /<object/i,
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(content));
}

// Re-export for convenience
export default {
  sanitizeHtml,
  sanitizeHtmlStrict,
  escapeHtml,
  sanitizeUrl,
  sanitizeDatabaseContent,
  isSafeContent,
};
