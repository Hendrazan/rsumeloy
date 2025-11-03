# 🚀 Deployment Guide - RSU Meloy Website

## ❌ **PERINGATAN: TIDAK BISA UPLOAD LANGSUNG!**

Website ini adalah **Next.js Application** dengan arsitektur **Server-Side Rendering (SSR)** dan membutuhkan **Node.js runtime**. 

**TIDAK BISA** diupload ke hosting biasa seperti:
- ❌ cPanel (shared hosting)
- ❌ WordPress hosting
- ❌ Static file hosting sederhana

---

## 🏗️ **ARSITEKTUR WEBSITE INI**

```
┌─────────────────────────────────────────────────────────┐
│  FRONTEND (React/Next.js)                               │
│  - Server-Side Rendering (SSR)                          │
│  - Dynamic page generation                              │
│  - API routes                                           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  BACKEND (Node.js Server)                               │
│  - server.js (custom server)                            │
│  - Middleware (security, rate limit, CSP)               │
│  - API endpoints (/api/*)                               │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  DATABASE (Supabase PostgreSQL)                         │
│  - doctors, services, facilities, articles, etc.        │
│  - Real-time data sync                                  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  EXTERNAL SERVICES                                      │
│  - Cloudinary (images)                                  │
│  - Google Gemini AI (chatbot)                           │
│  - Supabase Auth                                        │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 **PERBANDINGAN: HOSTING OPTIONS**

### **Option 1: VERCEL (Current) ✅ RECOMMENDED**

**Kelebihan:**
- ✅ **Auto-deploy** dari GitHub (push = auto update)
- ✅ **Gratis** untuk website seperti ini (Hobby plan)
- ✅ **Global CDN** (cepat di seluruh dunia)
- ✅ **Zero-config** (tidak perlu setup server)
- ✅ **SSL/HTTPS** otomatis
- ✅ **Custom domain** gratis (rsumeloy.co.id)
- ✅ **Serverless Functions** unlimited
- ✅ **Built for Next.js** (best performance)
- ✅ **Auto-scaling** (traffic tinggi tidak masalah)
- ✅ **Preview deployments** (test sebelum production)

**Kekurangan:**
- ⚠️ Tergantung pada Vercel (vendor lock-in)

**Biaya:**
```
Hobby Plan (Current): $0/month ✅
- 100GB bandwidth/month
- Unlimited serverless functions
- Automatic HTTPS
- Custom domains

Pro Plan: $20/month
- 1TB bandwidth
- Advanced analytics
- Password protection
- Team collaboration
```

**Status Sekarang:** ✅ **SUDAH OPTIMAL DI VERCEL**

---

### **Option 2: NETLIFY**

**Kelebihan:**
- ✅ Auto-deploy dari GitHub
- ✅ Gratis (Starter plan)
- ✅ Global CDN
- ✅ Custom domain gratis
- ✅ Form handling built-in

**Kekurangan:**
- ⚠️ **Serverless functions terbatas** (125,000 requests/month)
- ⚠️ Tidak se-optimal Vercel untuk Next.js
- ⚠️ Build time lebih lambat

**Cara Deploy:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**Biaya:**
```
Starter: $0/month
- 100GB bandwidth
- 125k serverless function requests
- 300 build minutes

Pro: $19/month
- 400GB bandwidth
- Unlimited functions
```

---

### **Option 3: RAILWAY**

**Kelebihan:**
- ✅ Deploy full Node.js app
- ✅ Database hosting included
- ✅ Custom domain
- ✅ Auto-deploy from GitHub

**Kekurangan:**
- ⚠️ **TIDAK GRATIS** (pay as you go)
- ⚠️ Lebih mahal untuk traffic tinggi

**Cara Deploy:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

**Biaya:**
```
Developer Plan: $5/month minimum + usage
- $0.000463/GB-hour for memory
- $0.001/vCPU-hour
- $0.10/GB bandwidth

