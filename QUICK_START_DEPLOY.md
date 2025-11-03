# 🚀 Quick Start - Deploy ke Jagoan Hosting

## ✅ **PRASYARAT (Harus Ada!)**

Sebelum mulai, pastikan:
- ✅ Anda punya akses SSH ke server Jagoan Hosting
- ✅ Domain rsumeloy.co.id sudah terpasang di Jagoan Hosting
- ✅ Node.js 18+ sudah terinstall di server (check: `node -v`)
- ✅ Anda punya semua environment variables (Supabase keys, Gemini API key, dll)

---

## 🎯 **STEP 1: PUSH SCRIPT KE GITHUB**

Script deployment sudah dibuat, sekarang push ke GitHub:

```bash
# Di terminal local (Windows)
cd "d:\AI DEV\BACKUP\rsumeloy"

# Add files
git add deploy.sh initial-setup.sh QUICK_START_DEPLOY.md

# Commit
git commit -m "feat: add automated deployment scripts for Jagoan Hosting"

# Push
git push origin master
```

✅ **Done!** Script sudah di GitHub.

---

## 🎯 **STEP 2: LOGIN SSH KE SERVER**

Buka terminal baru dan login ke server:

```bash
# Login SSH
ssh username@your-server.jagoanhosting.com

# Atau jika pakai custom port:
ssh -p 2222 username@your-server.jagoanhosting.com
```

Ganti `username` dan `your-server.jagoanhosting.com` dengan kredensial Anda.

---

## 🎯 **STEP 3: JALANKAN INITIAL SETUP** (Hanya Sekali!)

Ini dilakukan **HANYA SEKALI** saat pertama kali deploy:

```bash
# Navigate ke folder domain
cd ~/domains/rsumeloy.co.id

# Clone repository
git clone https://github.com/Hendrazan/rsumeloy.git
cd rsumeloy

# Make script executable
chmod +x initial-setup.sh

# Run initial setup
bash initial-setup.sh
```

**Script ini akan otomatis:**
1. ✅ Clone repository dari GitHub
2. ✅ Check Node.js version
3. ✅ Install dependencies (`npm install`)
4. ✅ Create `.env.local` template
5. ✅ Build production (`npm run build`)
6. ✅ Install PM2 (jika belum ada)
7. ✅ Start aplikasi dengan PM2
8. ✅ Setup auto-restart

**⏱️ Estimasi waktu:** 5-10 menit

---

## 🎯 **STEP 4: EDIT ENVIRONMENT VARIABLES**

Setelah initial setup, edit file `.env.local`:

```bash
# Edit environment variables
nano .env.local
```

**Isi semua nilai yang diperlukan:**

```bash
# Next.js Config
NEXT_PUBLIC_SITE_URL=https://www.rsumeloy.co.id
NODE_ENV=production

# Supabase - GET FROM: https://app.supabase.com/project/YOUR_PROJECT/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://nczmmabzotjgrydmmmty.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ddyqhlilj

# Google Gemini AI - GET FROM: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=AIzaSy...

# Google Site Verification (Optional)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=

# Server Port
PORT=3000
```

**Save:** `Ctrl+O`, `Enter`, `Ctrl+X`

---

## 🎯 **STEP 5: REBUILD & RESTART**

Setelah edit `.env.local`, rebuild aplikasi:

```bash
# Rebuild dengan environment variables baru
npm run build

# Restart PM2
pm2 restart rsumeloy

# Check status
pm2 status
pm2 logs rsumeloy --lines 20
```

---

## 🎯 **STEP 6: SETUP NGINX REVERSE PROXY**

### **Option A: Via cPanel (Recommended)**

1. Login ke **cPanel Jagoan Hosting**
2. Cari menu **"Application Manager"** atau **"Node.js Selector"**
3. Pilih domain: `rsumeloy.co.id`
4. Set:
   - Application Root: `/home/username/domains/rsumeloy.co.id/rsumeloy`
   - Application Startup File: `server.js`
   - Port: `3000`
5. Save & Restart

### **Option B: Manual Nginx Config**

```bash
# Edit Nginx config
sudo nano /etc/nginx/sites-available/rsumeloy.co.id
```

Paste config:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name rsumeloy.co.id www.rsumeloy.co.id;

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

Enable & restart:

```bash
sudo ln -s /etc/nginx/sites-available/rsumeloy.co.id /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🎯 **STEP 7: SETUP SSL (HTTPS)**

```bash
# Install Certbot (jika belum ada)
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Generate SSL certificate
sudo certbot --nginx -d rsumeloy.co.id -d www.rsumeloy.co.id

