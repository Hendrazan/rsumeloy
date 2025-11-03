
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

interface IframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  style?: React.CSSProperties;
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
                                     <iframe 
                                        className="w-full h-[450px] border-0"
                                        src="https://www.google.com/maps?q=RSU+Meloy+Sangatta,Jl.+Yos+Sudarso+II+No.101,+Sangatta+Utara,+Kutai+Timur,+Kalimantan+Timur&output=embed&z=16"
                                        allowFullScreen={true}
                                        loading="lazy" 
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Lokasi RSU Meloy di Google Maps"
                                    ></iframe>
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
