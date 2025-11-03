import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';
import { navItemsConfig } from '@/lib/navigation';

interface DatabaseItem {
  slug?: string;
  id?: string;
  created_at: string;
}

interface NavItem {
  path: string;
  submenu?: { path: string }[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rsumeloy.co.id';
  
  // Initialize with homepage
  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0, // ✅ FIXED: Homepage dengan highest priority
    },
  ];

  try {
    const supabase = createClient();

    // ✅ IMPROVED: Error handling untuk setiap query
    let services = [];
    try {
      const { data, error } = await supabase
        .from('services')
        .select('slug, created_at')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.warn('⚠️ Error fetching services:', error.message);
      } else if (data) {
        services = data;
      }
    } catch (err) {
      console.error('❌ Exception fetching services:', err);
    }

    let facilities = [];
    try {
      const { data, error } = await supabase
        .from('facilities')
        .select('slug, created_at')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.warn('⚠️ Error fetching facilities:', error.message);
      } else if (data) {
        facilities = data;
      }
    } catch (err) {
      console.error('❌ Exception fetching facilities:', err);
    }

    let articles = [];
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('slug, created_at')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.warn('⚠️ Error fetching articles:', error.message);
      } else if (data) {
        articles = data;
      }
    } catch (err) {
      console.error('❌ Exception fetching articles:', err);
    }

    let info = [];
    try {
      const { data, error } = await supabase
        .from('info')
        .select('id, created_at')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.warn('⚠️ Error fetching info:', error.message);
      } else if (data) {
        info = data;
      }
    } catch (err) {
      console.error('❌ Exception fetching info:', err);
    }

    // ✅ OPTIMIZED: Services dengan priority 0.8 dan weekly update
    const serviceUrls = services.map(({ slug, created_at }: any) => ({
      url: `${siteUrl}/layanan/${slug}`,
      lastModified: new Date(created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
    sitemapEntries.push(...serviceUrls);

    // ✅ OPTIMIZED: Facilities dengan priority 0.7 dan monthly update
    const facilityUrls = facilities.map(({ slug, created_at }: any) => ({
      url: `${siteUrl}/fasilitas/${slug}`,
      lastModified: new Date(created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
    sitemapEntries.push(...facilityUrls);

    // ✅ OPTIMIZED: Articles dengan priority 0.6 dan monthly update
    const articleUrls = articles.map(({ slug, created_at }: any) => ({
      url: `${siteUrl}/tentang/artikel/${slug}`,
      lastModified: new Date(created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
    sitemapEntries.push(...articleUrls);

    // ✅ FIXED: Info items sekarang punya priority 0.5 dan weekly update (PREVIOUSLY MISSING!)
    const infoUrls = info.map(({ id, created_at }: any) => ({
      url: `${siteUrl}/info/${id}`,
      lastModified: new Date(created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }));
    sitemapEntries.push(...infoUrls);

    // ✅ OPTIMIZED: Static routes dari navigation config
    const staticUrls = navItemsConfig.flatMap((item: any) => {
      const routes: MetadataRoute.Sitemap = [];
      
      // Main route
      routes.push({
        url: `${siteUrl}${item.path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
      });

      // Sub-routes
      if (item.submenu) {
        item.submenu.forEach((sub: any) => {
          routes.push({
            url: `${siteUrl}${sub.path}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.75,
          });
        });
      }

      return routes;
    });

    // ✅ IMPROVED: Remove duplicates dengan lebih robust
    const urlMap = new Map<string, MetadataRoute.Sitemap[0]>();
    
    // Add static URLs first (they take precedence)
    staticUrls.forEach((item: any) => {
      urlMap.set(item.url, item);
    });

    // Add dynamic URLs (won't override static)
    sitemapEntries.slice(1).forEach((item: any) => {
      if (!urlMap.has(item.url)) {
        urlMap.set(item.url, item);
      }
    });

    // Build final sitemap
    const finalSitemap: MetadataRoute.Sitemap = [sitemapEntries[0]]; // Homepage first
    urlMap.forEach((item: any) => {
      finalSitemap.push(item);
    });

    console.log(`✅ Sitemap generated with ${finalSitemap.length} URLs`);
    console.log(`📊 Breakdown: Services: ${serviceUrls.length}, Facilities: ${facilityUrls.length}, Articles: ${articleUrls.length}, Info: ${infoUrls.length}, Static: ${staticUrls.length}`);

    return finalSitemap;

  } catch (error) {
    console.error('❌ Critical error in sitemap generation:', error);
    // ✅ FALLBACK: Return minimal sitemap dengan hanya homepage dan static routes
    console.log('⚠️ Falling back to minimal sitemap (homepage + static routes only)');
    
    const fallbackStatic = navItemsConfig.map((item: any) => ({
      url: `${siteUrl}${item.path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }));

    return [
      sitemapEntries[0], // Homepage
      ...fallbackStatic,
    ];
  }
}