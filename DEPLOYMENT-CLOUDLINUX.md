# 🚀 DEPLOYMENT GUIDE - CLOUDLINUX HOSTING

## ✅ Package Ready!

**File:** `rsumeloy-cloudlinux-deploy.zip` (2.7 MB)
**NO node_modules** - CloudLinux will create symlink automatically

---

## 📋 STEP-BY-STEP DEPLOYMENT

### **STEP 1: Upload ZIP ke Server**

#### **Via cPanel File Manager:**

1. Login ke **cPanel Jagoan Hosting**
2. Buka **File Manager**
3. Navigate ke `/home/rsumelo4/public_html/`
4. **BACKUP folder lama** (jika ada):
   - Rename `rsumeloy` → `rsumeloy-backup-OLD`
5. Create folder baru: `rsumeloy`
6. Masuk ke folder `rsumeloy`
7. Upload **`rsumeloy-cloudlinux-deploy.zip`**
8. **Extract** ZIP file (klik kanan → Extract)
9. Delete ZIP file

**Hasil akhir:**
```
/home/rsumelo4/public_html/rsumeloy/
├── server.js
├── .next/
├── public/
├── app/
├── data/
├── package.json
└── .env
```

---

### **STEP 2: Setup Node.js Application di cPanel**

1. Di cPanel, buka **"Setup Node.js App"** atau **"NodeJS Selector"**

2. Klik **"Create Application"**

3. Isi form:
   ```
   Node.js version: 20.x (pilih yang terbaru)
   Application mode: Production
   Application root: public_html/rsumeloy
   Application URL: rsumeloy.co.id
   Application startup file: server.js
   ```

4. Klik **"Create"**

5. Setelah created, klik **"Run NPM Install"**
   - Ini akan membuat symlink `node_modules` (PENTING!)
   - Tunggu hingga selesai

6. Di **Environment Variables**, tambahkan:
   ```
   PORT = 3001
   NODE_ENV = production
   ```

7. Klik **"Restart"** untuk start aplikasi

---

### **STEP 3: Verifikasi Aplikasi Berjalan**

Via SSH, cek status:

```bash
# Login SSH
ssh rsumelo4@noble.jagoanhosting.id

# Cek apakah app running
netstat -tulpn | grep :3001

# Atau cek via curl
curl http://localhost:3001

# Should return HTML dari Next.js
```

Jika berhasil, akan muncul HTML response dari Next.js!

---

### **STEP 4: Update .htaccess**

Edit file `/home/rsumelo4/public_html/.htaccess`:

**Via cPanel File Manager:**
1. Navigate ke `public_html/`
2. Klik kanan `.htaccess` → Edit
3. **REPLACE SEMUA ISI** dengan:

```apache
# ==========================================
# RSU Meloy - Next.js Standalone on CloudLinux
# Port: 3001
# ==========================================

# Enable Rewrite Engine
RewriteEngine On

# ==========================================
# Exclude cPanel and System Paths
# ==========================================

# Don't proxy cPanel paths
RewriteCond %{REQUEST_URI} ^/\.well-known/ [NC,OR]
RewriteCond %{REQUEST_URI} ^/cpanel [NC,OR]
RewriteCond %{REQUEST_URI} ^/cgi-bin [NC,OR]
RewriteCond %{REQUEST_URI} ^/webmail [NC,OR]
RewriteCond %{REQUEST_URI} ^/WHM [NC]
RewriteRule ^ - [L]

# ==========================================
# Force HTTPS (SSL)
# ==========================================

RewriteCond %{HTTPS} !=on
RewriteCond %{REQUEST_URI} !^/\.well-known/
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# ==========================================
# Proxy to Next.js Application (Port 3001)
# ==========================================

# Proxy all requests to Node.js app
RewriteRule ^(.*)$ http://127.0.0.1:3001/$1 [P,L]

# ==========================================
# Security Headers
# ==========================================

<IfModule mod_headers.c>
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

4. **Save Changes**

**ATAU Via SSH:**

```bash
cd ~/public_html
nano .htaccess
# Paste content di atas
# Ctrl+X, Y, Enter untuk save
```

---

### **STEP 5: Install SSL Certificate**

**Via cPanel:**

1. Buka **SSL/TLS Status**
2. Centang domain `rsumeloy.co.id` dan `www.rsumeloy.co.id`
3. Klik **Run AutoSSL**
4. Tunggu hingga selesai

**Atau via SSH (Certbot):**

```bash
sudo certbot --apache -d rsumeloy.co.id -d www.rsumeloy.co.id
```

---

### **STEP 6: Test Website**

1. Buka browser
2. Akses **https://rsumeloy.co.id**
3. Test semua fitur:
   - ✅ Homepage load
   - ✅ AI Assistant (robot icon)
   - ✅ WhatsApp button (+628115495477)
   - ✅ APAM button (https://apam.rsumeloy.co.id)
   - ✅ Jadwal Dokter
   - ✅ Fasilitas
   - ✅ Layanan
   - ✅ Kontak
   - ✅ Tentang

---

## 🔧 TROUBLESHOOTING

### **Problem: "node_modules should be a symlink"**

**Solution:**
```bash
cd ~/public_html/rsumeloy
rm -rf node_modules  # Hapus folder jika ada
# Lalu di cPanel NodeJS Selector, klik "Run NPM Install" lagi
```

---

### **Problem: App tidak jalan setelah restart server**

**Solution:**
Di cPanel NodeJS Selector:
- Klik **"Restart"**
- Atau via SSH: `cd ~/nodevenv/public_html/rsumeloy/20 && source bin/activate && pm2 restart all`

---

### **Problem: 502 Bad Gateway**

**Solution:**
```bash
# Cek apakah app running
netstat -tulpn | grep :3001

