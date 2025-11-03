import { createClient } from '@/lib/supabase/server';

interface ImageData {
  slug?: string;
  name?: string;
  title?: string;
  id?: string;
  image_public_id?: string;
  image_public_id_1?: string;
  image_public_id_2?: string;
  image_public_id_3?: string;
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rsumeloy.co.id';
  const supabase = createClient();

  // Fetch all data with images
  const { data: services } = await supabase.from('services').select('slug, name, image_public_id_1, image_public_id_2, image_public_id_3');
  const { data: facilities } = await supabase.from('facilities').select('slug, name, image_public_id_1, image_public_id_2, image_public_id_3');
  const { data: articles } = await supabase.from('articles').select('slug, title, image_public_id');
  const { data: info } = await supabase.from('info').select('id, title, image_public_id');

  const cloudinaryBase = 'https://res.cloudinary.com/ddyqhlilj/image/upload';

  const imageEntries: Array<{url: string, images: Array<{loc: string, title: string}>}> = [];

  // Services images
  services?.forEach((service: ImageData) => {
    const images = [];
    const serviceName = service.name || 'Service';
    if (service.image_public_id_1) images.push({ loc: `${cloudinaryBase}/${service.image_public_id_1}`, title: `${serviceName} - Gambar 1` });
    if (service.image_public_id_2) images.push({ loc: `${cloudinaryBase}/${service.image_public_id_2}`, title: `${serviceName} - Gambar 2` });
    if (service.image_public_id_3) images.push({ loc: `${cloudinaryBase}/${service.image_public_id_3}`, title: `${serviceName} - Gambar 3` });
    if (images.length > 0 && service.slug) {
      imageEntries.push({ url: `${siteUrl}/layanan/${service.slug}`, images });
    }
  });

  // Facilities images
  facilities?.forEach((facility: ImageData) => {
    const images = [];
    const facilityName = facility.name || 'Facility';
    if (facility.image_public_id_1) images.push({ loc: `${cloudinaryBase}/${facility.image_public_id_1}`, title: `${facilityName} - Gambar 1` });
    if (facility.image_public_id_2) images.push({ loc: `${cloudinaryBase}/${facility.image_public_id_2}`, title: `${facilityName} - Gambar 2` });
    if (facility.image_public_id_3) images.push({ loc: `${cloudinaryBase}/${facility.image_public_id_3}`, title: `${facilityName} - Gambar 3` });
    if (images.length > 0 && facility.slug) {
      imageEntries.push({ url: `${siteUrl}/fasilitas/${facility.slug}`, images });
    }
  });

  // Articles images
  articles?.forEach((article: ImageData) => {
    if (article.image_public_id && article.slug && article.title) {
      const articleTitle = article.title;
      imageEntries.push({
        url: `${siteUrl}/tentang/artikel/${article.slug}`,
        images: [{ loc: `${cloudinaryBase}/${article.image_public_id}`, title: articleTitle }]
      });
    }
  });

  // Info images
  info?.forEach((item: ImageData) => {
    if (item.image_public_id && item.id && item.title) {
      const infoTitle = item.title;
      imageEntries.push({
        url: `${siteUrl}/info/${item.id}`,
        images: [{ loc: `${cloudinaryBase}/${item.image_public_id}`, title: infoTitle }]
      });
    }
  });

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageEntries.map(entry => `  <url>
    <loc>${entry.url}</loc>
${entry.images.map(img => `    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${img.title}</image:title>
    </image:image>`).join('\n')}
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
