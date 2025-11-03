import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - RSU Meloy',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginRedirect() {
  redirect('/admin/login');
}
