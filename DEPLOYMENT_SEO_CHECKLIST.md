# Deployment Checklist: Menjaga SEO Saat Upload Build Baru

## 🎯 Tujuan
Memastikan SEO website tetap optimal dan tidak terpengaruh saat melakukan deployment build baru ke hosting.

---

## ✅ Pre-Deployment Checklist

### 1. **Backup Website yang Sedang Berjalan**
```bash
# SSH ke server
ssh user@rsumeloy.co.id

# Backup folder website saat ini
cd /path/to/website
tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz .

# Atau backup hanya file penting
cp -r .next .next.backup
cp server.js server.js.backup
cp .env.local .env.local.backup
```

**Mengapa penting untuk SEO:**
- Jika ada masalah, bisa rollback cepat
- Downtime minimal = tidak kehilangan ranking

---

### 2. **Verifikasi Environment Variables**
```bash
# Check environment variables
cat .env.local

# Pastikan semua variabel ada:
# - NEXT_PUBLIC_SITE_URL (https://www.rsumeloy.co.id)
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - GEMINI_API_KEY
# - dll
```

**Mengapa penting untuk SEO:**
- `NEXT_PUBLIC_SITE_URL` digunakan untuk sitemap.xml dan canonical URLs
- Jika salah, Google akan index URL yang salah

---

### 3. **Test Build di Local Terlebih Dahulu**
```bash
# Di local development
npm run build
npm run start

# Test semua halaman penting:
# - Homepage (/)
# - Layanan (/layanan)
# - Jadwal Dokter (/jadwal-dokter)
# - Sitemap (/sitemap.xml)
# - Robots.txt (/robots.txt)
```

**Check list:**
- [ ] Semua halaman load dengan benar
- [ ] Tidak ada error 404
- [ ] Meta tags muncul (title, description, og:image)
- [ ] Canonical URLs benar
- [ ] Structured data valid (JSON-LD)

---

## 🚀 Deployment Strategy (Zero-Downtime)

### **Opsi A: Blue-Green Deployment (Recommended)**

#### Step 1: Siapkan Folder Baru
```bash
# SSH ke server
cd /var/www/

# Buat folder baru untuk build baru
mkdir rsumeloy-new
cd rsumeloy-new

# Upload build baru via FTP ke folder ini
# Atau clone dari Git:
git clone https://github.com/Hendrazan/rsumeloy.git .
npm install --production
```

#### Step 2: Test Build Baru di Port Berbeda
```bash
# Edit server.js untuk gunakan port berbeda (contoh: 3001)
# Atau buat file ecosystem.config.js baru

# Start di background
PORT=3001 pm2 start server.js --name rsumeloy-new

# Test apakah berjalan
curl http://localhost:3001

# Test semua endpoint penting
curl http://localhost:3001/sitemap.xml
curl http://localhost:3001/robots.txt
curl http://localhost:3001/jadwal-dokter
```

#### Step 3: Switch Traffic (Nginx/Apache)
```bash
# Edit Nginx config
sudo nano /etc/nginx/sites-available/rsumeloy.co.id

# Ubah upstream dari port 3000 ke 3001:
upstream rsumeloy_backend {
    server localhost:3001;  # ← Ganti dari 3000 ke 3001
}

# Test config
sudo nginx -t

# Reload Nginx (zero downtime)
sudo systemctl reload nginx

# Verify website masih bisa diakses
curl https://www.rsumeloy.co.id
```

#### Step 4: Cleanup dan Monitor
```bash
# Stop aplikasi lama
pm2 stop rsumeloy-old

# Monitor aplikasi baru
pm2 logs rsumeloy-new --lines 100

# Jika semua OK, hapus folder lama
rm -rf /var/www/rsumeloy-old

# Rename folder baru jadi primary
mv /var/www/rsumeloy /var/www/rsumeloy-old
mv /var/www/rsumeloy-new /var/www/rsumeloy
```

---

### **Opsi B: In-Place Deployment (Cepat tapi Ada Downtime)**

#### Step 1: Stop Server Sebentar
```bash
# Stop PM2
pm2 stop server.js

# Backup folder lama
mv .next .next.backup
```

#### Step 2: Upload Build Baru
```bash
# Upload via FTP:
# - PRODUKSI/standalone/ → /var/www/rsumeloy/.next/standalone/
# - PRODUKSI/public/ → /var/www/rsumeloy/public/
# - PRODUKSI/server.js → /var/www/rsumeloy/server.js

# Atau via Git:
git pull origin master
npm run build
```

#### Step 3: Start Server Kembali
```bash
# Start PM2
pm2 start server.js

# Monitor logs
pm2 logs server.js --lines 50
```

