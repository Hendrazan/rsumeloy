import React from 'react';
import hospitalInfo from '@/data/hospitalInfo.json';

type JsonLd = Record<string, any>;

export default function StructuredData({ extra }: { extra?: JsonLd | JsonLd[] }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rsumeloy.com';

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Hospital',
    name: hospitalInfo.name,
    alternateName: hospitalInfo.shortName,
    description: hospitalInfo.description,
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    telephone: hospitalInfo.contact?.phone,
    email: hospitalInfo.contact?.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: hospitalInfo.address?.street,
      addressLocality: hospitalInfo.address?.city,
      addressRegion: hospitalInfo.address?.province,
      postalCode: hospitalInfo.address?.postalCode,
      addressCountry: hospitalInfo.address?.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: hospitalInfo.googleMaps?.latitude,
      longitude: hospitalInfo.googleMaps?.longitude,
    },
    sameAs: Object.values(hospitalInfo.socialMedia || {}),
  } as JsonLd;

  const items = [organizationLd].concat(extra ? (Array.isArray(extra) ? extra : [extra]) : []);

  return (
    <>
      {items.map((item, i) => (
        // Server component: render plain script tags for JSON-LD
        <script
          key={`ld-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
