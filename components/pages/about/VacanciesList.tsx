
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Briefcase, MapPin, Calendar } from '../../icons';
import { formatDate, truncateText } from '../../../lib/utils';
import { Vacancy } from '../../../types';
import OptimizedImage from '../../ui/OptimizedImage';
import { sanitizeHtml } from '../../../lib/sanitize';

interface VacanciesListProps {
    vacancies: Vacancy[];
}

const VacanciesList: React.FC<VacanciesListProps> = ({ vacancies }) => {
    // Helper untuk extract plain text dari HTML untuk preview
    const getPlainTextPreview = (html: string, maxLength: number = 150) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        const text = div.textContent || div.innerText || '';
        return truncateText(text, maxLength);
    };

    return (
        <div className="mt-8">
            <div className="columns-1 md:columns-2 gap-8 space-y-8">
                {vacancies.length > 0 ? (vacancies.map((vacancy) => (
                    <Card key={vacancy.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl break-inside-avoid">
                        {/* Gambar lowongan jika ada */}
                        {vacancy.image_public_id && (
                            <div className="w-full h-48 overflow-hidden bg-secondary">
                                <OptimizedImage
                                    publicId={vacancy.image_public_id}
                                    alt={vacancy.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        
                        <CardHeader>
                            <CardTitle className="mb-2 text-xl">{vacancy.title}</CardTitle>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /><span>{vacancy.type}</span></div>
                                <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /><span>{vacancy.location}</span></div>
                            </div>
                        </CardHeader>
                        
                        <CardContent className="flex-1">
                            {/* Preview deskripsi (plain text) */}
                            {typeof window !== 'undefined' ? (
                                <p className="line-clamp-4 text-muted-foreground">
                                    {getPlainTextPreview(vacancy.description)}
                                </p>
                            ) : (
                                <p className="line-clamp-4 text-muted-foreground">
                                    {truncateText(vacancy.description, 150)}
                                </p>
                            )}
                        </CardContent>
                        
                        <CardFooter className="p-6 bg-secondary/80 flex-wrap justify-between items-center gap-4">
                            <div className="flex items-center gap-1.5 text-sm text-destructive font-medium">
                                <Calendar className="h-4 w-4"/>
                                <span>Batas Akhir: {formatDate(vacancy.deadline)}</span>
                            </div>
                            <Button asChild>
                                <a 
                                    href={`mailto:rsu_meloy@yahoo.co.id?subject=Lamaran%20Pekerjaan%20-%20Posisi:%20${vacancy.title}`}
                                    title={`Kirim email lamaran untuk posisi ${vacancy.title}`}
                                >
                                    Kirim Lamaran
                                </a>
                            </Button>
                        </CardFooter>
                    </Card>
                ))) : (
                    <div className="col-span-full text-center py-16 text-muted-foreground">
                        <p>Saat ini belum ada lowongan pekerjaan yang tersedia.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VacanciesList;