**Downtime:** ~30-60 detik (acceptable untuk SEO)

---

## 🔍 Post-Deployment SEO Verification

### 1. **Verify Sitemap Masih Accessible**
```bash
# Test sitemap
curl https://www.rsumeloy.co.id/sitemap.xml

# Harus return XML dengan status 200
# Verify ada semua URL penting
```

**Check di browser:**
- https://www.rsumeloy.co.id/sitemap.xml
- https://www.rsumeloy.co.id/image-sitemap.xml
- https://www.rsumeloy.co.id/robots.txt

---

### 2. **Verify Robots.txt**
```bash
curl https://www.rsumeloy.co.id/robots.txt
```

**Expected output:**
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /_next/

Sitemap: https://www.rsumeloy.co.id/sitemap.xml
Sitemap: https://www.rsumeloy.co.id/image-sitemap.xml
```

---

### 3. **Test Important Pages (Status Code)**
```bash
# Test homepage
curl -I https://www.rsumeloy.co.id

# Test layanan pages
curl -I https://www.rsumeloy.co.id/layanan

# Test jadwal dokter
curl -I https://www.rsumeloy.co.id/jadwal-dokter

# Semua harus return 200 OK
```

---

### 4. **Verify Meta Tags & Structured Data**
```bash
# Check meta tags homepage
curl https://www.rsumeloy.co.id | grep -i "<title>"
curl https://www.rsumeloy.co.id | grep -i "og:image"
curl https://www.rsumeloy.co.id | grep -i "canonical"

# Check structured data (JSON-LD)
curl https://www.rsumeloy.co.id | grep -i "application/ld+json"
```

**Manual check di browser:**
1. Buka https://www.rsumeloy.co.id
2. View Page Source (Ctrl+U)
3. Cari `<title>`, `<meta name="description">`, `og:` tags
4. Verify semuanya ada dan benar

---

### 5. **Test dengan Google Rich Results Test**
```
https://search.google.com/test/rich-results
```

**Input URL:**
- https://www.rsumeloy.co.id
- https://www.rsumeloy.co.id/jadwal-dokter
- https://www.rsumeloy.co.id/layanan/hemodialisalayanancucidarah

**Verify:**
- [ ] Structured data detected
- [ ] No errors
- [ ] Organization markup valid
- [ ] BreadcrumbList valid (jika ada)

---

### 6. **Mobile-Friendly Test**
```
https://search.google.com/test/mobile-friendly
```

**Test URL:**
- https://www.rsumeloy.co.id

**Verify:**
- [ ] Page is mobile-friendly
- [ ] No loading issues
- [ ] Text is readable

---

### 7. **PageSpeed Insights Check**
```
https://pagespeed.web.dev/
```

**Test URL:**
- https://www.rsumeloy.co.id

**Target metrics:**
- Performance: > 80
- Accessibility: > 90
- Best Practices: > 90
- SEO: 100

---

## 📊 Monitor SEO Metrics

### 1. **Google Search Console**
```
https://search.google.com/search-console
```

**Check setelah deployment:**
- [ ] Coverage: tidak ada error baru
- [ ] Performance: traffic tidak drop
- [ ] Sitemaps: sitemap masih di-crawl
- [ ] Mobile usability: tidak ada masalah baru

**Expected behavior:**
- 24-48 jam pertama: mungkin ada slight drop (normal)
- 3-7 hari: traffic kembali normal atau meningkat

---

### 2. **Submit Sitemap ke Google (Optional)**
```bash
# Via Google Search Console:
1. Go to Sitemaps section
2. Add sitemap URL: https://www.rsumeloy.co.id/sitemap.xml
3. Click Submit

# Google akan re-crawl dalam 1-2 hari
```

---

### 3. **Request Indexing untuk Halaman Penting**
```
Google Search Console → URL Inspection → Request Indexing
```

**URL yang harus di-request:**
- https://www.rsumeloy.co.id (homepage)
- https://www.rsumeloy.co.id/jadwal-dokter
- https://www.rsumeloy.co.id/layanan
- URL artikel/layanan baru (jika ada)

---

## ⚠️ Red Flags (Perlu Action Segera)

### 1. **404 Errors Meningkat**
**Gejala:**
- Google Search Console menunjukkan error 404 banyak
- User complain halaman tidak ditemukan

**Action:**
```bash
# Check PM2 logs untuk 404
pm2 logs server.js | grep "404"

# Check Nginx access logs
sudo tail -f /var/log/nginx/access.log | grep "404"

