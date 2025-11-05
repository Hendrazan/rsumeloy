# 📤 PANDUAN UPLOAD WEBSITE KE JAGOANHOSTING DENGAN WINSCP

## ⚠️ PENTING - CloudLinux Node.js Selector

**JagoanHosting menggunakan CloudLinux dengan Node.js Selector!**

### ❌ LARANGAN:
- **JANGAN upload folder `node_modules/`!**
- CloudLinux membuat `node_modules` sebagai **symlink otomatis**
- Upload node_modules akan **error**!

### ✅ SOLUSI:
- Folder `production/` sudah disiapkan **TANPA node_modules**
- CloudLinux akan otomatis install dependencies dari `package.json`
- node_modules dibuat sebagai symlink ke virtual environment

**Dokumentasi lengkap:** Lihat `PANDUAN_CLOUDLINUX_NODEJS.md`

---

## 📊 Status Folder Produksi

✅ **Folder produksi sudah siap!**
- Lokasi: `d:\AI DEV\BACKUP\rsumeloy\production`
- Ukuran: **8.99 MB** (CloudLinux compatible!)
- ✅ **TANPA node_modules** (akan dibuat otomatis oleh CloudLinux)

---

## 🎯 LANGKAH-LANGKAH UPLOAD

### STEP 1: Persiapan Environment Variables

**PENTING:** Sebelum upload, setup environment variables dulu!

1. Buka folder: `d:\AI DEV\BACKUP\rsumeloy\production`
2. Cari file: `.env.local.template`
3. **RENAME** menjadi: `.env.local`
4. **Edit** file tersebut dan isi dengan data production:

```env
# ========================================
# ENVIRONMENT VARIABLES - PRODUCTION
# RSU Meloy Sangatta
# ========================================

# Supabase Configuration (WAJIB)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Cloudinary Configuration (WAJIB)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

# Google Gemini AI (OPSIONAL - untuk AI Assistant)
GEMINI_API_KEY=AIzaSy...

# Session Secret (WAJIB - untuk keamanan)
SESSION_SECRET=generate_random_32_character_string_here

# Node Environment
NODE_ENV=production
```

**Cara Generate SESSION_SECRET:**
- Windows: `powershell -command "[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))"`
- Atau gunakan: https://generate-secret.vercel.app/32

---

### STEP 2: Download & Install WinSCP

1. **Download WinSCP:**
   - URL: https://winscp.net/eng/download.php
   - Pilih: **Installation package**
   - Ukuran: ~10 MB

2. **Install WinSCP:**
   - Double click installer
   - Next → Next → Install
   - Selesai

---

### STEP 3: Setup Koneksi FTP ke JagoanHosting

1. **Buka WinSCP**

2. **Login Dialog - Isi dengan data dari JagoanHosting:**

   ```
   File protocol:    FTP
   Encryption:       No encryption (atau TLS/SSL Explicit jika tersedia)
   Host name:        ftp.yourdomain.com  (atau IP dari JagoanHosting)
   Port number:      21
   User name:        username_ftp_anda
   Password:         password_ftp_anda
   ```

3. **Data FTP dari JagoanHosting bisa dilihat di:**
   - Login ke cPanel JagoanHosting
   - Menu: **FTP Accounts**
   - Atau cari di email welcome hosting

4. **Save Session (Opsional):**
   - Klik tombol **Save**
   - Nama: "RSU Meloy - JagoanHosting"
   - Centang: "Save password"
   - Klik **OK**

5. **Test Koneksi:**
   - Klik tombol **Login**
   - Jika muncul warning certificate, klik **Yes** atau **Continue**

---

### STEP 4: Upload File dengan WinSCP

**Setelah terkoneksi, Anda akan melihat 2 panel:**
- Panel KIRI: Komputer lokal Anda (Windows Explorer)
- Panel KANAN: Server hosting (FTP)

**Struktur Upload:**

```
Panel KIRI (Lokal)              Panel KANAN (Server)
d:\AI DEV\BACKUP\               /public_html/
rsumeloy\production\            
│                               │
├── .next/          ────────►   ├── .next/
├── public/         ────────►   ├── public/
├── app/            ────────►   ├── app/
├── data/           ────────►   ├── data/
├── package.json    ────────►   ├── package.json ⭐
├── server.js       ────────►   ├── server.js
└── .env.local      ────────►   └── .env.local (WAJIB!)

❌ node_modules/  (JANGAN DIUPLOAD!)
✅ node_modules akan dibuat otomatis oleh CloudLinux!
```

**Langkah Upload:**

1. **Panel KANAN (Server):**
   - Navigate ke folder: `/public_html/`
   - Atau folder root website Anda (bisa berbeda per hosting)

