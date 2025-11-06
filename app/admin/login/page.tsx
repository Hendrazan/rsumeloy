import ProductionSafeLoginPage from "@/components/admin/ProductionSafeLoginPage";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login - RSU Meloy',
  description: 'Login halaman admin dashboard RSU Meloy',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLogin() {
  return <ProductionSafeLoginPage />;
}
