import React from 'react';
import Head from 'next/head';
import hospitalInfo from '@/data/hospitalInfo.json';

type JsonLd = Record<string, any>;

export interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  canonical?: string;
  jsonLd?: JsonLd | JsonLd[];
}

function renderJsonLd(jsonLd: JsonLd | JsonLd[]) {
  const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  return items.map((item, i) => (
    <script
      key={`ld-${i}`}
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
    />
  ));
}

export default function SEO({ title, description, url, image, canonical, jsonLd }: SEOProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rsumeloy.com';
  const siteTitle = title || hospitalInfo.name;
  const siteDescription = description || hospitalInfo.description;
  const pageUrl = url || siteUrl;
  const imageUrl = image || 'https://res.cloudinary.com/ddyqhlilj/image/upload/gedungrsmeloymalam';

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

  return (
    <Head>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical || pageUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Structured data: Organization/Hospital */}
      {renderJsonLd([organizationLd].concat(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []))}
    </Head>
  );
}
