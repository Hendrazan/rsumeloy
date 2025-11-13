# 🚀 DEPLOYMENT GUIDE - STANDALONE MODE

## ✅ Build Completed!

Website Anda sudah di-build dalam **Standalone Mode** seperti website yang sudah online.

---

## 📦 Yang Ada di Package:

```
rsumeloy-standalone/
├── server.js              ← Entry point (auto-generated)
├── .next/                 ← Build output (optimized)
│   ├── standalone/        ← Server files
│   └── static/            ← Static assets
├── public/                ← Static files (images, manifest, dll)
├── .env                   ← Environment variables
└── package.json           ← Minimal dependencies
```

**File ZIP:** `rsumeloy-production-deploy.zip` (~50-100 MB)

---

## 🎯 STEP-BY-STEP DEPLOYMENT

### **STEP 1: Upload ke Server**

#### **Opsi A: Via cPanel File Manager**

1. Login ke **cPanel Jagoan Hosting**
2. Buka **File Manager**
3. Navigate ke `/home/rsumelo4/public_html/rsumeloy/`
4. **BACKUP folder lama** (rename ke `rsumeloy-old`)
5. Upload **`rsumeloy-production-deploy.zip`**
6. **Extract** ZIP file
7. Delete ZIP file

#### **Opsi B: Via FTP (FileZilla)**

1. Connect ke FTP
2. Navigate ke `/public_html/rsumeloy/`
3. Backup folder lama
4. Upload `rsumeloy-production-deploy.zip`
5. SSH ke server dan extract:
   ```bash
   cd ~/public_html/rsumeloy
   unzip -o rsumeloy-production-deploy.zip
   rm rsumeloy-production-deploy.zip
   ```

---

### **STEP 2: Verifikasi Files**

SSH ke server dan check:

```bash
cd ~/public_html/rsumeloy
ls -la

# Harus ada:
# - server.js
# - .next/
# - public/
# - .env
```

---

### **STEP 3: Start Aplikasi**

#### **Opsi A: Manual Start (Testing)**

```bash
# Navigate to folder
cd ~/public_html/rsumeloy

# Activate Node.js 20
source ~/nodevenv/public_html/rsumeloy/20/bin/activate

# Start server on port 3001
PORT=3001 node server.js
```

Jika berhasil, akan muncul:
```
▲ Next.js 14.2.33
- Local:    http://localhost:3001
✓ Ready in 500ms
```

**Biarkan terminal terbuka untuk testing!**

#### **Opsi B: PM2 (Production - Recommended)**

```bash
cd ~/public_html/rsumeloy
source ~/nodevenv/public_html/rsumeloy/20/bin/activate

# Install PM2 (jika belum)
npm install -g pm2

# Stop old process
pm2 delete rsumeloy 2>/dev/null

# Start with PM2
PORT=3001 pm2 start server.js --name "rsumeloy"

# Save PM2 config
pm2 save

# Setup auto-restart on reboot
pm2 startup

# Check status
pm2 list
pm2 logs rsumeloy
```

---

### **STEP 4: Update .htaccess**

Edit `/home/rsumelo4/public_html/.htaccess`:

```apache
# RSU Meloy - Next.js Standalone
# Port 3001

RewriteEngine On

# Exclude cPanel paths
RewriteCond %{REQUEST_URI} !^/\.well-known/ [NC]
RewriteCond %{REQUEST_URI} !^/cpanel [NC]
RewriteCond %{REQUEST_URI} !^/cgi-bin [NC]

# Proxy to Next.js on port 3001
RewriteRule ^(.*)$ http://127.0.0.1:3001/$1 [P,L]
```

**Save** dan test!

---

### **STEP 5: Test Website**

1. Buka browser
2. Akses **http://rsumeloy.co.id**
3. Test semua fitur:
   - ✅ Homepage load
   - ✅ AI Assistant (robot button)
   - ✅ WhatsApp button
   - ✅ APAM button
   - ✅ Jadwal Dokter
   - ✅ All pages

---

### **STEP 6: Install SSL (If Not Yet)**

