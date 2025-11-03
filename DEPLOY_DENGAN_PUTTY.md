# 🚀 Panduan Deploy RSU Meloy ke Jagoan Hosting dengan PuTTY

Panduan lengkap untuk deploy website RSU Meloy ke Jagoan Hosting menggunakan **PuTTY** (untuk Windows).

---

## 📋 Persiapan

### 1. Download dan Install PuTTY

1. **Download PuTTY:**
   - Kunjungi: https://www.putty.org/
   - Download **putty.exe** (atau installer lengkap)
   - Tidak perlu install, langsung bisa dijalankan

2. **Simpan PuTTY:**
   - Simpan `putty.exe` di folder yang mudah diakses (misal: `C:\Program Files\PuTTY\` atau `Desktop`)

### 2. Siapkan Informasi Login

Anda memerlukan informasi berikut dari Jagoan Hosting (biasanya ada di email atau cPanel):

- **Host/Server:** `rsumeloy.co.id` atau IP server (misal: `103.xxx.xxx.xxx`)
- **Port:** `22` (default SSH)
- **Username:** username SSH Anda (biasanya sama dengan username cPanel)
- **Password:** password SSH Anda (biasanya sama dengan password cPanel)

---

## 🔧 LANGKAH 1: Login ke Server dengan PuTTY

### 1.1 Buka PuTTY

1. **Jalankan PuTTY:**
   - Double-click `putty.exe`
   - Akan muncul jendela **PuTTY Configuration**

### 1.2 Konfigurasi Koneksi

1. **Di bagian "Session":**
   - **Host Name (or IP address):** Ketik `rsumeloy.co.id` atau IP server Anda
   - **Port:** Pastikan `22`
   - **Connection type:** Pilih `SSH`

2. **Opsional - Simpan Session (untuk login cepat di masa depan):**
   - Di bagian "Saved Sessions", ketik nama: `RSU Meloy`
   - Klik tombol **Save**
   - Lain kali Anda bisa langsung klik `RSU Meloy` → **Load** → **Open**

### 1.3 Buka Koneksi

1. Klik tombol **Open** di bagian bawah
2. **Jika muncul "PuTTY Security Alert":**
   - Klik **Yes** (ini normal untuk koneksi pertama kali)

### 1.4 Login

1. **Terminal PuTTY akan terbuka** dan menampilkan:
   ```
   login as:
   ```

2. **Ketik username Anda**, lalu tekan **Enter**
   ```
   login as: namauser
   ```

3. **Ketik password Anda**, lalu tekan **Enter**
   - ⚠️ **Password tidak terlihat saat Anda ketik** (ini normal untuk keamanan)
   - Ketik dengan hati-hati, lalu Enter

4. **Jika berhasil login**, Anda akan melihat:
   ```
   Welcome to...
   [namauser@server ~]$
   ```

---

## 🚀 LANGKAH 2: Deploy Website (Pertama Kali)

Setelah login ke server dengan PuTTY, ikuti langkah berikut:

### 2.1 Masuk ke Folder Website

```bash
cd public_html
```

atau jika folder website Anda berbeda:

```bash
cd /home/namauser/domains/rsumeloy.co.id/public_html
```

### 2.2 Download Source Code dari GitHub

```bash
git clone https://github.com/Hendrazan/rsumeloy.git
cd rsumeloy
```

**Jika git tidak tersedia**, minta pihak Jagoan Hosting untuk install Git, atau upload manual via FTP lalu lanjut ke langkah 2.3.

### 2.3 Jalankan Script Setup Otomatis

```bash
chmod +x initial-setup.sh
./initial-setup.sh
```

**Script ini akan otomatis:**
- Mengecek Node.js dan npm
- Install dependencies
- Membuat file `.env.local` dari template
- Build website
- Setup PM2 untuk menjalankan website

### 2.4 Edit Environment Variables

Setelah script selesai, Anda perlu edit file `.env.local` untuk isi kredensial database dan API:

```bash
nano .env.local
```

**Edit variabel berikut:**

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ey.....
SUPABASE_SERVICE_ROLE_KEY=ey.....

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

# Google Gemini AI
GEMINI_API_KEY=AIza.....

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password-kuat-anda

# Session
SESSION_SECRET=random-string-32-characters

# URL
NEXT_PUBLIC_BASE_URL=https://www.rsumeloy.co.id
```

**Cara menyimpan di nano:**
1. Edit sesuai kredensial Anda
2. Tekan **Ctrl + O** (untuk save)
3. Tekan **Enter** (konfirmasi nama file)
4. Tekan **Ctrl + X** (untuk keluar)

### 2.5 Build dan Start Website

```bash
npm run build
pm2 start npm --name "rsumeloy" -- start
pm2 save
pm2 startup
```

### 2.6 Cek Status Website

```bash
pm2 status
pm2 logs rsumeloy
```

**Website sekarang berjalan di port 3000**

---

## 🔄 LANGKAH 3: Update Website (Deploy Berikutnya)

Untuk update website setelah ada perubahan kode, cukup jalankan:

### 3.1 Login ke Server dengan PuTTY

Gunakan cara yang sama seperti **LANGKAH 1**

### 3.2 Masuk ke Folder Website

```bash
cd public_html/rsumeloy
```

### 3.3 Jalankan Script Deploy Otomatis

```bash
chmod +x deploy.sh
./deploy.sh
```

**Script ini akan otomatis:**
- Backup kode lama
- Pull update terbaru dari GitHub
- Install dependencies baru (jika ada)
- Rebuild website
- Restart PM2

---

## 🌐 LANGKAH 4: Setup Nginx/Apache (Reverse Proxy)

Agar website bisa diakses melalui `https://www.rsumeloy.co.id` (port 80/443), bukan port 3000, Anda perlu setup reverse proxy.

### 4.1 Untuk Nginx

Minta Jagoan Hosting untuk menambahkan konfigurasi berikut di **Nginx**:

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name rsumeloy.co.id www.rsumeloy.co.id;

    # SSL certificates (jika sudah ada)
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

### 4.2 Untuk Apache

Atau jika menggunakan **Apache**, gunakan `.htaccess`:

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

## 🔒 LANGKAH 5: Setup SSL (HTTPS)

### 5.1 Cek SSL yang Ada

Biasanya Jagoan Hosting sudah menyediakan SSL gratis (Let's Encrypt) melalui cPanel.

1. Login ke **cPanel** Jagoan Hosting
2. Cari menu **SSL/TLS** atau **Let's Encrypt**
3. Aktifkan SSL untuk domain `rsumeloy.co.id` dan `www.rsumeloy.co.id`

### 5.2 Atau Install SSL Manual (via PuTTY)

```bash
sudo certbot --nginx -d rsumeloy.co.id -d www.rsumeloy.co.id
```

---

## ✅ Verifikasi Website

### 1. Cek Website Lokal di Server

```bash
curl http://localhost:3000
```

Harusnya menampilkan HTML website.

### 2. Cek Website dari Browser

Buka: https://www.rsumeloy.co.id

---

## 🛠️ Troubleshooting

### ❌ "Permission denied" saat jalankan script

**Solusi:**
```bash
chmod +x initial-setup.sh
chmod +x deploy.sh
```

### ❌ "git: command not found"

**Solusi:**
Minta Jagoan Hosting untuk install Git, atau upload source code via FTP/cPanel File Manager.

### ❌ "npm: command not found"

**Solusi:**
Minta Jagoan Hosting untuk install Node.js versi 18+ dan npm.

### ❌ Website tidak bisa diakses (port 3000 tidak terbuka)

**Solusi:**
Setup reverse proxy di Nginx/Apache (lihat LANGKAH 4).

### ❌ PM2 tidak jalan setelah restart server

**Solusi:**
```bash
pm2 startup
pm2 save
```

### ❌ Lupa Password PuTTY

**Solusi:**
Reset password SSH melalui cPanel Jagoan Hosting atau hubungi support.

---

## 📞 Bantuan

Jika ada masalah:
1. Hubungi support Jagoan Hosting untuk setup Node.js, Git, PM2, Nginx/Apache
2. Pastikan Node.js versi 18+ terinstall
3. Pastikan port 3000 tidak digunakan aplikasi lain

---

## 🎯 Ringkasan Perintah (Cheat Sheet)

### Login
```bash
# Buka PuTTY → masukkan host, port 22, SSH → login
```

### Deploy Pertama Kali
```bash
cd public_html
git clone https://github.com/Hendrazan/rsumeloy.git
cd rsumeloy
chmod +x initial-setup.sh
./initial-setup.sh
nano .env.local  # Edit kredensial
npm run build
pm2 start npm --name "rsumeloy" -- start
pm2 save
```

### Deploy Update
```bash
cd public_html/rsumeloy
chmod +x deploy.sh
./deploy.sh
```

### Cek Status
```bash
pm2 status
pm2 logs rsumeloy
pm2 restart rsumeloy
```

---

**Selamat! Website RSU Meloy sekarang live di Jagoan Hosting! 🎉**
