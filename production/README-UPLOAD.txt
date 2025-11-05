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

## PENTING - CloudLinux Node.js Selector:

JagoanHosting menggunakan CloudLinux dengan Node.js Selector.
node_modules TIDAK diupload! Akan dibuat otomatis sebagai symlink.

## Struktur Upload dengan WinSCP:

Upload SEMUA isi folder 'production' ke ROOT public_html:

public_html/
  ├── .next/
  │   ├── server/           (dari standalone)
  │   └── static/           (dari .next/static)
  ├── public/               (folder public)
  ├── package.json          (WAJIB - untuk install dependencies)
  ├── server.js             (dari standalone)
  └── .env.local            (WAJIB isi dulu!)

CATATAN: node_modules TIDAK diupload (akan dibuat otomatis)

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
4. Klik Create
5. Sistem akan otomatis:
   - Membuat symlink node_modules
   - Menjalankan npm install
   - Setup virtual environment
6. Klik Start/Restart

## Ukuran Upload:
- Total: ~5-10 MB (SANGAT KECIL!)
- node_modules: TIDAK DIUPLOAD (dibuat otomatis di server)
- .next: ~3-5 MB
- public: ~2-3 MB

## Kontak Support:
- JagoanHosting: support@jagoanhosting.com
- Dokumentasi lengkap: Lihat PANDUAN_UPLOAD_FTP_PRODUKSI.md

========================================
