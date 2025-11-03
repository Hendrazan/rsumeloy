# 🚀 Panduan Deploy RSU Meloy via FTP

Panduan lengkap untuk deploy website RSU Meloy ke hosting menggunakan **FTP** dan **Node.js**.

---

## 📋 Yang Anda Dapatkan di Folder PRODUKSI

Folder `PRODUKSI` ini berisi:
- ✅ **standalone/** - Build Next.js yang sudah di-optimize (self-contained)
- ✅ **public/** - File statis (gambar, manifest, dll)
- ✅ **server.js** - Server untuk menjalankan website
- ✅ **.env.production.template** - Template environment variables
- ✅ **start-server.sh** - Script untuk menjalankan server (Linux)
- ✅ **start-server.bat** - Script untuk menjalankan server (Windows)
- ✅ **package.json** - Dependencies yang dibutuhkan

---

## ⚙️ Persyaratan di Server Hosting

Pastikan hosting Anda memiliki:
- ✅ **Node.js** versi 18.x atau lebih tinggi
- ✅ **npm** atau **yarn**
- ✅ **PM2** (untuk production) - optional tapi sangat direkomendasikan
- ✅ **Akses SSH** atau **Terminal cPanel**

---

## 📤 LANGKAH 1: Upload File via FTP

### 1.1 Download & Install FTP Client

**Pilihan FTP Client:**
- **FileZilla** (Gratis, paling populer): https://filezilla-project.org/
- **WinSCP** (Windows): https://winscp.net/
- **Cyberduck** (Mac/Windows): https://cyberduck.io/

### 1.2 Koneksi ke Server

1. Buka FTP Client Anda
2. Masukkan kredensial dari Jagoan Hosting:
   - **Host:** ftp.rsumeloy.co.id (atau IP server)
   - **Username:** username FTP Anda
   - **Password:** password FTP Anda
   - **Port:** 21 (FTP) atau 22 (SFTP/FTP over SSH)

### 1.3 Upload Folder PRODUKSI

1. **Di FTP Client:**
   - Sisi kiri: Komputer lokal Anda
   - Sisi kanan: Server hosting

2. **Navigasi ke folder website di server:**
   ```
   /home/namauser/public_html/
   ```
   atau
   ```
   /home/namauser/domains/rsumeloy.co.id/public_html/
   ```

3. **Upload semua isi folder PRODUKSI:**
   - Drag & drop semua file dan folder ke server
   - **Tunggu hingga upload selesai** (bisa 5-30 menit tergantung koneksi)

4. **File/folder yang harus ada di server:**
   ```
   /public_html/
   ├── standalone/          ← Folder build Next.js
   ├── public/              ← File statis
   ├── server.js            ← Server file
   ├── .env.local           ← Environment variables (akan dibuat)
   ├── package.json         ← Dependencies
   └── start-server.sh      ← Script start
   ```

---

## 🔧 LANGKAH 2: Setup di Server (via SSH/PuTTY)

Setelah upload selesai, Anda **HARUS login ke server via SSH** untuk setup:

### 2.1 Login ke Server

**Menggunakan PuTTY (Windows):**
1. Buka PuTTY
2. Host: `rsumeloy.co.id` atau IP server
3. Port: `22`
4. Connection type: `SSH`
5. Klik **Open**
6. Login dengan username dan password

### 2.2 Masuk ke Folder Website

```bash
cd public_html
# atau
cd /home/namauser/domains/rsumeloy.co.id/public_html
```

### 2.3 Install Dependencies

```bash
npm install --production
```

**Catatan:** Proses ini akan install dependencies minimal yang dibutuhkan (hanya production).

### 2.4 Buat File Environment Variables

```bash
cp .env.production.template .env.local
nano .env.local
```

**Edit file `.env.local` dengan kredensial asli Anda:**

```env
# Supabase - Dapatkan dari dashboard Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi.....
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi.....

# Cloudinary - Dapatkan dari dashboard Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdef123456

# Google Gemini AI - Dapatkan dari Google AI Studio
GEMINI_API_KEY=AIzaSy.....

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password-kuat-anda-123!

# Session Secret (generate random 32 char)
SESSION_SECRET=random-string-32-karakter-disini

# Base URL
NEXT_PUBLIC_BASE_URL=https://www.rsumeloy.co.id
```

**Cara menyimpan:**
- Tekan `Ctrl + O` (save)
- Tekan `Enter`
- Tekan `Ctrl + X` (exit)

### 2.5 Jalankan Server

**Opsi A: Menggunakan PM2 (Recommended)**

```bash
# Install PM2 global (jika belum ada)
npm install -g pm2

# Start server dengan PM2
pm2 start server.js --name "rsumeloy"

# Auto-restart saat server reboot
pm2 startup
pm2 save

# Cek status
pm2 status
pm2 logs rsumeloy
```

**Opsi B: Menggunakan Script (tanpa PM2)**

```bash
# Beri permission
chmod +x start-server.sh

# Jalankan
./start-server.sh
```

**Opsi C: Manual (untuk testing)**

```bash
NODE_ENV=production node server.js
```

---

## 🌐 LANGKAH 3: Setup Reverse Proxy

Agar website bisa diakses via domain (bukan port 3000), setup reverse proxy:

### 3.1 Nginx Configuration

**File:** `/etc/nginx/sites-available/rsumeloy.co.id`

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name rsumeloy.co.id www.rsumeloy.co.id;

    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/rsumeloy.co.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/rsumeloy.co.id/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Restart Nginx:**
```bash
sudo systemctl restart nginx
```

### 3.2 Apache Configuration (.htaccess)

**File:** `/public_html/.htaccess`

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
</IfModule>

<IfModule mod_proxy.c>
    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</IfModule>
```

**Restart Apache:**
```bash
sudo systemctl restart apache2
```

---

## 🔒 LANGKAH 4: Setup SSL (HTTPS)

### Via cPanel (Termudah)

1. Login ke **cPanel** Jagoan Hosting
2. Cari menu **SSL/TLS** atau **Let's Encrypt SSL**
3. Pilih domain: `rsumeloy.co.id` dan `www.rsumeloy.co.id`
4. Klik **Install SSL**

### Via SSH (Manual)

```bash
sudo certbot --nginx -d rsumeloy.co.id -d www.rsumeloy.co.id
```

---

## ✅ LANGKAH 5: Verifikasi Website

### 5.1 Cek Server Berjalan

```bash
pm2 status
pm2 logs rsumeloy --lines 50
```

### 5.2 Cek Website dari Browser

Buka: https://www.rsumeloy.co.id

**Yang harus dicek:**
- ✅ Homepage loading dengan baik
- ✅ Gambar dari Cloudinary muncul
- ✅ Menu navigasi berfungsi
- ✅ Jadwal dokter bisa diakses
- ✅ Google Maps muncul di halaman kontak
- ✅ Admin login berfungsi (https://www.rsumeloy.co.id/admin)

### 5.3 Cek Console Browser

1. Buka Developer Tools (`F12`)
2. Tab **Console** - pastikan tidak ada error merah
3. Tab **Network** - pastikan semua request 200 OK

---

## 🔄 UPDATE Website (Deploy Berikutnya)

Untuk update website setelah ada perubahan:

### 1. Build Ulang di Komputer Lokal

```bash
npm run build
```

### 2. Upload File yang Berubah via FTP

Hanya upload folder/file yang berubah:
- `standalone/` - jika ada perubahan kode
- `public/` - jika ada gambar/file statis baru
- `server.js` - jika ada perubahan server

### 3. Restart Server via SSH

```bash
pm2 restart rsumeloy
# atau
pm2 reload rsumeloy
```

---

## 🛠️ Troubleshooting

### ❌ Website tidak bisa diakses

**Cek server berjalan:**
```bash
pm2 status
pm2 logs rsumeloy
```

**Cek port 3000:**
```bash
curl http://localhost:3000
```

**Jika error, restart:**
```bash
pm2 restart rsumeloy
```

### ❌ Error "Cannot find module"

**Install ulang dependencies:**
```bash
npm install --production
pm2 restart rsumeloy
```

### ❌ Gambar tidak muncul

**Cek environment variables:**
```bash
cat .env.local | grep CLOUDINARY
```

Pastikan credentials Cloudinary benar.

### ❌ Database error (Supabase)

**Cek environment variables:**
```bash
cat .env.local | grep SUPABASE
```

Pastikan URL dan API key benar.

### ❌ Port 3000 sudah digunakan

**Cari proses yang menggunakan port:**
```bash
lsof -i :3000
# atau
netstat -tulpn | grep :3000
```

**Kill proses:**
```bash
kill -9 <PID>
```

### ❌ PM2 tidak jalan setelah restart server

**Setup ulang startup:**
```bash
pm2 startup
pm2 save
```

### ❌ Permission denied

**Beri permission:**
```bash
chmod -R 755 standalone/
chmod +x start-server.sh
chmod +x server.js
```

---

## 📊 Monitoring & Maintenance

### Cek Status Server

```bash
pm2 status
pm2 monit
```

### Cek Logs

```bash
pm2 logs rsumeloy --lines 100
pm2 logs rsumeloy --err --lines 50  # Error logs
```

### Restart Server

```bash
pm2 restart rsumeloy
```

### Stop Server

```bash
pm2 stop rsumeloy
```

### Hapus dari PM2

```bash
pm2 delete rsumeloy
```

---

## 📞 Bantuan

Jika ada masalah:
1. **Cek logs:** `pm2 logs rsumeloy`
2. **Hubungi support Jagoan Hosting** untuk setup Node.js, PM2, Nginx/Apache
3. **Pastikan environment variables** sudah benar di `.env.local`

---

## 🎯 Checklist Deploy

- [ ] Upload semua file via FTP
- [ ] Login SSH/PuTTY ke server
- [ ] Masuk ke folder website
- [ ] `npm install --production`
- [ ] Copy dan edit `.env.local`
- [ ] Install PM2: `npm install -g pm2`
- [ ] Start server: `pm2 start server.js --name rsumeloy`
- [ ] Setup startup: `pm2 startup && pm2 save`
- [ ] Setup reverse proxy (Nginx/Apache)
- [ ] Setup SSL (HTTPS)
- [ ] Test website di browser
- [ ] Cek tidak ada error di console

---

**Selamat! Website RSU Meloy sekarang live! 🎉**

**URL:** https://www.rsumeloy.co.id
