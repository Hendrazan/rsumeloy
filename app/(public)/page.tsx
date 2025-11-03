
import dynamic from 'next/dynamic';
import { getServices, getPartners, getInfo, getFacilities } from "../../lib/data";
import type { Service, Partner, Info, Facility } from "../../types";
import type { Metadata } from 'next';

// Enable SSR for better SEO - content needs to be crawlable
const HomePageClient = dynamic(() => import("./HomePageClient"), { ssr: true });

export const metadata: Metadata = {
  title: "RSU Meloy - Rumah Sakit Unggulan di Sangatta Utara, Kalimantan Timur",
  description: "RSU Meloy adalah rumah sakit terpercaya di Sangatta Utara dengan layanan medis 24 jam, dokter spesialis berpengalaman, fasilitas modern, dan komitmen pelayanan kesehatan terbaik untuk masyarakat Kalimantan Timur.",
  keywords: [
    "rumah sakit sangatta", 
    "RSU Meloy", 
    "rumah sakit kalimantan timur", 
    "UGD 24 jam", 
    "dokter spesialis", 
    "rawat inap", 
    "medical check up sangatta",
    "mcu sangatta", 
    "medical checkup kalimantan timur",
    "pemeriksaan kesehatan lengkap",
    "medical check up rsu meloy",
    "layanan kesehatan sangatta",
    "cek kesehatan menyeluruh"
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "RSU Meloy - Rumah Sakit Unggulan di Sangatta Utara",
    description: "Layanan kesehatan profesional dengan dokter spesialis, fasilitas modern, dan UGD 24 jam. Dipercaya masyarakat Sangatta dan Kalimantan Timur.",
    url: '/',
    type: 'website',
  },
};

export default async function HomePage() {
  // Implement safe data fetching with fallbacks
  let services: Service[] = [], partners: Partner[] = [], info: Info[] = [], facilities: Facility[] = [];
  
  try {
    const [servicesData, partnersData, infoData, facilitiesData] = await Promise.all([
      getServices().catch(() => []),
      getPartners().catch(() => []),
      getInfo().catch(() => []),
      getFacilities().catch(() => []),
    ]);
    
    services = servicesData;
    partners = partnersData;
    info = infoData;
    facilities = facilitiesData;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    // Continue with empty arrays if fetch fails
  }

  return (
    <HomePageClient 
      services={services} 
      partners={partners} 
      info={info} 
      facilities={facilities} 
    />
  );
}