# Follow prompts:
# - Email: your@email.com
# - Agree to TOS: Yes
# - Redirect HTTP to HTTPS: Yes
```

✅ **SSL akan otomatis renew setiap 90 hari!**

---

## 🎯 **STEP 8: TEST WEBSITE**

```bash
# Test dari server
curl http://localhost:3000
curl https://www.rsumeloy.co.id

# Check PM2 status
pm2 status
pm2 logs rsumeloy --lines 50
```

**Buka browser:**
- https://www.rsumeloy.co.id

**Test semua fitur:**
- ✅ Homepage loading
- ✅ Jadwal Dokter
- ✅ Layanan
- ✅ Fasilitas
- ✅ Kontak (Google Maps harus muncul!)
- ✅ AI Chatbot
- ✅ Mobile responsive

---

## 🔄 **STEP 9: DEPLOY UPDATE (FUTURE)**

Untuk update website di kemudian hari:

### **Dari Local (Windows):**

```bash
# Edit code di local
# ...

# Commit & push ke GitHub
git add .
git commit -m "feat: update XYZ"
git push origin master
```

### **Di Server:**

```bash
# SSH ke server
ssh username@your-server.jagoanhosting.com

# Navigate ke app
cd ~/domains/rsumeloy.co.id/rsumeloy

# Run deploy script
bash deploy.sh
```

**Script akan otomatis:**
1. ✅ Pull latest code dari GitHub
2. ✅ Install dependencies baru (jika ada)
3. ✅ Build production
4. ✅ Restart PM2
5. ✅ Show logs

**⏱️ Estimasi waktu:** 2-3 menit per deploy

---

## 📊 **MONITORING**

### **Check Status:**
```bash
# PM2 status
pm2 status

# Real-time monitoring
pm2 monit

# View logs
pm2 logs rsumeloy

# View last 50 lines
pm2 logs rsumeloy --lines 50

# View only errors
pm2 logs rsumeloy --err
```

### **Restart if Needed:**
```bash
# Restart app
pm2 restart rsumeloy

# Restart Nginx
sudo systemctl restart nginx

# Check Nginx status
sudo systemctl status nginx
```

---

## 🆘 **TROUBLESHOOTING**

### **Problem: Port 3000 already in use**
```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>

# Restart PM2
pm2 restart rsumeloy
```

### **Problem: Build failed**
```bash
# Check environment variables
cat .env.local

# Check Node.js version
node -v  # Must be 18+

# Clear cache & rebuild
rm -rf .next node_modules
npm install
npm run build
```

### **Problem: 502 Bad Gateway**
```bash
# Check if app is running
pm2 status

# Check logs
pm2 logs rsumeloy --lines 100

# Restart everything
pm2 restart rsumeloy
sudo systemctl restart nginx
```

### **Problem: Database connection error**
```bash
# Check Supabase keys in .env.local
nano .env.local

# Test connection
curl "$NEXT_PUBLIC_SUPABASE_URL/rest/v1/doctors" \
  -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY"
```

---

## ✅ **CHECKLIST - DEPLOYMENT SUKSES**

Pastikan semua ini ✅:

- [ ] Repository cloned ke `~/domains/rsumeloy.co.id/rsumeloy`
- [ ] Node.js version 18+ (`node -v`)
- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables configured (`.env.local`)
- [ ] Production build successful (`npm run build`)
- [ ] PM2 process running (`pm2 status`)
- [ ] PM2 auto-startup configured (`pm2 startup`)
- [ ] Nginx reverse proxy configured
- [ ] SSL certificate installed (`certbot`)
- [ ] Domain pointing ke server (DNS)
- [ ] Website accessible: https://www.rsumeloy.co.id
- [ ] All pages working (navigation test)
- [ ] Database connected (data loading)
- [ ] Images loading (Cloudinary)
- [ ] AI chatbot responding (Gemini)
- [ ] Google Maps showing (CSP fix active)
- [ ] Mobile responsive (test on phone)
- [ ] No console errors (F12 Developer Tools)

---

## 🎉 **SELESAI!**

Website Next.js Anda sekarang sudah live di:
**https://www.rsumeloy.co.id**

### **Untuk update kedepannya:**
1. Edit code di local
2. `git push origin master`
3. SSH ke server
4. `bash deploy.sh`
5. Done! ✅

---

## 📞 **NEED HELP?**

Jika ada masalah:
1. Check PM2 logs: `pm2 logs rsumeloy --lines 100`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Check system resources: `htop` atau `free -m`
4. Restart: `pm2 restart rsumeloy && sudo systemctl restart nginx`

**Good luck! 🚀**

