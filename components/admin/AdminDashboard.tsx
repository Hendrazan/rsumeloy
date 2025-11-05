
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useData, useAuth } from '../../hooks/useContextHooks';
import { Loader2 } from '../../components/icons';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import StatCard from '../../components/admin/StatCard';
import ManageCollection from './ManageCollection';
import { collectionConfigs } from '../../lib/collectionConfig';
import { TableName } from '../../types';
import DatabaseFixWarning from '../../components/admin/DatabaseFixWarning';

const AdminDashboard: React.FC = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TableName>('doctors');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [renderError, setRenderError] = useState<string | null>(null);
    
    // Always call hooks at the top level
    const { session, loading: authLoading } = useAuth();
    const data = useData();
    const { missingTables } = data;

    // Redirect to login if not authenticated
    useEffect(() => {
        try {
            if (!authLoading && !session) {
                router.replace('/admin/login');
            }
        } catch (error) {
            console.error('Auth redirect error:', error);
            setRenderError('Gagal melakukan redirect ke login');
        }
    }, [session, authLoading, router]);

    useEffect(() => {
        // Prevent auto refresh when tab visibility changes
        const handleVisibilityChange = () => {
            // Do nothing when visibility changes
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    // Show error if there's a render error
    if (renderError) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">
                        Error Loading Admin Dashboard
                    </h1>
                    <p className="text-gray-600 mb-4">{renderError}</p>
                    <button
                        onClick={() => {
                            setRenderError(null);
                            window.location.reload();
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Refresh Halaman
                    </button>
                </div>
            </div>
        );
    }

    // Show loading while checking auth or loading data
    if (authLoading || !session || data.loading) {
        return <div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>;
    }

    const getCollectionCount = (collectionName: TableName) => {
        return data[collectionName]?.length || 0;
    }
    
    const statCollections: TableName[] = ['doctors', 'services', 'facilities', 'articles'];

    return (
        <div className="min-h-screen w-full bg-gray-100 text-gray-800">
            <AdminSidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
            <div className="md:ml-64 flex flex-col flex-1">
                <AdminHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="p-6 md:p-10">
                    {missingTables.length > 0 && (
                        <DatabaseFixWarning missingTables={missingTables} />
                    )}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {statCollections.map(name => (
                            <StatCard 
                                key={name}
                                title={`Total ${collectionConfigs[name].title}`}
                                value={getCollectionCount(name)} 
                                icon={collectionConfigs[name].icon} 
                            />
                        ))}
                    </div>
                    <div className="mt-8">
                        <ManageCollection collectionName={activeTab} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
