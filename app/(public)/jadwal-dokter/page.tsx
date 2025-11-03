
import { getDoctors } from "../../../lib/data";
import type { Doctor } from '../../../types/models';
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
    description: `Lihat jadwal lengkap dokter spesialis di RSU Meloy Sangatta. Cari jadwal praktek dokter umum, spesialis anak, penyakit dalam, bedah, kandungan, jantung, dan mata. Booking konsultasi dokter online 24 jam.`,
    keywords: [
      // Primary keywords
      'jadwal dokter sangatta',
      'jadwal dokter rsu meloy',
      'dokter spesialis sangatta',
      'jadwal praktek dokter sangatta',
      
      // Specialty-specific
      'dokter anak sangatta',
      'dokter kandungan sangatta',
      'dokter penyakit dalam sangatta',
      'dokter bedah sangatta',
      'dokter jantung sangatta',
      'dokter mata sangatta',
      'dokter umum sangatta',
      
      // Intent-based
      'cari dokter sangatta',
      'konsultasi dokter sangatta',
      'booking dokter online sangatta',
      'jadwal praktek rsu meloy',
      'daftar dokter sangatta',
      
      // Regional
      'dokter sangatta utara',
      'jadwal dokter kalimantan timur',
      'dokter spesialis kaltim',
      'rumah sakit sangatta',
      
      // Action keywords
      'buat janji dokter sangatta',
      'reservasi dokter rsu meloy',
      'jadwal dokter hari ini'
    ],
    openGraph: {
      title: `Jadwal Dokter Spesialis Lengkap | RSU Meloy Sangatta`,
      description: 'Temukan jadwal praktek dokter spesialis & umum di RSU Meloy. Booking konsultasi online untuk dokter anak, kandungan, penyakit dalam, bedah, jantung, dan mata.',
      url: '/jadwal-dokter',
      type: 'website',
      images: [
        {
          url: 'https://res.cloudinary.com/ddyqhlilj/image/upload/f_auto,q_auto/rsu-meloy/doctors-schedule-og',
          width: 1200,
          height: 630,
          alt: 'Jadwal Dokter Spesialis RSU Meloy Sangatta'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Jadwal Dokter Spesialis | RSU Meloy',
      description: 'Lihat jadwal lengkap dokter spesialis di RSU Meloy Sangatta',
    },
    alternates: {
      canonical: '/jadwal-dokter',
    },
  };
}

export default async function DoctorsPage() {
    const doctors = await getDoctors();
    const t = (key: string) => translations['id'][key] || key;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rsumeloy.co.id';

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

    // Build Physician entries for Structured Data
    const physiciansLd = doctors.map((d: Doctor) => ({
      '@context': 'https://schema.org',
      '@type': 'Physician',
      '@id': `${siteUrl}/doctors/${encodeURIComponent(String(d.id))}`,
      name: d.name,
      image: d.image_public_id ? `https://res.cloudinary.com/ddyqhlilj/image/upload/${d.image_public_id}` : undefined,
      medicalSpecialty: Array.isArray(d.specialty) ? d.specialty : [d.specialty],
      url: `${siteUrl}/jadwal-dokter#doctor-${d.id}`,
      worksFor: { '@type': 'Hospital', name: hospitalInfo.name }
    }));

  return (
    <div className="animate-fade-in">
  <StructuredData includeOrg={false} extra={[breadcrumbLd, pageLd, ...physiciansLd]} />
            <PageHeader
                title={t('jadwalDokterTitle')}
                subtitle={t('jadwalDokterSubtitle')}
                imagePublicId="polirsmeloy"
            />
            <DoctorsPageClient doctors={doctors} />
        </div>
    );
}
