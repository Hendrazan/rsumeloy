
import { getDoctors } from "../../../lib/data";
import DoctorsPageClient from './components/DoctorsPageClient';
import { translations } from "../../../lib/translations";
import { Metadata } from 'next';
import PageHeader from "../../../components/layout/PageHeader";
import StructuredData from '@/components/StructuredData';
import hospitalInfo from '@/data/hospitalInfo.json';

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const t = (key: string) => translations['id'][key] || key;
  return {
    title: `${t('jadwalDokterTitle')} | RSU Meloy`,
    description: t('jadwalDokterSubtitle'),
  };
}

export default async function DoctorsPage() {
    const doctors = await getDoctors();
    const t = (key: string) => translations['id'][key] || key;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rsumeloy.com';

    const breadcrumbLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Jadwal Dokter', item: `${siteUrl}/jadwal-dokter` },
      ]
    };

    const pageLd = {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: t('jadwalDokterTitle'),
      description: t('jadwalDokterSubtitle'),
      provider: {
        '@type': 'Hospital',
        name: hospitalInfo.name,
      }
    };

  return (
    <div className="animate-fade-in">
      <StructuredData extra={[breadcrumbLd, pageLd]} />
            <PageHeader
                title={t('jadwalDokterTitle')}
                subtitle={t('jadwalDokterSubtitle')}
                imagePublicId="polirsmeloy"
            />
            <DoctorsPageClient doctors={doctors} />
        </div>
    );
}
