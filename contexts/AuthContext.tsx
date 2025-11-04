
"use client";

import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';
import { AuthContextType, Session } from '../types';
import type { Database } from '../types/supabase';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: React.ReactNode;
}

// --- Supabase Configuration ---
// These credentials are safe to expose in the browser.
// Security is handled by Supabase's Row Level Security (RLS).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or Anon Key is missing. Ensure they are set in your environment variables.");
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const router = useRouter();
    // Use the browser client for client-side operations
    const supabase = useMemo(() => createBrowserClient<Database>(supabaseUrl, supabaseAnonKey), []);
    
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);

            // Redirect on auth state change
            if (_event === 'SIGNED_IN') {
                router.push('/admin');
            }
            if (_event === 'SIGNED_OUT') {
                router.push('/admin/login');
            }
        });
        
        // Fetch initial session
        const getInitialSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            setLoading(false);
        };
        getInitialSession();

        return () => subscription.unsubscribe();
    }, [supabase, router]);

    const login = useCallback(async (email: string, pass: string) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
            if (error) throw error;
            router.push('/admin'); // Manually trigger navigation
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }, [supabase, router]);

    const logout = useCallback(async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            router.push('/admin/login'); // Manually trigger navigation
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }, [supabase, router]);

    const value = useMemo(() => ({
        supabase,
        session,
        loading,
        login,
        logout
    }), [session, loading, supabase, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
