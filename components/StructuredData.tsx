import React from 'react';
import hospitalInfo from '@/data/hospitalInfo.json';

type JsonLd = Record<string, any>;

export default function StructuredData({ extra, includeOrg = true }: { extra?: JsonLd | JsonLd[], includeOrg?: boolean }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rsumeloy.co.id';

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': ['Hospital', 'MedicalOrganization', 'LocalBusiness'],
    name: hospitalInfo.name,
    alternateName: hospitalInfo.shortName,
    description: hospitalInfo.description,
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    image: 'https://res.cloudinary.com/ddyqhlilj/image/upload/gedungrsmeloymalam',
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
    // Enhanced Medical Organization properties
    priceRange: '$$',
    currenciesAccepted: 'IDR',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'BPJS', 'Asuransi'],
    availableService: [
      { '@type': 'MedicalProcedure', name: 'Unit Gawat Darurat (UGD) 24 Jam' },
      { '@type': 'MedicalProcedure', name: 'Rawat Inap' },
      { '@type': 'MedicalProcedure', name: 'Rawat Jalan' },
      { '@type': 'MedicalProcedure', name: 'Laboratorium' },
      { '@type': 'MedicalProcedure', name: 'Radiologi' },
      { '@type': 'MedicalProcedure', name: 'Farmasi' },
    ],
    medicalSpecialty: [
      'Penyakit Dalam',
      'Bedah',
      'Kebidanan dan Kandungan',
      'Anak',
      'Jantung',
      'Saraf',
      'Mata',
      'THT',
      'Kulit dan Kelamin',
      'Ortopedi',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
        description: 'UGD 24 Jam'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:00',
        description: 'Poliklinik'
      }
    ],
  } as JsonLd;

  const extraItems = extra ? (Array.isArray(extra) ? extra : [extra]) : [];

  // Optionally include organization; pages can set includeOrg=false to avoid duplicates
  const shouldIncludeOrg = includeOrg && !extraItems.some((it) => {
    if (!it || typeof it !== 'object') return false;
    const t = it['@type'];
    if (!t) return false;
    const types = Array.isArray(t) ? t : [t];
    return types.some((type: string) => /hospital|organization|medicalorganization|localbusiness/i.test(type));
  });

  const items = (shouldIncludeOrg ? [organizationLd] : []).concat(extraItems);

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

  // Include a top-level @type to identify the JSON-LD block as a WebPage containing a graph
  // This helps some validators that expect a top-level @type on the JSON-LD object.
  return JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', '@graph': graph });
  })();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: scriptContent }} />
    </>
  );
}
