# ========================================
# INSTRUKSI UPLOAD KE JAGOANHOSTING
# ========================================

## PENTING - Langkah Sebelum Upload:

🚨 JANGAN UPLOAD .env.local KE HOSTING! 🚨

1. ENVIRONMENT VARIABLES:
   - JANGAN ubah .env.local.template
   - JANGAN upload file .env apapun
   - Environment variables akan diset di cPanel Node.js App

2. ENVIRONMENT VARIABLES YANG PERLU DISET DI CPANEL:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
   - GEMINI_API_KEY
   - SESSION_SECRET
   - NODE_ENV=production

## PENTING - CloudLinux Node.js Selector:

JagoanHosting menggunakan CloudLinux dengan Node.js Selector.
node_modules TIDAK diupload! Akan dibuat otomatis sebagai symlink.

## Struktur Upload dengan WinSCP:

Upload SEMUA isi folder 'production' ke ROOT public_html KECUALI .env files:

public_html/
  ├── .next/
  │   ├── server/           (dari standalone)
  │   └── static/           (dari .next/static)
  ├── public/               (folder public)
  ├── package.json          (WAJIB - untuk install dependencies)
  ├── server.js             (dari standalone)
  ├── app/                  (source files)
  └── data/                 (JSON data)

🚨 JANGAN UPLOAD:
- .env.local.template
- .env.local
- .env apapun
- node_modules (akan dibuat otomatis)

## Cara Upload dengan WinSCP FTP:

1. Buka WinSCP
2. Protokol: FTP
3. Host: ftp.yourdomain.com (dari JagoanHosting)
4. Username: username FTP Anda
5. Password: password FTP Anda
6. Port: 21

7. Koneksi dan masuk ke folder public_html
8. Upload SEMUA isi folder 'production' ke public_html

## Setelah Upload - Setup di cPanel:

1. Login ke cPanel JagoanHosting
2. Cari menu: Setup Node.js App
3. Create Application:
   - Node.js version: 18.x atau 20.x
   - Application mode: Production
   - Application root: public_html
   - Application startup file: server.js

4. SET ENVIRONMENT VARIABLES di cPanel:
   - Klik tab "Environment Variables"
   - Tambahkan satu per satu:
     * NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
     * NEXT_PUBLIC_SUPABASE_ANON_KEY = your_anon_key
     * NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = your_cloud_name
     * GEMINI_API_KEY = your_gemini_key
     * SESSION_SECRET = random_32_char_string
     * NODE_ENV = production

5. Klik Create
6. Sistem akan otomatis:
   - Membuat symlink node_modules
   - Menjalankan npm install
   - Setup virtual environment
7. Klik Start/Restart

## Ukuran Upload:
- Total: ~5-10 MB (SANGAT KECIL!)
- node_modules: TIDAK DIUPLOAD (dibuat otomatis di server)
- .next: ~3-5 MB
- public: ~2-3 MB

## Kontak Support:
- JagoanHosting: support@jagoanhosting.com
- Dokumentasi lengkap: Lihat PANDUAN_UPLOAD_FTP_PRODUKSI.md

========================================
