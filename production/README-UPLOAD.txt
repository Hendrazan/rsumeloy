# ========================================
# INSTRUKSI UPLOAD KE JAGOANHOSTING
# ========================================

## PENTING - Langkah Sebelum Upload:

1. RENAME FILE:
   - Ubah .env.local.template menjadi .env.local
   - Isi semua nilai environment variables dengan data produksi

2. PASTIKAN ENVIRONMENT VARIABLES SUDAH BENAR:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
   - GEMINI_API_KEY
   - SESSION_SECRET

## Struktur Upload dengan WinSCP:

Upload SEMUA isi folder 'production' ke ROOT public_html:

public_html/
  ├── .next/
  │   ├── server/           (dari standalone)
  │   └── static/           (dari .next/static)
  ├── public/               (folder public)
  ├── node_modules/         (dari standalone - minimal)
  ├── package.json          (dari standalone)
  ├── server.js             (dari standalone)
  └── .env.local            (WAJIB isi dulu!)

## Cara Upload dengan WinSCP FTP:

1. Buka WinSCP
2. Protokol: FTP
3. Host: ftp.yourdomain.com (dari JagoanHosting)
4. Username: username FTP Anda
5. Password: password FTP Anda
6. Port: 21

7. Koneksi dan masuk ke folder public_html
8. Upload SEMUA isi folder 'production' ke public_html

## Setelah Upload:

1. Pastikan file .env.local sudah ada dan terisi
2. Set permission server.js: 755
3. Jalankan: node server.js
4. Atau setup PM2: pm2 start server.js --name rsumeloy

## Ukuran Upload:
- Total: ~60-90 MB
- node_modules: ~40-60 MB (minimal, bukan 400-800 MB)
- .next: ~15-25 MB
- public: ~5-10 MB

## Kontak Support:
- JagoanHosting: support@jagoanhosting.com
- Dokumentasi lengkap: Lihat PANDUAN_UPLOAD_FTP_PRODUKSI.md

========================================
