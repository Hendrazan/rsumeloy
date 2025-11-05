"use client";

import React, { Suspense } from "react";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { Loader2 } from "@/components/icons";

// Error Boundary Component
class AdminErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Admin Dashboard Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Terjadi Kesalahan pada Admin Dashboard
            </h1>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message || 'Terjadi kesalahan yang tidak diketahui'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function AdminLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="text-center">
        <Loader2 className="h-16 w-16 animate-spin text-blue-500 mx-auto mb-4" />
        <p className="text-gray-600">Memuat Admin Dashboard...</p>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminErrorBoundary>
      <Suspense fallback={<AdminLoading />}>
        <AdminDashboard />
      </Suspense>
    </AdminErrorBoundary>
  );
}