2. **Panel KIRI (Lokal):**
   - Navigate ke: `d:\AI DEV\BACKUP\rsumeloy\production`

3. **Pilih SEMUA file/folder di panel KIRI:**
   - Tekan: `Ctrl + A` (select all)
   - Atau pilih manual satu-persatu

4. **Drag & Drop atau Copy:**
   - **Cara 1:** Drag & Drop dari panel kiri ke panel kanan
   - **Cara 2:** Klik kanan → **Upload** → **OK**

5. **Transfer Options:**
   - Transfer mode: **Binary** (default)
   - Overwrite: **Yes** atau **Yes to All**
   - Preserve timestamp: **Yes**

6. **Tunggu proses upload:**
   - Progress bar akan muncul
   - Estimasi waktu: **5-10 menit** (tergantung koneksi internet)
   - Total ukuran: **8.99 MB** (sangat cepat!)

---

### STEP 5: Verifikasi Upload

**Cek apakah semua file sudah terupload:**

Di panel KANAN (Server), pastikan ada folder/file:

```
/public_html/
├── .next/
│   ├── server/        ✓ Ada?
│   └── static/        ✓ Ada?
├── public/
│   ├── manifest.json  ✓ Ada?
│   └── ...
├── app/               ✓ Ada?
├── data/              ✓ Ada?
├── package.json       ✓ Ada? (PENTING!)
├── server.js          ✓ Ada?
└── .env.local         ✓ Ada? (PENTING!)

❌ node_modules/       JANGAN ADA! (akan dibuat oleh CloudLinux)
```

**CHECKLIST FINAL:**

- [ ] ✓ Folder `.next/` ada dan lengkap
- [ ] ✓ Folder `.next/static/` ada (bukan kosong)
- [ ] ✓ Folder `public/` ada
- [ ] ✓ Folder `app/` ada
- [ ] ✓ Folder `data/` ada
- [ ] ✓ File `server.js` ada
- [ ] ✓ File `package.json` ada ⭐
- [ ] ✓ File `.env.local` ada dan SUDAH DIISI! ⭐
- [ ] ❌ **TIDAK ADA** folder `node_modules/` fisik!

---

### STEP 6: Setup CloudLinux Node.js Selector (WAJIB!)

**⚠️ PENTING:** JagoanHosting menggunakan CloudLinux Node.js Selector!

**Langkah Setup:**

1. **Login ke cPanel JagoanHosting**

2. **Cari menu: "Setup Node.js App" atau "Node.js Selector"**

3. **Klik: Create Application**

4. **Isi form dengan teliti:**

```
┌─────────────────────────────────────────────┐
│ Node.js version:   18.x (atau 20.x)        │
│ Application mode:  Production               │
│ Application root:  public_html              │
│ Application URL:   https://rsumeloy.co.id   │
│ Startup file:      server.js                │
│ Environment vars:  (skip - ada di .env.local) │
└─────────────────────────────────────────────┘
```

5. **Klik: Create**

6. **CloudLinux akan otomatis:**
   - ✓ Membaca `package.json`
   - ✓ Membuat virtual environment
   - ✓ Menjalankan `npm install --production`
   - ✓ Download semua dependencies
   - ✓ Membuat **symlink** `node_modules` → virtual_env
   - ✓ Setup environment

7. **Tunggu proses selesai (5-10 menit)**
   - Status akan berubah: Installing → Running

8. **Klik: Start / Restart**

**Verifikasi:**
```
Status: Running ✓
Node.js: 18.x ✓
Symlink: node_modules → /home/username/nodevenv/... ✓
```

---

### STEP 7: Verifikasi node_modules Symlink

**Di cPanel File Manager:**

1. Browse ke: `/public_html/`
2. Lihat folder `node_modules`
3. **PASTIKAN:** Ada icon symlink (➔ atau link symbol)
4. Klik kanan → Properties → Harus tertulis "Symbolic Link"

**❌ Jika `node_modules` adalah folder biasa:**
```
1. DELETE folder node_modules
2. Node.js Selector → Restart Application
3. Sistem akan buat ulang sebagai symlink
```

---

### STEP 8: Setup Domain (Jika diperlukan)

**Jika domain sudah pointing:**

1. Login ke **cPanel**
2. Menu: **Domains** atau **Addon Domains**
3. Set document root ke: `/public_html`

**Setup Node.js Application (sudah dilakukan di STEP 6):**

1. Di cPanel, cari: **Setup Node.js App**
2. Create Application (sudah selesai)
3. Application URL: `https://rsumeloy.co.id`

**Atau via .htaccess (jika JagoanHosting support):**

Buat file `.htaccess` di `/public_html/`:

