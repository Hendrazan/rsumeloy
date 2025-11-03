"use client";

import React, { useState, useEffect } from 'react';
import { sanitizeHtml } from '@/lib/sanitize';

interface ClientSideContentProps {
    html: string;
    className?: string;
}

const ClientSideContent: React.FC<ClientSideContentProps> = ({ html, className = "prose lg:prose-lg max-w-none" }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className={className}></div>;
    }

    return <div className={className} dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }} />;
};

export default ClientSideContent;