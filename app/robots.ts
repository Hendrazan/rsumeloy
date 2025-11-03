
import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rsumeloy.co.id';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          // Note: previously blocked all URLs with query parameters. Relaxed to allow
          // query-parametered pages to be crawled (useful for search, filters, pagination).
          // Keep blocking sensitive paths below.
          '/api/', // Block API routes
          '/_next/', // Block Next.js system files
          '/static/images/loading.gif',
        ],
        // Recommended small crawl delay for modest servers. Adjust in production if needed.
        crawlDelay: 5,
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/'], // Block GPT crawler
      }
    ],
    sitemap: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/image-sitemap.xml`,
    ],
    host: siteUrl,
  }
}