```apache
# Redirect to Node.js server
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/socket.io
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

---

## 🔧 TROUBLESHOOTING

### Problem 1: "Cannot find module"

**Penyebab:** node_modules tidak terupload lengkap

**Solusi:**
```bash
cd public_html
npm install --production
```

### Problem 2: ".env.local not found"

**Penyebab:** Lupa upload atau rename file .env.local

**Solusi:**
- Pastikan file `.env.local` sudah ada di `/public_html/`
- Isi dengan environment variables yang benar

### Problem 3: "Port 3000 already in use"

**Penyebab:** Port bentrok dengan aplikasi lain

**Solusi:**
Edit `server.js`, ganti port:
```javascript
const port = process.env.PORT || 3001; // Ganti ke port lain
```

### Problem 4: Website tidak muncul

**Cek:**
1. Apakah `server.js` sudah running? (`pm2 status` atau `ps aux | grep node`)
2. Apakah domain sudah pointing ke server?
3. Apakah firewall blocking port?
4. Cek log error: `pm2 logs rsumeloy`

### Problem 5: Gambar tidak muncul

**Penyebab:** Folder `public/` tidak terupload atau `.next/static/` kosong

**Solusi:**
- Re-upload folder `public/`
- Re-upload folder `.next/static/`

---

## 📋 CHECKLIST SEBELUM UPLOAD

**Pre-Upload Checklist:**

- [ ] ✓ Build sudah selesai (`npm run build`)
- [ ] ✓ Folder `production/` sudah dibuat (jalankan `prepare-production.bat`)
- [ ] ✓ File `.env.local` sudah dibuat dan diisi
- [ ] ✓ Environment variables sudah benar (Supabase, Cloudinary, dll)
- [ ] ✓ WinSCP sudah terinstall
- [ ] ✓ Data FTP dari JagoanHosting sudah siap
- [ ] ✓ Koneksi internet stabil

**Upload Checklist:**

- [ ] ✓ Koneksi FTP berhasil
- [ ] ✓ Navigate ke folder `/public_html/`
- [ ] ✓ Upload SEMUA isi folder `production/`
- [ ] ✓ Verifikasi semua file terupload
- [ ] ✓ File `.env.local` ada dan terisi

**Post-Upload Checklist:**

- [ ] ✓ Login ke cPanel
- [ ] ✓ Setup Node.js Application
- [ ] ✓ Jalankan `node server.js` atau `pm2 start server.js`
- [ ] ✓ Test website di browser: `https://rsumeloy.co.id`
- [ ] ✓ Cek semua halaman berfungsi
- [ ] ✓ Cek gambar muncul
- [ ] ✓ Cek admin panel bisa login
- [ ] ✓ Cek AI Assistant berfungsi (jika GEMINI_API_KEY diisi)

---

## 📞 SUPPORT & DOKUMENTASI

**Dokumentasi Lengkap:**
- `PANDUAN_UPLOAD_FTP_PRODUKSI.md` - Penjelasan teknis standalone mode
- `ANALISIS_SEO_SCORE.md` - Analisis SEO website (92/100)
- `ANALISIS_POTENSI_ERROR.md` - Analisis error dan solusi
- `README-UPLOAD.txt` - Instruksi singkat (ada di folder production)

**JagoanHosting Support:**
- Website: https://jagoanhosting.com
- Live Chat: https://jagoanhosting.com/support
- Email: support@jagoanhosting.com
- WhatsApp: (cek di website)
- Ticket Support: Login ke client area

**Video Tutorial WinSCP:**
- Upload via FTP: https://www.youtube.com/results?search_query=winscp+ftp+tutorial
- JagoanHosting: https://www.youtube.com/results?search_query=jagoanhosting+upload+file

**Estimasi Waktu:**
- Persiapan .env.local: **5 menit**
- Upload via WinSCP: **10-15 menit**
- Setup di cPanel: **5-10 menit**
- Testing: **10 menit**
- **TOTAL: 30-40 menit**

---

## 🎉 SELAMAT!

Setelah semua langkah selesai, website RSU Meloy Sangatta akan live di production!

**Next Steps Setelah Live:**
1. ✅ Test semua halaman
2. ✅ Submit sitemap ke Google Search Console
3. ✅ Setup monitoring (UptimeRobot, Google Analytics)
4. ✅ Backup database rutin
5. ✅ Monitor logs error

**Jika ada masalah atau error:**
- Lihat `ANALISIS_POTENSI_ERROR.md` untuk troubleshooting
- Hubungi JagoanHosting support
- Cek server logs: `pm2 logs rsumeloy`

---

> **Dibuat oleh:** GitHub Copilot  
> **Tanggal:** 5 November 2025  
> **Website:** RSU Meloy Sangatta - rsumeloy.co.id  
> **Hosting:** JagoanHosting