# Jika tidak ada, restart via cPanel NodeJS Selector
# Atau check logs
cd ~/public_html/rsumeloy
cat stderr.log
```

---

### **Problem: Environment variables tidak terbaca**

**Solution:**
1. Di cPanel NodeJS Selector, klik **"Edit"**
2. Tambahkan environment variables:
   ```
   PORT=3001
   NODE_ENV=production
   ```
3. Klik **"Save"**
4. Klik **"Restart"**

---

## 📊 MONITORING

### **Via cPanel:**
- Buka **NodeJS Selector**
- Lihat status: **Running** / **Stopped**
- View logs via **"View Log"** button

### **Via SSH:**
```bash
# Check if running
netstat -tulpn | grep :3001

# View logs
cd ~/public_html/rsumeloy
tail -f stderr.log
tail -f stdout.log

# Check with PM2 (if installed)
pm2 list
pm2 logs
pm2 monit
```

---

## 🔄 UPDATE PROCEDURE (Future Updates)

Ketika ada update website:

### **1. Build di Windows:**
```cmd
cd d:\AI DEV\FINALHOSTING\rsumeloy
# Run exclude script
echo node_modules > exclude.txt
xcopy rsumeloy-standalone rsumeloy-cloudlinux /E /I /Q /EXCLUDE:exclude.txt
powershell -command "Compress-Archive -Path 'rsumeloy-cloudlinux\*' -DestinationPath 'rsumeloy-cloudlinux-deploy.zip' -Force"
```

### **2. Upload & Replace:**
1. Upload `rsumeloy-cloudlinux-deploy.zip` ke server
2. Backup folder lama: `mv rsumeloy rsumeloy-backup-$(date +%Y%m%d)`
3. Extract ZIP baru
4. Di cPanel NodeJS Selector: **Restart**

### **3. Verify:**
- Check website: https://rsumeloy.co.id
- Check logs: `tail -f ~/public_html/rsumeloy/stderr.log`

---

## ✅ DEPLOYMENT CHECKLIST

Before going live:

- [ ] ZIP uploaded to `/public_html/rsumeloy/`
- [ ] ZIP extracted successfully
- [ ] Node.js app created in cPanel (Node 20.x)
- [ ] `npm install` executed (node_modules symlink created)
- [ ] Environment variables set (PORT=3001, NODE_ENV=production)
- [ ] Application started and running
- [ ] Port 3001 listening (check with `netstat`)
- [ ] `.htaccess` updated with reverse proxy config
- [ ] SSL certificate installed
- [ ] Website accessible via HTTPS
- [ ] All pages working correctly
- [ ] AI Assistant working
- [ ] WhatsApp & APAM buttons working
- [ ] No errors in logs

---

## 🎯 EXPECTED RESULT

```bash
# Cek status
netstat -tulpn | grep :3001
# Output:
tcp  0  0  127.0.0.1:3001  0.0.0.0:*  LISTEN  12345/node

# Test local
curl http://localhost:3001
# Output: HTML dari Next.js homepage

# Test public
curl https://rsumeloy.co.id
# Output: Full website HTML
```

Website live di **https://rsumeloy.co.id** ✅

---

## 📞 SUPPORT

Jika ada masalah:
1. Check logs di cPanel
2. Restart app via cPanel NodeJS Selector
3. Contact Jagoan Hosting support
4. Check error di browser console (F12)

---

**Ready to deploy!** 🚀✨
