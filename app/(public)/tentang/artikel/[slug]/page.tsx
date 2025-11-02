
import { getArticleBySlug, getArticles } from "../../../../../lib/data";
import type { Article } from "../../../../../types/models";
import { truncateText, getPlainText } from "../../../../../lib/utils";
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleContent from './ArticleContent';
import StructuredData from '@/components/StructuredData';

export async function generateStaticParams() {
    const articles = await getArticles();
    return articles.map((article: Article) => ({
        slug: article.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const article = await getArticleBySlug(params.slug);
    if (!article) {
        return {
            title: 'Artikel Tidak Ditemukan',
        };
    }
    return {
        title: `${article.title} | RSU Meloy`,
        description: truncateText(getPlainText(article.content), 160),
        openGraph: {
            title: article.title,
            description: truncateText(getPlainText(article.content), 160),
            images: [
                {
                    url: `https://res.cloudinary.com/ddyqhlilj/image/upload/w_1200,h_630,c_fill/${article.image_public_id}`,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
            type: 'article',
            publishedTime: article.created_at,
            authors: [article.author],
        },
    };
}


export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
    const article = await getArticleBySlug(params.slug);

    if (!article) {
        notFound();
    }

    // Build Article JSON-LD
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rsumeloy.com';
    const articleUrl = `${siteUrl}/tentang/artikel/${params.slug}`;
    const articleLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.content ? article.content.substring(0, 200) : undefined,
        image: article.image_public_id ? `https://res.cloudinary.com/ddyqhlilj/image/upload/${article.image_public_id}` : undefined,
        author: article.author ? { '@type': 'Person', name: article.author } : undefined,
        publisher: {
            '@type': 'Organization',
            name: 'RSU Meloy',
            logo: { '@type': 'ImageObject', url: `${siteUrl}/favicon.ico` }
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
        datePublished: article.created_at ? new Date(article.created_at).toISOString() : undefined,
        dateModified: (article.updated_at || article.created_at) ? new Date((article.updated_at || article.created_at) as string).toISOString() : undefined,
        url: articleUrl,
    };

    return (
        <>
                <StructuredData includeOrg={false} extra={articleLd} />
            <ArticleContent article={article} />
        </>
    );
}
