
import React from 'react';
import { Metadata } from 'next';
import { translations } from "../../../lib/translations";
import PageHeader from '../../../components/layout/PageHeader';
<<<<<<< HEAD
import { Card, CardContent } from '../../../components/ui/Card';
import { Phone, Mail, MapPin } from '../../../components/icons';
import { sanitizeHtml } from '../../../lib/sanitize';
=======
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/Card';
import { Phone, Mail, MapPin, Calendar, WhatsAppIcon, Bot } from '../../../components/icons';
import { WhatsAppButton, ApamButton } from './RegistrationButtons';
import hospitalInfo from '@/data/hospitalInfo.json';
>>>>>>> d092fb3 (Fix hydration error and CSS loading issues)

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
    
    // Build contact info from hospitalInfo.json
    const fullAddress = `${hospitalInfo.address.street}, ${hospitalInfo.address.district}, ${hospitalInfo.address.city}, ${hospitalInfo.address.province} ${hospitalInfo.address.postalCode}`;
    
    const contactInfo = [
        { 
            icon: Phone, 
            title: 'Telepon UGD (24 Jam)', 
            content: hospitalInfo.contact.phone, 
            href: `tel:${hospitalInfo.contact.phone.replace(/[^0-9+]/g, '')}` 
        },
        { 
            icon: Phone, 
            title: 'WhatsApp', 
            content: hospitalInfo.contact.whatsapp, 
            href: `https://wa.me/${hospitalInfo.contact.whatsapp.replace(/[^0-9]/g, '')}` 
        },
        { 
            icon: Mail, 
            title: 'Email', 
            content: hospitalInfo.contact.email, 
            href: `mailto:${hospitalInfo.contact.email}` 
        },
        { 
            icon: MapPin, 
            title: 'Alamat', 
            content: fullAddress, 
            href: `https://www.google.com/maps/search/?api=1&query=${hospitalInfo.googleMaps.latitude},${hospitalInfo.googleMaps.longitude}` 
        }
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
                        <div className="lg:col-span-1 space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-primary mb-6">{t('infoKontak')}</h3>
                                <div className="space-y-4">
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
                            </div>
                            
                            {/* Business Hours */}
                            <div>
                                <h3 className="text-2xl font-bold text-primary mb-6">Jam Operasional</h3>
                                <div className="space-y-3">
                                    {hospitalInfo.businessHours.map((hours, index) => (
                                        <div key={index} className="border-l-4 border-primary/30 pl-4">
                                            <p className="font-semibold text-foreground">{hours.days}</p>
                                            <p className="text-primary font-medium">{hours.hours}</p>
                                            <p className="text-sm text-muted-foreground">{hours.note}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {/* Registration Methods Section */}
                        <div className="lg:col-span-3 mt-12">
                            <h3 className="text-3xl font-bold text-primary mb-8 text-center">Cara Pendaftaran & Bantuan</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* WhatsApp Registration Card */}
                                <Card className="border-2 border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:shadow-lg">
                                    <CardHeader className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                                <WhatsAppIcon className="h-6 w-6 text-green-600" />
                                            </div>
                                            <CardTitle className="text-xl text-green-700">Pendaftaran WhatsApp</CardTitle>
                                        </div>
                                        <CardDescription className="text-base">
                                            Untuk <span className="font-semibold text-green-700">Pasien Baru</span>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-3">
                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-semibold text-foreground">Nomor WhatsApp:</span> {hospitalInfo.contact.whatsapp}
                                            </p>
                                            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                                                <p className="font-semibold text-sm mb-2 text-green-800 dark:text-green-200">Cara Pendaftaran:</p>
                                                <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                                                    <li>Klik tombol WhatsApp di bawah atau hubungi langsung</li>
                                                    <li>Sampaikan bahwa Anda adalah pasien baru</li>
                                                    <li>Siapkan data diri: Nama lengkap, NIK, tanggal lahir, alamat</li>
                                                    <li>Sebutkan keluhan dan dokter spesialis yang dituju</li>
                                                    <li>Staf kami akan membantu proses pendaftaran Anda</li>
                                                </ol>
                                            </div>
                                            <p className="text-xs text-muted-foreground italic">
                                                💡 Tim kami akan merespons pesan Anda pada jam operasional: Senin-Sabtu, 08:00-14:00 WITA
                                            </p>
                                        </div>
                                        <WhatsAppButton whatsappNumber={hospitalInfo.contact.whatsapp} />
                                    </CardContent>
                                </Card>

                                {/* APAM Registration Card */}
                                <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                                    <CardHeader className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Calendar className="h-6 w-6 text-primary" />
                                            </div>
                                            <CardTitle className="text-xl">APAM (Aplikasi Pendaftaran Antrian Mandiri)</CardTitle>
                                        </div>
                                        <CardDescription className="text-base">
                                            Untuk <span className="font-semibold text-primary">Pasien Lama/Terdaftar</span>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-3">
                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-semibold text-foreground">Website APAM:</span>{' '}
                                                <a href="https://apam.rsumeloy.co.id" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                    apam.rsumeloy.co.id
                                                </a>
                                            </p>
                                            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                                                <p className="font-semibold text-sm mb-2 text-primary">Cara Pendaftaran:</p>
                                                <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                                                    <li>Kunjungi website APAM atau klik tombol di bawah</li>
                                                    <li>Login menggunakan Nomor Rekam Medis (No. RM) Anda</li>
                                                    <li>Pilih poli/dokter yang ingin dikunjungi</li>
                                                    <li>Pilih jadwal dan waktu kunjungan</li>
                                                    <li>Konfirmasi pendaftaran dan simpan nomor antrian Anda</li>
                                                </ol>
                                            </div>
                                            <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                                                <p className="text-xs text-amber-800 dark:text-amber-200">
                                                    <span className="font-semibold">⏰ Jam Operasional APAM:</span><br/>
                                                    Senin - Sabtu: 08:00 - 14:00 WITA<br/>
                                                    <span className="italic">Minggu & Tanggal Merah: Tutup (kecuali UGD 24 jam)</span>
                                                </p>
                                            </div>
                                            <p className="text-xs text-muted-foreground italic">
                                                ℹ️ Jika Anda lupa No. RM, silakan hubungi bagian pendaftaran atau gunakan WhatsApp
                                            </p>
                                        </div>
                                        <ApamButton />
                                    </CardContent>
                                </Card>

                                {/* AI Assistant Card */}
                                <Card className="border-2 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg">
                                    <CardHeader className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                                                <Bot className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <CardTitle className="text-xl text-purple-700">Asisten AI</CardTitle>
                                        </div>
                                        <CardDescription className="text-base">
                                            Bantuan <span className="font-semibold text-purple-700">24/7</span> untuk Pertanyaan Umum
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-3">
                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-semibold text-foreground">Tersedia:</span> 24 jam, 7 hari seminggu
                                            </p>
                                            <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                                                <p className="font-semibold text-sm mb-2 text-purple-800 dark:text-purple-200">Yang Bisa Ditanyakan:</p>
                                                <ul className="text-sm space-y-2 list-disc list-inside text-muted-foreground">
                                                    <li>Jadwal praktek dokter spesialis</li>
                                                    <li>Informasi layanan dan fasilitas rumah sakit</li>
                                                    <li>Cara pendaftaran pasien (APAM & WhatsApp)</li>
                                                    <li>Lokasi dan jam operasional</li>
                                                    <li>Informasi kesehatan umum dan tips</li>
                                                </ul>
                                            </div>
                                            <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                                                <p className="text-xs text-amber-800 dark:text-amber-200">
                                                    <span className="font-semibold">⚠️ Penting:</span><br/>
                                                    Asisten AI hanya memberikan informasi umum. Untuk diagnosis dan penanganan medis, konsultasikan langsung dengan dokter kami.
                                                </p>
                                            </div>
                                            <p className="text-xs text-muted-foreground italic">
                                                💡 Klik tombol AI dengan icon robot di pojok kanan bawah layar untuk memulai
                                            </p>
                                        </div>
                                        <div className="p-4 bg-gradient-to-r from-purple-500/10 to-primary/10 rounded-lg border-2 border-dashed border-purple-300 dark:border-purple-700 text-center">
                                            <Bot className="h-8 w-8 mx-auto mb-2 text-purple-600 animate-pulse" />
                                            <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                                                Lihat tombol AI di pojok kanan bawah →
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Klik untuk memulai percakapan
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            
                            {/* Additional Info */}
                            <div className="mt-6 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                                <h4 className="font-bold text-lg mb-3 text-primary">📝 Informasi Penting</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><strong>Pasien Baru:</strong> Belum pernah berobat di RSU Meloy atau belum memiliki Nomor Rekam Medis (No. RM)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><strong>Pasien Lama:</strong> Sudah pernah berobat dan memiliki Nomor Rekam Medis (No. RM)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><strong>UGD 24 Jam:</strong> Untuk kondisi darurat, langsung datang ke UGD atau hubungi {hospitalInfo.contact.phone}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><strong>Pertanyaan Umum:</strong> Hubungi kami via WhatsApp atau telepon pada jam operasional</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><strong>Asisten AI:</strong> Butuh bantuan cepat? Klik tombol AI di pojok kanan bawah untuk bertanya seputar layanan, jadwal dokter, dan informasi kesehatan umum</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="lg:col-span-3 mt-8">
                             <h3 className="text-2xl font-bold text-primary mb-6">Lokasi Kami</h3>
                             <Card className="overflow-hidden shadow-lg">
                                <CardContent className="p-0">
                                     <iframe 
                                        className="w-full h-[450px] border-0"
                                        src={hospitalInfo.googleMaps.embedUrl}
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
