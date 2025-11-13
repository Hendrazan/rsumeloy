# Deploy ke Jagoan Hosting - Panduan Lengkap

## Prerequisites

1. Akun Jagoan Hosting dengan Node.js support
2. SSH access atau File Manager
3. Domain sudah pointing ke hosting

## Langkah Deploy

### 1. Persiapan Lokal

```bash
# Build project
npm run build

# Test production build
npm start
# Pastikan berjalan di http://localhost:3000
```

### 2. Upload ke Hosting

#### Via FTP/File Manager:

**Upload files berikut:**
- `app/` folder
- `components/` folder
- `lib/` folder
- `public/` folder
- `types/` folder
- `data/` folder
- `supabase/` folder (jika perlu migrations)
- `middleware.ts`
- `next.config.mjs`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `tailwind.config.ts`
- `postcss.config.js`
- `server.js` (jika ada)

**JANGAN upload:**
- `node_modules/` (akan di-install di server)
- `.next/` (akan di-build di server)
- `.env` (buat baru di server)
- `.git/`

### 3. Setup Environment Variables di Server

Buat file `.env` di root folder hosting dengan isi:

```env
NEXT_PUBLIC_SUPABASE_URL=https://jaybcyjkhjdndcinobcx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpheWJjeWpraGpkbmRjaW5vYmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMTQwODcsImV4cCI6MjA3MDU5MDA4N30.vHf57s0ZbzQSYvurwQxP6rmyzTdJJ87yyAdar3gUH7M
NEXT_PUBLIC_SITE_URL=https://rsumeloy.co.id
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ddyqhlilj
GEMINI_API_KEY=AIzaSyCtzR5ZX-r8YHwNgTjIhfYzFpEhtGmTLRc
NODE_ENV=production
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_AI_FEATURES=true
```

### 4. Install & Build via SSH

```bash
# Login ke SSH
ssh user@your-server.com

# Masuk ke directory website
cd /path/to/your/website

# Install dependencies
npm install --production

# Build Next.js
npm run build

# Start server
npm start
```

### 5. Setup PM2 (Agar Tidak Mati)

```bash
# Install PM2 global (jika belum)
npm install -g pm2

# Start dengan PM2
pm2 start npm --name "rsumeloy" -- start

# Save PM2 process
pm2 save

# Auto start on reboot
pm2 startup
```

### 6. Setup Nginx/Apache (Reverse Proxy)

#### Nginx Config:

```nginx
server {
    listen 80;
    server_name rsumeloy.co.id www.rsumeloy.co.id;

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

### 7. Setup SSL (HTTPS)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate SSL
sudo certbot --nginx -d rsumeloy.co.id -d www.rsumeloy.co.id
```

## Verifikasi

1. **Check Build**:
   ```bash
   npm run build
   # Harus sukses tanpa error
   ```

2. **Check Start**:
   ```bash
   npm start
   # Website harus bisa diakses
   ```

3. **Check PM2**:
   ```bash
   pm2 status
   # Status harus "online"
   ```

4. **Test Website**:
   - Buka https://rsumeloy.co.id
   - Test AI Assistant
   - Test WhatsApp & APAM buttons
   - Test semua halaman

## Update/Redeploy

Untuk update di masa depan:

```bash
# 1. Upload file yang berubah via FTP
# 2. SSH ke server
cd /path/to/website

# 3. Rebuild
npm run build

# 4. Restart PM2
pm2 restart rsumeloy
```

## Troubleshooting

### Error: Module not found
```bash
# Install ulang dependencies
rm -rf node_modules
npm install --production
npm run build
```

### Port sudah digunakan
```bash
# Check process
pm2 list
# Kill process lama
pm2 delete rsumeloy
# Start ulang
pm2 start npm --name "rsumeloy" -- start
```

### Website lambat
- Enable caching di Nginx
- Optimize images
- Enable CDN untuk static assets

## Monitoring

```bash
# Lihat logs
pm2 logs rsumeloy

# Monitor resource
pm2 monit

# Restart jika error
pm2 restart rsumeloy
```

## Backup

```bash
# Backup before update
tar -czf rsumeloy-backup-$(date +%Y%m%d).tar.gz /path/to/website
```

## Notes

- ⚠️ Pastikan Node.js version minimal v18
- ⚠️ RAM minimal 1GB untuk build
- ⚠️ Disk space minimal 2GB
- ⚠️ JANGAN commit .env ke Git
- ✅ Always test di local sebelum upload
