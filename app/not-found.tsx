import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-4">Halaman Tidak Ditemukan</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Maaf, halaman yang Anda cari tidak tersedia atau mungkin telah dipindahkan.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg">
            <Link href="/">
              Kembali ke Beranda
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/kontak">
              Hubungi Kami
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Atau kunjungi halaman lainnya:
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            <Link href="/layanan" className="text-primary hover:underline">Layanan</Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/jadwal-dokter" className="text-primary hover:underline">Jadwal Dokter</Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/fasilitas" className="text-primary hover:underline">Fasilitas</Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/tentang" className="text-primary hover:underline">Tentang Kami</Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/konsultasi" className="text-primary hover:underline">Konsultasi AI</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