```bash
# Via Certbot
sudo certbot --apache -d rsumeloy.co.id -d www.rsumeloy.co.id

# Or via cPanel
# Go to SSL/TLS Status → Run AutoSSL
```

---

## 🔧 TROUBLESHOOTING

### **Problem: Port 3001 already in use**

**Solution:**
```bash
# Find and kill process
lsof -i :3001
kill -9 [PID]

# Or use different port
PORT=3002 pm2 start server.js --name rsumeloy
# Then update .htaccess to port 3002
```

---

### **Problem: Module not found**

**Solution:**
```bash
# Standalone mode sudah bundle semua dependencies
# Tapi jika error, pastikan Node.js 20 activated
source ~/nodevenv/public_html/rsumeloy/20/bin/activate
node -v  # Should be v20.x
```

---

### **Problem: Website shows old version**

**Solution:**
```bash
# Clear browser cache
# Restart PM2
pm2 restart rsumeloy

# Check if new files uploaded
ls -lah ~/public_html/rsumeloy/server.js
```

---

### **Problem: 502 Bad Gateway**

**Solution:**
```bash
# Check if app running
pm2 list
pm2 logs rsumeloy

# Check port
netstat -tulpn | grep :3001

# Restart app
pm2 restart rsumeloy
```

---

## 📊 MONITORING

### **Check App Status:**
```bash
pm2 list
pm2 monit
pm2 logs rsumeloy --lines 50
```

### **Check Resource Usage:**
```bash
pm2 monit  # Real-time monitoring
```

### **Restart App:**
```bash
pm2 restart rsumeloy
```

### **Stop App:**
```bash
pm2 stop rsumeloy
```

### **View Logs:**
```bash
pm2 logs rsumeloy
tail -f ~/public_html/rsumeloy/stderr.log
```

---

## 🔄 UPDATE PROCEDURE

Ketika ada update di future:

### **1. Build di Windows:**
```cmd
cd d:\AI DEV\FINALHOSTING\rsumeloy
build-standalone.bat
```

### **2. Upload ZIP baru:**
- Upload `rsumeloy-production-deploy.zip`

### **3. Deploy di Server:**
```bash
cd ~/public_html/rsumeloy
# Backup dulu
mv .next .next-backup
mv server.js server.js.backup

# Extract new version
unzip -o rsumeloy-production-deploy.zip
rm rsumeloy-production-deploy.zip

# Restart
pm2 restart rsumeloy

# Check logs
pm2 logs rsumeloy
```

---

## ✅ CHECKLIST DEPLOYMENT

- [ ] Build completed (`build-standalone.bat`)
- [ ] ZIP file created (`rsumeloy-production-deploy.zip`)
- [ ] Uploaded to server
- [ ] Extracted di `/public_html/rsumeloy/`
- [ ] Files verified (server.js, .next/, public/, .env)
- [ ] Node.js 20 activated
- [ ] PM2 installed
- [ ] App started with PM2 (port 3001)
- [ ] PM2 saved and auto-startup configured
- [ ] .htaccess updated (proxy to port 3001)
- [ ] SSL certificate installed
- [ ] Website accessible via https://rsumeloy.co.id
- [ ] All features tested (AI, WhatsApp, APAM, etc)
- [ ] PM2 monitoring setup

---

## 🎯 EXPECTED RESULT

```bash
pm2 list
┌─────┬───────────┬─────────┬─────────┬──────────┐
│ id  │ name      │ status  │ cpu     │ memory   │
├─────┼───────────┼─────────┼─────────┼──────────┤
│ 0   │ rsumeloy  │ online  │ 0%      │ 150 MB   │
└─────┴───────────┴─────────┴─────────┴──────────┘
```

Website live di **https://rsumeloy.co.id** ✅

---

## 💡 KEUNTUNGAN STANDALONE MODE

✅ **Lebih cepat** - Startup ~500ms vs ~3s
✅ **Lebih kecil** - ~50MB vs ~1GB
✅ **Lebih stabil** - Semua dependencies di-bundle
✅ **Lebih hemat RAM** - ~150MB vs ~300MB
✅ **Tidak perlu npm install** di server
✅ **Tidak ada node_modules/** di production

---

**Ready to deploy!** 🚀