# Verify routing di Next.js masih benar
# Check file app/*/page.tsx masih ada
```

**Fix:**
- Rollback ke build sebelumnya jika banyak 404
- Fix routing dan re-deploy

---

### 2. **Sitemap/Robots.txt Not Accessible**
**Gejala:**
- https://www.rsumeloy.co.id/sitemap.xml return 404 atau 500

**Action:**
```bash
# Check apakah file di-generate
curl http://localhost:3000/sitemap.xml

# Check Nginx config tidak block sitemap
sudo nano /etc/nginx/sites-available/rsumeloy.co.id

# Pastikan tidak ada:
# location ~ /sitemap.xml { deny all; }
```

**Fix:**
- Ensure `app/sitemap.ts` dan `app/robots.ts` ada di build
- Restart PM2: `pm2 restart server.js`

---

### 3. **Canonical URLs Wrong**
**Gejala:**
- Canonical URL point ke localhost atau domain salah

**Check:**
```bash
curl https://www.rsumeloy.co.id | grep "canonical"

# Harus:
# <link rel="canonical" href="https://www.rsumeloy.co.id">

# Bukan:
# <link rel="canonical" href="http://localhost:3000">
```

**Fix:**
```bash
# Check .env.local di server
cat .env.local | grep SITE_URL

# Harus:
NEXT_PUBLIC_SITE_URL=https://www.rsumeloy.co.id

# Bukan:
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

### 4. **Meta Tags Missing**
**Gejala:**
- Title atau description kosong
- OG image tidak muncul di social media

**Check:**
```bash
# View page source
curl https://www.rsumeloy.co.id | grep -E "<title>|description|og:image"
```

**Fix:**
- Ensure metadata di `app/*/page.tsx` ada
- Rebuild dengan `npm run build`

---

## 🛡️ Long-Term SEO Protection

### 1. **Setup Monitoring**
```bash
# Setup Uptime Monitoring (contoh: UptimeRobot)
# Monitor URL:
- https://www.rsumeloy.co.id
- https://www.rsumeloy.co.id/sitemap.xml
- https://www.rsumeloy.co.id/jadwal-dokter

# Alert jika down > 2 menit
```

---

### 2. **Regular SEO Audits**
**Schedule:**
- Weekly: Check Google Search Console
- Monthly: Full SEO audit (PageSpeed, mobile-friendly, structured data)
- After every deployment: Run this checklist

---

### 3. **Version Control for SEO Files**
```bash
# Always commit SEO-critical files:
git add app/sitemap.ts
git add app/robots.ts
git add app/layout.tsx  # Root layout dengan metadata
git add app/*/page.tsx  # Semua pages dengan metadata

git commit -m "SEO: update metadata for ..."
git push
```

---

## 📋 Quick Deployment Checklist

**Before Deployment:**
- [ ] Backup website saat ini
- [ ] Test build di local
- [ ] Verify environment variables
- [ ] Check meta tags di local build
- [ ] Test sitemap.xml dan robots.txt di local

**During Deployment:**
- [ ] Use blue-green or zero-downtime strategy
- [ ] Monitor logs real-time
- [ ] Check error logs immediately

**After Deployment:**
- [ ] Test homepage (https://www.rsumeloy.co.id)
- [ ] Test sitemap.xml
- [ ] Test robots.txt
- [ ] Verify meta tags in browser
- [ ] Run Google Rich Results Test
- [ ] Run Mobile-Friendly Test
- [ ] Check Google Search Console (24h later)

**If Something Wrong:**
- [ ] Check PM2 logs: `pm2 logs server.js`
- [ ] Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- [ ] Rollback jika perlu: `pm2 restart server.js` (restore backup)

---

## 🎯 Success Criteria

**Deployment dianggap berhasil untuk SEO jika:**

1. ✅ Semua URL penting return 200 OK
2. ✅ Sitemap.xml accessible dan lengkap
3. ✅ Robots.txt accessible dan benar
4. ✅ Meta tags (title, description, OG) ada di semua pages
5. ✅ Canonical URLs correct (https://www.rsumeloy.co.id)
6. ✅ Structured data valid (JSON-LD)
7. ✅ Mobile-friendly test passed
8. ✅ PageSpeed Insights score tidak drop > 10 points
9. ✅ Google Search Console tidak ada error baru
10. ✅ Traffic tidak drop > 20% dalam 48 jam

---

## 🔗 Useful Links

- **Google Search Console:** https://search.google.com/search-console
- **Rich Results Test:** https://search.google.com/test/rich-results
- **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Sitemap Validator:** https://www.xml-sitemaps.com/validate-xml-sitemap.html

---

**Last Updated:** November 4, 2025  
**Maintained by:** DevOps & SEO Team
