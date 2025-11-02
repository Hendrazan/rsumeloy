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

  // If there's more than one item, emit a single JSON-LD script using @graph
  // to reduce duplicated <script> tags and make the payload cleaner for crawlers.
  const scriptContent = (() => {
    if (items.length === 1) return JSON.stringify(items[0]);

    // Remove any per-item @context to avoid duplication and place one top-level context
    const graph = items.map((it) => {
      if (!it || typeof it !== 'object') return it;
      const copy = { ...it } as Record<string, any>;
      delete copy['@context'];
      return copy;
    });

    return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  })();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: scriptContent }} />
    </>
  );
}
