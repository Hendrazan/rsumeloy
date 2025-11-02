'use client';

import PageHeader from "../../../../../components/layout/PageHeader";
import { Button } from '../../../../../components/ui/Button';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { formatDate } from '../../../../../lib/utils';
import Link from 'next/link';
import ClientSideContent from "../../../../../components/ClientSideContent";
import React from 'react';
import type { Article } from '../../../../../types/models';

interface ArticleContentProps {
    article: Article;
}

export default function ArticleContent({ article }: ArticleContentProps) {
    return (
        <div className="animate-fade-in">
            <PageHeader
                title={article.title}
                imagePublicId={article.image_public_id || ''}
            />
            <div className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-8">
                             <Button variant="outline" asChild>
                                 <Link href="/tentang/artikel">
                                     <ArrowLeft className="mr-2 h-4 w-4" />
                                     Kembali ke Semua Artikel
                                 </Link>
                             </Button>
                         </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>{article.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(article.created_at)}</span>
                            </div>
                        </div>

                        <article className="prose lg:prose-lg max-w-none">
                            <ClientSideContent html={article.content} />
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
}