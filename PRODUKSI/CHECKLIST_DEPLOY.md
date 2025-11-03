# ✅ CHECKLIST DEPLOYMENT RSU MELOY

## 📦 Persiapan

- [ ] Download FTP Client (FileZilla/WinSCP/Cyberduck)
- [ ] Siapkan kredensial FTP dari Jagoan Hosting
- [ ] Siapkan kredensial berikut:
  - [ ] Supabase URL dan API Keys
  - [ ] Cloudinary Cloud Name
  - [ ] Google Gemini API Key

---

## 📤 Upload via FTP

- [ ] Buka FTP Client
- [ ] Koneksi ke server: `ftp.rsumeloy.co.id` (port 21)
- [ ] Masuk ke folder: `/public_html/`
- [ ] Upload semua isi folder PRODUKSI ini:
  - [ ] `standalone/` (folder terbesar, ~50-100MB)
  - [ ] `public/`
  - [ ] `server.js`
  - [ ] `package.json`
  - [ ] `.env.production.template`
  - [ ] `start-server.sh`
  - [ ] `start-server.bat`
  - [ ] `README_DEPLOY.md`
- [ ] Tunggu upload selesai (5-30 menit)

---

## 🔧 Setup di Server (SSH/PuTTY)

### 1. Login SSH
- [ ] Buka PuTTY
- [ ] Host: `rsumeloy.co.id`, Port: `22`, Type: `SSH`
- [ ] Login dengan username dan password

### 2. Masuk ke Folder Website
```bash
cd public_html
```

### 3. Install Dependencies (PENTING!)
```bash
npm install --production
```
**Tunggu hingga selesai (~5-10 menit)**

### 4. Setup Environment Variables
```bash
cp .env.production.template .env.local
nano .env.local
```

**Edit kredensial berikut:**
- [ ] `NEXT_PUBLIC_SUPABASE_URL` = URL Supabase Anda
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Anon Key Supabase
- [ ] `SUPABASE_SERVICE_ROLE_KEY` = Service Role Key Supabase
- [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` = `ddyqhlilj` (atau cloud name Anda)
- [ ] `GEMINI_API_KEY` = API Key Google Gemini
- [ ] `NEXT_PUBLIC_BASE_URL` = `https://www.rsumeloy.co.id`

**Simpan:** `Ctrl+O` → `Enter` → `Ctrl+X`

### 5. Jalankan Server

**Menggunakan PM2 (Recommended):**
```bash
npm install -g pm2
pm2 start server.js --name "rsumeloy"
pm2 startup
pm2 save
```

**Atau tanpa PM2:**
```bash
chmod +x start-server.sh
./start-server.sh
```

### 6. Cek Status
```bash
pm2 status
pm2 logs rsumeloy
```

**Harusnya terlihat:**
```
┌─────┬────────────┬─────────┬─────────┬───────────┐
│ id  │ name       │ status  │ ↺       │ cpu       │
├─────┼────────────┼─────────┼─────────┼───────────┤
│ 0   │ rsumeloy   │ online  │ 0       │ 0%        │
└─────┴────────────┴─────────┴─────────┴───────────┘
```

---

## 🌐 Setup Reverse Proxy

### Opsi A: Nginx
**Minta Jagoan Hosting untuk menambahkan config:**
```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name rsumeloy.co.id www.rsumeloy.co.id;

    ssl_certificate /path/to/ssl/certificate.crt;
    ssl_certificate_key /path/to/ssl/private.key;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Opsi B: Apache
**Buat file `.htaccess` di `/public_html/`:**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

**Restart web server:**
```bash
sudo systemctl restart nginx
# atau
sudo systemctl restart apache2
```

---

## 🔒 Setup SSL (HTTPS)

### Via cPanel (Termudah)
- [ ] Login ke cPanel Jagoan Hosting
- [ ] Cari menu **SSL/TLS** atau **Let's Encrypt**
- [ ] Pilih domain: `rsumeloy.co.id` dan `www.rsumeloy.co.id`
- [ ] Klik **Install SSL**

### Via SSH (Manual)
```bash
sudo certbot --nginx -d rsumeloy.co.id -d www.rsumeloy.co.id
```

---

## ✅ Verifikasi Website

### 1. Cek di Browser
- [ ] Buka https://www.rsumeloy.co.id
- [ ] Homepage loading dengan baik
- [ ] Gambar muncul
- [ ] Menu navigasi berfungsi
- [ ] Halaman jadwal dokter bisa diakses
- [ ] Google Maps muncul di halaman kontak
- [ ] Admin login berfungsi (/admin)

### 2. Cek Developer Tools
- [ ] Buka `F12` → Tab **Console**
- [ ] Tidak ada error merah
- [ ] Tab **Network** → Semua request 200 OK

### 3. Cek Server
```bash
pm2 status
pm2 logs rsumeloy --lines 50
curl http://localhost:3000
```

---

## 🔄 Update Website (Nanti)

Untuk update setelah ada perubahan:

1. **Build ulang di komputer lokal:**
   ```bash
   npm run build
   ```

2. **Upload file yang berubah via FTP:**
   - `standalone/` (jika ada perubahan kode)
   - `public/` (jika ada gambar baru)

3. **Restart server via SSH:**
   ```bash
   pm2 restart rsumeloy
   ```

---

## 🛠️ Troubleshooting

### ❌ "npm: command not found"
**Solusi:** Minta Jagoan Hosting install Node.js 18+

### ❌ "pm2: command not found"
**Solusi:** 
```bash
npm install -g pm2
```

### ❌ Website tidak bisa diakses
**Solusi:**
1. Cek server: `pm2 status`
2. Cek logs: `pm2 logs rsumeloy`
3. Restart: `pm2 restart rsumeloy`

### ❌ Port 3000 sudah digunakan
**Solusi:**
```bash
lsof -i :3000
kill -9 <PID>
pm2 restart rsumeloy
```

### ❌ Gambar tidak muncul
**Solusi:** Cek `.env.local`, pastikan `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` benar

### ❌ Database error
**Solusi:** Cek `.env.local`, pastikan Supabase URL dan keys benar

---

## 📞 Kontak Support

- **Jagoan Hosting Support:** https://www.jagoanhosting.com/support
- **Email:** support@jagoanhosting.com
- **WhatsApp:** (sesuai dengan layanan Jagoan Hosting)

---

## 🎯 Status Deploy

| Tahap | Status | Catatan |
|-------|--------|---------|
| Upload FTP | ⏳ Pending | - |
| Install Dependencies | ⏳ Pending | - |
| Setup Environment | ⏳ Pending | - |
| Start Server | ⏳ Pending | - |
| Reverse Proxy | ⏳ Pending | - |
| SSL Setup | ⏳ Pending | - |
| Verifikasi Website | ⏳ Pending | - |

**Update status ini setelah menyelesaikan setiap tahap!**

---

**Selamat Deploy! 🚀**
