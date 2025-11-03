
import { getFacilities } from "../../../lib/data";
import type { Facility } from "../../../types/models";
import { translations } from "../../../lib/translations";
import { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from "../../../components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/Card";
import CardImageSlider from "../../../components/ui/CardImageSlider";
import { Button } from "../../../components/ui/Button";
import { ArrowRight } from "../../../components/icons";
import { truncateText, getPlainText } from "../../../lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Fasilitas Medis Lengkap & Modern | RSU Meloy Sangatta`,
    description: `Fasilitas kesehatan terlengkap di Sangatta: IGD 24 jam, Ruang Operasi modern, ICU/NICU, Laboratorium, Radiologi, CT Scan, USG 4D, Farmasi, Hemodialisa, dan Ambulance. Peralatan medis canggih dengan layanan profesional untuk kesehatan Anda.`,
    keywords: [
      // Primary facility keywords
      'fasilitas rumah sakit sangatta',
      'fasilitas rsu meloy',
      'peralatan medis sangatta',
      'fasilitas kesehatan sangatta',
      
      // Emergency & Critical Care
      'IGD 24 jam sangatta',
      'ruang gawat darurat sangatta',
      'ICU sangatta',
      'NICU sangatta',
      'ruang intensif sangatta',
      
      // Operating & Maternity
      'ruang operasi sangatta',
      'kamar operasi modern sangatta',
      'ruang bersalin sangatta',
      'persalinan normal sangatta',
      
      // Diagnostic Equipment
      'laboratorium klinik sangatta',
      'cek lab sangatta',
      'radiologi sangatta',
      'rontgen sangatta',
      'CT scan sangatta',
      'USG sangatta',
      'USG 4D sangatta',
      'ekg sangatta',
      
      // Pharmacy & Therapy
      'apotek rumah sakit sangatta',
      'farmasi rsu meloy',
      'hemodialisa sangatta',
      'cuci darah sangatta',
      'fisioterapi sangatta',
      
      // Inpatient facilities
      'rawat inap sangatta',
      'kamar pasien sangatta',
      'ruang perawatan vip sangatta',
      
      // Regional
      'fasilitas rumah sakit kalimantan timur',
      'peralatan medis kaltim',
      'rumah sakit modern sangatta utara'
    ],
    alternates: {
      canonical: '/fasilitas',
    },
    openGraph: {
      title: 'Fasilitas Medis Lengkap & Modern | RSU Meloy Sangatta',
      description: 'Fasilitas kesehatan terlengkap: IGD 24 jam, Ruang Operasi modern, ICU/NICU, Lab, Radiologi, CT Scan, USG 4D, Hemodialisa. Peralatan medis canggih untuk pelayanan terbaik.',
      url: '/fasilitas',
      type: 'website',
      images: [{
        url: 'https://res.cloudinary.com/ddyqhlilj/image/upload/ruang_operasi_shmxxc',
        width: 1200,
        height: 630,
        alt: 'Fasilitas Medis Modern RSU Meloy Sangatta'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Fasilitas Medis Lengkap & Modern | RSU Meloy',
      description: 'IGD 24 jam, Ruang Operasi, ICU/NICU, Lab, Radiologi, CT Scan, USG 4D, Hemodialisa - Fasilitas lengkap untuk kesehatan Anda',
    },
  };
}

export default async function FacilitiesPage() {
    const facilities = await getFacilities();
    const t = (key: string) => translations['id'][key] || key;
    return (
        <div className="animate-fade-in">
            <PageHeader
                title={t('fasilitasTitle')}
                subtitle={t('fasilitasSubtitle')}
                imagePublicId="ruang_operasi_shmxxc"
            />
            <div className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {facilities.map((facility: Facility) => {
                            const facilityImages = [facility.image_public_id_1, facility.image_public_id_2, facility.image_public_id_3].filter(Boolean) as string[];
                            return (
                                <Card key={facility.id} className="overflow-hidden flex flex-col transition-shadow hover:shadow-xl group break-inside-avoid">
                                    <Link href={`/fasilitas/${facility.slug}`} className="block w-full text-left">
                                        <CardHeader className="p-0">
                                            <div className="overflow-hidden">
                                                <CardImageSlider imagePublicIds={facilityImages} alt={facility.name} />
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-6 flex-1">
                                            <CardTitle className="mb-2 group-hover:text-primary transition-colors">{facility.name}</CardTitle>
                                            <CardDescription>{truncateText(getPlainText(facility.description), 120)}</CardDescription>
                                        </CardContent>
                                    </Link>
                                    <div className="p-6 pt-0 mt-auto">
                                        <Button asChild variant="link" className="p-0">
                                            <Link href={`/fasilitas/${facility.slug}`}>
                                                Lihat Detail <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
