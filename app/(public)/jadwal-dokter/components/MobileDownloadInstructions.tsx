import React from 'react';
import { Card, CardContent } from '../../../../components/ui/Card';
import { Info } from '../../../../components/icons';

export const MobileDownloadInstructions: React.FC = () => {
  const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const isFacebookBrowser = () => {
    if (typeof window === 'undefined') return false;
    return /FBAN|FBAV|FB_IAB|FB4A/i.test(navigator.userAgent);
  };

  if (!isMobile()) return null;

  return (
    <Card className="mb-6 border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <h4 className="font-semibold text-blue-900 mb-2">
              📱 Petunjuk Download untuk Mobile
            </h4>
            
            {isFacebookBrowser() ? (
              <div className="space-y-2 text-blue-800">
                <p><strong>Anda menggunakan Facebook Browser:</strong></p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Tap tombol "⋮" di pojok kanan atas</li>
                  <li>Pilih "Open in External Browser"</li>
                  <li>Kemudian gunakan tombol "Unduh Jadwal"</li>
                </ol>
                <p className="text-xs mt-2">
                  <em>Atau coba tombol unduh di bawah - akan menghasilkan file HTML yang bisa dibuka dan di-print.</em>
                </p>
              </div>
            ) : (
              <div className="space-y-2 text-blue-800">
                <p><strong>Setelah download file HTML:</strong></p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Buka file di aplikasi browser</li>
                  <li>Tap menu "⋮" → Print/Cetak</li>
                  <li>Pilih "Save as PDF" atau "Simpan sebagai PDF"</li>
                  <li>Atau bagikan langsung dari browser</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};