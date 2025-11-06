
"use client";

import React, { useState, useMemo, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useLanguage } from '../../../hooks/useContextHooks';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Avatar, AvatarImage, AvatarFallback } from '../../../components/ui/Avatar';
import { Badge } from '../../../components/ui/Badge';
import { FileDown, Loader2 } from '../../../components/icons';
import { Doctor } from '../../../types';
import { getOptimizedUrl } from '../../../lib/cloudinary';
import { PrintableSchedule } from '../../../components/features/PrintableSchedule';
import { sanitizeHtml } from '../../../lib/sanitize';
import { MobileDownloadInstructions } from './components/MobileDownloadInstructions';

interface DoctorsPageClientProps {
    doctors: Doctor[];
    scheduleNote: string | null;
}

const DoctorsPageClient: React.FC<DoctorsPageClientProps> = ({ doctors, scheduleNote }) => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('Semua');
    const [isPrinting, setIsPrinting] = useState(false);
    const printableRef = useRef<HTMLDivElement>(null);

    const specialties = useMemo(() => ['Semua', ...Array.from(new Set(doctors.map(d => d.specialty)))], [doctors]);
    
    const filteredDoctors = useMemo(() => {
        return doctors.filter(doctor => {
            const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSpecialty = selectedSpecialty === 'Semua' || doctor.specialty === selectedSpecialty;
            return matchesSearch && matchesSpecialty;
        });
    }, [doctors, searchTerm, selectedSpecialty]);
    
    const handlePrint = async () => {
        if (!printableRef.current || isPrinting) return;
        setIsPrinting(true);
        try {
            // Check if mobile or in-app browser
            const isMobileDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const isInAppBrowser = /FBAN|FBAV|FB_IAB|FB4A|Instagram|Line|WhatsApp|WeChat/i.test(navigator.userAgent);
            
            if (isMobileDevice || isInAppBrowser) {
                // Mobile-friendly download as HTML
                await handleMobileDownload();
            } else {
                // Desktop PDF download
                const canvas = await html2canvas(printableRef.current, {
                    scale: 2,
                    useCORS: true, 
                });
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'landscape',
                    unit: 'px',
                    format: [canvas.width, canvas.height]
                });
                pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
                pdf.save(`Jadwal-Dokter-RSU-Meloy-${new Date().toLocaleDateString('id-ID')}.pdf`);
            }
        } catch (error) {
            console.error("Gagal membuat file:", error);
            alert("Terjadi kesalahan saat mencoba membuat file. Silakan coba lagi.");
        } finally {
            setIsPrinting(false);
        }
    };

    // Mobile download handler
    const handleMobileDownload = async () => {
        const currentDate = new Date().toLocaleDateString('id-ID');
        
        const htmlContent = `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jadwal Dokter RSU Meloy - ${currentDate}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background: white;
            color: black;
            line-height: 1.6;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #006d77;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #006d77;
            margin-bottom: 5px;
        }
        .address {
            font-size: 14px;
            color: #666;
        }
        .date {
            font-size: 16px;
            margin-top: 10px;
            color: #333;
        }
        .doctor-card {
            border: 1px solid #ddd;
            margin-bottom: 20px;
            padding: 15px;
            border-radius: 8px;
            background: #f9f9f9;
        }
        .doctor-name {
            font-size: 18px;
            font-weight: bold;
            color: #006d77;
            margin-bottom: 5px;
        }
        .specialty {
            font-size: 16px;
            color: #333;
            margin-bottom: 10px;
        }
        .schedule {
            background: white;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 10px;
        }
        .status {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
        }
        .status.praktek {
            background: #10b981;
            color: white;
        }
        .status.tutup {
            background: #ef4444;
            color: white;
        }
        .notes {
            font-size: 12px;
            color: #666;
            margin-top: 10px;
            font-style: italic;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
        }
        @media print {
            body { margin: 0; }
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">RSU MELOY</div>
        <div class="address">Jl. Yos Sudarso II No.101, Sangatta Utara</div>
        <div class="date">Jadwal Dokter - ${currentDate}</div>
    </div>

    <div class="content">
        ${filteredDoctors.map((doctor, index) => `
            <div class="doctor-card">
                <div class="doctor-name">${index + 1}. Dr. ${doctor.name}</div>
                <div class="specialty">${doctor.specialty}</div>
                <div class="schedule">
                    <strong>Jadwal Praktek:</strong> ${doctor.schedule || 'Sesuai perjanjian'}
                </div>
                <div>
                    <span class="status ${doctor.status === 'Praktek' ? 'praktek' : 'tutup'}">
                        ${doctor.status}${doctor.status_info ? ` (${doctor.status_info})` : ''}
                    </span>
                </div>
                ${doctor.notes ? `<div class="notes">${doctor.notes}</div>` : ''}
            </div>
        `).join('')}
    </div>

    <div class="footer">
        <p>Jadwal dapat berubah sewaktu-waktu. Untuk informasi lebih lanjut, hubungi (0549) 24222.</p>
        <p>&copy; ${new Date().getFullYear()} Rumah Sakit Umum Meloy. Seluruh hak cipta dilindungi.</p>
    </div>

    <script>
        // Auto print on mobile if requested
        if (window.location.hash === '#print') {
            window.print();
        }
    </script>
</body>
</html>`;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // Create download link
        const link = document.createElement('a');
        link.href = url;
        link.download = `Jadwal-Dokter-RSU-Meloy-${currentDate.replace(/\//g, '-')}.html`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        URL.revokeObjectURL(url);
        
        // Show instruction for mobile users
        setTimeout(() => {
            alert('File HTML berhasil diunduh!\n\nUntuk Android/iPhone:\n1. Buka file di aplikasi browser\n2. Gunakan menu Print untuk menyimpan sebagai PDF\n3. Atau bagikan langsung dari browser');
        }, 500);
    };


    return (
        <div className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <MobileDownloadInstructions />
                
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <input
                        type="text"
                        placeholder={t('cariNamaDokter')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow rounded-md border border-input bg-background px-4 py-2 text-base"
                    />
                    <select
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className="rounded-md border border-input bg-background px-4 py-2 text-base"
                        title="Filter berdasarkan spesialisasi dokter"
                        aria-label="Filter berdasarkan spesialisasi dokter"
                    >
                        {specialties.map(spec => <option key={spec} value={spec}>{spec}</option>)}
                    </select>
                    
                    <Button onClick={handlePrint} disabled={isPrinting}>
                        {isPrinting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileDown className="mr-2 h-4 w-4" />}
                        Unduh Jadwal
                    </Button>
                </div>
                
                {scheduleNote && (
                    <div className="mb-8 p-4 bg-secondary border border-border rounded-lg prose max-w-none">
                        <div id="schedule-note" dangerouslySetInnerHTML={{ __html: sanitizeHtml(scheduleNote) }}></div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map(doctor => (
                            <Card key={doctor.id} className="transition-shadow hover:shadow-lg">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Avatar className="h-20 w-20 border-2 border-primary/20">
                                        <AvatarImage src={getOptimizedUrl(doctor.image_public_id)} alt={doctor.name} />
                                        <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                                            {doctor.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-xl font-bold">{doctor.name}</h3>
                                        <p className="text-primary">{doctor.specialty}</p>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <p className="font-semibold text-sm">Jadwal Praktek:</p>
                                        <p>{doctor.schedule || 'Sesuai perjanjian'}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                         <Badge variant={doctor.status === 'Praktek' ? 'default' : 'destructive'} className="capitalize">
                                            {doctor.status}
                                         </Badge>
                                        {doctor.status_info && <p className="text-sm text-muted-foreground">{doctor.status_info}</p>}
                                    </div>
                                    {doctor.notes && <p className="text-xs text-muted-foreground pt-2 border-t mt-3">{doctor.notes}</p>}
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p className="md:col-span-3 text-center text-muted-foreground">{t('dokterTidakDitemukan')}</p>
                    )}
                </div>
                <div className="hidden">
                     <PrintableSchedule doctors={filteredDoctors} forwardedRef={printableRef} />
                </div>
            </div>
        </div>
    );
};

export default DoctorsPageClient;
