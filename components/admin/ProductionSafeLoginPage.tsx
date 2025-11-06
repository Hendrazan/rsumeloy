"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useContextHooks';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../../components/ui/Card';
import { Loader2, ArrowLeft } from '../../components/icons';
import OptimizedImage from '../../components/ui/OptimizedImage';
import Link from 'next/link';

const ProductionSafeLoginPage: React.FC = () => {
    const { login, session, loading: authLoading } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState(0);

    useEffect(() => {
        if (!authLoading && session) {
            router.replace('/admin');
        }
    }, [session, authLoading, router]);

    // Client-side rate limiting
    const isRateLimited = () => {
        const now = Date.now();
        const lastAttempt = localStorage.getItem('lastLoginAttempt');
        const attempts = parseInt(localStorage.getItem('loginAttempts') || '0');
        
        if (lastAttempt) {
            const timeDiff = now - parseInt(lastAttempt);
            // Reset counter after 15 minutes
            if (timeDiff > 15 * 60 * 1000) {
                localStorage.setItem('loginAttempts', '0');
                return false;
            }
            // Block if more than 5 attempts in 15 minutes
            if (attempts >= 5) {
                return true;
            }
        }
        return false;
    };

    const updateLoginAttempts = () => {
        const now = Date.now();
        const attempts = parseInt(localStorage.getItem('loginAttempts') || '0');
        localStorage.setItem('loginAttempts', (attempts + 1).toString());
        localStorage.setItem('lastLoginAttempt', now.toString());
        setLoginAttempts(attempts + 1);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Check client-side rate limiting
        if (isRateLimited()) {
            setError('Terlalu banyak percobaan login. Silakan coba lagi dalam 15 menit.');
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            await login(email, password);
            // Clear login attempts on success
            localStorage.setItem('loginAttempts', '0');
            // Navigation is handled by the AuthContext
        } catch (err: any) {
            updateLoginAttempts();
            setError(err.message || 'Login gagal. Periksa kembali email dan password Anda.');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || session) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-100">
                <div className="text-center">
                    <Loader2 className="h-16 w-16 animate-spin text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Memuat...</p>
                </div>
            </div>
        );
    }

    const remainingAttempts = Math.max(0, 5 - loginAttempts);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Back to Home Link */}
                <div className="mb-6">
                    <Link 
                        href="/" 
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Kembali ke Beranda
                    </Link>
                </div>

                <Card className="shadow-xl border-0">
                    <CardHeader className="text-center pb-4">
                        <div className="mx-auto mb-4 relative w-20 h-20">
                            <OptimizedImage
                                publicId="logo_rsmeloy_web"
                                alt="Logo RSU Meloy"
                                width={80}
                                height={80}
                                className="rounded-full object-contain"
                            />
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-900">
                            Admin Login
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Masuk ke dashboard admin RSU Meloy
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
                                {error}
                                {loginAttempts > 0 && (
                                    <div className="mt-1 text-xs">
                                        Sisa percobaan: {remainingAttempts}/5
                                    </div>
                                )}
                            </div>
                        )}
                        
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="admin@rsumeloy.com"
                                    disabled={loading}
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="••••••••"
                                    disabled={loading}
                                />
                            </div>
                            
                            <Button
                                type="submit"
                                disabled={loading || isRateLimited()}
                                className="w-full"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Memproses...
                                    </>
                                ) : (
                                    'Masuk'
                                )}
                            </Button>
                        </form>
                        
                        <div className="text-center text-xs text-gray-500 mt-4">
                            Akses terbatas untuk admin yang berwenang
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProductionSafeLoginPage;