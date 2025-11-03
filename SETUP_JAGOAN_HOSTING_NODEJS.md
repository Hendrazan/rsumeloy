# 🚀 Setup RSU Meloy di Jagoan Hosting dengan Node.js

Panduan lengkap untuk deploy website RSU Meloy di Jagoan Hosting menggunakan Node.js App Manager atau Terminal.

---

## 📋 Persiapan

File yang sudah Anda upload via FTP:
- ✅ `standalone/` folder
- ✅ `public/` folder
- ✅ `server.js`
- ✅ `package.json`
- ✅ `.env.production.template`

---

## 🎯 OPSI A: Setup via cPanel Node.js App Manager (TERMUDAH)

Jagoan Hosting biasanya punya Node.js App Manager di cPanel.

### Langkah 1: Login cPanel

1. Buka: https://panel.jagoanhosting.com (atau URL dari email)
2. Login dengan username & password

### Langkah 2: Buka Node.js App Manager

1. Di cPanel, cari **"Setup Node.js App"** atau **"Node.js Selector"**
2. Klik untuk membuka

### Langkah 3: Create Application

Klik **"Create Application"** atau **"Add Application"**, lalu isi:

**Node.js Version:** 
- Pilih versi **18.x** atau **20.x** (yang paling tinggi)

**Application Mode:**
- Pilih **Production**

**Application Root:**
- Isi: `public_html` (atau folder tempat Anda upload file)

**Application URL:**
- Pilih: `www.rsumeloy.co.id` atau domain Anda

**Application Startup File:**
- Isi: `server.js`

**Environment Variables:**
Klik **"Add Variable"** dan tambahkan satu per satu:

```
NODE_ENV=production
PORT=3000

NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ.....
SUPABASE_SERVICE_ROLE_KEY=eyJ.....

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ddyqhlilj
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abcdef123456

GEMINI_API_KEY=AIza.....

ADMIN_USERNAME=admin
ADMIN_PASSWORD=password-kuat-anda

SESSION_SECRET=random-string-32-karakter-disini

NEXT_PUBLIC_BASE_URL=https://www.rsumeloy.co.id
```

### Langkah 4: Save & Install Dependencies

1. Klik **"Create"** atau **"Save"**
2. cPanel akan otomatis:
   - Install Node.js
   - Run `npm install`
   - Start aplikasi

### Langkah 5: Start Application

1. Setelah aplikasi dibuat, klik **"Run NPM Install"** (jika belum otomatis)
2. Tunggu hingga selesai (2-5 menit)
3. Klik **"Start"** atau **"Restart"** aplikasi
4. Status harusnya berubah jadi **"Running"** atau **"Started"**

### Langkah 6: Test Website

Buka: https://www.rsumeloy.co.id

**Jika masih error 503:**
- Cek log di Node.js App Manager
- Klik **"Show Log"** atau **"View Logs"**
- Lihat error messagenya

---

## 🎯 OPSI B: Setup via SSH/Terminal

Jika Node.js App Manager tidak ada atau error, gunakan SSH:

### Langkah 1: Login SSH dengan PuTTY

1. Buka PuTTY
2. Host: `rsumeloy.co.id` atau IP server dari email
3. Port: `22`
4. Login dengan username & password

### Langkah 2: Masuk ke Folder Website

```bash
cd public_html
# atau
cd ~/public_html
# atau (jika ada subfolder)
cd ~/domains/rsumeloy.co.id/public_html
```

### Langkah 3: Cek File Sudah Lengkap

```bash
ls -la
```

**Harusnya ada:**
- `standalone/`
- `public/`
- `server.js`
- `package.json`

### Langkah 4: Setup Environment Variables

```bash
# Copy template
cp .env.production.template .env.local

# Edit dengan nano
nano .env.local
```

**Isi dengan kredensial Anda:**

```env
NODE_ENV=production
PORT=3000

NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ.....
SUPABASE_SERVICE_ROLE_KEY=eyJ.....

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ddyqhlilj
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abcdef123456

GEMINI_API_KEY=AIza.....

ADMIN_USERNAME=admin
ADMIN_PASSWORD=password-kuat-anda-123!

SESSION_SECRET=random-string-32-karakter-disini

NEXT_PUBLIC_BASE_URL=https://www.rsumeloy.co.id
```

**Simpan:** `Ctrl+O` → `Enter` → `Ctrl+X`

### Langkah 5: Install Dependencies

```bash
npm install --production
```

**Tunggu 2-5 menit hingga selesai.**

**Jika error "npm: command not found":**
```bash
# Cek Node.js version
node -v
npm -v

# Jika tidak ada, hubungi support untuk install Node.js 18+
```

### Langkah 6: Test Run Server

```bash
node server.js
```

**Harusnya muncul:**
```
================================================
   RSU Meloy Production Server
================================================
Environment: production
Port: 3000
Starting server...
================================================

✅ Server ready on http://localhost:3000
```

**Jika ada error, baca error message dan troubleshoot.**

**Jika berhasil:**
- Tekan `Ctrl+C` untuk stop
- Lanjut ke langkah 7

### Langkah 7: Install PM2 (Auto-Restart)

```bash
# Install PM2 global
npm install -g pm2

# Start aplikasi dengan PM2
pm2 start server.js --name "rsumeloy"

# Auto-restart saat server reboot
pm2 startup
# Copy paste command yang muncul, lalu Enter

pm2 save

# Cek status
pm2 status
```

**Output yang benar:**
```
┌─────┬────────────┬─────────┬─────────┬───────────┐
│ id  │ name       │ status  │ ↺       │ cpu       │
├─────┼────────────┼─────────┼─────────┼───────────┤
│ 0   │ rsumeloy   │ online  │ 0       │ 0%        │
└─────┴────────────┴─────────┴─────────┴───────────┘
```

### Langkah 8: Cek Logs

```bash
pm2 logs rsumeloy --lines 50
```

**Harusnya tidak ada error.**

### Langkah 9: Test dari Dalam Server

```bash
curl http://localhost:3000
```

**Harusnya muncul HTML website.**

---

## 🌐 Setup Reverse Proxy (PENTING!)

Setelah server running di port 3000, Anda perlu setup reverse proxy agar bisa diakses dari domain.

### Cara 1: Hubungi Support Jagoan Hosting (TERMUDAH)

Kirim ticket/chat ke support:

> **Subject:** Request Setup Reverse Proxy untuk Node.js App
>
> Halo tim support,
>
> Saya sudah menjalankan aplikasi Next.js di server dan berjalan di port 3000. Mohon bantu setup reverse proxy Nginx/Apache agar domain www.rsumeloy.co.id dapat diakses dan mengarah ke localhost:3000.
>
> Informasi:
> - Domain: www.rsumeloy.co.id
> - Application Port: 3000
> - Document Root: public_html
>
> Terima kasih!

### Cara 2: Setup Manual (Jika Punya Akses Root)

**Untuk Nginx:**

File: `/etc/nginx/sites-available/rsumeloy.co.id`

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name rsumeloy.co.id www.rsumeloy.co.id;

    # SSL certificate
    ssl_certificate /path/to/ssl/certificate.crt;
    ssl_certificate_key /path/to/ssl/private.key;

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

**Aktifkan & restart:**
```bash
sudo ln -s /etc/nginx/sites-available/rsumeloy.co.id /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**Untuk Apache:**

File: `.htaccess` di `/public_html/`

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

## 🔒 Setup SSL (HTTPS)

### Via cPanel (Termudah)

1. Login cPanel
2. Cari **"SSL/TLS"** atau **"Let's Encrypt SSL"**
3. Pilih domain: `rsumeloy.co.id` dan `www.rsumeloy.co.id`
4. Klik **"Install SSL"**
5. Tunggu 1-5 menit

### Via SSH (Manual)

```bash
sudo certbot --nginx -d rsumeloy.co.id -d www.rsumeloy.co.id
# atau untuk Apache:
sudo certbot --apache -d rsumeloy.co.id -d www.rsumeloy.co.id
```

---

## ✅ Verifikasi Website

1. **Buka browser:** https://www.rsumeloy.co.id

2. **Cek semua halaman:**
   - Homepage
   - Jadwal Dokter
   - Kontak (Google Maps)
   - Admin (/admin)

3. **Cek console browser (F12):**
   - Tidak ada error merah

4. **Cek server (SSH):**
   ```bash
   pm2 status
   pm2 logs rsumeloy
   ```

---

## 🛠️ Troubleshooting

### ❌ Error: "Cannot find module './standalone/server.js'"

**Solusi:**
```bash
# Cek struktur folder
ls -la
ls -la standalone/

