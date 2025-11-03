
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '../../../../components/layout/PageHeader';
import { translations } from '../../../../lib/translations';
import { navItemsConfig } from '../../../../lib/navigation';
import { getArticles, getPartners, getVacancies } from '../../../../lib/data';

// Import components for each subpage
import ProfileContent from '../../../../components/pages/about/ProfileContent';
import ArticlesList from '../../../../components/pages/about/ArticlesList';
import PartnersList from '../../../../components/pages/about/PartnersList';
import VacanciesList from '../../../../components/pages/about/VacanciesList';

interface PageProps {
  params: { subPage: string };
}

const aboutSubmenu = navItemsConfig.find(item => item.id === 'about')?.submenu;

export async function generateStaticParams() {
    // We filter out 'health-articles' because it has a separate detail page structure
    // and will be handled by /tentang/artikel/[slug]
    const validSubPages = aboutSubmenu?.filter(item => item.path.startsWith('/tentang/')) || [];
    return validSubPages.map(item => ({
        subPage: item.id,
    })) || [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const t = (key: string) => translations['id'][key] || key;
    const subPageInfo = aboutSubmenu?.find(item => item.id === params.subPage);

    if (!subPageInfo) {
        return { title: 'Halaman Tidak Ditemukan' };
    }

    // Enhanced SEO for Profile page (most important about page)
    if (params.subPage === 'profile') {
        return {
            title: `Profil & Sejarah - Rumah Sakit Terbaik di Sangatta | RSU Meloy`,
            description: `Profil lengkap RSU Meloy: Rumah sakit terpercaya di Sangatta sejak didirikan. Visi misi pelayanan kesehatan berkualitas, akreditasi nasional, tim medis profesional, dan komitmen kesehatan masyarakat Kalimantan Timur.`,
            keywords: [
                // Primary corporate keywords
                'profil rumah sakit sangatta',
                'profil rsu meloy',
                'tentang rsu meloy',
                'sejarah rumah sakit sangatta',
                
                // Trust & Quality
                'rumah sakit terbaik sangatta',
                'rumah sakit terpercaya sangatta',
                'akreditasi rumah sakit sangatta',
                'sertifikasi rsu meloy',
                'standar pelayanan rumah sakit sangatta',
                
                // Vision & Mission
                'visi misi rsu meloy',
                'nilai rumah sakit sangatta',
                'komitmen pelayanan kesehatan',
                
                // Team & Service
                'tim medis rsu meloy',
                'dokter profesional sangatta',
                'tenaga kesehatan sangatta',
                'pelayanan ramah rsu meloy',
                
                // Regional positioning
                'rumah sakit unggulan kalimantan timur',
                'rs terbaik kutai timur',
                'rumah sakit modern sangatta utara',
                'pusat kesehatan kaltim',
                
                // Awards & Recognition
                'penghargaan rumah sakit sangatta',
                'prestasi rsu meloy',
                'akreditasi paripurna sangatta'
            ],
            alternates: {
                canonical: '/tentang/profile',
            },
            openGraph: {
                title: 'Profil & Sejarah RSU Meloy - Rumah Sakit Terbaik Sangatta',
                description: 'Rumah sakit terpercaya di Sangatta dengan akreditasi nasional, tim medis profesional, dan komitmen pelayanan kesehatan berkualitas untuk Kalimantan Timur.',
                url: '/tentang/profile',
                type: 'website',
                images: [{
                    url: 'https://res.cloudinary.com/ddyqhlilj/image/upload/gedungrsmeloymalam',
                    width: 1200,
                    height: 630,
                    alt: 'Profil RSU Meloy - Rumah Sakit Terbaik Sangatta'
                }]
            },
            twitter: {
                card: 'summary_large_image',
                title: 'Profil RSU Meloy - Rumah Sakit Terbaik Sangatta',
                description: 'Rumah sakit terpercaya dengan akreditasi nasional, tim medis profesional, pelayanan berkualitas',
            },
        };
    }

    // Default metadata for other subpages
    return {
        title: `${t(subPageInfo.labelKey)} | RSU Meloy`,
        description: t(subPageInfo.subtitleKey),
        alternates: {
            canonical: `/tentang/${params.subPage}`,
        },
    };
}

export default async function AboutSubPage({ params }: PageProps) {
    const { subPage } = params;
    const t = (key: string) => translations['id'][key] || key;

    const subPageInfo = aboutSubmenu?.find(item => item.id === params.subPage);
    if (!subPageInfo) {
        notFound();
    }
    
    let contentComponent;

    switch(subPage) {
        case 'profile':
            contentComponent = <ProfileContent />;
            break;
        case 'partners':
            const partners = await getPartners();
            contentComponent = <PartnersList partners={partners} />;
            break;
        case 'vacancies':
            const vacancies = await getVacancies();
            contentComponent = <VacanciesList vacancies={vacancies} />;
            break;

        default:
            notFound();
    }

    return (
        <div className="animate-fade-in">
            <PageHeader
                title={t(subPageInfo.labelKey)}
                subtitle={t(subPageInfo.subtitleKey)}
                imagePublicId={
                    subPage === 'profile' ? '2014rsmeloysangatta' : 'gedungrsmeloymalam'
                }
            />
            <div className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    {contentComponent}
                </div>
            </div>
        </div>
    );
}