Estimasi: $10-30/month untuk website ini
```

---

### **Option 4: VPS (DigitalOcean, AWS, GCP)**

**Kelebihan:**
- ✅ Full control server
- ✅ Bisa custom semuanya
- ✅ Tidak ada vendor lock-in

**Kekurangan:**
- ❌ **Butuh setup manual** (complex!)
- ❌ **Maintain server sendiri** (updates, security)
- ❌ **TIDAK ADA auto-deploy** (harus setup CI/CD)
- ❌ **Biaya lebih mahal**
- ❌ **Butuh DevOps skills**

**Requirements:**
```
Server Specs (Minimum):
- 2 CPU cores
- 4GB RAM
- 50GB SSD
- Ubuntu 22.04 LTS
- Node.js 20.x
- PM2 (process manager)
- Nginx (reverse proxy)
- SSL certificate (Let's Encrypt)
```

**Setup Steps (Complex!):**
```bash
# 1. Setup server
apt update && apt upgrade -y
apt install nodejs npm nginx certbot

# 2. Clone repository
git clone https://github.com/Hendrazan/rsumeloy.git
cd rsumeloy

# 3. Install dependencies
npm install

# 4. Build production
npm run build

# 5. Setup PM2
npm install -g pm2
pm2 start server.js --name rsumeloy
pm2 startup
pm2 save

# 6. Configure Nginx
nano /etc/nginx/sites-available/rsumeloy
# ... (complex config)

# 7. Setup SSL
certbot --nginx -d rsumeloy.co.id

# 8. Setup auto-deploy (webhook)
# ... (very complex)
```

**Biaya:**
```
DigitalOcean Droplet: $12-24/month
- 2GB RAM: $12/month
- 4GB RAM: $24/month
+ Bandwidth overages
+ Backup: $2.40/month

AWS EC2: $15-50/month
- t3.small: $15.18/month
- t3.medium: $30.37/month
+ Data transfer: $0.09/GB
+ Load balancer: $16/month

Total estimasi: $25-75/month + maintenance time
```

---

### **Option 5: HOSTING TRADISIONAL (cPanel) ❌**

**❌ TIDAK BISA!**

Alasan:
1. ❌ cPanel hosting tidak support Node.js runtime
2. ❌ Tidak bisa run `npm start` atau `node server.js`
3. ❌ Tidak ada environment untuk build Next.js
4. ❌ Tidak support server-side rendering (SSR)
5. ❌ API routes tidak akan jalan

**Kesalahpahaman Umum:**
```
❌ "Download dari GitHub → Upload ke cPanel"
   → TIDAK AKAN JALAN!

✅ Yang bisa diupload ke cPanel:
   - HTML/CSS/JS static files
   - PHP website (WordPress, Laravel)
   - Static website (no backend)

❌ Yang TIDAK bisa:
   - Next.js (butuh Node.js)
   - React SSR apps
   - Node.js applications
```

---

## 🎯 **REKOMENDASI BERDASARKAN KEBUTUHAN**

### **1. Untuk Website RSU Meloy (Sekarang):** ⭐⭐⭐⭐⭐
```
VERCEL (Current Setup)
✅ Gratis
✅ Sudah optimal
✅ Auto-deploy dari GitHub
✅ Global CDN
✅ Zero maintenance

JANGAN PINDAH! Sudah perfect.
```

---

### **2. Jika Harus Pindah Hosting:**

#### **Scenario A: Tetap Gratis**
```
NETLIFY
✅ Gratis
✅ Similar to Vercel
⚠️ Sedikit lebih lambat

Cara: 
1. Login ke Netlify
2. Connect GitHub repo
3. Auto-deploy
```

#### **Scenario B: Butuh Full Control**
```
VPS (DigitalOcean/Linode)
💰 $12-24/month
✅ Full control
❌ Complex setup
❌ Maintenance required

Cara:
1. Beli VPS
2. Setup Node.js environment
3. Clone repo
4. Build & run
5. Setup Nginx
6. SSL certificate
```

#### **Scenario C: All-in-One Platform**
```
RAILWAY
💰 $10-30/month
✅ Database included
✅ Easy setup
⚠️ More expensive

Cara:
1. Login Railway
2. Connect GitHub
3. Auto-deploy
```

---

## 📋 **STEP-BY-STEP: Jika Deploy ke Hosting Lain**

### **Option A: NETLIFY (Recommended Alternative)**

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Inisialisasi project
cd rsumeloy
netlify init

# 4. Configure build settings
Build command: npm run build
Publish directory: .next

# 5. Add environment variables di Netlify dashboard
NEXT_PUBLIC_SITE_URL=https://rsumeloy.co.id
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
# ... (semua env variables)

# 6. Deploy
netlify deploy --prod
```

**Estimasi waktu:** 15-30 menit

---

### **Option B: RAILWAY**

```bash
# 1. Install Railway CLI
npm i -g @railway/cli

# 2. Login
railway login

# 3. Create new project
railway init

# 4. Add environment variables
railway variables set NEXT_PUBLIC_SITE_URL=https://rsumeloy.co.id
railway variables set NEXT_PUBLIC_SUPABASE_URL=your_url
# ... (semua env variables)

# 5. Deploy
railway up
```

**Estimasi waktu:** 20-40 menit

---

### **Option C: VPS (DigitalOcean/AWS) ⚠️ COMPLEX**

```bash
# ===== DI SERVER (via SSH) =====

# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Install PM2
sudo npm install -g pm2

# 4. Clone repository
git clone https://github.com/Hendrazan/rsumeloy.git
cd rsumeloy

# 5. Create .env.local file
nano .env.local
# Paste semua environment variables

# 6. Install dependencies
npm install

# 7. Build production
npm run build

# 8. Start with PM2
pm2 start server.js --name rsumeloy
pm2 startup
pm2 save

# 9. Install Nginx
sudo apt install nginx

# 10. Configure Nginx
sudo nano /etc/nginx/sites-available/rsumeloy

# Paste config:
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
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# 11. Enable site
sudo ln -s /etc/nginx/sites-available/rsumeloy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 12. Install SSL (Let's Encrypt)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d rsumeloy.co.id -d www.rsumeloy.co.id

# 13. Setup auto-deploy (webhook)
# ... (very complex, requires additional setup)
```

**Estimasi waktu:** 2-4 jam (jika berpengalaman)  
**Maintenance:** 1-2 jam/bulan untuk updates & monitoring

---

## 🔒 **ENVIRONMENT VARIABLES YANG DIBUTUHKAN**

**Semua hosting membutuhkan environment variables ini:**

```bash
# Next.js Config
NEXT_PUBLIC_SITE_URL=https://www.rsumeloy.co.id
NODE_ENV=production

# Supabase (Database)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Cloudinary (Images)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ddyqhlilj

# Google Gemini AI (Chatbot)
GEMINI_API_KEY=your_gemini_api_key

# Google (Optional)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code

# Custom
PORT=3000
```

**⚠️ PENTING:** Jangan pernah commit file `.env.local` ke GitHub!

---

## 💰 **COST COMPARISON**

| Hosting | Monthly Cost | Setup Time | Maintenance | Performance | Recommended? |
|---------|-------------|------------|-------------|-------------|--------------|
| **Vercel** (Current) | **$0** ✅ | 0 min | 0 hr | ⭐⭐⭐⭐⭐ | **YES!** ✅ |
| Netlify | $0 | 30 min | 0 hr | ⭐⭐⭐⭐ | Alternative |
| Railway | $10-30 | 30 min | 0 hr | ⭐⭐⭐⭐ | If need DB |
| DigitalOcean VPS | $12-24 | 3-4 hrs | 2 hr/mo | ⭐⭐⭐ | Not worth it |
| AWS EC2 | $20-50 | 4-6 hrs | 3 hr/mo | ⭐⭐⭐⭐ | Overkill |
| cPanel Hosting | ❌ | N/A | N/A | N/A | **IMPOSSIBLE** |

---

## ✅ **KESIMPULAN & REKOMENDASI**

### **TETAP DI VERCEL! ⭐**

Alasan:
1. ✅ **Gratis** (no cost)
2. ✅ **Auto-deploy** (push GitHub = auto update)
3. ✅ **Best performance** untuk Next.js
4. ✅ **Global CDN** (fast worldwide)
5. ✅ **Zero maintenance** (no server management)
6. ✅ **Auto-scaling** (handle traffic spikes)
7. ✅ **Preview deployments** (test before production)
8. ✅ **Analytics** built-in
9. ✅ **SSL** automatic
10. ✅ **Custom domain** support

### **Jika Harus Pindah:**

**Priority 1:** Netlify (free, similar to Vercel)  
**Priority 2:** Railway (paid but easy)  
**Priority 3:** VPS (complex, only if you need full control)  

**❌ JANGAN:** Upload ke cPanel/shared hosting (TIDAK AKAN JALAN!)

---

## 🚨 **JAWABAN PERTANYAAN ANDA:**

> "Apakah untuk deploy ke hosting lain saya tinggal mendownload GitHub lalu menguploadnya ke hosting?"

**JAWABAN: TIDAK! ❌**

**Yang Benar:**

1. **Hosting Harus Support Node.js**
   - Vercel ✅
   - Netlify ✅
   - Railway ✅
   - VPS with Node.js ✅
   - cPanel ❌
   - Shared hosting ❌

2. **Proses Deploy:**
   ```
   GitHub Repository
        ↓
   Connect to Hosting Platform (Vercel/Netlify/Railway)
        ↓
   Auto-build & Deploy
        ↓
   Live Website
   ```

3. **Tidak Bisa:**
   ```
   Download ZIP dari GitHub
        ↓
   Upload ke cPanel via FTP  ❌ TIDAK AKAN JALAN!
        ↓
   (Website error)
   ```

**Kenapa?**
- Website ini butuh **build process** (`npm run build`)
- Butuh **Node.js runtime** untuk server
- Butuh **environment variables** configured
- cPanel tidak punya semua itu!

---

## 📞 **NEED HELP?**

Jika ingin pindah hosting:
1. Tentukan platform (Netlify/Railway/VPS)
2. Siapkan environment variables
3. Follow guide di atas
4. Test thoroughly sebelum switch DNS

**Recommendation:** STAY ON VERCEL! It's perfect for this project. 🎯