# Harusnya ada file standalone/server.js
```

Jika tidak ada, berarti upload FTP belum lengkap. Upload ulang folder `standalone/`.

### ❌ Error: "EADDRINUSE: address already in use :::3000"

**Solusi:**
```bash
# Cari proses yang pakai port 3000
lsof -i :3000

# Kill proses
kill -9 <PID>

# Restart PM2
pm2 restart rsumeloy
```

### ❌ Error: "Cannot connect to Supabase"

**Solusi:**
```bash
# Cek environment variables
cat .env.local | grep SUPABASE

# Pastikan URL dan keys benar
# Edit jika salah:
nano .env.local

# Restart server
pm2 restart rsumeloy
```

### ❌ Website masih 503

**Cek:**
```bash
# 1. Apakah server running?
pm2 status

# 2. Cek logs
pm2 logs rsumeloy --lines 100

# 3. Test localhost
curl http://localhost:3000

# 4. Cek Nginx/Apache
sudo systemctl status nginx
sudo systemctl status apache2

# 5. Cek reverse proxy config
sudo nginx -t
sudo apachectl configtest
```

### ❌ Gambar tidak muncul

**Solusi:**
```bash
# Cek Cloudinary credentials
cat .env.local | grep CLOUDINARY

# Pastikan benar, restart server
pm2 restart rsumeloy
```

---

## 🔄 Update Website Nanti

Jika ada perubahan kode:

1. **Build ulang di lokal:**
   ```bash
   npm run build
   ```

2. **Upload via FTP:**
   - Folder `standalone/` yang baru
   - File `server.js` jika ada perubahan

3. **Restart di server:**
   ```bash
   pm2 restart rsumeloy
   ```

---

## 📊 Monitoring

```bash
# Status aplikasi
pm2 status

# Logs real-time
pm2 logs rsumeloy

# Logs 100 baris terakhir
pm2 logs rsumeloy --lines 100

# Monitoring CPU/Memory
pm2 monit

# Restart aplikasi
pm2 restart rsumeloy

# Stop aplikasi
pm2 stop rsumeloy

# Delete dari PM2
pm2 delete rsumeloy
```

---

## 📞 Bantuan

**Jika masih error:**
1. Screenshot error message
2. Copy paste output `pm2 logs rsumeloy`
3. Hubungi support Jagoan Hosting dengan info tersebut

**Support Jagoan Hosting:**
- Website: https://www.jagoanhosting.com/support
- Email: support@jagoanhosting.com
- Live Chat: Di website Jagoan Hosting

---

## 🎯 Checklist Final

- [ ] File terupload lengkap (standalone/, public/, server.js, package.json)
- [ ] Node.js 18+ terinstall
- [ ] `npm install --production` berhasil
- [ ] `.env.local` sudah diisi dengan kredensial benar
- [ ] `node server.js` bisa jalan tanpa error
- [ ] PM2 running: `pm2 status` menunjukkan "online"
- [ ] Reverse proxy dikonfigurasi (Nginx/Apache)
- [ ] SSL aktif (HTTPS)
- [ ] Website bisa diakses: https://www.rsumeloy.co.id
- [ ] Semua fitur berfungsi (jadwal dokter, kontak, admin)

---

**Selamat! Website RSU Meloy sekarang online di Jagoan Hosting! 🎉**
