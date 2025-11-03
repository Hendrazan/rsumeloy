
import React from 'react';
import { Metadata } from 'next';
import { translations } from "../../../lib/translations";
import PageHeader from '../../../components/layout/PageHeader';
import { Card, CardContent } from '../../../components/ui/Card';
import { Phone, Mail, MapPin } from '../../../components/icons';
import { sanitizeHtml } from '../../../lib/sanitize';

// Define Note interface
interface Note {
  content: string;
}

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Kontak Kami - Telepon, Alamat, Emergency 24 Jam | RSU Meloy Sangatta`,
    description: `Hubungi RSU Meloy Sangatta: UGD 24 jam (0549) 24222, Pendaftaran Online APAM, Ambulance Emergency. Alamat: Jl. Yos Sudarso II No.101, Sangatta Utara, Kutai Timur, Kalimantan Timur. Layanan darurat tersedia setiap saat.`,
    keywords: [
      // Primary contact keywords
      'kontak rumah sakit sangatta',
      'nomor telepon rsu meloy',
      'alamat rumah sakit sangatta',
      'lokasi rsu meloy',
      
      // Emergency keywords (HIGH VALUE!)
      'nomor UGD sangatta',
      'telepon gawat darurat sangatta',
      'emergency 24 jam sangatta',
      'ambulance sangatta',
      'ambulance rsu meloy',
      'nomor darurat rumah sakit sangatta',
      
      // Online services
      'pendaftaran online rsu meloy',
      'apam rsu meloy',
      'booking online rumah sakit sangatta',
      'daftar online rsu meloy',
      
      // Location-specific
      'rumah sakit jl yos sudarso sangatta',
      'alamat rs sangatta utara',
      'lokasi rumah sakit kutai timur',
      'peta rumah sakit sangatta',
      'arah ke rsu meloy',
      
      // Contact methods
      'email rsu meloy',
      'whatsapp rumah sakit sangatta',
      'call center rs sangatta',
      
      // Regional
      'kontak rumah sakit kalimantan timur',
      'nomor darurat kaltim',
      'emergency sangatta utara'
    ],
    alternates: {
      canonical: '/kontak',
    },
    openGraph: {
      title: 'Kontak Kami - Emergency 24 Jam | RSU Meloy Sangatta',
      description: 'UGD 24 jam: (0549) 24222. Pendaftaran Online APAM. Ambulance Emergency. Jl. Yos Sudarso II No.101, Sangatta Utara. Siap melayani Anda kapan saja.',
      url: '/kontak',
      type: 'website',
      images: [{
        url: 'https://res.cloudinary.com/ddyqhlilj/image/upload/kontakrsmeloy_cv12fh',
        width: 1200,
        height: 630,
        alt: 'Kontak RSU Meloy Sangatta - Emergency 24 Jam'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Kontak RSU Meloy - Emergency 24 Jam',
      description: 'UGD: (0549) 24222 | Ambulance | Pendaftaran Online | Jl. Yos Sudarso II No.101, Sangatta Utara',
    },
  };
}

export default async function ContactPage() {
    const t = (key: string) => translations['id'][key] || key;
    
    // Initialize note with empty content
    const note: Note = {
        content: ''
    };
    
    const contactInfo = [
        { icon: Phone, title: 'Telepon UGD (24 Jam)', content: '(0549) 24222', href: 'tel:054924222' },
        { icon: Phone, title: 'Pendaftaran Online (APAM)', content: 'apam.rsumeloy.co.id', href: 'https://apam.rsumeloy.co.id' },
        { icon: Mail, title: 'Email', content: 'rsu_meloy@yahoo.co.id', href: 'mailto:rsu_meloy@yahoo.co.id' },
        { icon: MapPin, title: 'Alamat', content: 'Jl. Yos Sudarso II No.101, Sangatta Utara, Kab. Kutai Timur', href: 'https://www.google.com/maps/search/?api=1&query=RSU+Meloy+Sangatta' }
    ];

    return (
        <div className="animate-fade-in">
            <PageHeader
                title={t('kontakTitle')}
                subtitle={t('kontakSubtitle')}
                imagePublicId="kontakrsmeloy_cv12fh"
            />
            <div className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-1 space-y-6">
                            <h3 className="text-2xl font-bold text-primary">{t('infoKontak')}</h3>
                            {contactInfo.map((info, index) => (
                                <a key={index} href={info.href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                                    <div className="mt-1 flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <info.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold group-hover:text-primary transition-colors">{info.title}</p>
                                        <p className="text-muted-foreground">{info.content}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <div className="lg:col-span-2">
                             <Card className="overflow-hidden shadow-lg">
                                <CardContent className="p-0">
                                    {/* Google Maps Static API - No iframe blocking issues */}
                                    <a 
                                        href="https://www.google.com/maps/place/Rumah+Sakit+Meloy+Sangatta/@0.5051399,117.5327689,17z"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block relative group cursor-pointer"
                                        title="Klik untuk membuka Google Maps"
                                    >
                                        {/* Static Map Image from Google Maps Static API */}
                                        <div className="relative w-full h-[450px] bg-gray-200">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src="https://maps.googleapis.com/maps/api/staticmap?center=0.5051399,117.5353438&zoom=16&size=1200x450&markers=color:red%7Clabel:R%7C0.5051399,117.5353438&style=feature:poi%7Celement:labels%7Cvisibility:on&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                                                alt="Peta Lokasi RSU Meloy Sangatta"
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                                onError={(e) => {
                                                    // Fallback to OpenStreetMap if Google fails
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = "https://www.openstreetmap.org/export/embed.html?bbox=117.532%2C0.504%2C117.536%2C0.507&layer=mapnik&marker=0.5051399%2C117.5353438";
                                                }}
                                            />
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white px-6 py-3 rounded-lg shadow-xl transform scale-95 group-hover:scale-100">
                                                    <MapPin className="w-5 h-5 inline-block mr-2 text-primary" />
                                                    <span className="font-semibold text-primary">Buka di Google Maps</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Address overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                            <p className="text-white font-semibold">📍 RSU Meloy Sangatta</p>
                                            <p className="text-white/90 text-sm">Jl. Yos Sudarso II No.101, Sangatta Utara</p>
                                        </div>
                                    </a>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                     {note && (
                        <div className="mt-16 pt-12 border-t">
                            <div 
                                id="contact-note" 
                                className="max-w-4xl mx-auto prose"
                                dangerouslySetInnerHTML={{ __html: sanitizeHtml(note.content) }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
