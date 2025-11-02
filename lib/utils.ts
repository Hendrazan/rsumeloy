

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
// DOMPurify removed: using simple stripHtml for server-safe plain text extraction

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateText = (text: string, maxLength: number): string => {
    if (!text || text.length <= maxLength) return text || '';
    return text.substring(0, maxLength).trim() + '...';
};

export type MaybeTimestamp = string | number | Date | { toDate: () => Date } | undefined;

function isTimestampLike(v: unknown): v is { toDate: () => Date } {
    return !!v && typeof (v as any).toDate === 'function';
}

export const formatDate = (dateValue?: MaybeTimestamp): string => {
    if (!dateValue) return 'Invalid Date';
    try {
        let date: Date;
        // Cek apakah objek memiliki metode .toDate(), khas untuk Firebase/Firebase-like Timestamps
        if (isTimestampLike(dateValue)) {
            date = dateValue.toDate();
        } else {
            date = new Date(dateValue as string | number | Date);
        }

        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    } catch (e) {
        console.error("Error formatting date:", e);
        return 'Invalid Date';
    }
};

export const stripHtml = (html: string): string => {
    if (!html) return '';
    // Remove HTML tags using regex
    return html
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
        .replace(/&amp;/g, '&') // Replace &amp; with &
        .replace(/&lt;/g, '<') // Replace &lt; with <
        .replace(/&gt;/g, '>') // Replace &gt; with >
        .replace(/&quot;/g, '"') // Replace &quot; with "
        .replace(/&#39;/g, "'") // Replace &#39; with '
        .trim();
};

export const getPlainText = (html: string): string => {
    if (!html) return '';
    
    // Use stripHtml for both server and client side
    return stripHtml(html);
};
